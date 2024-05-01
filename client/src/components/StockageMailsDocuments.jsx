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

export default function StockageMailsDocuments() {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const params = useParams()
    const id = parseInt(params.id)
    const [files, setFiles] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Nombre d'éléments à afficher par page
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
                <ItemLinkPage title="Dossiers" path="/folders" />
                <ItemLinkPage title="Sous Dossiers" path="/subfolders" />
            </HeaderWorkspace>

            <WorkSpace message="Parcourez les fichiers et mails">
             
             <div className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>
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

                <div className='flex w-full mx-5'>
                    <ReactPaginate
                        previousLabel={<PrevBtn/>}
                        nextLabel={<NextBtn/>}
                        breakLabel={"..."}
                        pageCount={Math.ceil(files.length / itemsPerPage)} // Calcul du nombre total de pages
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"flex justify-end gap-6 text-[20px] px-5"}
                        activeClassName={"active"}
                    />
                </div>
             
            </WorkSpace>

        </>
    )
}
