import { Container } from '@/components/index'
import { CoffeeCard, type ICoffeeCard } from '@/components/CoffeeCard'
import React, { useEffect } from 'react'
import { CoffeCards } from '@/components/CoffeCards'

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