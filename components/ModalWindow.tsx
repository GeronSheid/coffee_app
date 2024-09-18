'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { addCoffee } from '@/api/coffees'
import { ICoffeeCard } from './CoffeeCard'

const coffeeFormSchema = z.object({
    coffee_title: z.string().min(5, {message: 'Короткое слишком название'}).max(30),
    coffee_description: z.string().min(0).max(200),
    descriptors: z.array(z.string()).optional(),
    processing_type: z.string().optional()
})

export const ModalWindow = () => {

    const form = useForm<z.infer<typeof coffeeFormSchema>>({
        resolver: zodResolver(coffeeFormSchema),
        defaultValues:{
            coffee_title: 'Название',
            coffee_description: 'Описание'
        }
    })

    const [newDescriptor, setNewDescriptor] = useState('')

    const addDescriptor = () => {
        if(newDescriptor) {
            form.setValue('descriptors', [...(form.getValues('descriptors') || []), newDescriptor])
            setNewDescriptor('')
        }
    }

    const deleteDescriptor = (index: number) => {
        const descriptors = form.getValues('descriptors') || [];
        form.setValue('descriptors', descriptors.filter((_, i) => i !== index))
    }

    const onSubmit = (values: z.infer<typeof coffeeFormSchema>) => {
        console.log(values)
        addCoffee(values as ICoffeeCard)
    }


    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name={'coffee_title'}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Название
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Название' {...field}/>
                            </FormControl>
                            {form.formState.errors.coffee_title && form.formState.errors.coffee_title?.message}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'coffee_description'}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Описание
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Описание' {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'descriptors'}
                    render={() => (
                        <FormItem>
                            <FormLabel>
                                Дескрипторы
                            </FormLabel>
                                <Input 
                                    placeholder='Описание' 
                                    value={newDescriptor}
                                    onChange={(e) => setNewDescriptor(e.target.value)}
                                />
                            <Button type='button' onClick={addDescriptor}>Добавить дескриптор</Button>
                            <ul>
                                {form.getValues('descriptors')?.map((item, index) => (
                                    <li key={index}>
                                        <Button type='button' onClick={() => {
                                            deleteDescriptor(index)
                                            console.log(form.getValues('descriptors'))
                                        }}>{item}</Button>
                                    </li>
                                ))}
                            </ul>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Отправить</Button>
            </form>
        </Form>
    )
}
