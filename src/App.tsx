import { useState, useEffect } from 'react';
import { Layout, message, Spin } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import { useUser } from './context/AppContext';
import HomeUser from './pages/homeUser/HomeUser';
import './App.less';

const { Content } = Layout;

message.config({
  top: '50%',
  duration: 2,
  maxCount: 3,
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('jwt')
  );
  const { user, loading } = useUser();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('jwt'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <Router>
      <Layout>
        <Content>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  user?.role === 'ADMIN' ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/home-user" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/home"
              element={
                isAuthenticated && user?.role === 'ADMIN' ? (
                  <Home setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/home-user"
              element={
                (isAuthenticated && user?.role === 'USER') ||
                user?.role === 'ADMIN' ? (
                  <HomeUser setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
