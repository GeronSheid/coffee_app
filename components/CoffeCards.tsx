'use client'
import React, { useEffect, useState } from 'react'
import { CoffeeCard, ICoffeeCard } from './CoffeeCard'
import { getCoffees } from '@/api/coffees'
import { Skeleton } from './ui/skeleton'
import { DynamicPagination } from './DynamicPagination'
import { TopBar } from './TopBar'
import { ModalWindow } from './ModalWindow'



export const CoffeCards = () => {
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState(0)
    const [coffees, setCoffees] = useState<ICoffeeCard[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        const loadCoffees = async () => {
            setIsLoading(true)
            try {
                const coffeeData = await getCoffees(page)
                setCoffees(coffeeData.data)
                setPages(coffeeData.pages.total)
            } catch (e) {
                console.log('Произошла ошибка', e)
            } finally {
                setIsLoading(false)
            }
        }
        loadCoffees()
    }, [page])



    return (
        <>
            {show && <ModalWindow closeFunc={() => setShow(false)}/>}
            <div className='flex flex-col min-h-[80vh]'>
                <TopBar
                    btnText='Добавить кофе'
                    btnFunc={() => setShow(true)}
                >
                    {'Ни-Ху-Я'}
                </TopBar>
                <div className='grid grid-cols-3 gap-6 flex-auto'>
                    {
                        isLoading
                            ?
                            <>
                                {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className='w-[100%] min-h-60' />)}
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
                <>
                    {isLoading
                        ?
                        <Skeleton className='w-8 h-5' />
                        :
                        <DynamicPagination
                            currentPage={page}
                            totalPages={pages}
                            setPage={setPage}
                        />
                    }
                </>

            </div>
        </>
    )
}
