const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  history: { type: String, default: 'Late Kalpana Chawla Mahila Senior Science and Arts College, Gangakhed is run by Vidyaniketan Sevabhavi Sanstha and affiliated to SNDT Women\'s University.' },
  historyPhoto: { type: String, default: '' },
  vision: { type: String, default: 'To be a centre of excellence in women\'s higher education that empowers every girl and woman of the Marathwada region.' },
  visionPhoto: { type: String, default: '' },
  mission: { type: String, default: 'To provide accessible and inclusive higher education in science and arts that nurtures intellectual growth and critical thinking.' },
  missionPhoto: { type: String, default: '' },
  achievements: { type: String, default: 'Our students have consistently achieved top ranks in university examinations.' },
  achievementsPhoto: { type: String, default: '' },
  principalName: { type: String, default: 'Principal Name' },
  principalMessage: { type: String, default: 'Welcome to Late Kalpana Chawla Mahila Senior Science and Arts College, Gangakhed.' },
  principalPhoto: { type: String, default: '' },
  collegePhoto: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);