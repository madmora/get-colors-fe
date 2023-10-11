import Primitives from 'primitives'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Modal from 'components/modal'
import { useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'
import { UseAuth } from 'hooks'
import { modalErrorVar } from 'lib/apollo/variables'
import { setModalErrorVar } from 'lib/apollo/operations'
import { AppConstants } from 'utils/constants'

const GraphqlErrorModal = () => {
  const { open, message, subMessage, code } = useReactiveVar(modalErrorVar)
  const { logout } = UseAuth()

  const closeModal = useCallback(() => {
    if (code === AppConstants.UNAUTHENTICATED_ERROR_CODE) {
      logout()
    }

    setModalErrorVar({ open: false, message: '', subMessage: '', code: '' })
  }, [code, logout])

  return (
    <Modal open={open} disableOutsideClose onClose={closeModal}>
      <Primitives.Flex
        width={[1, '400px']}
        alignItems="center"
        flexDirection="column"
        textAlign="center"
      >
        <HighlightOffIcon
          color="error"
          sx={{ width: '100px', height: '100px', mb: 3 }}
        />
        <Primitives.Text as="h2" fontWeight={1} fontSize={8} m={0} mb={2}>
          {message}
        </Primitives.Text>
        {subMessage && (
          <Primitives.Text as="h3" m={0} fontWeight={1}>
            {subMessage}
          </Primitives.Text>
        )}
      </Primitives.Flex>
    </Modal>
  )
}

export default GraphqlErrorModal
