import React, { useState } from 'react';
import { useExportUserDataMutation } from '../redux/exportUserApi';
import { saveAs } from 'file-saver';

const ExportUserData = ({ userId }) => {
  const [format, setFormat] = useState('json');
  const [exportUserData] = useExportUserDataMutation();

  const handleExport = async () => {
    try {
      const { blob } = await exportUserData({ userId, format }).unwrap();
      saveAs(blob, `user_${userId}.${format}`);
    } catch (error) {
      console.error('Error exporting user data:', error);
    }
  };

  return (
    <div className="w-100 p-0 m-0 px-1 pt-1 d-flex justify-content-between align-items-center">
      <label>
        <input type="radio" value="json" checked={format === 'json'} onChange={(e) => setFormat(e.target.value)} />
        JSON
      </label>
      <label>
        <input type="radio" value="csv" checked={format === 'csv'} onChange={(e) => setFormat(e.target.value)} />
        CSV
      </label>
      <button className="btn btn-success" onClick={handleExport}>
        Export Data
      </button>
    </div>
  );
};

export default ExportUserData;
