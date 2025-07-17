const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Post = require('../backend/models/post'); // ✅ Import MongoDB model

const app = express();
const PORT = 5001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mygram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

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

// Parse JSON bodies (for POST)
app.use(express.json());

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

// ✅ POST /upload → Upload file & Save to MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('✅ Upload endpoint hit');
  if (!req.file) {
    console.log('❌ No file received');
    return res.status(400).json({ error: 'No file uploaded.' });
  } 

  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  const post = new Post({
    filename: req.file.originalname,
    fileUrl,
    title: req.body.title || 'Untitled', // Use title from request body or default to 'Untitled'
  });

  try {
    await post.save();
    console.log('📦 Saved to DB:', post.filename);
    res.status(200).json({ fileUrl, post });
  } catch (err) {
    console.error('❌ DB Save error:', err);
    res.status(500).json({ error: 'Failed to save to database' });
  }
});

// ✅ GET /list-uploads → Fetch from MongoDB
app.get('/list-uploads', async (req, res) => {
  try {
    const posts = await Post.find().sort({ uploadedAt: -1 });
    res.json(posts); // ✅ Send complete post objects
  } catch (err) {
    console.error('❌ Failed to fetch posts:', err);
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});