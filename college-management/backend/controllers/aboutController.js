const About = require('../models/About');

exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.status(200).json({ success: true, about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(
        about._id,
        req.body,
        { new: true }
      );
    }
    res.status(200).json({
      success: true,
      message: 'About page updated successfully',
      about
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};