import React from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link } from 'react-router-dom'

export default function FoldersWorkspace() {
    return (
        <>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <Link to="/folder/subfolder">
                    <Folder title="Folder 1" />
                </Link>
                <Link to="/folder/subfolder">
                    <Folder title="Folder 2" />
                </Link>
                <Link to="/folder/subfolder">
                    <Folder title="Folder 3" />
                </Link>
                <Link to="/folder/subfolder">
                    <Folder title="Folder 4" />
                </Link>
                <Link to="/folder/subfolder">
                    <Folder title="Folder 5" />
                </Link>
                <Link to="/folder/subfolder">
                    <Folder title="Folder 6" />
                </Link>
                <Link to="/folder/subfolder">
                    <Folder title="Folder 7" />
                </Link>
            </WorkSpace>
        </>
    )
}
