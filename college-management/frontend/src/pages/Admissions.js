import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Admissions.css';

const Admissions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('process');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sscError, setSscError] = useState('');
  const [hscError, setHscError] = useState('');

  const [formData, setFormData] = useState({
    applicantName: '', email: '', phone: '', address: '',
    dateOfBirth: '', gender: '', category: '',
    aadharNumber: '', aadharName: '',
    sscSchoolName: '', sscBoard: '', sscYOP: '',
    sscRollNumber: '', sscObtainedMarks: '', sscTotalMarks: '',
    sscPercentage: '', sscGrade: '',
    hscCollegeName: '', hscBoard: '', hscStream: '', hscYOP: '',
    hscRollNumber: '', hscMedium: '', hscObtainedMarks: '',
    hscTotalMarks: '', hscPercentage: '', hscGrade: '',
    hasGap: false, gapYear: '', gapReason: '',
    course: '', preferredSubject: '',
    fatherName: '', motherName: '', guardianPhone: '',
    familyIncome: '', referralSource: '', message: '',
    declaration: false, hasCasteValidity: false,
    casteCertificateNo: '', casteCertificateAuthority: '',
    casteValidity: '', casteValidityDate: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    aadharPhoto: null,
    sscMarksheet: null,
    hscMarksheet: null,
    gapCertificate: null,
    casteCertificate: null,
    casteValidityCertificate: null,
    studentPhoto: null,
  });

  const [uploadPreviews, setUploadPreviews] = useState({
    aadharPhoto: '',
    sscMarksheet: '',
    hscMarksheet: '',
    gapCertificate: '',
    casteCertificate: '',
    casteValidityCertificate: '',
    studentPhoto: '',
  });

  useEffect(() => {
    API.get('/courses').then(res => {
      const list = res.data.courses || [];
      setCourses(list);
      const params = new URLSearchParams(window.location.search);
      const courseType = params.get('course');
      if (courseType) {
        const matched = list.find(c => c.type === courseType);
        if (matched) {
          setFormData(prev => ({ ...prev, course: matched._id }));
          if (user) setActiveTab('apply');
          else setActiveTab('process');
        }
      }
    });

    if (user) {
      setFormData(prev => ({
        ...prev,
        applicantName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If user changes SSC year, reset HSC year (because HSC must be after SSC)
    if (name === 'sscYOP') {
      setFormData({ ...formData, [name]: value, hscYOP: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSscMarksChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    if (updated.sscObtainedMarks && updated.sscTotalMarks) {
      if (Number(updated.sscObtainedMarks) > Number(updated.sscTotalMarks)) {
        setSscError('❌ Obtained marks cannot be more than total marks!');
      } else {
        setSscError('');
        const pct = ((updated.sscObtainedMarks / updated.sscTotalMarks) * 100).toFixed(2);
        updated.sscPercentage = pct;
      }
    }
    setFormData(updated);
  };

  const handleHscMarksChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    if (updated.hscObtainedMarks && updated.hscTotalMarks) {
      if (Number(updated.hscObtainedMarks) > Number(updated.hscTotalMarks)) {
        setHscError('❌ Obtained marks cannot be more than total marks!');
      } else {
        setHscError('');
        const pct = ((updated.hscObtainedMarks / updated.hscTotalMarks) * 100).toFixed(2);
        updated.hscPercentage = pct;
      }
    }
    setFormData(updated);
  };

  const handleFileChange = (fieldName, file) => {
    if (!file) return;
    setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadPreviews(prev => ({ ...prev, [fieldName]: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please login before submitting the application.');
      setActiveTab('process');
      return;
    }

    if (!formData.declaration) {
      setError('Please accept the declaration to submit.');
      return;
    }

    if (sscError || hscError) {
      setError('Please fix marks validation errors before submitting.');
      return;
    }

    if (formData.phone.length !== 10) {
      setError('Please enter a valid 10 digit mobile number.');
      return;
    }

    // Validate required documents
    const requiredDocs = {
      studentPhoto: 'Student Passport Photo',
      aadharPhoto: 'Aadhar Card Photo',
      sscMarksheet: 'SSC (10th) Marksheet',
      hscMarksheet: 'HSC (12th) Marksheet'
    };
    for (const [key, label] of Object.entries(requiredDocs)) {
      if (!uploadedFiles[key]) {
        setError(`Please upload ${label} before submitting.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    // If gap year is selected, gap certificate is required
    if (formData.hasGap && !uploadedFiles.gapCertificate) {
      setError('Please upload Gap Certificate (you selected gap year).');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If caste is not General, caste certificate is required
    if (formData.category && formData.category !== 'General' && !uploadedFiles.casteCertificate) {
      setError('Please upload Caste Certificate.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });

      Object.keys(uploadedFiles).forEach((key) => {
        if (uploadedFiles[key]) {
          submitData.append(key, uploadedFiles[key]);
        }
      });

      const response = await API.post('/admissions', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setSuccess('Application submitted successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/student/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const yearOptions = Array.from({ length: 10 }, (_, i) => 2024 - i);

  const FileUploadBox = ({ fieldName, label, accept, required }) => {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileChange(fieldName, file);
    };

    return (
      <div className="form-group">
        <label>{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current.click()}
          style={{
            border: `2px dashed ${dragging ? '#1565C0' : '#cce0ff'}`,
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging ? '#e3f2fd' : '#f8faff',
            transition: 'all 0.2s'
          }}>
          {uploadPreviews[fieldName] ? (
            <div>
              {uploadedFiles[fieldName]?.type?.startsWith('image/') ? (
                <img
                  src={uploadPreviews[fieldName]}
                  alt={label}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '120px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div>
                  <p style={{ fontSize: '2rem' }}>📄</p>
                  <p style={{ fontSize: '13px', color: '#1565C0' }}>
                    {uploadedFiles[fieldName]?.name}
                  </p>
                </div>
              )}
              <p style={{ fontSize: '12px', color: '#2E7D32', marginTop: '8px' }}>
                ✅ File selected — click to change
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '2rem', marginBottom: '6px' }}>📁</p>
              <p style={{ color: '#1565C0', fontWeight: '500', fontSize: '14px' }}>
                Drag & Drop file here
              </p>
              <p style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
                or click to browse
              </p>
              <p style={{ color: '#aaa', fontSize: '11px', marginTop: '4px' }}>
                JPG, PNG, PDF accepted
              </p>
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept || 'image/*,.pdf'}
          onChange={(e) => handleFileChange(fieldName, e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      <div className="page-header">
        <h1>Admissions 2024-25</h1>
        <p>Join Late Kalpana Chawla Mahila Senior Science & Arts College, Gangakhed</p>
      </div>

      <section className="admissions-tabs container">

        <div className="tab-buttons">
          <button className={activeTab === 'process' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('process')}>
            📋 Admission Process
          </button>
          <button className={activeTab === 'dates' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('dates')}>
            📅 Important Dates
          </button>
          <button className={activeTab === 'documents' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('documents')}>
            📄 Documents Required
          </button>
          <button className={activeTab === 'apply' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab('apply')}>
            ✍️ Apply Online
          </button>
        </div>

        {/* PROCESS TAB */}
        {activeTab === 'process' && (
          <div className="tab-content">
            <h2>Admission Process</h2>
            <div className="process-steps">
              {[
                { step: '01', title: 'Register / Login', desc: 'First create your account on our website. Click Register and fill your basic details. If you already have an account, login directly.' },
                { step: '02', title: 'Fill Application Form', desc: 'Complete the online application form with personal details, academic information and Aadhar details.' },
                { step: '03', title: 'Upload Documents', desc: 'Upload required documents: Aadhar Card photo, SSC Marksheet, HSC Marksheet, Gap Certificate (if applicable), Caste Certificate (if applicable).' },
                { step: '04', title: 'Submit & Pay Fees', desc: 'Submit your application. After approval by admin, pay the admission fees at the college office.' },
                { step: '05', title: 'Check Status', desc: 'Login to your student dashboard to check your application status — Pending, Approved or Rejected.' },
              ].map((item, i) => (
                <div className="process-step" key={i}>
                  <div className="step-number">{item.step}</div>
                  <div className="step-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {!user && (
              <div style={{
                marginTop: '30px',
                padding: '24px',
                background: '#e3f2fd',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '1.1rem', color: '#1565C0', marginBottom: '16px', fontWeight: '500' }}>
                  🔐 You need to login or register before applying
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/register" className="btn btn-primary">
                    📝 Register Now
                  </a>
                  <a href="/login" className="btn btn-secondary">
                    🔑 Already have account? Login
                  </a>
                </div>
              </div>
            )}

            {user && (
              <div style={{
                marginTop: '30px',
                padding: '24px',
                background: '#e8f5e9',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '1.1rem', color: '#2E7D32', marginBottom: '16px', fontWeight: '500' }}>
                  ✅ You are logged in as {user.name}! Ready to apply.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('apply')}>
                  ✍️ Start Application
                </button>
              </div>
            )}
          </div>
        )}

        {/* DATES TAB */}
        {activeTab === 'dates' && (
          <div className="tab-content">
            <h2>Important Dates 2024-25</h2>
            <div className="dates-table">
              {[
                { event: 'Application Form Available', date: 'June 1, 2024' },
                { event: 'Last Date to Apply', date: 'July 15, 2024' },
                { event: 'First Merit List', date: 'July 20, 2024' },
                { event: 'Admission Confirmation', date: 'July 20-25, 2024' },
                { event: 'Second Merit List', date: 'July 28, 2024' },
                { event: 'Commencement of Classes', date: 'August 1, 2024' },
                { event: 'Last Date for Admission', date: 'August 15, 2024' },
              ].map((item, i) => (
                <div className="date-row" key={i}>
                  <span className="date-event">{item.event}</span>
                  <span className="date-value">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="tab-content">
            <h2>Documents Required</h2>
            <div className="documents-grid">
{activeTab === 'documents' && (
  <div className="tab-content">
    <h2>Documents Required</h2>

    <div className="documents-grid">
      {[
        {
          icon: '🪪',
          title: 'Aadhar Card',
          desc: 'Clear photo or PDF of Aadhar card'
        },
        {
          icon: '📄',
          title: '10th Marksheet',
          desc: 'SSC marksheet copy'
        },
        {
          icon: '📄',
          title: '12th Marksheet',
          desc: 'HSC marksheet copy'
        },
        {
          icon: '🏦',
          title: 'Bank Passbook',
          desc: 'Student bank account passbook'
        },
        {
          icon: '🏠',
          title: 'Domicile Certificate',
          desc: 'Maharashtra domicile certificate'
        },
        {
          icon: '🍚',
          title: 'Ration Card',
          desc: 'Family ration card copy'
        },
        {
          icon: '💍',
          title: 'Marriage Certificate',
          desc: 'Required for married students'
        },
        {
          icon: '💰',
          title: 'Income Certificate',
          desc: 'Family income certificate'
        },
        {
          icon: '📜',
          title: 'Leaving Certificate',
          desc: 'School/college leaving certificate'
        },
        {
          icon: '📸',
          title: 'Student Photo',
          desc: 'Recent passport size photo'
        },
        {
          icon: '📅',
          title: 'Gap Certificate',
          desc: 'Only for gap year students'
        },
        {
          icon: '📋',
          title: 'Caste Certificate',
          desc: 'Required for reserved category'
        },
      ].map((doc, i) => (
        <div className="document-card" key={i}>
          <span className="doc-icon">{doc.icon}</span>

          <div>
            <h4>{doc.title}</h4>
            <p>{doc.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        {/* APPLY TAB */}
        {activeTab === 'apply' && (
          <div className="tab-content">
            <h2>Online Application Form</h2>

            {!user && (
              <div style={{
                padding: '30px',
                background: '#ffebee',
                borderRadius: '12px',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔐</p>
                <h3 style={{ color: '#C62828', marginBottom: '12px' }}>
                  Login Required
                </h3>
                <p style={{ color: '#555', marginBottom: '20px' }}>
                  You must be logged in to submit the application form.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/register" className="btn btn-primary">
                    📝 Register Now
                  </a>
                  <a href="/login" className="btn btn-secondary">
                    🔑 Login
                  </a>
                </div>
              </div>
            )}

            {user && (
              <>
                {success && <div className="form-success">{success}</div>}
                {error && <div className="form-error">{error}</div>}

                <form onSubmit={handleSubmit} className="apply-form-card">

                  {/* Personal Information */}
                  <div className="form-section">
                    <h3 className="form-section-title">👤 Personal Information</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="applicantName"
                          placeholder="As per Aadhar card"
                          value={formData.applicantName}
                          onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth *</label>
                        <input type="date" name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Gender *</label>
                        <select name="gender" value={formData.gender}
                          onChange={handleChange} required>
                          <option value="">Select Gender</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Category *</label>
                        <select name="category" value={formData.category}
                          onChange={handleChange} required>
                          <option value="">Select Category</option>
                          <option value="general">General</option>
                          <option value="sc">SC</option>
                          <option value="st">ST</option>
                          <option value="obc">OBC</option>
                          <option value="nt">NT</option>
                          <option value="vjnt">VJNT</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Mobile Number *</label>
                        <input
                          type="tel"
                          placeholder="10 digit mobile number"
                          value={formData.phone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 10) {
                              setFormData({ ...formData, phone: val });
                            }
                          }}
                          required
                        />
                        {formData.phone && formData.phone.length < 10 && (
                          <small style={{ color: 'red', fontSize: '12px' }}>
                            Enter 10 digit number
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Full Address *</label>
                      <textarea name="address" rows="3"
                        placeholder="House No, Street, Village, Taluka, District, State, PIN"
                        value={formData.address}
                        onChange={handleChange} required />
                    </div>

                    {/* Student Photo */}
                    <FileUploadBox
                      fieldName="studentPhoto"
                      label="📸 Student Passport Photo"
                      accept="image/*"
                      required={true}
                    />
                  </div>

                  {/* Aadhar */}
                  <div className="form-section">
                    <h3 className="form-section-title">🪪 Aadhar Verification</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Aadhar Card Number *</label>
                        <input type="text" name="aadharNumber"
                          placeholder="12 digit Aadhar number"
                          value={formData.aadharNumber}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 12) {
                              setFormData({ ...formData, aadharNumber: val });
                            }
                          }}
                          maxLength="12" required />
                        <small className="field-hint">Enter 12 digits without spaces</small>
                      </div>
                      <div className="form-group">
                        <label>Name on Aadhar *</label>
                        <input type="text" name="aadharName"
                          placeholder="Exactly as on Aadhar card"
                          value={formData.aadharName}
                          onChange={handleChange} required />
                      </div>
                    </div>

                    <FileUploadBox
                      fieldName="aadharPhoto"
                      label="📷 Upload Aadhar Card Photo"
                      accept="image/*,.pdf"
                      required={true}
                    />

                    <div className="aadhar-note">
                      <span>ℹ️</span>
                      <p>Your Aadhar details are kept confidential as per government guidelines.</p>
                    </div>
                  </div>

                  {/* SSC */}
                  <div className="form-section">
                    <h3 className="form-section-title">📗 SSC — 10th Standard Details</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>School Name *</label>
                        <input type="text" name="sscSchoolName"
                          placeholder="Full name of your school"
                          value={formData.sscSchoolName}
                          onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Board *</label>
                        <select name="sscBoard" value={formData.sscBoard}
                          onChange={handleChange} required>
                          <option value="">Select Board</option>
                          <option value="Maharashtra State Board">Maharashtra State Board</option>
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Year of Passing *</label>
                        <select name="sscYOP" value={formData.sscYOP}
                          onChange={handleChange} required>
                          <option value="">Select Year</option>
                          {yearOptions.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Seat / Roll Number</label>
                        <input type="text" name="sscRollNumber"
                          placeholder="Exam seat number"
                          value={formData.sscRollNumber}
                          onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Marks Obtained *</label>
                        <input type="number"
                          placeholder="e.g. 420"
                          value={formData.sscObtainedMarks}
                          onChange={e => handleSscMarksChange('sscObtainedMarks', e.target.value)}
                          min="0" required />
                      </div>
                      <div className="form-group">
                        <label>Total Marks *</label>
                        <input type="number"
                          placeholder="e.g. 600"
                          value={formData.sscTotalMarks}
                          onChange={e => handleSscMarksChange('sscTotalMarks', e.target.value)}
                          min="0" required />
                      </div>
                    </div>
                    {sscError && <div className="marks-error">{sscError}</div>}
                    <div className="form-row">
                      <div className="form-group">
                        <label>Percentage (Auto Calculated)</label>
                        <input
                          type="number"
                          value={formData.sscPercentage}
                          onChange={e => setFormData({ ...formData, sscPercentage: e.target.value })}
                          placeholder="Auto calculated"
                          style={{ background: formData.sscPercentage ? '#e8f5e9' : 'white' }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Grade / Class</label>
                        <select name="sscGrade" value={formData.sscGrade}
                          onChange={handleChange}>
                          <option value="">Select Grade</option>
                          <option value="Distinction">Distinction (75%+)</option>
                          <option value="First Class">First Class (60-74%)</option>
                          <option value="Second Class">Second Class (45-59%)</option>
                          <option value="Pass Class">Pass Class (35-44%)</option>
                        </select>
                      </div>
                    </div>
                    {formData.sscObtainedMarks && formData.sscTotalMarks && !sscError && (
                      <div className="auto-calc">
                        ✅ Calculated: <strong>
                          {((formData.sscObtainedMarks / formData.sscTotalMarks) * 100).toFixed(2)}%
                        </strong>
                      </div>
                    )}

                    <FileUploadBox
                      fieldName="sscMarksheet"
                      label="📄 Upload SSC Marksheet"
                      accept="image/*,.pdf"
                      required={true}
                    />
                  </div>

                  {/* HSC */}
                  <div className="form-section">
                    <h3 className="form-section-title">📘 HSC — 12th Standard Details</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>College Name *</label>
                        <input type="text" name="hscCollegeName"
                          placeholder="Full name of your junior college"
                          value={formData.hscCollegeName}
                          onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Board *</label>
                        <select name="hscBoard" value={formData.hscBoard}
                          onChange={handleChange} required>
                          <option value="">Select Board</option>
                          <option value="Maharashtra State Board">Maharashtra State Board</option>
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Stream *</label>
                        <select name="hscStream" value={formData.hscStream}
                          onChange={handleChange} required>
                          <option value="">Select Stream</option>
                          <option value="Arts">Arts</option>
                          <option value="Science">Science</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Vocational">Vocational</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Year of Passing *</label>
                        <select name="hscYOP" value={formData.hscYOP}
                          onChange={handleChange} required disabled={!formData.sscYOP}>
                          <option value="">
                            {formData.sscYOP ? 'Select Year' : 'Please select SSC year first'}
                          </option>
                          {yearOptions
                            .filter(year => !formData.sscYOP || year > parseInt(formData.sscYOP))
                            .map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {formData.sscYOP && (
                          <small style={{color:'#666', fontSize:'12px', marginTop:'4px', display:'block'}}>
                            💡 HSC year must be after SSC year ({formData.sscYOP})
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Seat / Roll Number</label>
                        <input type="text" name="hscRollNumber"
                          placeholder="Exam seat number"
                          value={formData.hscRollNumber}
                          onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Medium of Instruction</label>
                        <select name="hscMedium" value={formData.hscMedium}
                          onChange={handleChange}>
                          <option value="">Select Medium</option>
                          <option value="Marathi">Marathi</option>
                          <option value="Hindi">Hindi</option>
                          <option value="English">English</option>
                          <option value="Urdu">Urdu</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Marks Obtained *</label>
                        <input type="number"
                          placeholder="e.g. 350"
                          value={formData.hscObtainedMarks}
                          onChange={e => handleHscMarksChange('hscObtainedMarks', e.target.value)}
                          min="0" required />
                      </div>
                      <div className="form-group">
                        <label>Total Marks *</label>
                        <input type="number"
                          placeholder="e.g. 500"
                          value={formData.hscTotalMarks}
                          onChange={e => handleHscMarksChange('hscTotalMarks', e.target.value)}
                          min="0" required />
                      </div>
                    </div>
                    {hscError && <div className="marks-error">{hscError}</div>}
                    <div className="form-row">
                      <div className="form-group">
                        <label>Percentage (Auto Calculated)</label>
                        <input
                          type="number"
                          value={formData.hscPercentage}
                          onChange={e => setFormData({ ...formData, hscPercentage: e.target.value })}
                          placeholder="Auto calculated"
                          style={{ background: formData.hscPercentage ? '#e8f5e9' : 'white' }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Grade / Class</label>
                        <select name="hscGrade" value={formData.hscGrade}
                          onChange={handleChange}>
                          <option value="">Select Grade</option>
                          <option value="Distinction">Distinction (75%+)</option>
                          <option value="First Class">First Class (60-74%)</option>
                          <option value="Second Class">Second Class (45-59%)</option>
                          <option value="Pass Class">Pass Class (35-44%)</option>
                        </select>
                      </div>
                    </div>
                    {formData.hscObtainedMarks && formData.hscTotalMarks && !hscError && (
                      <div className="auto-calc">
                        ✅ Calculated: <strong>
                          {((formData.hscObtainedMarks / formData.hscTotalMarks) * 100).toFixed(2)}%
                        </strong>
                      </div>
                    )}

                    <FileUploadBox
                      fieldName="hscMarksheet"
                      label="📄 Upload HSC Marksheet"
                      accept="image/*,.pdf"
                      required={true}
                    />
                  </div>

                  {/* Gap Year */}
                  <div className="form-section">
                    <h3 className="form-section-title">📅 Gap Year Information</h3>
                    <div className="form-group">
                      <label className="declaration-label">
                        <input type="checkbox"
                          checked={formData.hasGap}
                          onChange={e => setFormData({ ...formData, hasGap: e.target.checked })}
                        />
                        <span>I have a gap year between my education</span>
                      </label>
                    </div>
                    {formData.hasGap && (
                      <div>
                        <div className="form-row" style={{ marginTop: '16px' }}>
                          <div className="form-group">
                            <label>Gap Year *</label>
                            <select name="gapYear" value={formData.gapYear}
                              onChange={handleChange} required>
                              <option value="">Select Year</option>
                              {yearOptions.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Reason for Gap *</label>
                            <select name="gapReason" value={formData.gapReason}
                              onChange={handleChange} required>
                              <option value="">Select Reason</option>
                              <option value="health">Health Issues</option>
                              <option value="family">Family Reasons</option>
                              <option value="financial">Financial Reasons</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <FileUploadBox
                          fieldName="gapCertificate"
                          label="📅 Upload Gap Certificate"
                          accept="image/*,.pdf"
                          required={true}
                        />

                        <div className="gap-note">
                          <span>⚠️</span>
                          <p>Gap certificate is mandatory for students with gap year.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caste Certificate */}
                  {['sc', 'st', 'obc', 'nt', 'vjnt'].includes(formData.category) && (
                    <div className="form-section">
                      <h3 className="form-section-title">📋 Caste Certificate Details</h3>
                      <div className="caste-note">
                        <span>ℹ️</span>
                        <p>You belong to reserved category. Please provide caste certificate details.</p>
                      </div>
                      <div className="form-row" style={{ marginTop: '16px' }}>
                        <div className="form-group">
                          <label>Caste Certificate Number</label>
                          <input type="text" name="casteCertificateNo"
                            placeholder="Certificate number"
                            value={formData.casteCertificateNo}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label>Issuing Authority</label>
                          <input type="text" name="casteCertificateAuthority"
                            placeholder="e.g. Tehsildar, Gangakhed"
                            value={formData.casteCertificateAuthority}
                            onChange={handleChange} />
                        </div>
                      </div>

                      <FileUploadBox
                        fieldName="casteCertificate"
                        label="📋 Upload Caste Certificate"
                        accept="image/*,.pdf"
                        required={true}
                      />

                      <div className="form-group" style={{ marginTop: '16px' }}>
                        <label className="declaration-label">
                          <input type="checkbox"
                            checked={formData.hasCasteValidity}
                            onChange={e => setFormData({ ...formData, hasCasteValidity: e.target.checked })}
                          />
                          <span>I have a Caste Validity Certificate</span>
                        </label>
                      </div>

                      {formData.hasCasteValidity && (
                        <div>
                          <div className="form-row">
                            <div className="form-group">
                              <label>Validity Certificate Number</label>
                              <input type="text" name="casteValidity"
                                placeholder="Validity certificate number"
                                value={formData.casteValidity}
                                onChange={handleChange} />
                            </div>
                            <div className="form-group">
                              <label>Valid Until</label>
                              <input type="date" name="casteValidityDate"
                                value={formData.casteValidityDate}
                                onChange={handleChange} />
                            </div>
                          </div>

                          <FileUploadBox
                            fieldName="casteValidityCertificate"
                            label="✅ Upload Caste Validity Certificate"
                            accept="image/*,.pdf"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Course Selection */}
                  <div className="form-section">
                    <h3 className="form-section-title">📚 Course Selection</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Course Applying For *</label>
                        <select name="course" value={formData.course}
                          onChange={handleChange} required>
                          <option value="">Select Course</option>
                          {courses.length > 0 ? courses.map(c => (
                            <option key={c._id} value={c._id}>{c.name} ({c.type})</option>
                          )) : (
                            <>
                              <option value="ba">Bachelor of Arts (BA)</option>
                              <option value="bsc">Bachelor of Science (BSc)</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Preferred Subject</label>
                        <input type="text" name="preferredSubject"
                          placeholder="e.g. History, Physics"
                          value={formData.preferredSubject}
                          onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* Guardian Details */}
                  <div className="form-section">
                    <h3 className="form-section-title">👨‍👩‍👧 Guardian / Parent Details</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Father's Name *</label>
                        <input type="text" name="fatherName"
                          placeholder="Father's full name"
                          value={formData.fatherName}
                          onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Mother's Name *</label>
                        <input type="text" name="motherName"
                          placeholder="Mother's full name"
                          value={formData.motherName}
                          onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Guardian's Mobile *</label>
                        <input
                          type="tel"
                          placeholder="10 digit mobile number"
                          value={formData.guardianPhone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 10) {
                              setFormData({ ...formData, guardianPhone: val });
                            }
                          }}
                          required
                        />
                        {formData.guardianPhone && formData.guardianPhone.length < 10 && (
                          <small style={{ color: 'red', fontSize: '12px' }}>
                            Enter 10 digit number
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Annual Family Income</label>
                        <select name="familyIncome" value={formData.familyIncome}
                          onChange={handleChange}>
                          <option value="">Select Range</option>
                          <option value="below1lakh">Below ₹1 Lakh</option>
                          <option value="1to2.5lakh">₹1 - 2.5 Lakh</option>
                          <option value="2.5to5lakh">₹2.5 - 5 Lakh</option>
                          <option value="above5lakh">Above ₹5 Lakh</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="form-section">
                    <h3 className="form-section-title">📝 Additional Information</h3>
                    <div className="form-group">
                      <label>How did you hear about us?</label>
                      <select name="referralSource" value={formData.referralSource}
                        onChange={handleChange}>
                        <option value="">Select option</option>
                        <option value="friend">Friend / Relative</option>
                        <option value="school">School Teacher</option>
                        <option value="social_media">Social Media</option>
                        <option value="newspaper">Newspaper</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Additional Message</label>
                      <textarea name="message" rows="3"
                        placeholder="Any special requirements..."
                        value={formData.message}
                        onChange={handleChange} />
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="form-section declaration-section">
                    <h3 className="form-section-title">✅ Declaration</h3>
                    <div className="declaration-box">
                      <label className="declaration-label">
                        <input type="checkbox"
                          checked={formData.declaration}
                          onChange={e => setFormData({ ...formData, declaration: e.target.checked })}
                        />
                        <span>I hereby declare that all information provided is true and correct. I understand that false information may result in cancellation of admission. I agree to abide by all rules and regulations of Late Kalpana Chawla Mahila Senior Science & Arts College, Gangakhed.</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={loading}>
                    {loading ? '⏳ Submitting Application...' : '🚀 Submit Application'}
                  </button>

                </form>
              </>
            )}
          </div>
        )}

      </section>
      <Footer />
    </div>
  );
};

export default Admissions:
