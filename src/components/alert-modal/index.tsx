import Modal from 'components/modal'
import ContentModal from './contentModal'

type Icon = 'warning' | 'error' | 'success' | 'info'

interface AlertModalProps {
  open: boolean
  onClose: () => void
  action?: () => void
  title?: string
  subtitle?: string | string[]
  ctaLabel?: string
  icon?: Icon
}

const AlertModal = ({
  open,
  onClose,
  action,
  title,
  subtitle,
  ctaLabel,
  icon,
}: AlertModalProps) => (
  <Modal open={open} disableOutsideClose onClose={onClose}>
    <ContentModal
      action={action}
      title={title}
      subtitle={subtitle}
      ctaLabel={ctaLabel}
      icon={icon}
    />
  </Modal>
)

export default AlertModal
