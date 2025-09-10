 
import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Users Management</h3>
          <p>Manage system users and their roles</p>
        </div>
        <div style={styles.card}>
          <h3>Stores Management</h3>
          <p>Manage stores and store owners</p>
        </div>
        <div style={styles.card}>
          <h3>System Statistics</h3>
          <p>View system-wide statistics</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0'
  }
};

export default AdminDashboard;