import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Menu, MenuData, UseAuth, useMenu } from 'hooks'
import defaultTheme from 'lib/theme/default'
import { map } from 'ramda'
import { useLocation, useNavigate } from 'react-router-dom'
import { hasData, isAuthorized, menuIsActive } from 'utils'
import { AppConstants } from 'utils/constants'
import LoginMenu from '../loginMenu'
import LogoutMenu from '../logoutMenu'
import SimpleLoginMenu from '../simpleLoginMenu'
import MenuButton from './menuButton'

interface DesktopNavProps {
  menuData: MenuData
}

const DesktopNav = ({ menuData }: DesktopNavProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { subMenu } = useMenu()
  const { isAuth, auth } = UseAuth()
  const { title: menuTitle, menu: menuItems } = menuData

  return (
    <AppBar position="static" sx={{ backgroundColor: '#281705' }}>
      <Toolbar>
        <Typography
          onClick={() => navigate(AppConstants.ROUTE_HOME)}
          variant="h5"
          sx={{
            color: defaultTheme.colors.orange,
            textDecoration: 'none',
            mr: 2,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {menuTitle}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {map(
            ({
              text,
              href,
              action,
              children,
              menuKey = '',
              authLevel,
            }: Menu): React.ReactNode => {
              if (!isAuth) {
                return null
              }

              if (authLevel && !isAuthorized(auth?.user.rol || '', authLevel)) {
                return null
              }

              const activeMenuStyle = menuIsActive(location.pathname, menuKey)
                ? { borderBottom: `2px solid ${defaultTheme.colors.orange}` }
                : {}

              return hasData(children) ? (
                <MenuButton
                  key={text}
                  activeMenuStyle={activeMenuStyle}
                  text={text}
                  menuItems={children || []}
                  paddingLeft={16}
                />
              ) : (
                <Box key={text} sx={activeMenuStyle}>
                  <Button
                    onClick={() => {
                      action && action()
                      href && navigate(href)
                    }}
                    sx={{
                      color: defaultTheme.colors.orange,
                      display: 'block',
                      fontWeight: 'bold',
                    }}
                  >
                    {text}
                  </Button>
                </Box>
              )
            },
            menuItems,
          )}
        </Box>
        {!isAuth && <LogoutMenu />}
        {isAuth && hasData(subMenu) && <LoginMenu subMenu={subMenu} />}
        {isAuth && !hasData(subMenu) && <SimpleLoginMenu />}
      </Toolbar>
    </AppBar>
  )
}

export default DesktopNav
