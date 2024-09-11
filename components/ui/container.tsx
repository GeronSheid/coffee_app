import React from 'react'

interface IContainer extends React.HTMLAttributes<HTMLDivElement> {

}

export const Container: React.FC<IContainer> = ({children}) => {
    return (
        <div className='w-10/12 mx-auto my-0 px-3'>
            {children}
        </div>
    )
}