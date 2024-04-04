import React from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link } from 'react-router-dom'
export default function SubFoldersWorkspace({ idFolder }) {
    return (
        <>
            <HeaderWorkspace title="Sous dossiers" message="Parcourez les sous dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="Dossiers" path="/folders" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les sous dossiers">
            <Link to="/subfolder/files">
                    <Folder title="Sous Folder 1" />
                </Link>
                <Link to="/subfolder/files">
                    <Folder title=" Sous Folder 2" />
                </Link>
                <Link to="/subfolder/files">
                    <Folder title=" Sous Folder 3" />
                </Link>
                <Link to="/subfolder/files">
                    <Folder title="Sous Folder 4" />
                </Link>
                <Link to="/subfolder/files">
                    <Folder title="Sub Folder 5" />
                </Link>
                <Link to="/subfolder/files">
                    <Folder title="Sub Folder 6" />
                </Link>
                <Link to="/subfolder/files">
                    <Folder title="Sous Folder 7" />
                </Link>
            </WorkSpace>
        </>
    )
}
