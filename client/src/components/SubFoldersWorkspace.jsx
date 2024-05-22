import { useState, useEffect } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import ActionBtns from './ActionBtns'
import CreateSubfolder from './CreateSubfolder'

export default function SubFoldersWorkspace() {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const handleBackClick1 = () => {
        navigate(-1);
    };
    const params = useParams()
    console.log(params.id);
    const [subFolders, setSubFolders] = useState([])
    const [currentFolder, setCurrentFolder] = useState([])
    const getSubFolders = async () => await axios.get("http://localhost:3000/subfolder/" + params.id).then(res => setSubFolders(res.data))
    const getCurrentFolder = async () => await axios.get("http://localhost:3000/folder/" + params.id).then(res => setCurrentFolder(res.data))
    useEffect(() => {
        getSubFolders()
    }, [subFolders])
    useEffect(() => {
        getCurrentFolder()
    }, [currentFolder])
    // console.log(currentFolder);
    //fonctions pour la pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return subFolders.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };
    const [classValue, setclassValue] = useState('hidden');
    const onClick = () => {
        setclassValue('absolute bg-[#70726e7c] flex flex-row absolute inset-0 justify-center items-center')

    }

    const annuler = () => {
        setclassValue('hidden')
    }
    return (
        <div className='flex flex-col gap-4 mx-3' >
            <div className='bg-white shadow-2xl py-3'>
                <HeaderWorkspace title="Sous dossiers" >
                    <Link to="/charts/doc" >
                        <ItemLinkPage title="Dashboard" path="/charts/doc" />
                    </Link>
                    <Link to="#" onClick={handleBackClick1} >
                        <ItemLinkPage title={"/" + currentFolder.titre} />
                    </Link>
                </HeaderWorkspace>

            </div>
            <div className='bg-white shadow-2xl h-[700px]'>

                <WorkSpace message="Parcourez les sous dossiers">
                    <div className='relative flex flex-wrap w-[100%] overflow-x-auto h-[580px]'>
                        {
                            subFolders.map(subFolder => (
                                <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row h-5'>
                                    <Folder title={subFolder.titre} id={subFolder.id} />
                                </Link>
                            ))
                        }
                    </div>
                    <CreateSubfolder classValue={classValue} annuler={annuler} />
                    <div className='flex justify-between w-full mx-5 '>
                        <ReactPaginate
                            previousLabel={"Précédent"}
                            nextLabel={"Suivant"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(subFolders.length / itemsPerPage)} // Calcul du nombre total de pages
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"flex justify-end gap-6 text-[20px]"}
                            activeClassName={"active"}
                        />
                        <div>

                            <ActionBtns
                                onClick={onClick}
                                className='flex flex-row justify-center items-center bg-blue-600 rounded-2xl w-[150px] h-[50px] text-white'
                                src="../src/assets/images/add.svg"
                                label="Création"
                            />
                        </div>
                    </div>
                </WorkSpace>
            </div>
        </div>
    )
}
