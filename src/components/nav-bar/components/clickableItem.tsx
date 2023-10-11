import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import defaultTheme from 'lib/theme/default'
import { useNavigate } from 'react-router-dom'

interface ClickableItemProps {
  text: string
  href: string
  action?: () => void
  closeMenu?: () => void
  nestedLevel: number
  paddingLeft: number
  activeMenuStyle: object
}

const ClickableItem = ({
  text,
  href,
  action,
  closeMenu,
  nestedLevel,
  paddingLeft,
  activeMenuStyle,
}: ClickableItemProps) => {
  const navigate = useNavigate()

  return (
    <ListItemButton
      onClick={() => {
        closeMenu && closeMenu()
        action && action()
        href && navigate(href)
      }}
      sx={{
        paddingLeft: `${paddingLeft * nestedLevel}px`,
        py: '0px',
        color: '#281705',
        ...activeMenuStyle,
      }}
    >
      <ListItemIcon sx={{ minWidth: '0px', pr: 1, pl: 1 }}>
        <CircleIcon
          sx={{ fontSize: '10px', color: defaultTheme.colors.orange }}
        />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  )
}

export default ClickableItem
