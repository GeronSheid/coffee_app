import { ICoffeeCard } from "@/components/CoffeeCard";
import apiClient from "./axios";

export const getCoffees = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await apiClient.get(`/coffees`, {
            params: {page, limit}
        })
        console.log(response)
        return response.data
    } catch (e) {
        console.log('Ошибка!', e)
    }
    
}

export const getCoffeesNext = async (page: number = 1, limit: number = 10) => {
    const url = `https://coffee-app-mk5d.vercel.app/api/coffees?page=${page}&limit=${limit}`
    fetch(url, {method: 'GET'})
        .then(res => {
            console.log('without axios',res.json())
        })
}

export const addCoffee = async (body: ICoffeeCard) => {
    try {
        const res = await apiClient.post('/coffees', {...body})
        return res.data
    } catch (e) {
        console.log('Ошибка!', e)
    }
}