import { useMutation } from '@apollo/client';
import { Modal, Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { mutation } from '../../graphql/mutations';
import { IUser } from '../../interface/User';

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  user: IUser | null;
}

const EditUserModal: React.FC<UserModalProps> = ({
  visible,
  onClose,
  user,
}) => {
  const [userData, setUserData] = useState<IUser>({
    id: 0,
    email: '',
    name: '',
    lastname: '',
    document: '',
  });

  const [UpdateUser] = useMutation(mutation.update);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleUpdate = () => {
    if (user) {
      UpdateUser({ variables: { ...userData, id: user.id } });
      onClose();
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Email">
          <Input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Nombre">
          <Input
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Apellido">
          <Input
            value={userData.lastname}
            onChange={(e) =>
              setUserData({ ...userData, lastname: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Documento de identidad">
          <Input
            value={userData.document}
            onChange={(e) =>
              setUserData({ ...userData, document: e.target.value })
            }
          />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
          <Button type="default" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
