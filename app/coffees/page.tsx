'use client'
import { Container } from '@/components/index'
import { CoffeeCard, type ICoffeeCard } from '@/components/CoffeeCard'
import React from 'react'

const mockData: ICoffeeCard[] = [
    {
        title: 'Под эспрессо',
        description: 'Бразилия под эспрессо',
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
                    <div className='grid grid-cols-3'>
                        {mockData.map(coffee => (
                            <CoffeeCard 
                                key={coffee.title}
                                title={coffee.title}
                                description={coffee.description}
                                processing_type={coffee.processing_type}
                                descriptors={coffee.descriptors}
                                image_src={coffee.image_src}
                            />
                        ))}
                    </div>
                </Container>
            </section>
        </>
    )
}

export default page