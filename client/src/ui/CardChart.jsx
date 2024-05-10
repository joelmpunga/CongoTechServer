import React from 'react'

export default function CardChart({title, number, descriptions}) {
    return (
        <div className='border bg-slate-200 border-blue-800 rounded-2xl border-spacing-9 h-[40Opx] w-[100%] p-10 shadow-2xl'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[30px] text-blue-700'>{title}</h1>
                <h1 className='text-[60px] text-blue-900 font-bold'>{number} <span className='text-[45px] text-blue-900'>{descriptions}</span></h1>
                <h1 className='text-blue-900'>Mois en cours</h1>
            </div>
        </div>
    )
}
