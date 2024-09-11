'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'

export interface ICoffeeCard {
    id: number
    coffee_title: string
    coffee_description: string
    image_src?: string
    processing_type: string
    descriptors: string[]
}

const processingTypeMap: Record<string, string> = {
    NATURAL: 'Натуральная',
    WASHED: 'Мытая',
    HONEY: 'Хани',
    ANAEROBIC: 'Анаэробная',
    WETHULLED: 'Вет Халл',
};

export const CoffeeCard: React.FC<ICoffeeCard> = ({
    coffee_title,
    coffee_description,
    processing_type,
    descriptors,
    image_src
}) => {
    useEffect(() => {console.log(processing_type)})
    return (
        <Card className='w-[100%]'>
            <CardHeader>
                <CardTitle>{coffee_title}</CardTitle>
            </CardHeader>
            <CardContent>
                {image_src 
                ?
                <Image 
                    width={150} 
                    height={150} 
                    src={image_src} 
                    alt={coffee_title}
                />
                :
                null
                }
                <CardDescription>
                    {coffee_description}
                </CardDescription>
                <span>{processingTypeMap[processing_type]}</span>
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
