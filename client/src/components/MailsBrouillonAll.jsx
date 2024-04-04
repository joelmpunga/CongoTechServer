import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import MailBrouillon from './MailBrouillon'
import Pagination from './Pagination'

export default function MailsBrouillonAll() {
    return (
        <>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <MailBrouillon />
                <MailBrouillon />
                <MailBrouillon />
                <MailBrouillon />
                <MailBrouillon />
            </WorkSpace>
            <Pagination/>
        </>
    )
}
