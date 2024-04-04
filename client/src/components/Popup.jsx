import React from 'react'
import BouttonIcon from '../ui/BouttonIcon'

export default function Popup() {
    return (
        <div className='flex gap-5 m-10 bg-green-100 w-[50%] h-60 border-l-green-600 rounded-r-xl'>
            <div className='bg-green-600 w-3'></div>
            <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" taille="h-20 w-20"/>
            <div className='p-10 flex gap-5'>
                <div className='flex flex-col gap-4 text-[22px]'>
                    <h4>Informations</h4>
                    <span className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti blanditiis expedita harum amet consequatur aut suscipit ab culpa dolorum ipsam neque saepe cupiditate quam voluptates, voluptas error totam perferendis est.</span>
                </div>
            </div>
        </div>
    )
}
