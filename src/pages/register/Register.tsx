import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message } from 'antd';
import './Register.less';
import Logo from '../../components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { mutation } from '../../graphql/mutations';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [register] = useMutation(mutation.register);

  const onFinish = async (values: any) => {
    try {
      await register({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });

      message.success('Registro exitoso! Ahora puedes iniciar sesión.');

      navigate('/login');
    } catch (error: any) {
      console.error('Error de registro', error);

      if (error.message.includes('Email already exists')) {
        message.error('Este email ya está registrado.');
      } else {
        message.error('Hubo un error al intentar registrarte.');
      }
    }
  };

  return (
    <div className="container">
      <Logo />
      <Divider type="vertical" style={{ height: '80%' }} />
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
            Regístrate
          </Button>
          o <a href="/login">¡Inicia sesión ahora!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
