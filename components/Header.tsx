import React from 'react'
import Link from 'next/link'

import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { Container } from './ui/container'
import { NavMenu } from './NavMenu'

const mockList = [
    {href: '/', label: 'Главная'},
    {href: '/recipes', label: 'Список рецептов'},
    {href: '/coffees', label: 'Список кофе'},
    {href: '/contacts', label: 'Контакты'}
]

export const Header = () => {
    return (
        <header className='flex items-center border-solid border-b-white border-b mb-6'>
            <Container>
                <div className='flex items-center gap-6 h-20'>
                    <Link href={'#'}>
                        Coffee App
                    </Link>
                    <NavMenu>
                        {mockList.map(item => 
                        <NavigationMenuItem key={item.label}>
                            <Link href={item.href} passHref legacyBehavior>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {item.label}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>)}
                    </NavMenu>
                    
                </div>
            </Container>
        </header>
    )
}