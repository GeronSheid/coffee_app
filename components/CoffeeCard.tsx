import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'

export interface ICoffeeCard {
    title: string
    description: string
    image_src: string
    processing_type: 'Натуральная' | 'Мытая' | 'Хани' | 'Анаэробная' | 'Вет халл'
    descriptors: string[]
    taste_profile: {
        sweetness: number,
        bitterness: number,
        sourness: number
    }
}

export const CoffeeCard: React.FC<ICoffeeCard> = ({
    title,
    description,
    processing_type,
    descriptors,
    taste_profile,
    image_src
}) => {
    return (
        <Card className='w-[100%]'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image 
                    width={150} 
                    height={150} 
                    src={image_src} 
                    alt={title}
                />
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
                <ul>
                    {Object.entries(taste_profile).map(taste => 
                        <li key={taste[0]}>
                            <span>{taste[0]}</span>
                            <span>{taste[1]}</span>
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
