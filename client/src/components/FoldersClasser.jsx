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
        return folders.slice(startIndex, endIndex);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated');
        if (!isAuthenticatedLocalStorage) {
            navigate('/login');
        }
    }, []);

    const param = useParams();
    const idFile = param.id;

    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const getFolders = async () => {
            try {
                const res = await axios.get("http://localhost:3000/folder");
                setFolders(res.data);
            } catch (error) {
                console.error("Error fetching folders:", error);
            }
        };
        getFolders();
    }, []);

    useEffect(() => {
        if (folders.length > 0) {
            TopNotification.fire({
                icon: "success",
                title: "Archiver un ou plusieurs e-mails",
                text: "Le(s) e-mails sont copiés avec succes dans le presse-papiers, veuillez selectionner le dossiers et ensuite le sous dossier. S’ils n’existent, veuillez annuler et les créer d’abord",
                width: 500,
                height: 300,
                timer: 6000
            });
        }
    }, [folders]);

    return (
        <div className='bg-white shadow-2xl overflow-x-auto mx-6 h-[800px]'>
            <HeaderWorkspace title="Classer Dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Séléctionnez le dossier parent oû coller">
                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[600px]'>
                    {
                        getCurrentPageData().map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolderclasser/${folder.id}/${idFile}`, state: { id: folder.id, idFile: idFile } }}>
                                <Folder title={folder.titre} id={folder.id} />
                            </Link>
                        ))
                    }
                </div>

                <div className='flex justify-between items-center w-full mx-5'>
                    <ReactPaginate
                        previousLabel={"Précédent"}
                        nextLabel={"Suivant"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(folders.length / itemsPerPage)} // Calcul du nombre total de pages
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"flex justify-end gap-6 text-[20px]"}
                        activeClassName={"active"}
                    />

                    <div>
                        <Link to="/file/draft">
                            <ActionBtns
                                className='flex flex-row justify-center items-center bg-red-600 rounded-2xl w-[150px] h-[50px] text-white'
                                src="../src/assets/images/cancel-btn.svg"
                                label="Annuler"
                            />
                        </Link>
                    </div>
                </div>
            </WorkSpace>
            {/* <Popup /> */}
        </div>
    );
}
