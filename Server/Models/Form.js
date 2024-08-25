const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String },
  fileType: { type: String },
  filePath: { type: String },
});

const formSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dateOfBirth: { type: Date },
  street1: { type: String },
  street2: { type: String },
  permStreet1: { type: String },
  permStreet2: { type: String },
  files: [fileSchema],
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
