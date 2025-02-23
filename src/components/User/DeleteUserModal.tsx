import { Modal, Button } from 'antd';
import { mutation } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';

interface DeleteUserModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  user: { id: number; email: string } | null;
  refetchUsers: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  visible,
  onClose,
  onDelete,
  user,
  refetchUsers,
}) => {
  const [deleteUser] = useMutation(mutation.delete);

  const handleDelete = async () => {
    if (user) {
      try {
        await deleteUser({ variables: { id: user.id } });
        onDelete();
        onClose();
        refetchUsers();
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  return (
    <Modal
      title="Eliminar Usuario"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>¿Estás seguro de que deseas eliminar a este usuario?</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" danger onClick={handleDelete}>
          Eliminar
        </Button>
        <Button type="default" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
