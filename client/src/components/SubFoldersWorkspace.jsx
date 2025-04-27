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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// taken from App Component
import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
// End taken from App Component
export default function SubFoldersWorkspace() {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    //taken from App Component

    const nom = localStorage.getItem('nom');
    const postnom = localStorage.getItem('postnom');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const [searchField, setSearchField] = useState("");

    //end taken form App Component
    const handleBackClick1 = () => {
        navigate(-1);
    };
    const params = useParams()
    const [subFolders, setSubFolders] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentFolder, setCurrentFolder] = useState([])
    const getSubFolders = async () => await axios.get("http://localhost:3000/subfolder/" + params.id).then(
        res => {
            setSubFolders(res.data)
            setLoading(false);
        })
    const getCurrentFolder = async () => await axios.get("http://localhost:3000/folder/" + params.id).then(
        res => {
            setCurrentFolder(res.data)
            setLoading(false);
        })
    useEffect(() => {
        getSubFolders()
    }, [subFolders])
    useEffect(() => {
        getCurrentFolder()
    }, [currentFolder])
    //fonctions pour la pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredSubFolders.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };


    // search filters
    const filteredSubFolders = subFolders.filter(subFolder =>
        subFolder.titre.toLowerCase().includes(searchField.toLowerCase()) || subFolder.description.toLowerCase().includes(searchField.toLowerCase())
    );
    //end search filters

    const [classValue, setclassValue] = useState('hidden');
    const onClick = () => {
        setclassValue('absolute bg-[#70726e7c] flex flex-row absolute inset-0 justify-center items-center')

    }

    const annuler = () => {
        setclassValue('hidden')
    }
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
                            <HeaderWorkspace title=" Sous dossiers" actualPage={currentFolder.titre}>
                                <Link to="/charts/doc" >
                                    <ItemLinkPage title="Dashboard" path="/charts/doc" />
                                </Link>
                            </HeaderWorkspace>

                        </div>
                        <div className='bg-white shadow-2xl h-[700px] rounded-lg'>

                            <WorkSpace message="Parcourez les sous dossiers">
                                <div className='relative flex flex-wrap w-[100%] overflow-x-auto h-[580px]'>
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
                                            filteredSubFolders.length === 0 ? (
                                                <div className="px-80 py-20">
                                                    <img src="../src/assets/images/search-files-empty.png" className='w-80 h-80' alt="" />
                                                    <h1 className='text-gray-700 text-[20px]'>Aucun fichier trouvé!</h1>
                                                </div>
                                            ) : (
                                                filteredSubFolders.map(subFolder => (
                                                    <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row h-5'>
                                                        <Folder title={subFolder.titre} id={subFolder.id} />
                                                    </Link>
                                                ))
                                            )
                                    }
                                </div>
                                <CreateSubfolder classValue={classValue} annuler={annuler} />
                                <div className='flex justify-between w-full mx-5 '>
                                    <ReactPaginate
                                        previousLabel={"Précédent"}
                                        nextLabel={"Suivant"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(filteredSubFolders.length / itemsPerPage)} // Calcul du nombre total de pages
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
                </div>
            </div>
        </>
    )
}
