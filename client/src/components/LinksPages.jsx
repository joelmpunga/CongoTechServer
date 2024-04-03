import React from 'react'

export default function LinksPages({ title, children }) {
    return (
        <div className='flex justify-between mx-4'>
            <h2 className='font-bold text-[20px] text-gray-700'> {title} </h2>
            <div className='text-gray-500'>
                {
                    children
                }
                <span className='text-blue-600'> {" / "+title.split(' ')[0]} </span>
            </div>
        </div>
    )
}
