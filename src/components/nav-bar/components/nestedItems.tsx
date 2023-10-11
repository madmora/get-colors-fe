import { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { Collapse, ListItemButton } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import MenuItems from 'components/nav-bar/components/menuItems'
import defaultTheme from 'lib/theme/default'
import { Menu } from 'hooks'

interface NestedItemsProps {
  menuItems: Menu[]
  text: string
  nestedLevel: number
  paddingLeft: number
  desktop?: boolean
  closeMenu?: () => void
  activeMenuStyle: object
}

const NestedItems = ({
  menuItems,
  text,
  nestedLevel,
  paddingLeft,
  desktop,
  closeMenu,
  activeMenuStyle,
}: NestedItemsProps) => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <List component="div" disablePadding>
      <ListItemButton
        sx={{
          paddingLeft: `${paddingLeft * nestedLevel}px`,
          py: '0px',
        }}
        onClick={toggleMenu}
      >
        {open ? (
          <ExpandLess sx={{ color: defaultTheme.colors.orange }} />
        ) : (
          <ExpandMore sx={{ color: defaultTheme.colors.orange }} />
        )}
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontWeight: 'bold',
            color: '#281705',
            ...activeMenuStyle,
          }}
        />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItems
            menuItems={menuItems}
            nestedLevel={nestedLevel + 1}
            paddingLeft={paddingLeft}
            desktop={desktop}
            closeMenu={closeMenu}
          />
        </List>
      </Collapse>
    </List>
  )
}

export default NestedItems
