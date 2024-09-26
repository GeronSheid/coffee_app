'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SignInHandler } from '@/app/actions/auth'

export const SignInForm = () => {

    //Создаем схему с помощью Zod
    const SignInFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .trim(),
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
    type SignInFormData = z.infer<typeof SignInFormSchema>;
    //Используем React Hook Form
    const form = useForm<SignInFormData>({
        resolver: zodResolver(SignInFormSchema)
    })
    //Деструктуризируем form для удобства
    const {control, handleSubmit} = form;
    //Функция которая буде отрабатывать при отправке формы
    const onSubmit = (data: SignInFormData) => {
        console.log(data)
        SignInHandler(data)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                        control={control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Имя пользователя</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                    <Button type='submit'>Отправить</Button>
                </form>
            </Form>
        </div>
    )
}
