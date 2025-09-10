 
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const getDashboardLink = () => {
    switch (user.role) {
      case 'admin': return '/admin';
      case 'user': return '/user';
      case 'store_owner': return '/store';
      default: return '/';
    }
  };

  const getRoleDisplayName = () => {
    switch (user.role) {
      case 'admin': return 'System Administrator';
      case 'user': return 'User';
      case 'store_owner': return 'Store Owner';
      default: return user.role;
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.navLeft}>
          <h2 style={styles.logo}>Store Rating System</h2>
          <span style={styles.userInfo}>
            {user.name} ({getRoleDisplayName()})
          </span>
        </div>
        <div style={styles.navRight}>
          <button 
            onClick={() => navigate(getDashboardLink())}
            style={styles.navButton}
          >
            Dashboard
          </button>
          <button 
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem'
  },
  userInfo: {
    fontSize: '0.9rem',
    opacity: 0.9
  },
  navRight: {
    display: 'flex',
    gap: '1rem'
  },
  navButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};

export default Navbar;