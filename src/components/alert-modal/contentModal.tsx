import Primitives from 'primitives'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoIcon from '@mui/icons-material/Info'
import Button from 'components/button'
import { isArray } from 'utils'
import { map } from 'ramda'

type Icon = 'warning' | 'error' | 'success' | 'info'

interface ContentModalProps {
  action?: () => void
  title?: string
  subtitle?: string | string[]
  ctaLabel?: string
  icon?: Icon
}

const ContentModal = ({
  action,
  title,
  subtitle,
  ctaLabel,
  icon,
}: ContentModalProps) => (
  <Primitives.Flex
    width={[1, '400px']}
    alignItems="center"
    flexDirection="column"
    textAlign="center"
  >
    {icon === 'warning' && (
      <WarningAmberIcon
        color="error"
        sx={{ width: '100px', height: '100px', mb: 3 }}
      />
    )}

    {icon === 'error' && (
      <HighlightOffIcon
        color="error"
        sx={{ width: '100px', height: '100px', mb: 3 }}
      />
    )}

    {icon === 'success' && (
      <CheckCircleOutlineIcon
        color="success"
        sx={{ width: '100px', height: '100px', mb: 3 }}
      />
    )}

    {icon === 'info' && (
      <InfoIcon
        color="primary"
        sx={{ width: '100px', height: '100px', mb: 3 }}
      />
    )}

    {title && (
      <Primitives.Text as="h2" fontWeight={1} fontSize={8} m={0}>
        {title}
      </Primitives.Text>
    )}

    {isArray(subtitle) ? (
      map(
        (sub) => (
          <Primitives.Text
            key={sub}
            as="h3"
            m={0}
            mt={2}
            fontWeight={1}
            dangerouslySetInnerHTML={{ __html: sub }}
          />
        ),
        subtitle as string[],
      )
    ) : (
      <Primitives.Text
        as="h3"
        m={0}
        mt={2}
        fontWeight={1}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    )}

    {action && ctaLabel && (
      <Primitives.Flex width={1} justifyContent="space-around">
        <Button rounded onClick={action} variant="outlined">
          {ctaLabel}
        </Button>
      </Primitives.Flex>
    )}
  </Primitives.Flex>
)

export default ContentModal
