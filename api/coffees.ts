import { ICoffeeCard } from "@/components/CoffeeCard";
import apiClient from "./axios";

export const getCoffees = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiClient.get(`/coffees`, {
            params: {page, limit}
        })
        return response.data
    } catch (e) {
        console.log('Ошибка!', e)
    }
    
}

export const addCoffee = async (body: ICoffeeCard) => {
    try {
        const res = await apiClient.post('/coffees', {...body})
        return res.data
    } catch (e) {
        console.log('Ошибка!', e)
    }
}