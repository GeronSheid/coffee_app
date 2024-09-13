'use client'
import React, { useEffect, useState } from 'react'
import { CoffeeCard, ICoffeeCard } from './CoffeeCard'
import { getCoffees } from '@/api/coffees'
import { Skeleton } from './ui/skeleton'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { DynamicPagination } from './DynamicPagination'



export const CoffeCards = () => {
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState(0)
    const [coffees, setCoffees] = useState<ICoffeeCard[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const loadCoffees = async () => {
            setIsLoading(true)
            try {
                const coffeeData = await getCoffees(page, 1)
                setCoffees(coffeeData.data)
                setPages(coffeeData.pages.total)
            } catch (e) {
                console.log('Произошла ошибка', e)
            } finally {
                setIsLoading(false)
            }
        }
        console.log(page)
        loadCoffees()
    }, [page])

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
            <DynamicPagination
                currentPage={page}
                totalPages={pages}
                setPage={setPage}
            />
        </div>
    )
}
