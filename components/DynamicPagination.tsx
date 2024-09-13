import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'

interface IPagination {
    currentPage: number
    totalPages: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const DynamicPagination: React.FC<IPagination> = ({currentPage, totalPages, setPage}) => {

    const handlePrev = () => {
        if(currentPage === 1) {
            return
        }
        setPage(prev => prev - 1)
    }

    const handleNext = () => {
        if(currentPage > totalPages - 1) {
            return
        }
        setPage(prev => prev + 1)
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handlePrev()} />
                </PaginationItem>
                {Array.from({length: totalPages}).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink isActive={index === currentPage - 1} onClick={() => setPage(index)} >{index + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext onClick={() => handleNext()} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
