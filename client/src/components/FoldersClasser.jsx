import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import BouttonPagination from '../ui/BouttonPagination'
import Popup from './Popup'
import BouttonIcon from '../ui/BouttonIcon'


export default function FoldersClasser() {
    return (
        <>
            <HeaderWorkspace title="Classer Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <div className='flex '>
                    <Folder title="Dossier 1" />
                    <Folder title="Dossier 2" />
                    <Folder title="Dossier 3" />
                    <Folder title="Dossier 4" />
                    <Folder title="Dossier 5" />
                    <Folder title="Dossier 6" />
                    <Folder title="Dossier 7" />
                    <Folder title="Dossier 8" />
                    <Folder title="Dossier 9" />
                    <Folder title="Dossier 10" />
                    <Folder title="Dossier 11" />
                    <Folder title="Dossier 12" />
                    <Folder title="Dossier 13" />
                    <Folder title="Dossier 14" />
                    <Folder title="Dossier 15" />
                    <Folder title="Dossier 16" />
                    <Folder title="Dossier 17" />
                </div>
            </WorkSpace>
            <div className='mr-20 flex justify-end gap-2'>
                <BouttonPagination />
            </div>
            <Popup />
            <div className='w-[95%] flex justify-end gap-2'>
                <BouttonIcon imageUrl="../src/assets/images/cancel-btn.svg" msg="Annuler" taille="h-10 w-10"/>
            </div>
        </>
    )
}
