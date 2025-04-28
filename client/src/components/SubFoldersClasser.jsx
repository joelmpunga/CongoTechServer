import { useState, useEffect } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import BouttonIcon from '../ui/BouttonIcon'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ActionBtns from './ActionBtns'
import ReactPaginate from 'react-paginate'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// taken from App Component
import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
// End taken from App Component
export default function SubFoldersClasser({ idFolder }) {
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
    const handleBackClick2 = () => {
        navigate(-2);
    };
    const params = useParams()
    const id = params.id
    const idFile = params.idFile
    const [subFolders, setSubFolders] = useState([])
    const [loading, setLoading] = useState(true);
    const getSubFolders = async () => await axios.get("http://localhost:3000/subfolder/" + params.id).then(
        res => {
            setSubFolders(res.data);
            setLoading(false);
        })
    useEffect(() => { getSubFolders() }, [subFolders])

    // search filters
    const filteredSubFolders = subFolders.filter(subFolder =>
        subFolder.titre.toLowerCase().includes(searchField.toLowerCase()) || subFolder.description.toLowerCase().includes(searchField.toLowerCase())
    );
    //end search filters





    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredSubFolders.slice(startIndex, endIndex);
    };



    useEffect(() => {
        const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated');
        if (!isAuthenticatedLocalStorage) {
            navigate('/login');
        }
    }, []);



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
                            <HeaderWorkspace title="Sous dossiers" actualPage="Classement sous-dossiers">
                                <Link to="/charts/doc" >
                                    <ItemLinkPage title="Dashboard" path="/charts/doc" />
                                </Link>
                                <Link to="#" onClick={handleBackClick2} >
                                    <ItemLinkPage title="/Brouillon" />
                                </Link>
                                <Link to="#" onClick={handleBackClick1} >
                                    <ItemLinkPage title="/Dossiers" path="/folders" />
                                </Link>
                            </HeaderWorkspace>
                        </div>
                        <div className='bg-white shadow-2xl h-[700px] rounded-lg'>
                            <WorkSpace message="Parcourez les sous dossiers">
                                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[580px]'>
                                    {/* {
                                subFolders.map(subFolder => (
                                    //<Link key={subFolder.id}  to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }}>
                                    <Folder key={subFolder.id} title={subFolder.titre} id={subFolder.id} isToClass={true} idFile={idFile} idSub={subFolder.id} />
                                    //</Link>
                                ))
                            } */}

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
                                                    <h1 className='text-gray-700 text-[20px]'>Aucune donnée trouvée!</h1>
                                                </div>
                                            ) : (
                                                getCurrentPageData().map(subFolder => (
                                                    //<Link key={subFolder.id}  to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }}>
                                                    <Folder key={subFolder.id} title={subFolder.titre} id={subFolder.id} isToClass={true} idFile={idFile} idSub={subFolder.id} />
                                                    //</Link>
                                                ))
                                            )
                                    }
                                </div>

                                <div className='flex justify-between items-center w-full mx-5'>
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
                                        <Link to="/file/draft" className='flex flex-row gap-4 justify-center items-center bg-red-600 rounded-2xl w-[150px] h-[50px] text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 2048 2048"><path fill="white" d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z" /></svg>
                                            <span>Annuler</span>
                                        </Link>
                                    </div>
                                </div>
                            </WorkSpace>
                            {/* <Link to="/file/draft">

                        <div className='w-[95%] flex justify-end gap-2'>
                            <BouttonIcon imageUrl="../src/assets/images/cancel-btn.svg" msg="Annuler" taille="h-10 w-10" />
                        </div>
                    </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
