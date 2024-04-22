import { useEffect, useState } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useMyContext } from '../contexts/MyContext';
import ItemMenu from '../ui/ItemMenu'
import ReactPaginate from 'react-paginate';


export default function FoldersWorkspace() {
    const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    const navigate = useNavigate()
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const [folders, setFolders] = useState([])
    //fonctions pour la pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return folders.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const getFolders = async () => await axios.get("http://localhost:3000/folder").then(res => setFolders(res.data))
    useEffect(() => { getFolders() }, ['folders'])
    return (
        <>
            <Link to="/createfolder">
                <button className='bg-blue-600 rounded-2xl w-[150px] h-[50px] ml-10 text-white'>
                    Création
                </button>
            </Link>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>

                    {
                        getCurrentPageData().map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolder/${folder.id}`, state: { id: folder.id } }}>
                                <Folder title={folder.titre} id={folder.id} />
                            </Link>
                        ))
                    }

                </div>
                <div className='flex'>
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
                </div>
            </WorkSpace>
        </>
    )
}
