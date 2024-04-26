import React from 'react'
import LinksPages from './LinksPages'
import ItemLinkPage from '../ui/ItemLinkPage'

export default function WorkSpace({ message, children}) {
    return (
        <div className={'flex flex-wrap flex-grow m-5 max-h-90 overflow-x-auto border border-gray-200 shadow-md '}>
            <p className='p-4 border-b border-gray-200 w-full h-14'>{message}</p>
            {
                children
            }
        </div>
    )
}
