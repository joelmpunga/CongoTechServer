import React from 'react'

export default function CardChart({ title, number, descriptions, subStat, stat1, stat2, titleStat1, titleStat2 }) {
    return (
        <div className='border bg-white hover:bg-gray-200 hover:h-[95%] hover:pt-8 hover:font-bold hover:w-[55%] border-blue-800 rounded-2xl border-spacing-9 h-[90%] w-[50%] p-10 shadow-2xl'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[20px] text-blue-700'>{title}</h1>
                <h1 className='text-[30px] text-blue-900 font-bold'>{number} <span className='text-[20px] text-blue-900'>{descriptions}</span></h1>
                <div className='h-10'>
                    {
                        subStat && (
                            <div className='flex justify-between'>
                                <div className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-blue-600">
                                    <h1 className='text-blue-900 font-bold'>{stat1}</h1>
                                    <h1 className='text-blue-900'>{titleStat1}</h1>
                                </div>
                                <div className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-blue-600">
                                    <h1 className='text-blue-900 font-bold'>{stat2}</h1>
                                    <h1 className='text-blue-900'>{titleStat2}</h1>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
