import { Box, Modal } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Primitives, { HtmlProps } from 'primitives'

interface LoadingModalProps {
  loading: boolean
}

const containerStyled: HtmlProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bg: 'white',
  p: 4,
  borderRadius: '10px',
  flexDirection: 'column',
  alignItems: 'center',
}

const LoadingModal = ({ loading }: LoadingModalProps) => {
  return (
    <Modal open={loading}>
      <Box>
        <Primitives.Flex {...containerStyled}>
          <CircularProgress sx={{ mb: 2 }} />
          <Primitives.Text>Cargando...</Primitives.Text>
        </Primitives.Flex>
      </Box>
    </Modal>
  )
}

export default LoadingModal
