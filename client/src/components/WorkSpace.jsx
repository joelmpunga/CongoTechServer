import React from 'react'
import LinksPages from './LinksPages'
import ItemLinkPage from '../ui/ItemLinkPage'

export default function WorkSpace({ message, children, onClick}) {
    return (
        <div onClick={onClick} className={'flex flex-wrap flex-grow  max-h-90 overflow-x-auto border-t border-gray-200 '}>
            <p className='p-4 border-b border-gray-200 w-full h-14'>{message}</p>
            {
                children
            }
        </div>
    )
}
