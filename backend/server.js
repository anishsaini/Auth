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

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Serve static files from uploads folder
app.use('/uploads', express.static(uploadPath));

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST /upload → Upload file
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

// GET /list-uploads → Return list of uploaded files
app.get('/list-uploads', (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to list files' });
    }
    const fileUrls = files.map(filename => `http://localhost:${PORT}/uploads/${filename}`);
    res.json(fileUrls);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
