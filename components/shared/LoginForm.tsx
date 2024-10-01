'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LoginFunc } from '@/api/authAPI'

export const LoginForm = () => {

    //Создаем схему с помощью Zod
    const LoginFormSchema = z.object({
        email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
        password: z
            .string()
            .min(8, { message: 'Be at least 8 characters long' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
            })
            .trim(),
    })
    //Создаем тип основываясь на схеме Zod
    type LoginFormData = z.infer<typeof LoginFormSchema>;
    //Используем React Hook Form
    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema)
    })
    //Деструктуризируем form для удобства
    const {control, handleSubmit} = form;
    // const login = (data: LoginFormData) => {

    // }
    //Функция которая буде отрабатывать при отправке формы
    const onSubmit = (data: LoginFormData) => {
        LoginFunc(data)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center w-[100%]'>
                <FormField
                        control={control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Войти</Button>
                </form>
            </Form>
        </div>
    )
}
