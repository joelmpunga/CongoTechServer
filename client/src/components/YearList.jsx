
import YearsListTable from "./YearsListTable";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemLinkPage from "../ui/ItemLinkPage";
import HeaderWorkspace from "./HeaderWorkspace";
import ReactPaginate from "react-paginate";
import NextBtn from "./nextPrevBtns/NextBtn";
import PrevBtn from "./nextPrevBtns/PrevBtn";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

// taken from App Component

import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
import TrYearList from "../ui/TrYearList";
// End taken from App Component
export default function YearList() {
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated');
    const navigate = useNavigate();
    if (!isAuthenticatedLocalStorage) {
        navigate('/login');
    }
    //taken from App Component

    const nom = localStorage.getItem('nom');
    const postnom = localStorage.getItem('postnom');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const [searchField, setSearchField] = useState("");

    //end taken form App Component
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredYears.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };




    const [years, setYears] = useState([])
    const getAllYears = async (event) => {
        await axios.get('http://localhost:3000/years').then((res) => { setYears(res.data) })
    }
    useEffect(() => {
        getAllYears()
    }, [years])

    const deleteFile = async () => {
        const confirmation = await Swal.fire({
          title: 'Confirmation',
          text: 'Etes vous sur de vouloir supprimer ce document ?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'Annuler'
        });
    
        if (confirmation.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:3000/file/delete/${id}`);
            if (response.status === 200) {
              await Swal.fire('Succès', 'Supprimé avec succès!', 'success');
              navigate(actualUrl);
            } else {
              await Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression', 'error');
            }
          } catch (error) {
            console.error('Error deleting file:', error);
            await Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression', 'error');
          }
        } else {
          await Swal.fire('Action annulée', '', 'info');
        }
      };

    // search filters
    const filteredYears = years.filter(year =>
        year.debut.toLowerCase().includes(searchField.toLowerCase()) || year.fin.toLowerCase().includes(searchField.toLowerCase())
    );
    //end search filters
    const handleSetEnCours = async (event, id) => {
        try {
            const response = await axios.post(`http://localhost:3000/years/encours/${id}`);
            if (response.status === 200) {
              await Swal.fire('Succès', 'Defini comme en année cours avec succès!', 'success');
              navigate(actualUrl);
            } else {
              await Swal.fire('Erreur', 'Une erreur est survenue lors de la definition de l\'année en cours', 'error');
            }
          } catch (error) {
            console.error('Error years:', error);
        }
    }
    const handleSetCloturer = async (event,id) => {
        try {
            const response = await axios.post(`http://localhost:3000/years/cloturer/${id}`);
            if (response.status === 200) {
              await Swal.fire('Succès', 'Année cloturée avec succès!', 'success');
              navigate(actualUrl);
            } else {
              await Swal.fire('Erreur', 'Une erreur est survenue lors de la cloture de l\'année en cours', 'error');
            }
          } catch (error) {
            console.error('Error years:', error);
        }
    }
    return (
        <>
            <div className='flex gap-0 w-full fixed'>
                {
                    role === 'ADMIN' ? <SideBarAdmin /> : <SideBarSecretaire />
                }
                <div className='flex flex-col w-full bg-slate-200'>
                    <Header hasSearch={true} email={email} name={nom + " " + postnom} title={role} setSearchField={setSearchField} />
                    <HeaderWorkspace title="Liste des années scolaires">
                        <ItemLinkPage title="Dashboard" path="/proprietaires" />
                    </HeaderWorkspace>
                    <div className="flex flex-col justify-between h-[78%] ">

                        <YearsListTable
                            thBref="Années Scolaire"
                            thDebut="Date de début"
                            thFin="Date de la fin"
                        >

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">

                                {
                                    getCurrentPageData().map(year => (
                                        // <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                        <TrYearList year={year} id={year.id} key={year.id}></TrYearList>
                                    ))
                                }
                            </tbody>


                        </YearsListTable>
                        <div className='flex flex-row-reverse mx-6'>
                            <ReactPaginate
                                previousLabel={<PrevBtn />}
                                nextLabel={<NextBtn />}
                                breakLabel={"..."}
                                pageCount={Math.ceil(filteredYears.length / itemsPerPage)} // Calcul du nombre total de pages
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={10}
                                onPageChange={handlePageClick}
                                containerClassName={"flex justify-end gap-6 text-[20px]"}
                                activeClassName={"active"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
