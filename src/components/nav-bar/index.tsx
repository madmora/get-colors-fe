import Primitives from 'primitives'
import MobileNav from './components/mobile-nav'
import DesktopNav from './components/desktop-nav'
import { useMenu } from 'hooks'

const Navbar = () => {
  const { menu } = useMenu()
  return (
    <>
      <Primitives.Box display={['block', 'block', 'none']}>
        <MobileNav menuData={menu} />
      </Primitives.Box>
      <Primitives.Box display={['none', 'none', 'block']}>
        <DesktopNav menuData={menu} />
      </Primitives.Box>
    </>
  )
}

export default Navbar
