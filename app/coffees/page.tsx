import { Container } from '@/components/index'
import { CoffeCards } from '@/components/CoffeCards'

const page = () => {
    return (
        <>
            <section className='h-[100%]'>
                <Container>
                    <h1 className='text-xl font-extrabold mb-8'>Список кофейных зерен и блендов</h1>
                    <CoffeCards/>
                </Container>
            </section>
        </>
    )
}

export default page