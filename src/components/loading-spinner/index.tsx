import CircularProgress from '@mui/material/CircularProgress'
import Primitives, { HtmlProps } from 'primitives'
import { AppConstants } from 'utils/constants'

const containerStyled: HtmlProps = {
  width: 1,
  height: AppConstants.PAGE_MIN_HEIGHT,
  justifyContent: 'center',
  alignItems: 'center',
}

const LoadingSpinner = () => {
  return (
    <Primitives.Flex {...containerStyled}>
      <CircularProgress />
    </Primitives.Flex>
  )
}

export default LoadingSpinner
