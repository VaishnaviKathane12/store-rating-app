 // src/components/TestConnection.js
import React, { useEffect, useState } from 'react';
import api from '../api/config';

const TestConnection = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/test'); // Create this endpoint in backend
        setStatus('Connected successfully!');
      } catch (error) {
        setStatus('Connection failed: ' + error.message);
      }
    };

    testConnection();
  }, []);

  return <div>Backend Status: {status}</div>;
};

export default TestConnection;