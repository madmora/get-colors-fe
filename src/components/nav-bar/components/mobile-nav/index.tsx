import { MenuData } from 'hooks'
import { useState, useCallback } from 'react'
import DrawerNav from './drawerNav'
import ToolbarNav from './toolbarNav'

interface MobileNavProps {
  menuData: MenuData
}

const MobileNav = ({ menuData }: MobileNavProps) => {
  const { title } = menuData
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const openDrawer = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  return (
    <>
      <ToolbarNav openDrawer={openDrawer} title={title} />
      <DrawerNav
        open={drawerOpen}
        closeDrawer={closeDrawer}
        menuData={menuData}
        paddingLeft={16}
      />
    </>
  )
}

export default MobileNav
