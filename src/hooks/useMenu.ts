import { AppConstants } from 'utils/constants'

export interface Menu {
  menuKey?: string
  text: string
  href?: string
  action?: () => void
  children?: Menu[]
  authLevel?: string[]
}

export interface MenuData {
  title: string
  menu: Menu[]
}

export const useMenu = () => {
  const menu: MenuData = {
    title: 'Get Colors',
    menu: [
      {
        menuKey: 'user',
        text: 'Usuarios',
        children: [
          {
            authLevel: AppConstants.ACCESS_POLICY_ADMIN,
            text: 'Mantenimiento de Usuarios',
            href: AppConstants.ROUTE_USER_MANAGEMENT,
          },
          {
            text: 'Cambiar Contraseña',
            href: AppConstants.ROUTE_CHANGE_PASSWORD,
          },
        ],
      },
      {
        menuKey: 'acerca',
        text: 'Acerca',
        href: AppConstants.ROUTE_ABOUT,
      },
    ],
  }

  const subMenu: Menu[] = [
    // {
    //   menuKey: 'perfil',
    //   text: 'Perfil',
    //   href: '#',
    // },
    // {
    //   menuKey: 'logout',
    //   text: 'Logout',
    //   action: logout,
    // },
  ]

  return { menu, subMenu }
}
