import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import './Dashboard.css';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [message, setMessage] = useState('');

  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    category: 'general',
    targetAudience: 'all'
  });

  const [attendanceList, setAttendanceList] = useState([]);
  const [attendanceForm, setAttendanceForm] = useState({
    subject: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    API.get('/notices').then(res => setNotices(res.data.notices || []));
    API.get('/students')
      .then(res => {
        const list = res.data.students || [];
        setStudents(list);
        setAttendanceList(list.map(s => ({
          student: s._id,
          name: s.user?.name,
          rollNumber: s.rollNumber,
          status: 'present'
        })));
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notices', noticeForm);
      showMessage('✅ Notice posted successfully!');
      setNoticeForm({
        title: '',
        content: '',
        category: 'general',
        targetAudience: 'all'
      });
      API.get('/notices').then(res => setNotices(res.data.notices || []));
    } catch (err) {
      showMessage('❌ Failed to post notice.');
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    if (!attendanceForm.subject) {
      showMessage('❌ Please enter subject name.');
      return;
    }
    try {
      await API.post('/attendance/bulk', {
        attendanceList,
        subject: attendanceForm.subject,
        date: attendanceForm.date
      });
      showMessage('✅ Attendance marked successfully!');
    } catch (err) {
      showMessage('❌ Failed to mark attendance.');
    }
  };

  const updateAttendanceStatus = (studentId, status) => {
    setAttendanceList(prev =>
      prev.map(item =>
        item.student === studentId ? { ...item, status } : item
      )
    );
  };

  const tabs = [
    { id: 'home', label: '🏠 Dashboard' },
    { id: 'students', label: '👩‍🎓 Students' },
    { id: 'attendance', label: '📋 Attendance' },
    { id: 'notices', label: '📢 Post Notice' },
    { id: 'profile', label: '👤 My Profile' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">🎓</div>
          <div>
            <p className="sidebar-college">LKCWSC</p>
            <p className="sidebar-role">Staff Portal</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
          <div className="user-info">
            <span>👋 Welcome, {user?.name}</span>
          </div>
        </div>

        {message && <div className="dash-message">{message}</div>}

        <div className="dashboard-content">

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div>
              <div className="dash-cards">
                <div className="dash-card blue">
                  <div className="dash-card-icon">👩‍🎓</div>
                  <div>
                    <h3>{students.length}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="dash-card green">
                  <div className="dash-card-icon">📢</div>
                  <div>
                    <h3>{notices.length}</h3>
                    <p>Total Notices</p>
                  </div>
                </div>
                <div className="dash-card orange">
                  <div className="dash-card-icon">📋</div>
                  <div>
                    <h3>Mark</h3>
                    <p>Attendance</p>
                  </div>
                </div>
              </div>

              <div className="recent-section">
                <h3>Recent Notices</h3>
                {notices.slice(0, 5).map(notice => (
                  <div className="notice-row" key={notice._id}>
                    <span className="notice-dot"></span>
                    <div>
                      <p className="notice-title">{notice.title}</p>
                      <p className="notice-date">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="notice-tag">{notice.category}</span>
                  </div>
                ))}
                {notices.length === 0 && (
                  <p className="empty-msg">No notices yet</p>
                )}
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#1565C0' }}>
                All Students ({students.length})
              </h3>
              {students.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">👩‍🎓</div>
                  <h3>No Students Found</h3>
                  <p>Students will appear here once added by admin.</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student._id}>
                          <td>{student.user?.name}</td>
                          <td>{student.rollNumber}</td>
                          <td>{student.course?.name}</td>
                          <td>Year {student.year}</td>
                          <td>{student.user?.email}</td>
                          <td>
                            <span className="status-active">Active</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ATTENDANCE TAB */}
          {activeTab === 'attendance' && (
            <div>
              <div className="form-card">
                <h3>Mark Attendance</h3>
                <form onSubmit={handleAttendanceSubmit}>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Subject Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Hindi, Physics, History"
                        value={attendanceForm.subject}
                        onChange={e => setAttendanceForm({
                          ...attendanceForm,
                          subject: e.target.value
                        })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Date *</label>
                      <input
                        type="date"
                        value={attendanceForm.date}
                        onChange={e => setAttendanceForm({
                          ...attendanceForm,
                          date: e.target.value
                        })}
                        required
                      />
                    </div>
                  </div>

                  {students.length === 0 ? (
                    <div className="empty-state" style={{ padding: '40px' }}>
                      <div className="empty-icon">👩‍🎓</div>
                      <h3>No Students Found</h3>
                      <p>Students need to be added by admin first.</p>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                      }}>
                        <p style={{ fontSize: '14px', color: '#666' }}>
                          Total Students: <strong>{students.length}</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            style={{
                              padding: '6px 14px',
                              background: '#e8f5e9',
                              color: '#2E7D32',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                            onClick={() => setAttendanceList(prev =>
                              prev.map(item => ({ ...item, status: 'present' }))
                            )}>
                            ✅ Mark All Present
                          </button>
                          <button
                            type="button"
                            style={{
                              padding: '6px 14px',
                              background: '#ffebee',
                              color: '#C62828',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                            onClick={() => setAttendanceList(prev =>
                              prev.map(item => ({ ...item, status: 'absent' }))
                            )}>
                            ❌ Mark All Absent
                          </button>
                        </div>
                      </div>

                      <div className="table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Student Name</th>
                              <th>Roll No</th>
                              <th>Present</th>
                              <th>Absent</th>
                              <th>Late</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attendanceList.map((item, index) => (
                              <tr key={item.student}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.rollNumber}</td>
                                <td>
                                  <input
                                    type="radio"
                                    name={`att-${item.student}`}
                                    checked={item.status === 'present'}
                                    onChange={() => updateAttendanceStatus(item.student, 'present')}
                                    style={{ accentColor: '#2E7D32' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="radio"
                                    name={`att-${item.student}`}
                                    checked={item.status === 'absent'}
                                    onChange={() => updateAttendanceStatus(item.student, 'absent')}
                                    style={{ accentColor: '#C62828' }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="radio"
                                    name={`att-${item.student}`}
                                    checked={item.status === 'late'}
                                    onChange={() => updateAttendanceStatus(item.student, 'late')}
                                    style={{ accentColor: '#E65100' }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                        padding: '12px 16px',
                        background: '#e3f2fd',
                        borderRadius: '8px'
                      }}>
                        <span style={{ fontSize: '14px', color: '#1565C0' }}>
                          ✅ Present: <strong>
                            {attendanceList.filter(a => a.status === 'present').length}
                          </strong> |
                          ❌ Absent: <strong>
                            {attendanceList.filter(a => a.status === 'absent').length}
                          </strong> |
                          ⏰ Late: <strong>
                            {attendanceList.filter(a => a.status === 'late').length}
                          </strong>
                        </span>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ padding: '10px 24px' }}>
                          💾 Save Attendance
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === 'notices' && (
            <div>
              <div className="form-card">
                <h3>Post New Notice</h3>
                <form onSubmit={handleNoticeSubmit}>
                  <div className="form-group">
                    <label>Notice Title *</label>
                    <input
                      type="text"
                      placeholder="Enter notice title"
                      value={noticeForm.title}
                      onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={noticeForm.category}
                        onChange={e => setNoticeForm({ ...noticeForm, category: e.target.value })}>
                        <option value="general">General</option>
                        <option value="exam">Exam</option>
                        <option value="admission">Admission</option>
                        <option value="event">Event</option>
                        <option value="holiday">Holiday</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Target Audience</label>
                      <select
                        value={noticeForm.targetAudience}
                        onChange={e => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}>
                        <option value="all">All</option>
                        <option value="student">Students Only</option>
                        <option value="staff">Staff Only</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Content *</label>
                    <textarea
                      rows="5"
                      placeholder="Write notice content here..."
                      value={noticeForm.content}
                      onChange={e => setNoticeForm({ ...noticeForm, content: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    📢 Post Notice
                  </button>
                </form>
              </div>

              <h3 style={{ margin: '30px 0 16px', color: '#1565C0' }}>
                All Notices ({notices.length})
              </h3>
              {notices.map(notice => (
                <div className="notice-full-card" key={notice._id}>
                  <div className="notice-full-header">
                    <h4>{notice.title}</h4>
                    <span className="notice-tag">{notice.category}</span>
                  </div>
                  <p>{notice.content}</p>
                  <small>
                    Posted on {new Date(notice.createdAt).toLocaleDateString()} |
                    For: {notice.targetAudience}
                  </small>
                </div>
              ))}
              {notices.length === 0 && (
                <p className="empty-msg">No notices yet</p>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="profile-card">
              <div className="profile-avatar">👩‍🏫</div>
              <div className="profile-details">
                <h2>{user?.name}</h2>
                <p className="profile-role">Staff Member</p>
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>Email</label>
                    <p>{user?.email}</p>
                  </div>
                  <div className="profile-info-item">
                    <label>Phone</label>
                    <p>{user?.phone || 'Not provided'}</p>
                  </div>
                  <div className="profile-info-item">
                    <label>Role</label>
                    <p>Staff</p>
                  </div>
                  <div className="profile-info-item">
                    <label>Status</label>
                    <p className="status-active">Active</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;