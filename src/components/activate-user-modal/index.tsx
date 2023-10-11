import Primitives from 'primitives'
import InfoIcon from '@mui/icons-material/Info'
import Modal from 'components/modal'
import Button from 'components/button'

interface ActivateUserModalProps {
  open: boolean
  onClose: () => void
  activateUser: () => void
  fullname: string
}

const ActivateUserModal = ({
  open,
  onClose,
  activateUser,
  fullname,
}: ActivateUserModalProps) => (
  <Modal open={open} disableOutsideClose onClose={onClose}>
    <Primitives.Flex
      width={[1, '400px']}
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <InfoIcon
        color="success"
        sx={{ width: '100px', height: '100px', mb: 3 }}
      />
      <Primitives.Text as="h2" fontWeight={1} fontSize={8} m={0} mb={0}>
        Restaurar Usuario!
      </Primitives.Text>
      <Primitives.Text as="h3" fontWeight={1} mb={4} lineHeight={4}>
        Realmente estas seguro de restaurar este usuario?
      </Primitives.Text>
      <Primitives.Flex width={1} justifyContent="space-around">
        <Button rounded onClick={activateUser} variant="outlined">
          Restaurar a {fullname}
        </Button>
      </Primitives.Flex>
    </Primitives.Flex>
  </Modal>
)

export default ActivateUserModal
