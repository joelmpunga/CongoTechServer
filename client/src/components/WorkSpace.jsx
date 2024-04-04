import React from 'react'
import LinksPages from './LinksPages'
import ItemLinkPage from '../ui/ItemLinkPage'

export default function WorkSpace({ message, children}) {
    return (
        <div className={'w-[90%] flex flex-wrap flex-grow mx-auto my-8 max-h-90 overflow-x-auto'}>
            {
                children
            }
        </div>
    )
}
