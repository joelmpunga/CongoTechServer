import React from 'react'
import LinksPages from './LinksPages'
import ItemLinkPage from '../ui/ItemLinkPage'

export default function WorkSpace({ message, children }) {
    return (
        <div>
            <LinksPages title="Sous dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="Dossiers" path="/folders" />
            </LinksPages>
            <span className='ml-6'> {message} </span>
            <hr />
            <div className='w-[90%] max-h-80 overflow-y-auto flex flex-wrap flex-grow mx-auto my-8'>
                {
                    children
                }
            </div>
        </div>
    )
}
