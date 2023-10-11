import Primitives, { HtmlProps } from 'primitives'
import { Box, Modal as ModalMUI } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import css from '@styled-system/css'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose?: () => void
  disableOutsideClose?: boolean
  verticalScroll?: boolean
}

const containerStyled: HtmlProps = {
  position: ['relative', 'absolute'],
  top: [0, '80px'],
  bg: 'white',
  py: 5,
  px: 3,
  borderRadius: [0, '8px'],
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: ['auto', '200px'],
  width: [1, 'auto'],
  minHeight: ['100vh', 'auto'],
}

const closeContainerStyled: HtmlProps = {
  position: 'absolute',
  top: [15, 10],
  right: [15, 10],
  borderRadius: '50%',
  border: 'solid 2px rgba(0, 0, 0, 0.26)',
  cursor: 'pointer',
}

const closeContainerCss = css({
  '&:hover': {
    borderColor: '#281705',
  },
})

const Modal = ({
  children,
  open,
  onClose,
  disableOutsideClose,
  verticalScroll = false,
}: ModalProps) => {
  const verticalScrollStyle = verticalScroll
    ? {
        overflow: 'auto',
        maxHeight: ['calc(100vh - 96px)', 'calc(100vh - 256px)'],
      }
    : {}
  return (
    <ModalMUI
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
      disableScrollLock={false}
      open={open}
      onClose={() => {
        !disableOutsideClose && onClose && onClose()
      }}
    >
      <Box width={1} display="flex" justifyContent="center">
        <Primitives.Flex {...containerStyled}>
          <Primitives.Flex
            css={closeContainerCss}
            onClick={onClose}
            {...closeContainerStyled}
          >
            <CloseIcon
              color="disabled"
              sx={{
                '&:hover': {
                  color: '#281705',
                },
              }}
            />
          </Primitives.Flex>
          <Primitives.Box width={1} {...verticalScrollStyle}>
            {children}
          </Primitives.Box>
        </Primitives.Flex>
      </Box>
    </ModalMUI>
  )
}

export default Modal
