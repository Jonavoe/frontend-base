import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import './Home.less';

const Home: React.FC<{ setIsAuthenticated: (auth: boolean) => void }> = ({
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
