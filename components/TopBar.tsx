'use client'
import React from 'react'
import { Button } from './ui/button'

// const mockData: ICoffeeCard = {
//     coffee_title: 'Японская Кения',
//     coffee_description: 'Как Ясукэ, но всё же существует',
//     descriptors: ['Шоколад', 'Горечь', 'Арбуз'],
//     processing_type: 'WASHED'
// }

interface ITopBar extends React.BaseHTMLAttributes<HTMLDivElement> {
    className?: string
    btnText?: string
    btnFunc?: () => void
}

export const TopBar: React.FC<ITopBar> = ({children, btnText, btnFunc}) => {

    return (
        <div className='w-[100%] flex items-center justify-between mb-8'>
            {children}
            <div>
                {btnText && btnFunc
                ?
                <Button onClick={btnFunc ? () => btnFunc() : undefined}>{btnText}</Button>
                :
                null
                }
            </div>
        </div>
    )
}
