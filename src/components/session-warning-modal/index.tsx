import Primitives from 'primitives'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Modal from 'components/modal'
import Button from 'components/button'

interface SessionWarningModalProps {
  open: boolean
  onClose: () => void
  closeSession: () => void
}

const SessionWarningModal = ({
  open,
  onClose,
  closeSession,
}: SessionWarningModalProps) => (
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
        La sesión va a expirar!
      </Primitives.Text>
      <Primitives.Text as="h3" fontWeight={1} mb={4}>
        La sesión cerrara en 60 segundos
      </Primitives.Text>
      <Primitives.Flex width={1} justifyContent="space-around">
        <Button rounded onClick={closeSession} variant="outlined">
          Cerrar Sesión
        </Button>
      </Primitives.Flex>
    </Primitives.Flex>
  </Modal>
)

export default SessionWarningModal
