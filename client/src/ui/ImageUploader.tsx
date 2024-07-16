import React, { useState } from 'react';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setUploading(true);
    setUploading(false);
  };

  return (
    <div className="d-flex flex-row justify-content-between align-items-center w-100 px-1">
      <div className="p-0 m-0">
        <label className="btn btn-secondary" htmlFor="customFile">
          {file ? file.name : 'Choose file'}
        </label>
        <input className="d-none" type="file" id="customFile" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary text-nowrap" onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ImageUploader;
