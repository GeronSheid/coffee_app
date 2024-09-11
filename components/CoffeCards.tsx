'use client'
import { GET } from '@/app/api/coffees/route'
import React, { useEffect, useState } from 'react'
import { CoffeeCard, ICoffeeCard } from './CoffeeCard'



export const CoffeCards = () => {
    const [coffees, setCoffees] = useState<ICoffeeCard[]>([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/coffees')
            const data = await res.json()
            console.log(data)
            setCoffees(data)
        }
        getUsers()
    }, [])
    return (
        <div className='grid grid-cols-3'>
            {coffees.map(coffee => (
                            <CoffeeCard
                                key={coffee.id}
                                id={coffee.id}
                                coffee_title={coffee.coffee_title}
                                coffee_description={coffee.coffee_description}
                                descriptors={coffee.descriptors}
                                processing_type={coffee.processing_type}
                            />
                        ))}
        </div>
    )
}
