import { useState, useEffect } from 'react'
import Mail from './Mail'
import File from '../ui/File'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import NextBtn from './nextPrevBtns/NextBtn'
import PrevBtn from './nextPrevBtns/PrevBtn'
import { Link } from 'react-router-dom'
import { useMyContext } from '../contexts/MyContext'
import ActionBtns from './ActionBtns'
export default function StockageMailsDocuments() {
    const { idfile, handleCloseContextMenu, contextMenuVisible, contextMenuPosition } = useMyContext();

    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const params = useParams()
    const id = parseInt(params.id)
    const [files, setFiles] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(12); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return files.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };
    const getFiles = async () => await axios.get("http://localhost:3000/file/" + id).then(res => setFiles(res.data))
    useEffect(() => { getFiles() }, ['files'])
    console.table(files);


    return (
        <>
            <HeaderWorkspace title="Documents & Mails" >
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="/ Dossiers" path="/folders" />
                <ItemLinkPage title="/ Sous Dossiers" path="/subfolders" />
            </HeaderWorkspace>

            <WorkSpace message="Parcourez les fichiers et mails">

                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>



                    {contextMenuVisible && (
                        <div
                            className="fixed bg-white border rounded shadow p-2"
                            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
                            onClick={handleCloseContextMenu}
                        >
                            <div className='flex flex-col'>
                                <Link to={`http://localhost:3000/file/show/${idfile}`}>
                                    <span className="flex gap-4 py-1 px-1 hover:bg-gray-100 cursor-pointer"><img src="../src/assets/images/eye.svg" alt="" /> Ouvrir</span>
                                </Link>


                            </div>
                        </div>
                    )}
                    {/* {isVisible && (
                        <div
                            className="absolute bg-white border border-gray-300 p-2 shadow-md"
                            style={{ left: position.x, top: position.y }}
                        >
                            <ul>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Ouvrir</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Renomer</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Supprimer</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Télécharger</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Détails du Fichier</li>
                            </ul>
                        </div>
                    )} */}
                    {
                        getCurrentPageData().map(file => (

                            <tr key={file.id}>

                                <File id={file.id} title={file.name} />
                            </tr>

                        ))

                    }

                </div>

                {/* <Mail title="Mail" data={data} />
                <File title="File.png" />
                <Mail title="Mail" data={data} />
                <File title="File.png" />
                <Mail title="Mail" data={data} />
                <File title="File.png" />*/}

                <div className='flex justify-between w-full mx-5'>
                    <ReactPaginate
                        previousLabel={"Précédent"}
                        nextLabel={"Suivant"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(files.length / itemsPerPage)} // Calcul du nombre total de pages
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"flex justify-end gap-6 text-[20px]"}
                        activeClassName={"active"}
                    />

                    <div>
                        <Link to="/archive">
                            <ActionBtns
                                className='flex flex-row justify-center items-center bg-blue-600 rounded-2xl w-[150px] h-[50px] text-white'
                                src="../src/assets/images/add.svg"
                                label="Archiver"
                            />
                        </Link>
                    </div>
                </div>

            </WorkSpace>

        </>
    )
}
