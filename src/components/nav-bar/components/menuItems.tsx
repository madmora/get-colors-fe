import { Menu, UseAuth } from 'hooks'
import defaultTheme from 'lib/theme/default'
import { map } from 'ramda'
import { useLocation } from 'react-router-dom'
import { hasData, isAuthorized, menuIsActive } from 'utils'
import ClickableItem from './clickableItem'
import NestedItems from './nestedItems'

interface MenuItemsProps {
  menuItems: Menu[]
  nestedLevel?: number
  paddingLeft: number
  desktop?: boolean
  closeMenu?: () => void
}

const MenuItems = ({
  menuItems,
  nestedLevel = 1,
  paddingLeft,
  desktop,
  closeMenu,
}: MenuItemsProps) => {
  const location = useLocation()
  const { auth } = UseAuth()
  return (
    <>
      {map(
        ({
          text,
          href = '',
          action,
          children,
          menuKey = '',
          authLevel,
        }: Menu): React.ReactNode => {
          const activeMenuStyle = menuIsActive(location.pathname, menuKey)
            ? { color: defaultTheme.colors.orange }
            : {}

          if (authLevel && !isAuthorized(auth?.user.rol || '', authLevel)) {
            return null
          }

          return hasData(children) ? (
            <NestedItems
              menuItems={children || []}
              text={text}
              nestedLevel={nestedLevel}
              paddingLeft={paddingLeft}
              key={text}
              desktop={desktop}
              closeMenu={closeMenu}
              activeMenuStyle={activeMenuStyle}
            />
          ) : (
            <ClickableItem
              text={text}
              href={href}
              action={action}
              nestedLevel={nestedLevel}
              paddingLeft={paddingLeft}
              key={text}
              closeMenu={closeMenu}
              activeMenuStyle={activeMenuStyle}
            />
          )
        },
        menuItems,
      )}
    </>
  )
}

export default MenuItems
