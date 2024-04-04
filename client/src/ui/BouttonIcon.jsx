import React from 'react'

export default function BouttonIcon({ imageUrl, msg = "", taille }) {
    return (
        <div className='flex flex-col gap-1'>
            <img src={imageUrl} alt="" className={'w-[80%] mx-auto ' + taille} />
            <h3 className='w-[80%] mx-auto'>{msg}</h3>
        </div>
    )
}
