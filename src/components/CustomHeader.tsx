import { Button, Layout, Menu } from 'antd';

const { Header } = Layout;

interface CustomHeaderProps {
  handleLogout: () => void;
  handleHomeUser?: () => void;
  userRole?: string;
  handleCreateUser?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  handleLogout,
  handleHomeUser,
  userRole,
  handleCreateUser,
}) => {
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#cecece',
        color: '#f5f5f5',
      }}
    >
      <Menu
        style={{
          backgroundColor: '#cecece',
          color: '#f5f5f5',
        }}
        mode="horizontal"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1">Home</Menu.Item>
      </Menu>
      <div>
        {userRole === 'ADMIN' && handleCreateUser && (
          <Button
            type="primary"
            onClick={handleCreateUser}
            style={{ marginRight: '10px' }}
          >
            Nuevo Usuario
          </Button>
        )}
        {userRole === 'ADMIN' && handleHomeUser && (
          <Button
            type="primary"
            onClick={handleHomeUser}
            style={{ marginRight: '10px' }}
          >
            home user
          </Button>
        )}
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default CustomHeader;
