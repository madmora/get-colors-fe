import Primitives from 'primitives'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Modal from 'components/modal'
import Button from 'components/button'

interface DeleteUserModalProps {
  open: boolean
  onClose: () => void
  deleteUser: () => void
  fullname: string
}

const DeleteUserModal = ({
  open,
  onClose,
  deleteUser,
  fullname,
}: DeleteUserModalProps) => (
  <Modal open={open} disableOutsideClose onClose={onClose}>
    <Primitives.Flex
      width={[1, '400px']}
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <WarningAmberIcon
        color="error"
        sx={{ width: '100px', height: '100px', mb: 3 }}
      />
      <Primitives.Text as="h2" fontWeight={1} fontSize={8} m={0} mb={0}>
        Eliminar Usuario!
      </Primitives.Text>
      <Primitives.Text as="h3" fontWeight={1} mb={4} lineHeight={4}>
        Realmente estas seguro de eliminar este usuario?
      </Primitives.Text>
      <Primitives.Flex width={1} justifyContent="space-around">
        <Button rounded onClick={deleteUser} variant="outlined">
          Eliminar a {fullname}
        </Button>
      </Primitives.Flex>
    </Primitives.Flex>
  </Modal>
)

export default DeleteUserModal
