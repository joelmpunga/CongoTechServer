import React from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'

export default function FoldersWorkspace() {
    return (
        <>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <Folder title="Folder 1" />
                <Folder title="Folder 2" />
                <Folder title="Folder 3" />
                <Folder title="Folder 4" />
                <Folder title="Folder 5" />
                <Folder title="Folder 6" />
            </WorkSpace>
        </>
    )
}
