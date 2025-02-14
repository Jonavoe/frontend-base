import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Login.less';

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="container">
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Ingresa tu nombre de usuario!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
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
        {/* <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recuerdame</Checkbox>
            </Form.Item>
            <a href="">Olvidaste la contraseña</a>
          </Flex>
        </Form.Item> */}

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Ingresa
          </Button>
          or <a href="">Registrate Ahora!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
