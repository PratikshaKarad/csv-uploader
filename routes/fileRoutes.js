const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('csvfile'), fileController.uploadFile);
router.get('/', fileController.getFiles);
router.get('/:filename', fileController.getFileData);

module.exports = router;
