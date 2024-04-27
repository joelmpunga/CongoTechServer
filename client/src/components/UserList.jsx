
import UserOwnerListComp from "./UserOwnerListComp";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemLinkPage from "../ui/ItemLinkPage";
import HeaderWorkspace from "./HeaderWorkspace";
import ReactPaginate from "react-paginate";
import NextBtn from "./nextPrevBtns/NextBtn";
import PrevBtn from "./nextPrevBtns/PrevBtn";
export default function UserList() {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return users.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };



    const [users, setUsers] = useState([])
    const getAllUsers = async (event) => {
        await axios.get('http://localhost:3000/user').then((res) => { setUsers(res.data) })
    }
    useEffect(() => {
        getAllUsers()
    }, ['users'])

    return (
        <>
            <HeaderWorkspace title="Liste des utilisateurs">
                <ItemLinkPage title="Dashboard" path="/proprietaires" />
            </HeaderWorkspace>
            <div className="flex flex-col justify-between h-[78%] ">

                <UserOwnerListComp
                    thtypePostNom="Post-nom"
                    thDecrEmail="E-mail"
                    thStatusRole="Role"
                >

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">

                        {
                            getCurrentPageData().map(user => (
                                // <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                <tr className="hover:bg-gray-50">
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">{user.nom}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1 rounded-full  text-xs font-semibold">
                                            {user.postnom}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 ">
                                        <div className="">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                                {user.role}
                                            </span>

                                        </div>
                                    </td>

                                    <td className='flex gap-3 pl-6'>
                                        <img src="../src/assets/images/eye.svg" alt="" />
                                        <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>


                </UserOwnerListComp>
                <div className='flex flex-row-reverse mx-6'>
                    <ReactPaginate
                        previousLabel={<PrevBtn/>}
                        nextLabel={<NextBtn/>}
                        breakLabel={"..."}
                        pageCount={Math.ceil(users.length / itemsPerPage)} // Calcul du nombre total de pages
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={handlePageClick}
                        containerClassName={"flex justify-end gap-6 text-[20px]"}
                        activeClassName={"active"}
                    />


                </div>
            </div>
        </>
    );
}
