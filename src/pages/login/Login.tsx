import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message } from 'antd';
import './Login.less';
import Logo from '../../components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN);

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const { data } = await login({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });

      const token = data.login.token;
      localStorage.setItem('jwt', token);

      message.success('Login exitoso!');
      navigate('/');
    } catch (error: any) {
      console.error('Error de login', error);

      if (error.message.includes('Unauthorized')) {
        message.error('Credenciales incorrectas, por favor intenta de nuevo.');
      } else {
        message.error('Hubo un error al intentar iniciar sesión.');
      }
    } finally {
      setLoading(false);
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
          <Button block type="primary" htmlType="submit" loading={loading}>
            Ingresa
          </Button>
          o <a href="/register">¡Regístrate ahora!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
