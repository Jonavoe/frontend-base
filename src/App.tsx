import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USERS } from './graphql/queries/users';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

const { Content } = Layout;

const App = () => {
  const { data, loading } = useQuery(USERS);

  const isAuthenticated = data?.users?.length > 0;

  if (loading) return <p>Cargando...</p>;

  return (
    <Router>
      <Layout>
        <Content>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
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
