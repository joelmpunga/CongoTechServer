import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import BouttonPagination from '../ui/BouttonPagination'
import Popup from './Popup'
import BouttonIcon from '../ui/BouttonIcon'
import { Link } from 'react-router-dom'


export default function FoldersClasser() {
    return (
        <>
            <HeaderWorkspace title="Classer Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <div className='flex w-[600px]'>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 1" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 2" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 3" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 4" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 5" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 6" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 7" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 8" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 9" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 10" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 11" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 12" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 13" />
                    </Link>
                    <Link to="/subfolderclasser">
                        <Folder title="Dossier 14" />
                    </Link>
                </div>
            </WorkSpace>
            <div className='flex justify-end gap-2'>
                <BouttonPagination />
            </div>
            <Popup />
            <div className='w-[95%] flex justify-end gap-2'>
                <BouttonIcon imageUrl="../src/assets/images/cancel-btn.svg" msg="Annuler" taille="h-10 w-10" />
            </div>
        </>
    )
}
