const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

exports.markAttendance = async (req, res) => {
  try {
    const { student, subject, date, status } = req.body;
    const existing = await Attendance.findOne({ student, subject, date });
    if (existing) {
      existing.status = status;
      existing.markedBy = req.user._id;
      await existing.save();
      return res.status(200).json({ success: true, message: 'Attendance updated', attendance: existing });
    }
    const attendance = await Attendance.create({
      student, subject, date, status, markedBy: req.user._id
    });
    res.status(201).json({ success: true, message: 'Attendance marked successfully', attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId })
      .populate('markedBy', 'name')
      .sort({ date: -1 });
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
    res.status(200).json({
      success: true,
      attendance,
      stats: { total, present, absent: total - present, percentage }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    const attendance = await Attendance.find({ student: student._id }).sort({ date: -1 });
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
    res.status(200).json({
      success: true,
      attendance,
      stats: { total, present, absent: total - present, percentage }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttendanceBySubject = async (req, res) => {
  try {
    const { subject, date } = req.query;
    const query = {};
    if (subject) query.subject = subject;
    if (date) query.date = new Date(date);
    const attendance = await Attendance.find(query)
      .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
      .sort({ date: -1 });
    res.status(200).json({ success: true, count: attendance.length, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkMarkAttendance = async (req, res) => {
  try {
    const { attendanceList, subject, date } = req.body;
    const operations = attendanceList.map(item => ({
      updateOne: {
        filter: { student: item.student, subject, date: new Date(date) },
        update: { $set: { status: item.status, markedBy: req.user._id } },
        upsert: true
      }
    }));
    await Attendance.bulkWrite(operations);
    res.status(200).json({
      success: true,
      message: `Attendance marked for ${attendanceList.length} students`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};