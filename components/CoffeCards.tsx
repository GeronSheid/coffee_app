'use client'
import { GET } from '@/app/api/coffees/route'
import React, { useEffect, useState } from 'react'



export const CoffeCards = () => {
    const [coffes, setCoffees] = useState([])

    const getCoffees = async () => {
        const data = await GET()
        console.log(data)
    }

    useEffect(() => {
        getCoffees()
    }, [])
    return (
        <div>

        </div>
    )
}
