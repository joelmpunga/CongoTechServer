import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import MailBrouillon from './MailBrouillon'
import Pagination from './Pagination'
import CheckBox from '../ui/CheckBox'
import { useMyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

export default function MailsBrouillonAll() {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    return (
        <>
            <HeaderWorkspace title="Brouillon des E-mails">
                <ItemLinkPage title="Dashboard" path="/brouillon" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les mails non classés">
                <div className='flex flex-col justify-between mx-5 w-full h-[70%]'>
                    <div>
                        <table   >
                            <thead>
                                <th >
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
                    </div>
                    <div className='flex flex-row items-start'>
                        <ReactPaginate
                            previousLabel={"Précédent"}
                            nextLabel={"Suivant"}
                            breakLabel={"..."}
                            pageCount={''} // Calcul du nombre total de pages
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={''}
                            containerClassName={"flex justify-end gap-6 text-[20px]"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </WorkSpace>
            {/* <Pagination /> */}
        </>
    )
}
