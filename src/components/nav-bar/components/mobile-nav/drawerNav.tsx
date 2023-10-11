import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { Divider, ListItemButton, SwipeableDrawer } from '@mui/material'
import MenuItems from 'components/nav-bar/components/menuItems'
import { MenuData, UseAuth } from 'hooks'
import defaultTheme from 'lib/theme/default'

interface DrawerNavProps {
  open: boolean
  closeDrawer: () => void
  menuData: MenuData
  paddingLeft: number
}

const DrawerNav = ({
  open,
  closeDrawer,
  menuData,
  paddingLeft,
}: DrawerNavProps) => {
  const { isAuth } = UseAuth()
  const { title: menuTitle, menu: menuItems } = menuData

  return (
    <SwipeableDrawer open={open} onClose={closeDrawer} onOpen={closeDrawer}>
      <List
        component="nav"
        sx={{
          width: '100%',
          maxWidth: '95vw',
          minWidth: 300,
          pt: '0px',
        }}
      >
        <ListItemButton
          sx={{ backgroundColor: '#281705', pointerEvents: 'none' }}
        >
          <ListItemText
            sx={{ my: 0 }}
            primary={menuTitle}
            primaryTypographyProps={{
              fontWeight: 'bold',
              variant: 'h5',
              color: defaultTheme.colors.orange,
            }}
          />
        </ListItemButton>
        <Divider />
        {isAuth && (
          <MenuItems
            menuItems={menuItems}
            paddingLeft={paddingLeft}
            closeMenu={closeDrawer}
          />
        )}
      </List>
    </SwipeableDrawer>
  )
}

export default DrawerNav
