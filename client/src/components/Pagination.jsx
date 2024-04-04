import React from 'react'
import BouttonPagination from '../ui/BouttonPagination'

export default function Pagination() {
    return (
        <div>
            <hr />
            <div className='flex justify-between p-10 gap-4'>
                <h2 className='font-bold font-light'>1-3 of 5</h2>
                <BouttonPagination/>
            </div>
        </div>
    )
}
