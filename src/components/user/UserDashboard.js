 
import React from 'react';

const UserDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>User Dashboard</h1>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Browse Stores</h3>
          <p>Explore and rate local stores</p>
        </div>
        <div style={styles.card}>
          <h3>My Ratings</h3>
          <p>View and manage your store ratings</p>
        </div>
        <div style={styles.card}>
          <h3>Profile Settings</h3>
          <p>Update your profile and password</p>
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

export default UserDashboard;