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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// taken from App Component

import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
// End taken from App Component

export default function FilesBrouillon() {
  const { isAuthenticated, updateIsAuthenticated } = useMyContext();
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
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12); // Nombre d'éléments à afficher par page
  // Fonction pour obtenir les éléments de la page actuelle

  // search filters
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchField.toLowerCase())
  );
  //end search filters
  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredFiles.slice(startIndex, endIndex);
  };


  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };
  const getFiles = async () => await axios.get("http://localhost:3000/file/draft").then(
    res => {
      setFiles(res.data)
      setLoading(false);
    }
  )
  useEffect(() => { getFiles() }, [files])
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
              <HeaderWorkspace title="Brouillon des Documents" actualPage="Brouillon des Documents">
                <Link to="/charts/doc" >
                  <ItemLinkPage title="Dashboard" path="/charts/doc" />
                </Link>
              </HeaderWorkspace>
            </div>
            <div className='bg-white shadow-2xl h-[700px] rounded-lg'>

              <WorkSpace message="Parcourez les documents">
                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[580px]'>
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

                    filteredFiles.length === 0 ? (
                        <div className="px-80 py-20">
                          <img src="../src/assets/images/empty_file.gif" className='w-80 h-80' alt="" />
                          <h1 className='text-gray-700 text-[20px]'>Aucun fichiers trouvés!</h1>
                        </div>
                      ) : (
                        getCurrentPageData().map(file => (
                          <tr key={file.id}>
                            <File data={file} id={file.id} title={file.name} isToClass={true} />
                          </tr>
                        ))
                      )
                  }
                </div>

                <div className='flex'>
                  <ReactPaginate
                    previousLabel={"Précédent"}
                    nextLabel={"Suivant"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(filteredFiles.length / itemsPerPage)} // Calcul du nombre total de pages
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
          </div>
        </div>
      </div>
    </>
  )
}
