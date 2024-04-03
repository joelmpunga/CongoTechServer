import React from 'react'
import LinksPages from './LinksPages'
import ItemLinkPage from '../ui/ItemLinkPage'
export default function HeaderWorkspace({message,title,children}) {
    return (
        <div>
            <LinksPages title={title}>
                {
                    children
                }
            </LinksPages>
            <span className='ml-6'> {message} </span>
            <hr />
        </div>
    )
}
