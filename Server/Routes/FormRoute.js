const express = require('express');
const router = express.Router();
const formController = require('../Controllers/FormController');
const uploadMiddleware = require('../Middlewares/Multer');

// Define the fields for dynamic file fields
const fileFields = Array.from({ length: 10 }, (_, i) => ({ name: `file${i}` }));

// Route to handle form submission with dynamic file fields
router.post('/submit-form', uploadMiddleware.fields(fileFields), formController.submitForm);

// Route to handle file deletion
router.delete('/delete-file/:fileId', formController.deleteFile);

module.exports = router;
