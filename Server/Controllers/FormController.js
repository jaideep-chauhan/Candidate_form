const Form = require('../Models/Form');
const path = require('path');
const fs = require('fs');

// Handle form submission
exports.submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, dateOfBirth, street1, street2, permStreet1, permStreet2 } = req.body;

    // Extract files from req
    const files = Object.keys(req.files).map((key) => {
      const fileArray = req.files[key]; // This should be an array based on the structure
      console.log(fileArray)
      if (fileArray && fileArray.length > 0) {
        return {
          fileName: req.body[`fileName${key.replace('file', '')}`],
          fileType: req.body[`fileType${key.replace('file', '')}`],
          filePath: fileArray[0].path,
        };
      }
      return null;
    }).filter(file => file !== null);

    // Create a new form document
    const form = new Form({
      firstName,
      lastName,
      email,
      dateOfBirth,
      street1,
      street2,
      permStreet1,
      permStreet2,
      files,
    });

    await form.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting form' });
  }
};






// Handle file deletions
exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await Form.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Remove file from server
    fs.unlinkSync(file.filePath);

    // Remove file record from database
    await Form.findByIdAndDelete(fileId);

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting file' });
  }
};
