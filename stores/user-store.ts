import {createStore} from 'zustand';

//Тип для объекта пользователя
type User = {
    id: number,
    email: string
}
//Тип для состояния 
type UserState = {
    user: User | null
    
}
//Тип для действий над состоянием
type UserActions = {
    setUser: (user: User) => void
    clearUser: () => void
}
//Тип для всего хранилища
type UserStore = UserState & UserActions
//Начальное состояние по умолчанию
const defaultUserStore: UserState = {
    user: null
}

export const createUserStore = (
    initState: UserState = defaultUserStore
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        setUser: (user: User) => set(() => ({user})),
        clearUser: () => set(() => ({user: null}))
    })) 
}