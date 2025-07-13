const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// CORS setup for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadPath));

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('✅ Upload endpoint hit');
  if (!req.file) {
    console.log('❌ No file received');
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  console.log('📁 File received:', req.file.originalname);
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.status(200).json({ fileUrl });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
