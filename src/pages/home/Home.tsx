import { Layout, Menu, Button, Table, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/AppContext';
import { useQuery } from '@apollo/client';
import { query } from '../../graphql/queries';
import { MoreOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditUserModal from '../../components/User/EditUserModal';
import DeleteUserModal from '../../components/User/DeleteUserModal';
import { IUser } from '../../interface/User';
import CreateUserModal from '../../components/User/CreateUserModal';
import CustomHeader from '../../components/CustomHeader';

const { Content } = Layout;

const Home: React.FC<{ setIsAuthenticated: (auth: boolean) => void }> = ({
  setIsAuthenticated,
}) => {
  const { data, refetch } = useQuery(query.users);
  const { user } = useUser();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false); // Estado para el nuevo modal
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    email: string;
  } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleHomeUser = () => {
    navigate('/home-user');
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = (user: { id: number; email: string }) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirmed = () => {
    setDeleteModalVisible(false);
  };

  const handleCreateUser = () => {
    setCreateModalVisible(true); // Abrir el modal de crear usuario
  };

  const menu = (user: { id: number; email: string }) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEdit(user)}>
        Editar
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(user)}>
        Eliminar
      </Menu.Item>
    </Menu>
  );

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellido', dataIndex: 'lastname', key: 'lastname' },
    { title: 'Documento', dataIndex: 'document', key: 'document' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: { id: number; email: string }) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout>
      <CustomHeader
        handleLogout={handleLogout}
        handleHomeUser={handleHomeUser}
        userRole={user?.role}
        handleCreateUser={handleCreateUser}
      />
      <Content style={{ padding: '20px' }}>
        <h1>Bienvenido, {user?.email}</h1>
        <Table
          dataSource={data?.users || []}
          columns={columns}
          rowKey="id"
          pagination={{
            position: ['bottomCenter'],
          }}
        />
        <EditUserModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          user={selectedUser}
          refetchUsers={refetch}
        />
        <DeleteUserModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onDelete={handleDeleteConfirmed}
          user={selectedUser}
          refetchUsers={refetch}
        />
        <CreateUserModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          refetchUsers={refetch}
        />
      </Content>
    </Layout>
  );
};

export default Home;
