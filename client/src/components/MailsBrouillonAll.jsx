import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import MailBrouillon from './MailBrouillon'
import Pagination from './Pagination'
import CheckBox from '../ui/CheckBox'

export default function MailsBrouillonAll() {
    return (
        <>
            <HeaderWorkspace title="Mails Brouillon" message="Parcourez les mails non classés">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <table>
                    <thead>
                        <th>
                            <td className='w-[5%]'><CheckBox /></td>
                            <td className='w-[20%]'>Expediteur</td>
                            <td className='w-[50%]'>Sujet</td>
                            <td className='w-[15%]'>Date</td>
                            <td className='w-[10%]'>Actions</td>
                        </th>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </WorkSpace>
            <Pagination />
        </>
    )
}
