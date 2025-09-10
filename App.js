import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import StoreDashboard from './components/store/StoreDashboard';
import Navbar from './components/common/Navbar';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={loadingStyles.container}>
        <div style={loadingStyles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div style={errorStyles.container}>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }
  
  return children;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={loadingStyles.container}>
        <div style={loadingStyles.spinner}></div>
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <Register />} 
          />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user/*" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/store/*" 
            element={
              <ProtectedRoute allowedRoles={['store_owner']}>
                <StoreDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="*" 
            element={
              <div style={errorStyles.container}>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <button onClick={() => window.history.back()}>Go Back</button>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

const getDashboardRoute = (role) => {
  switch (role) {
    case 'admin': return '/admin';
    case 'user': return '/user';
    case 'store_owner': return '/store';
    default: return '/login';
  }
};

const loadingStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem'
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  }
};

const errorStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    textAlign: 'center',
    padding: '2rem'
  }
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;