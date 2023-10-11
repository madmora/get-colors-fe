import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Typography } from '@mui/material'
import defaultTheme from 'lib/theme/default'
import { UseAuth, useMenu } from 'hooks'
import LogoutMenu from '../logoutMenu'
import LoginMenu from '../loginMenu'
import { hasData } from 'utils'
import SimpleLoginMenu from '../simpleLoginMenu'

interface ToolbarNavProps {
  openDrawer: () => void
  title: string
}

const ToolbarNav = ({ openDrawer, title }: ToolbarNavProps) => {
  const { isAuth } = UseAuth()
  const { subMenu } = useMenu()
  return (
    <AppBar position="static" sx={{ backgroundColor: '#281705' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: [0, 2] }}
          onClick={openDrawer}
        >
          <MenuIcon sx={{ color: defaultTheme.colors.orange }} />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: defaultTheme.colors.orange,
          }}
        >
          {title}
        </Typography>
        {!isAuth && <LogoutMenu />}
        {isAuth && hasData(subMenu) && <LoginMenu subMenu={subMenu} />}
        {isAuth && !hasData(subMenu) && <SimpleLoginMenu />}
      </Toolbar>
    </AppBar>
  )
}

export default ToolbarNav
