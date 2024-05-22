import React from 'react'

export default function LinksPages({ title, children,actualPage }) {
    return (
        <div className='mx-4'>
            <h2 className='font-adamina text-[26px] text-gray-700'> {title} </h2>
            <div className='text-gray-500'>
                {
                    children
                }
                <span className='text-gray-600'> {"/"+actualPage} </span>
            </div>
        </div>
    )
}
