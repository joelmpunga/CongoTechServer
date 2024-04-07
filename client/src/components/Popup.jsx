import React from 'react'
import BouttonIcon from '../ui/BouttonIcon'

export default function Popup() {
    return (
        <div className='flex gap-5 m-10 bg-green-100 w-[50%] h-40 border-l-green-600 rounded-r-xl'>
            <div className='bg-green-600 w-3'></div>
            <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" taille="h-20 w-20"/>
            <div className='p-10 flex gap-5'>
                <div className='flex flex-col gap-4'>
                    <h4>Archiver les fichiers</h4>
                    <span className='text-gray-500'>Document ou mail memorisé avec succes! Veuillez maintenant selectionner le dossiers de destination!</span>
                </div>
            </div>
        </div>
    )
}
