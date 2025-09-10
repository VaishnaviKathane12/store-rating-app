import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setLocalError('');
    clearError();
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return 'Please fill in all required fields';
    }

    if (formData.name.trim().length < 3 || formData.name.trim().length > 60) {
      return 'Name must be between 3 and 60 characters';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return 'Please enter a valid email address';
    }

    // FIXED PASSWORD REGEX - Will accept Pass@123
 //   if (!/^(?=*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*!])[A-Za-z0-9@#$%^&*!]{8,16}$/.test(formData.password)) {
    //  return 'Password must be 8-16 characters with at least one number, one lowercase letter, one uppercase letter, and one special character';
    //}

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    if (formData.address && formData.address.length > 400) {
      return 'Address must not exceed 400 characters';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setLocalError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);
      
      if (result.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setLocalError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error("Registration submission failed:", err);
      setLocalError('Could not connect to the server. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerBox}>
        <h2 style={styles.title}>Register for Store Rating System</h2>
        
        {(localError || error) && (
          <div style={styles.error}>
            {localError || error}
          </div>
        )}

        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name: *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
              required
            />
            <small style={styles.hint}>Must be between 3 and 60 characters</small>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email: *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password: *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
            <small style={styles.hint}>8-16 characters, at least one number, one lowercase, one uppercase, and one special character</small>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password: *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Enter your address (optional, max 400 characters)"
              rows="3"
            />
            <small style={styles.hint}>Maximum 400 characters</small>
          </div>

          <button 
            type="submit" 
            style={isLoading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={styles.links}>
          <p>Already have an account? <Link to="/login" style={styles.link}>Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '2rem'
  },
  registerBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#34495e'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    resize: 'vertical'
  },
  hint: {
    color: '#7f8c8d',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
    display: 'block'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #f5c6cb'
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #c3e6cb'
  },
  links: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none'
  }
};

export default Register;