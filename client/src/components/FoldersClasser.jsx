import React, { useState, useEffect } from 'react';
import HeaderWorkspace from './HeaderWorkspace';
import ItemLinkPage from '../ui/ItemLinkPage';
import WorkSpace from './WorkSpace';
import Folder from '../ui/Folder';
import BouttonPagination from '../ui/BouttonPagination';
import Popup from './Popup';
import BouttonIcon from '../ui/BouttonIcon';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMyContext } from '../contexts/MyContext';
import ReactPaginate from 'react-paginate';
import ActionBtns from './ActionBtns';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// taken from App Component

import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
// End taken from App Component

export default function FoldersClasser() {
    const TopNotification = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredFolders.slice(startIndex, endIndex);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated');
        if (!isAuthenticatedLocalStorage) {
            navigate('/login');
        }
    }, []);

    //taken from App Component

    const nom = localStorage.getItem('nom');
    const postnom = localStorage.getItem('postnom');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const [searchField, setSearchField] = useState("");

    //end taken form App Component

    const param = useParams();
    const idFile = param.id;

    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);

    // search filters
    const filteredFolders = folders.filter(folder =>
        folder.titre.toLowerCase().includes(searchField.toLowerCase()) || folder.description.toLowerCase().includes(searchField.toLowerCase())
    );
    //end search filters

    useEffect(() => {
        const getFolders = async () => {
            try {
                const res = await axios.get("http://localhost:3000/folder");
                setFolders(res.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching folders:", error);
                setLoading(false);
            }
        };
        getFolders();
    }, []);

    useEffect(() => {
        if (filteredFolders.length > 0) {
            TopNotification.fire({
                icon: "success",
                title: "Archiver un ou plusieurs e-mails",
                text: "Le fichier a été copiés avec succes dans le presse-papiers, veuillez selectionner le dossiers et ensuite le sous dossier. S’ils n’existent, veuillez annuler et les créer d’abord",
                width: 500,
                height: 300,
                timer: 6000
            });
        }
    }, [folders]);

    return (
        <>
            <div className='flex gap-0 w-full fixed'>
                {
                    role === 'ADMIN' ? <SideBarAdmin /> : <SideBarSecretaire />
                }
                <div className='flex flex-col w-full bg-slate-200'>
                    <Header hasSearch={true} email={email} name={nom + " " + postnom} title={role} setSearchField={setSearchField} />
                    <div className='flex flex-col gap-10 mx-3' >
                        <div className=''>
                            <HeaderWorkspace title="Classer Dossiers" actualPage="Classement dossiers">
                                <Link to="/charts/doc" >
                                    <ItemLinkPage title="Dashboard" path="/charts/doc" />
                                </Link>
                                <Link to="/file/draft" >
                                    <ItemLinkPage title="/Brouillon" path="/file/draft" />
                                </Link>
                            </HeaderWorkspace>

                        </div>
                        <div className='bg-white shadow-2xl overflow-x-auto h-[700px] rounded-lg'>

                            <WorkSpace message="Séléctionnez le dossier parent oû coller">
                                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[580px]'>
                                    {
                                        loading ? (
                                            <>
                                                <div className="flex gap-10 px-6 py-4">
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                </div>
                                                <div className="flex gap-10 px-6 py-4">
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                </div>
                                            </>
                                        ) :
                                            filteredFolders.length === 0 ? (
                                                <div className="px-80 py-20">
                                                    <img src="../src/assets/images/search-files-empty.png" className='w-80 h-80' alt="" />
                                                    <h1 className='text-gray-700 text-[20px]'>Aucun fichier trouvé!</h1>
                                                </div>
                                            ) : (
                                                getCurrentPageData().map(folder => (
                                                    <Link key={folder.id} to={{ pathname: `/${folder.id}/${idFile}`, state: { id: folder.id, idFile: idFile } }}>
                                                        <Folder title={folder.titre} id={folder.id} />
                                                    </Link>
                                                ))
                                            )
                                    }
                                </div>

                                <div className='flex justify-between items-center w-full mx-5'>
                                    <ReactPaginate
                                        previousLabel={"Précédent"}
                                        nextLabel={"Suivant"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(filteredFolders.length / itemsPerPage)} // Calcul du nombre total de pages
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={"flex justify-end gap-6 text-[20px]"}
                                        activeClassName={"active"}
                                    />

                                    <div>
                                        {/* <Link to="/file/draft">
                            <ActionBtns
                                className='flex flex-row justify-center items-center bg-red-600 rounded-2xl w-[150px] h-[50px] text-white'
                                src="../src/assets/images/cancel-btn.svg"
                                label="Annuler"
                            />
                        </Link> */}

                                        <Link to="/file/draft" className='flex flex-row gap-4 justify-center items-center bg-red-600 rounded-2xl w-[150px] h-[50px] text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 2048 2048"><path fill="white" d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z" /></svg>
                                            <span>Annuler</span>
                                        </Link>
                                    </div>
                                </div>
                            </WorkSpace>
                            {/* <Popup /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
