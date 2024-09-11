import React from 'react'
import { NavigationMenu, NavigationMenuList } from './ui/navigation-menu'

interface INavMenu {
  children: React.ReactNode   
}

export const NavMenu: React.FC<INavMenu> = ({children}) => {
  return (
    <NavigationMenu>
        <NavigationMenuList>
            {children}
        </NavigationMenuList>
    </NavigationMenu>
  )
}