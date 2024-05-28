const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

exports.uploadFile = (req, res) => {
  res.send('File uploaded successfully');
};

exports.getFiles = (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to retrieve files' });
    }
    res.json(files);
  });
};

exports.getFileData = (req, res) => {
  const filepath = path.join(__dirname, '../uploads', req.params.filename);
  const results = [];
  fs.createReadStream(filepath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
};
