import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message } from 'antd';
import './Login.less';
import Logo from '../../components/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { mutation } from '../../graphql/mutations';
import { useUser } from '../../context/AppContext';

const Login: React.FC<{ setIsAuthenticated: (auth: boolean) => void }> = ({
  setIsAuthenticated,
}) => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [login] = useMutation(mutation.login);

  const onFinish = async (values: any) => {
    try {
      const { data } = await login({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });
      const accessToken = data.login.accessToken;
      localStorage.setItem('jwt', accessToken);
      setIsAuthenticated(true);
      setUser(data.login.user);
      navigate('/home');
      message.success('Login exitoso!');
    } catch (error: any) {
      console.error('Error de login', error);

      if (error.message.includes('Unauthorized')) {
        message.error('Credenciales incorrectas, por favor intenta de nuevo.');
      } else {
        message.error('Hubo un error al intentar iniciar sesión.');
      }
    }
  };

  return (
    <div className="container">
      <Logo />
      <Divider type="vertical" style={{ height: '80%' }} />
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Ingresa tu email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Ingresa
          </Button>
          o <Link to={'/register'}>¡Regístrate ahora!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
