import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import HomeUser from './pages/homeUser/HomeUser';

const { Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('jwt')
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('jwt'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Content>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/home-user"
              element={
                isAuthenticated ? (
                  <HomeUser setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated && (
                  <Register setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
