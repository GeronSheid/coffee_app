import { apiClient } from "./configAxios"

type LoginFormData = {
    email: string;
    password: string;
}

export const LoginFunc = async (body: LoginFormData) => {
    try {
        const response = await apiClient.post(`/auth`, {...body})
        return response.data
    } catch (error) {
        console.log('Ошибка!', error)
    }
}