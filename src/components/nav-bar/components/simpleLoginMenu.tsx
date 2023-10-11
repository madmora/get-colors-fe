import { Button } from '@mui/material'
import { UseAuth } from 'hooks'
import defaultTheme from 'lib/theme/default'

const SimpleLoginMenu = () => {
  const { logout } = UseAuth()
  return (
    <Button
      onClick={logout}
      color="inherit"
      sx={{ color: defaultTheme.colors.orange, fontWeight: 'bold' }}
    >
      Cerrar Sesión
    </Button>
  )
}

export default SimpleLoginMenu
