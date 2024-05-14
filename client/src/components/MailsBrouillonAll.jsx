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
        <div className='bg-white shadow-2xl mx-6 h-[670px]'>
            <HeaderWorkspace title="Brouillon des E-mails">
                <ItemLinkPage title="Dashboard" path="/brouillon" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les mails non classés">
                <div className='flex flex-col overflow-x-auto justify-between mx-5 w-full h-[470px]'>
                    <div>
                        <table className='w-full'  >
                            <thead>
                                <th className='flex gap-10 w-full text-center '>
                                    <td ><CheckBox /></td>
                                    <td >Expediteur</td>
                                    <td >Sujet</td>
                                    <td >Date</td>
                                    <td >Actions</td>
                                </th>
                            </thead>
                            <tbody >
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
        </div>
    )
}
