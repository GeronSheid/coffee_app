import { Container } from '@/components/index'
import { CoffeCards } from '@/components/CoffeCards'

const page = () => {

    return (
        <>
            <section>
                <Container>
                    <h1 className='text-xl font-extrabold mb-8'>Список кофейных зерен и блендов</h1>
                    {/* <ModalWindow/> */}
                    <CoffeCards/>
                </Container>
            </section>
        </>
    )
}

export default page