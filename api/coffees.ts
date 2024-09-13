import apiClient from "./axios";

export const getCoffees = async (page: number, limit: number) => {
    const response = await apiClient.get(`/coffees`, {
        params: {page, limit}
    })
    return response.data.data
}