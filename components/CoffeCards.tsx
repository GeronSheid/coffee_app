'use client'
import React, { useEffect, useState } from 'react'
import { CoffeeCard, ICoffeeCard } from './CoffeeCard'
import { getCoffees } from '@/api/coffees'
import { Skeleton } from './ui/skeleton'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'



export const CoffeCards = () => {
    const [coffees, setCoffees] = useState<ICoffeeCard[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const loadCoffees = async () => {
            setIsLoading(true)
            try {
                const coffeeData = await getCoffees(1, 10)
                setCoffees(coffeeData)
            } catch (e) {
                console.log('Произошла ошибка', e)
            } finally {
                setIsLoading(false)
            }
        }

        loadCoffees()
    }, [])

    return (
        <div className='flex flex-col h-[100%]'>
            <div className='grid grid-cols-3 gap-6 flex-auto'>
                {
                    isLoading 
                        ?
                    <>
                        {Array.from({length: 6}).map((_, index) => <Skeleton key={index} className='w-[100%] min-h-60'/>)}
                    </>
                        :
                    <>
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
                    </>
                }
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
