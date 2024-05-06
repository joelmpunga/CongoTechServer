import { useState, useEffect } from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import BouttonPagination from '../ui/BouttonPagination'
import Popup from './Popup'
import BouttonIcon from '../ui/BouttonIcon'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../contexts/MyContext';
import ReactPaginate from 'react-paginate';
import ActionBtns from './ActionBtns'

export default function FoldersClasser() {
    
    
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
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const param = useParams()
    const idFile = param.id
    console.log(idFile);
    const [folders, setFolders] = useState([])
    const getFolders = async () => await axios.get("http://localhost:3000/folder").then(res => setFolders(res.data))
    useEffect(() => { getFolders() }, ['folders'])
    return (
        <>
            <HeaderWorkspace title="Classer Dossiers" >
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Séléctionnez le dossier parent oû coller">
                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>
                    {/* {
                        folders.map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolderclasser/${folder.id}/${idFile}`, state: { id: folder.id, idFile: idFile } }}>
                                <Folder title={folder.titre} id={folder.id} />
                            </Link>
                        ))
                    } */}

                    {
                        getCurrentPageData().map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolderclasser/${folder.id}/${idFile}`, state: { id: folder.id, idFile: idFile } }}>
                                <Folder title={folder.titre} id={folder.id} />
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
            {/* <div className='flex justify-end gap-2'>
                <BouttonPagination />
            </div> */}
            {/* <Popup /> */}

        </>
    )
}
