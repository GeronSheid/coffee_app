'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'

export interface ICoffeeCard {
    title: string
    description: string
    image_src?: string
    processing_type: 'Натуральная' | 'Мытая' | 'Хани' | 'Анаэробная' | 'Вет халл'
    descriptors: string[]
}

export const CoffeeCard: React.FC<ICoffeeCard> = ({
    title,
    description,
    processing_type,
    descriptors,
    image_src
}) => {
    return (
        <Card className='w-[100%]'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {image_src 
                ?
                <Image 
                    width={150} 
                    height={150} 
                    src={image_src} 
                    alt={title}
                />
                :
                null
                }
                <CardDescription>
                    {description}
                </CardDescription>
                <span>{processing_type}</span>
                <ul>
                    {descriptors.map(descriptor => 
                        <li key={descriptor}>
                            {descriptor}
                        </li>
                    )}
                </ul>
            </CardContent>
            <CardFooter>
                    Тут будет кнопка!
            </CardFooter>
        </Card>
    )
}
