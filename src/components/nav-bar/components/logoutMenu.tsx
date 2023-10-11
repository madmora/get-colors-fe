import { Button } from '@mui/material'
import defaultTheme from 'lib/theme/default'
import { useNavigate } from 'react-router-dom'
import { AppConstants } from 'utils/constants'

const LogoutMenu = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate(AppConstants.ROUTE_LOGIN)}
      color="inherit"
      sx={{ color: defaultTheme.colors.orange, fontWeight: 'bold' }}
    >
      Iniciar sesión
    </Button>
  )
}

export default LogoutMenu
