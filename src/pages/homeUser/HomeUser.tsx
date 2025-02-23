import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import './HomeUser.less';
import { useUser } from '../../context/AppContext';
import CustomHeader from '../../components/CustomHeader';

const HomeUser: React.FC<{ setIsAuthenticated: (auth: boolean) => void }> = ({
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleHomeUser = () => {
    navigate('/home');
  };

  return (
    <Layout>
      <CustomHeader
        handleHomeUser={handleHomeUser}
        handleLogout={handleLogout}
        userRole={user?.role}
      />

      <Layout style={{ padding: '24px' }}>
        <h1>Anduvo de re peluche</h1>
      </Layout>
    </Layout>
  );
};

export default HomeUser;
