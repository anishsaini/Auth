import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [downloadURL, setDownloadURL] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setProgress(0);
    setDownloadURL('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setUploading(true);
    setError('');
    setProgress(0);
    setDownloadURL('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          }
        },
      });
      setDownloadURL(response.data.fileUrl);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError('Upload failed: ' + err.response.data.error);
      } else if (err.message) {
        setError('Upload failed: ' + err.message);
      } else {
        setError('Upload failed!');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-wrapper" style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      <br /><br />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? `Uploading... ${progress}%` : 'Upload'}
      </button>
      {progress > 0 && uploading && <div style={{ marginTop: 10 }}>Progress: {progress}%</div>}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {downloadURL && (
        <div style={{ marginTop: 10 }}>
          <span style={{ color: 'green' }}>Upload successful! </span>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">View File</a>
        </div>
      )}
    </div>
  );
};

export default Upload;
