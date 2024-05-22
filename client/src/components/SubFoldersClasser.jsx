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
export default function SubFoldersClasser({ idFolder }) {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const handleBackClick1 = () => {
        navigate(-1);
    };
    const handleBackClick2 = () => {
        navigate(-2);
    };
    const params = useParams()
    console.log(params);
    const id = params.id
    const idFile = params.idFile
    const [subFolders, setSubFolders] = useState([])
    const getSubFolders = async () => await axios.get("http://localhost:3000/subfolder/" + params.id).then(res => setSubFolders(res.data))
    useEffect(() => { getSubFolders() }, ['subFolders'])





    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return subFolders.slice(startIndex, endIndex);
    };



    useEffect(() => {
        const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated');
        if (!isAuthenticatedLocalStorage) {
            navigate('/login');
        }
    }, []);



    return (
        
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
                                getCurrentPageData().map(subFolder => (
                                    //<Link key={subFolder.id}  to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }}>
                                    <Folder key={subFolder.id} title={subFolder.titre} id={subFolder.id} isToClass={true} idFile={idFile} idSub={subFolder.id} />
                                    //</Link>
                                ))
                            }
                        </div>

                        <div className='flex justify-between items-center w-full mx-5'>
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
                                <Link to="/file/draft" className='flex flex-row gap-4 justify-center items-center bg-red-600 rounded-2xl w-[150px] h-[50px] text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 2048 2048"><path fill="white" d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z"/></svg>
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
        
    )
}
