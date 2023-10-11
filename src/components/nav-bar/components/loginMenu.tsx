import { AccountCircle } from '@mui/icons-material'
import { Box, IconButton, Menu as MUIMenu } from '@mui/material'
import { Menu } from 'hooks'
import defaultTheme from 'lib/theme/default'
import Primitives from 'primitives'
import { useState } from 'react'
import MenuItems from './menuItems'

interface LoginMenuProps {
  subMenu: Menu[]
}

const LoginMenu = ({ subMenu }: LoginMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Primitives.Box>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle
          sx={{
            color: defaultTheme.colors.orange,
            height: '32px',
            width: '32px',
          }}
        />
      </IconButton>

      <MUIMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          role: 'listbox',
        }}
      >
        <Box>
          <MenuItems
            menuItems={subMenu}
            paddingLeft={0}
            desktop
            closeMenu={handleClose}
          />
        </Box>
      </MUIMenu>
    </Primitives.Box>
  )
}

export default LoginMenu
