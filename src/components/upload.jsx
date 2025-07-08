import React, { useState } from 'react';
import { storage } from '../firebase';  
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setDownloadURL('');
    setError('');
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(pct));
      },
      (err) => {
        console.error(err);
        setError('Upload failed');
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
      }
    );
  };

  return (
    <div className="upload-wrapper">
      <h1>Upload to Firebase</h1>

      <label htmlFor="upload-input" className="upload-button">
        Choose File
      </label>

      <input
        id="upload-input"
        type="file"
        onChange={handleFileChange}
        className="hidden-input"
        accept=".txt,.md,.jpg,.jpeg,.png,.gif,.mp4,.webm"
      />

      {file && (
        <div className="upload-preview">
          <p><strong>Selected File:</strong> {file.name}</p>

          {file.type.startsWith("image/") && (
            <img src={URL.createObjectURL(file)} alt="Preview" className="upload-image" />
          )}

          {file.type.startsWith("video/") && (
            <video controls width="300" src={URL.createObjectURL(file)} />
          )}

          {file.type.startsWith("text/") && (
            <p className="upload-text-note">📄 This is a text file.</p>
          )}

          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? `Uploading ${progress}%...` : 'Upload to Firebase'}
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {downloadURL && (
        <div className="upload-success">
          <p>File uploaded successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">View File</a>
        </div>
      )}
    </div>
  );
};

export default Upload;
