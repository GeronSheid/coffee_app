import { Container } from '@/components/index'
import { CoffeeCard, type ICoffeeCard } from '@/components/CoffeeCard'
import React, { useEffect } from 'react'
import { CoffeCards } from '@/components/CoffeCards'

const mockData: ICoffeeCard[] = [
    {   
        id: 1,
        coffee_title: 'Под эспрессо',
        coffee_description: 'Бразилия под эспрессо',
        processing_type: 'Мытая',
        descriptors: ['Орех', 'Шоколад', 'Корица'],
        image_src: ''
    }
]

const page = () => {
    return (
        <>
            <section>
                <Container>
                    <h1 className='text-xl font-extrabold'>Список кофейных зерен и блендов</h1>
                    <CoffeCards/>
                </Container>
            </section>
        </>
    )
}

export default page