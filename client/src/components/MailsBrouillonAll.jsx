import React, { useState } from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import MailBrouillon from './MailBrouillon'
import Pagination from './Pagination'
import CheckBox from '../ui/CheckBox'
import { useMyContext } from '../contexts/MyContext'
import { Link, useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'




export default function MailsBrouillonAll() {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }

    const [allcheck, setAllCheck] = useState(false)
    const [valChck, setValChck] = useState(false)
    const handleClick = () => {
        setAllCheck(!allcheck)
        setValChck(!valChck)

    }
    return (
        <div className='flex flex-col gap-10 mx-3' >
            <div className=''>
                <HeaderWorkspace title="Brouillon des E-mails" actualPage="Brouillon Emails">
                    <Link to="/charts/doc" >
                        <ItemLinkPage title="Dashboard" path="/charts/doc" />
                    </Link>
                </HeaderWorkspace>

            </div>
            <div className='bg-white shadow-2xl h-[700px] rounded-lg'>

                <WorkSpace message="Parcourez les mails non classés">
                    <div className='flex flex-col justify-between w-[100%] overflow-flex-auto mx-6 h-[580px]'>

                        <div className="flex flex-col gap-6 pt-4">
                            <div className='flex flex-row gap-6'>
                                {/* <CheckBox /> */}
                                {
                                    allcheck ? <input type="checkbox" checked={allcheck} onChange={handleClick} className='form-checkbox text-blue-500 ' /> : <input type="checkbox" checked={allcheck} onChange={handleClick} className='form-checkbox text-gray-100' />
                                }
                                <img src="../src/assets/images/download-alt.svg" alt="" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024"><path fill="gray" d="m909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92C290 92 102.3 279.5 102 511.5C101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1c1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.8 5-3.8 10-5.9 14.9c-17.3 41-42.1 77.8-73.7 109.4A344.8 344.8 0 0 1 655.9 829c-42.3 17.9-87.4 27-133.8 27c-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 0 1 279 755.2a342.2 342.2 0 0 1-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4s68.4-56.4 109.3-73.8c42.3-17.9 87.4-27 133.8-27c46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 0 1 109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2" /></svg>
                            </div>
                            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className=""></th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Expediteur</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Object</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Date</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <MailBrouillon />
                                <MailBrouillon />
                                <MailBrouillon />
                                {/* <MailBrouillon allcheck={valChck} />
                                <MailBrouillon allcheck={valChck}/>
                                <MailBrouillon allcheck={valChck}/>
                                <MailBrouillon allcheck={valChck}/>
                                <MailBrouillon allcheck={valChck}/> */}

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
            </div>
        </div>
    )
}
