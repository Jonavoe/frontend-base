import { Layout } from 'antd';
import Login from './pages/login/Login';
import './App.less';
import { useQuery } from '@apollo/client';
import { USERS } from './graphql/queries/users';

const { Content } = Layout;

const App = () => {
  const { data } = useQuery(USERS);

  console.log(data);

  return (
    <Layout>
      <Content>
        <Login />
      </Content>
    </Layout>
  );
};

export default App;
