import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import './Dashboard.css';

const AboutPhotoUpload = ({ currentPhoto, onUpload, label, showMessage }) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentPhoto || '');
  const fileInputRef = useRef(null);

  const uploadPhoto = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showMessage('❌ Only image files are allowed!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showMessage('❌ File size must be less than 5MB!');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/about/upload-photo', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setPreview(data.photoUrl);
        onUpload(data.photoUrl);
        showMessage(`✅ ${label} photo uploaded successfully!`);
      } else {
        showMessage('❌ Upload failed. Try again.');
      }
    } catch (err) {
      showMessage('❌ Upload error. Check backend is running.');
    }
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadPhoto(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadPhoto(file);
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current.click()}
        style={{
          border: `2px dashed ${dragging ? '#1565C0' : '#cce0ff'}`,
          borderRadius: '10px',
          padding: '24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? '#e3f2fd' : '#f8faff',
          transition: 'all 0.2s',
          marginBottom: '12px'
        }}>
        {uploading ? (
          <div>
            <p style={{ fontSize: '2rem' }}>⏳</p>
            <p style={{ color: '#1565C0', fontSize: '14px' }}>Uploading...</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📸</p>
            <p style={{ color: '#1565C0', fontWeight: '500', fontSize: '14px' }}>
              Drag & Drop photo here
            </p>
            <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
              or click to browse
            </p>
            <p style={{ color: '#aaa', fontSize: '12px', marginTop: '4px' }}>
              JPG, PNG, GIF up to 5MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {preview && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
            Current Photo:
          </p>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={preview}
              alt={label}
              style={{
                width: '150px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '2px solid #1565C0'
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview('');
                onUpload('');
              }}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#C62828',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [message, setMessage] = useState('');

  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [admissions, setAdmissions] = useState([]);

const [aboutData, setAboutData] = useState({
    history: '',
    vision: '',
    mission: '',
    achievements: '',
    principalName: '',
    principalMessage: '',
    principalPhoto: '',
});
const [aboutLoading, setAboutLoading] = useState(false);
const [aboutMessage, setAboutMessage] = useState('');

  const [courseForm, setCourseForm] = useState({
    name: '', code: '', type: 'BA',
    duration: '3 Years', eligibility: '', description: ''
  });

  const [facultyForm, setFacultyForm] = useState({
    name: '', designation: '', department: '',
    qualification: '', experience: '', email: '', phone: ''
  });

  const [noticeForm, setNoticeForm] = useState({
    title: '', content: '',
    category: 'general', targetAudience: 'all'
  });

  const [eventForm, setEventForm] = useState({
    title: '', description: '',
    date: '', venue: '', category: 'academic'
  });

  const fetchAll = () => {
    API.get('/notices').then(res => setNotices(res.data.notices || []));
    API.get('/courses').then(res => setCourses(res.data.courses || []));
    API.get('/faculty').then(res => setFaculty(res.data.faculty || []));
    API.get('/events').then(res => setEvents(res.data.events || []));
    API.get('/students').then(res => setStudents(res.data.students || [])).catch(() => {});
    API.get('/contact').then(res => setContacts(res.data.contacts || [])).catch(() => {});
    API.get('/admissions').then(res => setAdmissions(res.data.admissions || [])).catch(() => {});
    
  };

  useEffect(() => { fetchAll(); }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/courses', courseForm);
      showMessage('✅ Course added successfully!');
      setCourseForm({ name: '', code: '', type: 'BA', duration: '3 Years', eligibility: '', description: '' });
      API.get('/courses').then(res => setCourses(res.data.courses || []));
    } catch (err) {
      showMessage('❌ Failed: ' + (err.response?.data?.message || 'Error'));
    }
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/faculty', facultyForm);
      showMessage('✅ Faculty added successfully!');
      setFacultyForm({ name: '', designation: '', department: '', qualification: '', experience: '', email: '', phone: '' });
      API.get('/faculty').then(res => setFaculty(res.data.faculty || []));
    } catch (err) {
      showMessage('❌ Failed: ' + (err.response?.data?.message || 'Error'));
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notices', noticeForm);
      showMessage('✅ Notice posted successfully!');
      setNoticeForm({ title: '', content: '', category: 'general', targetAudience: 'all' });
      API.get('/notices').then(res => setNotices(res.data.notices || []));
    } catch (err) {
      showMessage('❌ Failed to post notice.');
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', eventForm);
      showMessage('✅ Event added successfully!');
      setEventForm({ title: '', description: '', date: '', venue: '', category: 'academic' });
      API.get('/events').then(res => setEvents(res.data.events || []));
    } catch (err) {
      showMessage('❌ Failed to add event.');
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Delete this course?')) {
      await API.delete(`/courses/${id}`);
      API.get('/courses').then(res => setCourses(res.data.courses || []));
    }
  };

  const deleteFaculty = async (id) => {
    if (window.confirm('Delete this faculty?')) {
      await API.delete(`/faculty/${id}`);
      API.get('/faculty').then(res => setFaculty(res.data.faculty || []));
    }
  };

  const deleteNotice = async (id) => {
    if (window.confirm('Delete this notice?')) {
      await API.delete(`/notices/${id}`);
      API.get('/notices').then(res => setNotices(res.data.notices || []));
    }
  };

  const updateAdmissionStatus = async (id, status) => {
    await API.put(`/admissions/${id}`, { status });
    API.get('/admissions').then(res => setAdmissions(res.data.admissions || []));
    showMessage(`✅ Application ${status}!`);
  };

  const updateAdmissionFees = async (id, fees) => {
    await API.put(`/admissions/${id}`, { fees });
    showMessage('✅ Fees updated!');
  };

  const tabs = [
    { id: 'home', label: '🏠 Dashboard' },
    { id: 'admissions', label: '📋 Admissions' },
    { id: 'students', label: '👩‍🎓 Students' },
    { id: 'courses', label: '📚 Courses' },
    { id: 'faculty', label: '👩‍🏫 Faculty' },
    { id: 'notices', label: '📢 Notices' },
    { id: 'events', label: '🗓️ Events' },
    { id: 'about', label: '🏛️ About Page' },
    { id: 'contacts', label: '📬 Messages' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">🎓</div>
          <div>
            <p className="sidebar-college">LKCWSC</p>
            <p className="sidebar-role">Admin Portal</p>
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
            <span>👋 {user?.name} (Admin)</span>
          </div>
        </div>

        {message && <div className="dash-message">{message}</div>}

        <div className="dashboard-content">

          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div>
              <div className="dash-cards">
                <div className="dash-card blue">
                  <div className="dash-card-icon">📋</div>
                  <div>
                    <h3>{admissions.length}</h3>
                    <p>Applications</p>
                  </div>
                </div>
                <div className="dash-card green">
                  <div className="dash-card-icon">👩‍🎓</div>
                  <div>
                    <h3>{students.length}</h3>
                    <p>Students</p>
                  </div>
                </div>
                <div className="dash-card orange">
                  <div className="dash-card-icon">👩‍🏫</div>
                  <div>
                    <h3>{faculty.length}</h3>
                    <p>Faculty</p>
                  </div>
                </div>
                <div className="dash-card purple">
                  <div className="dash-card-icon">📚</div>
                  <div>
                    <h3>{courses.length}</h3>
                    <p>Courses</p>
                  </div>
                </div>
                <div className="dash-card red">
                  <div className="dash-card-icon">📬</div>
                  <div>
                    <h3>{contacts.length}</h3>
                    <p>Messages</p>
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

          {/* ADMISSIONS TAB */}
          {activeTab === 'admissions' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#1565C0' }}>
                All Admission Applications ({admissions.length})
              </h3>
              {admissions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>No Applications Yet</h3>
                  <p>Admission applications will appear here.</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>SSC %</th>
                        <th>HSC %</th>
                        <th>Category</th>
                        <th>Fees (₹)</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.map(a => (
                        <tr key={a._id}>
                          <td><strong>{a.applicantName}</strong></td>
                          <td>{a.email}</td>
                          <td>{a.phone}</td>
                          <td>{a.course?.name || 'N/A'}</td>
                          <td>{a.sscPercentage ? `${a.sscPercentage}%` : '-'}</td>
                          <td>{a.hscPercentage ? `${a.hscPercentage}%` : '-'}</td>
                          <td>{a.category?.toUpperCase() || '-'}</td>
                          <td>
                            <input
                              type="number"
                              className="fees-input"
                              defaultValue={a.fees || 0}
                              onBlur={e => updateAdmissionFees(a._id, e.target.value)}
                              placeholder="Set fees"
                            />
                          </td>
                          <td>
                            <span className={`status-badge ${a.status}`}>
                              {a.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <button
                                style={{ padding: '5px 10px', background: '#e8f5e9', color: '#2E7D32', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                                onClick={() => updateAdmissionStatus(a._id, 'approved')}>
                                ✅ Approve
                              </button>
                              <button
                                style={{ padding: '5px 10px', background: '#ffebee', color: '#C62828', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                                onClick={() => updateAdmissionStatus(a._id, 'rejected')}>
                                ❌ Reject
                              </button>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  background: '#e3f2fd',
                                  color: '#1565C0',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                                onClick={() => {
                                  const docs = ['studentPhoto','aadharPhoto','sscMarksheet',
                                    'hscMarksheet','gapCertificate','casteCertificate',
                                    'casteValidityCertificate'];
                                  const available = docs.filter(d => a[d]);
                                  if (available.length === 0) {
                                    alert('No documents uploaded');
                                    return;
                                  }
                                  available.forEach(d => {
                                    window.open(`http://localhost:5000/uploads/${a[d]}`, '_blank');
                                  });
                                }}>
                                📄 Docs
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                  <h3>No Students Yet</h3>
                  <p>Students will appear here after registration.</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Course</th>
                        <th>Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s._id}>
                          <td>{s.user?.name}</td>
                          <td>{s.user?.email}</td>
                          <td>{s.rollNumber}</td>
                          <td>{s.course?.name}</td>
                          <td>Year {s.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === 'courses' && (
            <div>
              <div className="form-card">
                <h3>Add New Course</h3>
                <form onSubmit={handleCourseSubmit}>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Course Name *</label>
                      <input type="text" placeholder="e.g. Bachelor of Arts"
                        value={courseForm.name}
                        onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
                        required />
                    </div>
                    <div className="form-group">
                      <label>Course Code *</label>
                      <input type="text" placeholder="e.g. BA001"
                        value={courseForm.code}
                        onChange={e => setCourseForm({ ...courseForm, code: e.target.value })}
                        required />
                    </div>
                  </div>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Type *</label>
                      <select value={courseForm.type}
                        onChange={e => setCourseForm({ ...courseForm, type: e.target.value })}>
                        <option value="BA">BA</option>
                        <option value="BSc">BSc</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input type="text" placeholder="e.g. 3 Years"
                        value={courseForm.duration}
                        onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Eligibility</label>
                    <input type="text" placeholder="e.g. 10+2 pass from any recognized board"
                      value={courseForm.eligibility}
                      onChange={e => setCourseForm({ ...courseForm, eligibility: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" placeholder="Course description"
                      value={courseForm.description}
                      onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Course
                  </button>
                </form>
              </div>

              <h3 style={{ margin: '30px 0 16px', color: '#1565C0' }}>
                All Courses ({courses.length})
              </h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Eligibility</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(c => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>{c.code}</td>
                        <td>{c.type}</td>
                        <td>{c.duration}</td>
                        <td>{c.eligibility}</td>
                        <td>
                          <button className="btn-delete"
                            onClick={() => deleteCourse(c._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FACULTY TAB */}
          {activeTab === 'faculty' && (
            <div>
              <div className="form-card">
                <h3>Add New Faculty</h3>
                <form onSubmit={handleFacultySubmit}>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" placeholder="Faculty name"
                        value={facultyForm.name}
                        onChange={e => setFacultyForm({ ...facultyForm, name: e.target.value })}
                        required />
                    </div>
                    <div className="form-group">
                      <label>Designation *</label>
                      <input type="text" placeholder="e.g. Professor"
                        value={facultyForm.designation}
                        onChange={e => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                        required />
                    </div>
                  </div>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Department *</label>
                      <input type="text" placeholder="e.g. Science"
                        value={facultyForm.department}
                        onChange={e => setFacultyForm({ ...facultyForm, department: e.target.value })}
                        required />
                    </div>
                    <div className="form-group">
                      <label>Qualification</label>
                      <input type="text" placeholder="e.g. M.Sc, Ph.D"
                        value={facultyForm.qualification}
                        onChange={e => setFacultyForm({ ...facultyForm, qualification: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Experience</label>
                      <input type="text" placeholder="e.g. 10 years"
                        value={facultyForm.experience}
                        onChange={e => setFacultyForm({ ...facultyForm, experience: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="Faculty email"
                        value={facultyForm.email}
                        onChange={e => setFacultyForm({ ...facultyForm, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" placeholder="Phone number"
                      value={facultyForm.phone}
                      onChange={e => setFacultyForm({ ...facultyForm, phone: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Faculty
                  </button>
                </form>
              </div>

              <h3 style={{ margin: '30px 0 16px', color: '#1565C0' }}>
                All Faculty ({faculty.length})
              </h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Qualification</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map(f => (
                      <tr key={f._id}>
                        <td>{f.name}</td>
                        <td>{f.designation}</td>
                        <td>{f.department}</td>
                        <td>{f.qualification}</td>
                        <td>{f.email}</td>
                        <td>
                          <button className="btn-delete"
                            onClick={() => deleteFaculty(f._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    <label>Title *</label>
                    <input type="text" placeholder="Notice title"
                      value={noticeForm.title}
                      onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      required />
                  </div>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Category</label>
                      <select value={noticeForm.category}
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
                      <select value={noticeForm.targetAudience}
                        onChange={e => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}>
                        <option value="all">All</option>
                        <option value="student">Students</option>
                        <option value="staff">Staff</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Content *</label>
                    <textarea rows="4" placeholder="Notice content..."
                      value={noticeForm.content}
                      onChange={e => setNoticeForm({ ...noticeForm, content: e.target.value })}
                      required />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Post Notice
                  </button>
                </form>
              </div>

              <h3 style={{ margin: '30px 0 16px', color: '#1565C0' }}>
                All Notices ({notices.length})
              </h3>
              {notices.map(n => (
                <div className="notice-full-card" key={n._id}>
                  <div className="notice-full-header">
                    <h4>{n.title}</h4>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="notice-tag">{n.category}</span>
                      <button className="btn-delete"
                        onClick={() => deleteNotice(n._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <p>{n.content}</p>
                  <small>{new Date(n.createdAt).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div>
              <div className="form-card">
                <h3>Add New Event</h3>
                <form onSubmit={handleEventSubmit}>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Event Title *</label>
                      <input type="text" placeholder="Event name"
                        value={eventForm.title}
                        onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                        required />
                    </div>
                    <div className="form-group">
                      <label>Date *</label>
                      <input type="date" value={eventForm.date}
                        onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                        required />
                    </div>
                  </div>
                  <div className="form-row-dash">
                    <div className="form-group">
                      <label>Venue</label>
                      <input type="text" placeholder="Event venue"
                        value={eventForm.venue}
                        onChange={e => setEventForm({ ...eventForm, venue: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select value={eventForm.category}
                        onChange={e => setEventForm({ ...eventForm, category: e.target.value })}>
                        <option value="academic">Academic</option>
                        <option value="cultural">Cultural</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" placeholder="Event description"
                      value={eventForm.description}
                      onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Event
                  </button>
                </form>
              </div>

              <h3 style={{ margin: '30px 0 16px', color: '#1565C0' }}>
                All Events ({events.length})
              </h3>
              <div className="events-grid">
                {events.map(ev => (
                  <div className="event-card" key={ev._id}>
                    <span className="notice-tag">{ev.category}</span>
                    <h4>{ev.title}</h4>
                    <p>📅 {new Date(ev.date).toLocaleDateString()}</p>
                    <p>📍 {ev.venue}</p>
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                      {ev.description}
                    </p>
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="empty-msg">No events yet</p>
                )}
              </div>
            </div>
          )}
        
        {/* ABOUT TAB */}
{activeTab === 'about' && (
  <div>
    <h3 style={{ marginBottom: '20px', color: '#1565C0' }}>
      Edit About Page Content
    </h3>

    {aboutMessage && (
      <div className="dash-message">{aboutMessage}</div>
    )}

    {/* College Information */}
    <div className="form-card">
      <h3>🏛️ College Information</h3>

      {/* History */}
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '24px' }}>
        <h4 style={{ color: '#1565C0', marginBottom: '12px' }}>📜 History</h4>
        <div className="form-group">
          <label>History Text</label>
          <textarea
            rows="4"
            value={aboutData.history || ''}
            onChange={e => setAboutData({ ...aboutData, history: e.target.value })}
            placeholder="College history..."
          />
        </div>
        <div className="form-group">
          <label>History Photo</label>
          <AboutPhotoUpload
            currentPhoto={aboutData.historyPhoto}
            onUpload={(url) => setAboutData({ ...aboutData, historyPhoto: url })}
            label="history"
            showMessage={showMessage}
          />
        </div>
      </div>

      {/* Vision */}
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '24px' }}>
        <h4 style={{ color: '#1565C0', marginBottom: '12px' }}>🎯 Vision</h4>
        <div className="form-group">
          <label>Vision Text</label>
          <textarea
            rows="4"
            value={aboutData.vision || ''}
            onChange={e => setAboutData({ ...aboutData, vision: e.target.value })}
            placeholder="College vision..."
          />
        </div>
        <div className="form-group">
          <label>Vision Photo</label>
          <AboutPhotoUpload
            currentPhoto={aboutData.visionPhoto}
            onUpload={(url) => setAboutData({ ...aboutData, visionPhoto: url })}
            label="vision"
            showMessage={showMessage}
          />
        </div>
      </div>

      {/* Mission */}
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '24px' }}>
        <h4 style={{ color: '#1565C0', marginBottom: '12px' }}>🚀 Mission</h4>
        <div className="form-group">
          <label>Mission Text</label>
          <textarea
            rows="4"
            value={aboutData.mission || ''}
            onChange={e => setAboutData({ ...aboutData, mission: e.target.value })}
            placeholder="College mission..."
          />
        </div>
        <div className="form-group">
          <label>Mission Photo</label>
          <AboutPhotoUpload
            currentPhoto={aboutData.missionPhoto}
            onUpload={(url) => setAboutData({ ...aboutData, missionPhoto: url })}
            label="mission"
            showMessage={showMessage}
          />
        </div>
      </div>

      {/* Achievements */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ color: '#1565C0', marginBottom: '12px' }}>🏆 Achievements</h4>
        <div className="form-group">
          <label>Achievements Text</label>
          <textarea
            rows="4"
            value={aboutData.achievements || ''}
            onChange={e => setAboutData({ ...aboutData, achievements: e.target.value })}
            placeholder="College achievements..."
          />
        </div>
        <div className="form-group">
          <label>Achievements Photo</label>
          <AboutPhotoUpload
            currentPhoto={aboutData.achievementsPhoto}
            onUpload={(url) => setAboutData({ ...aboutData, achievementsPhoto: url })}
            label="achievements"
            showMessage={showMessage}
          />
        </div>
      </div>

      <button
        className="btn btn-primary"
        disabled={aboutLoading}
        onClick={async () => {
          setAboutLoading(true);
          try {
            await API.put('/about', {
              history: aboutData.history,
              historyPhoto: aboutData.historyPhoto,
              vision: aboutData.vision,
              visionPhoto: aboutData.visionPhoto,
              mission: aboutData.mission,
              missionPhoto: aboutData.missionPhoto,
              achievements: aboutData.achievements,
              achievementsPhoto: aboutData.achievementsPhoto,
            });
            setAboutMessage('✅ College information saved successfully!');
            setTimeout(() => setAboutMessage(''), 3000);
          } catch (err) {
            setAboutMessage('❌ Failed to save. Try again.');
          }
          setAboutLoading(false);
        }}>
        {aboutLoading ? '⏳ Saving...' : '💾 Save College Information'}
      </button>
    </div>

    {/* Principal Information */}
    <div className="form-card" style={{ marginTop: '24px' }}>
      <h3>👩‍💼 Principal Information</h3>

      <div className="form-group">
        <label>Principal Name</label>
        <input
          type="text"
          value={aboutData.principalName || ''}
          onChange={e => setAboutData({ ...aboutData, principalName: e.target.value })}
          placeholder="Principal's full name"
        />
      </div>

      <div className="form-group">
        <label>Principal Message</label>
        <textarea
          rows="5"
          value={aboutData.principalMessage || ''}
          onChange={e => setAboutData({ ...aboutData, principalMessage: e.target.value })}
          placeholder="Message from the principal..."
        />
      </div>

      <div className="form-group">
        <label>Principal Photo</label>
        <AboutPhotoUpload
          currentPhoto={aboutData.principalPhoto}
          onUpload={(url) => setAboutData({ ...aboutData, principalPhoto: url })}
          label="principal"
          showMessage={showMessage}
        />
      </div>

      <button
        className="btn btn-primary"
        disabled={aboutLoading}
        onClick={async () => {
          setAboutLoading(true);
          try {
            await API.put('/about', {
              principalName: aboutData.principalName,
              principalMessage: aboutData.principalMessage,
              principalPhoto: aboutData.principalPhoto,
            });
            setAboutMessage('✅ Principal information saved!');
            setTimeout(() => setAboutMessage(''), 3000);
          } catch (err) {
            setAboutMessage('❌ Failed to save.');
          }
          setAboutLoading(false);
        }}>
        {aboutLoading ? '⏳ Saving...' : '💾 Save Principal Information'}
      </button>
    </div>

  </div>
)}



          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#1565C0' }}>
                Contact Messages ({contacts.length})
              </h3>
              {contacts.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📬</div>
                  <h3>No Messages Yet</h3>
                  <p>Contact form submissions will appear here.</p>
                </div>
              ) : (
                contacts.map(c => (
                  <div className="notice-full-card" key={c._id}>
                    <div className="notice-full-header">
                      <h4>{c.name} — {c.subject}</h4>
                      <span className={c.isRead ? 'notice-tag' : 'notice-tag unread'}>
                        {c.isRead ? 'Read' : 'New'}
                      </span>
                    </div>
                    <p>{c.message}</p>
                    <small>
                      📧 {c.email} | 📞 {c.phone} | {new Date(c.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;