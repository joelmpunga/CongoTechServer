import React from 'react'

export default function BouttonPagination() {
    return (
        <div className='gap-2'>
            <button className='bg-gray-300 w-10 h-10 border border-gray-500 rounded-xl mx-1'><img src="../src/assets/images/arrow-right.svg" alt="" className='m-auto w-[50%]' /></button>
            <button className='bg-blue-600 w-10 h-10 rounded-xl mx-1'><img src="../src/assets/images/arrow-left.svg" alt="" className='m-auto w-[50%]' /></button>
        </div>
    )
}
