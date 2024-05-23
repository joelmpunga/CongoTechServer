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
import Title from './archDoc/Title'
import PopupAlert from '../ui/Popup'
import ArchDocComp from './archDoc/ArchDocComp'
import Inputs from './archDoc/Inputs'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



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
    const [loading, setLoading] = useState(true);
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

    //modal
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const [descFold, setDescFold] = useState('')
    const [subDescFold, setDescSubFold] = useState('')
    const [nomFold, setNomFold] = useState('')
    const [nomSubFold, setNomSubFold] = useState('')
    const [parentFolder, setParentFolder] = useState('')
    const [errorFolder, setErrorFolder] = useState(false)
    const [errorMessageFolder, setErrorMessageFolder] = useState('')
    const handleChangeDescriptionFolder = (event) => {
        setDescFold(event.target.value)
    }

    const handleChangeNomFolder = (event) => {
        setNomFold(event.target.value)
    }

    const getAllFolders = async (event) => {
        await axios.get('http://localhost:3000/folder/').then(
            res => {
                setFolders(res.data)
                setLoading(false);

            })
    }
    const handleSubmitFolder = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/folder/create', {
            description: descFold,
            titre: nomFold
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/folder'
            }
        }).catch(err => {
            setErrorFolder(true)
            setErrorMessageFolder(err.response.data)
        })
    }
    useEffect(() => {
        handleChangeDescriptionFolder
        handleChangeNomFolder
        handleSubmitFolder

    }, [descFold, nomFold])

    useEffect(() => {
        getAllFolders()
    }, [folders])


    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content') && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    //end modal
    return (
        <div className='flex flex-col gap-10 mx-3' >
            <div className=''>
                <HeaderWorkspace title="Dossiers" actualPage="Dossiers">
                    <Link to="/charts/doc" >
                        <ItemLinkPage title="Dashboard" path="/charts/doc" />
                    </Link>
                </HeaderWorkspace>
            </div>
            <div className='bg-white shadow-2xl h-[700px] rounded-lg'>

                <WorkSpace message="Parcourez les dossiers">
                    <div className='flex flex-wrap w-[100%] overflow-x-auto h-[580px] '>
                        {/* Modal */}
                        {isOpen && (
                            <div className="absolute bg-[#70726e7c] flex flex-row inset-0 justify-center items-center">
                                <div className="bg-gray-100 shadow-2xl p-4 w-[35%] modal-content" onClick={handleBackgroundClick}>
                                    <Title title='Ajouter un dossier' />
                                    {
                                        errorFolder && <PopupAlert message={errorMessageFolder} />
                                    }
                                    <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' onChange={handleChangeDescriptionFolder} onSubmit={handleSubmitFolder}
                                        className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none"
                                    >
                                        <Inputs attName='Nom du dossier ' onChange={handleChangeNomFolder} />
                                    </ArchDocComp>
                                </div>
                            </div>
                        )}
                        {/* End modal */}
                        {loading ? (
                            <>
                                <div className="flex gap-4 px-6 py-4">
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                </div>
                                <div className="flex gap-4 px-6 py-4">
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                    <Skeleton height={200} width={200} borderRadius={20} />
                                </div>
                            </>
                        ) :

                            folders.length === 0 ? (
                                <div className="px-80 py-20">
                                    <img src="../src/assets/images/empty_file.gif" className='w-80 h-80' alt="" />
                                    <h1 className='text-gray-700 text-[20px]'>Aucun fichiers trouvés!</h1>
                                </div>
                            ) : (
                                getCurrentPageData().map(folder => (
                                    <Link key={folder.id} to={{ pathname: `/subfolder/${folder.id}`, state: { id: folder.id } }} className='h-5'>
                                        <Folder onContextMenu={showMenu} isVisible={isVisible} position={position} title={folder.titre} id={folder.id} />
                                    </Link>
                                ))
                            )
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
                            <ActionBtns
                                className='flex flex-row justify-center items-center bg-blue-600 rounded-2xl w-[150px] h-[50px] text-white'
                                onClick={openModal}
                                src="src/assets/images/add.svg"
                                label="Création"
                            />
                        </div>
                    </div>
                </WorkSpace>
            </div>
        </div>
    )
}
