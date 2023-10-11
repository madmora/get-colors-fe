import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItems from 'components/nav-bar/components/menuItems'
import { Box } from '@mui/material'
import defaultTheme from 'lib/theme/default'
import { Menu as MenuType } from 'hooks'

interface MenuButtonProps {
  activeMenuStyle?: object
  menuItems: MenuType[]
  text: string
  paddingLeft: number
}

const MenuButton = ({
  menuItems,
  text,
  paddingLeft,
  activeMenuStyle,
}: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={activeMenuStyle}>
        <Button
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            color: defaultTheme.colors.orange,
            display: 'block',
            fontWeight: 'bold',
          }}
        >
          {text}
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          role: 'listbox',
        }}
      >
        <Box>
          <MenuItems
            menuItems={menuItems}
            paddingLeft={paddingLeft}
            desktop
            closeMenu={handleClose}
          />
        </Box>
      </Menu>
    </>
  )
}
export default MenuButton
