'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'


export const AuthCard = () => {
    return (
        <div className='mx-auto w-1/3'>
            <Tabs defaultValue='login' className='flex flex-col items-center border border-white rounded-xl p-6'>
                <TabsList>
                    <TabsTrigger value='login'>Войти</TabsTrigger>
                    <TabsTrigger value='register'>Зарегистрироваться</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                    <LoginForm />
                </TabsContent>
                <TabsContent value='register'>
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}
