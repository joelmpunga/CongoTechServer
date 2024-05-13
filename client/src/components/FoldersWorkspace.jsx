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
import ActionBtns from './ActionBtns'



export default function FoldersWorkspace() {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    const navigate = useNavigate()
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const [folders, setFolders] = useState([])
    //fonctions pour la pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10); // Nombre d'éléments à afficher par page
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



    const showMenu = (e) => {
        e.preventDefault();
        setIsVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const hideMenu = () => {
        setIsVisible(false);
    };
    return (
        <>

            <HeaderWorkspace title="Dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">

                <div  className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>
                    
                    
                    {
                        getCurrentPageData().map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolder/${folder.id}`, state: { id: folder.id } }}>
                                <Folder onContextMenu={showMenu} isVisible={isVisible} position={position} title={folder.titre} id={folder.id} />
                            </Link>
                        ))
                    }


                </div>

                <div className='flex justify-between w-full mx-5'>
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
                        <Link to="/createfolder">
                            <ActionBtns
                            className='flex flex-row justify-center items-center bg-blue-600 rounded-2xl w-[150px] h-[50px] text-white'
                            src="src/assets/images/add.svg"
                            label="Création"
                            />
                        </Link>
                    </div>
                </div>
            </WorkSpace>
        </>
    )
}
