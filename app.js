const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/api/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
