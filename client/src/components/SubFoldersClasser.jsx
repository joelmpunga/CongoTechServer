import React from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import BouttonIcon from '../ui/BouttonIcon'
export default function SubFoldersClasser({ idFolder }) {
    return (
        <>
            <HeaderWorkspace title="Sous dossiers" message="Parcourez les sous dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="Dossiers" path="/folders" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les sous dossiers">
                <Folder title="Folder 1" isToClass = {true}/>
                <Folder title="Folder 2" isToClass = {true}/>
                <Folder title="Folder 3" isToClass = {true}/>
                <Folder title="Folder 4" isToClass = {true}/>
                <Folder title="Folder 5" isToClass = {true}/>
                <Folder title="Folder 6" isToClass = {true}/>
            </WorkSpace>
            <div className='w-[95%] flex justify-end gap-2'>
                <BouttonIcon imageUrl="../src/assets/images/cancel-btn.svg" msg="Annuler" taille="h-10 w-10"/>
            </div>
        </>
    )
}
