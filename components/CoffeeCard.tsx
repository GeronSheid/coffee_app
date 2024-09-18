'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'

export interface ICoffeeCard {
    id?: number
    coffee_title: string
    coffee_description: string
    image_src?: string
    processing_type?: string
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
        <Card className='w-[100%] max-h-80'>
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
                <CardDescription className='flex flex-col gap-3'>
                    {coffee_description}
                    <div className='flex gap-2 items-center'>
                        <b className='text-stone-950'>Способ обработки:</b>
                        <span>{processing_type ? processingTypeMap[processing_type] : 'Натуральная'}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <b className='text-stone-950'>Дескрипторы:</b>
                        <ul className='flex gap-2 text-sm'>
                            {descriptors.map(descriptor => 
                                <li key={descriptor}>
                                    {descriptor}
                                </li>
                            )}
                        </ul>
                    </div>
                </CardDescription>
                
            </CardContent>
            <CardFooter>
                    Тут будет кнопка!
            </CardFooter>
        </Card>
    )
}
