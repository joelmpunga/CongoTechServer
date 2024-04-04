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
            <HeaderWorkspace title="Mails Brouillon" message="Parcourez les mails non classés">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <tr>
                    <MailBrouillon />
                </tr>
                <tr>
                    <MailBrouillon />
                </tr>
                <tr>
                    <MailBrouillon />
                </tr>
                <tr>
                    <MailBrouillon />
                </tr>
                <tr>
                    <MailBrouillon />
                </tr>
                <tr>
                    <MailBrouillon />
                </tr>
                <tr>
                    <MailBrouillon />
                </tr>
            </WorkSpace>
            <Pagination />
        </>
    )
}
