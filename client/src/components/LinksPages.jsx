import React from 'react'

export default function LinksPages({ title, children }) {
    return (
        <div className='mx-4'>
            <h2 className='font-adamina text-[26px] text-gray-700'> {title} </h2>
            <div className='text-gray-500'>
                {
                    children
                }
                <span className='text-blue-600'> {"/"+title} </span>
            </div>
        </div>
    )
}
