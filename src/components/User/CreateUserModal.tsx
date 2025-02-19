import { Modal, Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { mutation } from '../../graphql/mutations';

const CreateUserModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  refetchUsers: () => void;
}> = ({ visible, onClose, refetchUsers }) => {
  const [form] = Form.useForm();

  const [register] = useMutation(mutation.register);

  const handleSubmit = async (values: any) => {
    try {
      await register({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });
      form.resetFields();
      onClose();
      refetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title="Nuevo Usuario"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Por favor ingrese un email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: 'Por favor ingrese una contraseña' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
