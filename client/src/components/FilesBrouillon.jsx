import { useState, useEffect } from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Pagination from './Pagination'
import File from '../ui/File'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useMyContext } from '../contexts/MyContext';
import ReactPaginate from 'react-paginate';
export default function FilesBrouillon() {
  const { isAuthenticated, updateIsAuthenticated } = useMyContext();
  const navigate = useNavigate()
  const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
  if (!isAuthenticatedLocalStorage) {
    navigate('/login')
  }
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
  const getFiles = async () => await axios.get("http://localhost:3000/file/draft").then(res => setFiles(res.data))
  useEffect(() => { getFiles() }, [files])
  return (
    <div className='bg-white shadow-2xl mx-6 h-[800px] py-2'>
      <HeaderWorkspace title="Brouillon des Documents">
        <Link to="/charts/doc" >
          <ItemLinkPage title="Dashboard" path="/charts/doc" />
        </Link>
      </HeaderWorkspace>
      <WorkSpace message="Parcourez les dossiers créés">
        <div className='flex flex-wrap w-[100%] overflow-x-auto h-[600px]'>
          {
            getCurrentPageData().map(file => (
              <tr key={file.id}>
                <File id={file.id} title={file.name} isToClass={true} />
              </tr>
            ))
          }
        </div>

        <div className='flex'>
          <ReactPaginate
            previousLabel={"Précédent"}
            nextLabel={"Suivant"}
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

      {/* <Pagination/> */}
    </div>
  )
}
