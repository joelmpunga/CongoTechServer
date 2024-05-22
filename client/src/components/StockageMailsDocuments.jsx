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
import ArchDocComp from "./archDoc/ArchDocComp";
import DragComponent from "./archDoc/DragDrop/DragComponent";
import Title from "./archDoc/Title";
import Inputs from "./archDoc/Inputs";
import CbxInput from "./archDoc/comboBox/CbxInput";
import PopupAlert from "../ui/Popup";
import Swal from "sweetalert2";
export default function StockageMailsDocuments() {
    const { idfile, handleCloseContextMenu, contextMenuVisible, contextMenuPosition } = useMyContext();

    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }

    const handleBackClick2 = () => {
        navigate(-2);
    };

    const handleBackClick1 = () => {
        navigate(-1);
    };

    const params = useParams()
    const id = parseInt(params.id)
    const [files, setFiles] = useState([])
    const [currentSubFolder, setCurrentSubFolder] = useState([])
    const [currentFolder, setCurrentFolder] = useState([])
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

    const getFiles = async () => {
        try {
            const res = await axios.get("http://localhost:3000/file/" + id);
            setFiles(res.data);
        } catch (error) {
            console.error("Failed to fetch files:", error);
        }
    };

    useEffect(() => {
        getFiles();
    }, ['files']);

    const getCurrentSubFolder = async () => {
        try {
            const res = await axios.get("http://localhost:3000/subfolder/getbyid/" + id);
            setCurrentSubFolder(res.data);
        } catch (error) {
            console.error("Failed to fetch current subfolder:", error);
        }
    };

    useEffect(() => {
        getCurrentSubFolder();
    }, []);

    const getCurrentFolder = async () => {
        try {
            const res = await axios.get("http://localhost:3000/folder/" + currentSubFolder.idFolder);
            setCurrentFolder(res.data);
        } catch (error) {
            console.error("Failed to fetch current folder:", error);
        }
    };

    useEffect(() => {
        if (currentSubFolder && currentSubFolder.idFolder) {
            getCurrentFolder();
        }
    }, [currentSubFolder]);


    console.table("sub folder", currentSubFolder.idFolder);
    console.table(currentFolder);

    //for modal

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

    //const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    const [ownerErr, setOwnerErr] = useState({ typeErr: '', nameErr: '' })
    const [docErr, setDocErr] = useState({ ownerErr: '', fileErr: '' })

    const [descOwner, setDescOwner] = useState('')
    const [nameOwner, setNameOwner] = useState('')
    const [typeOwner, setTypeOwner] = useState('')
    const [owners, setOwners] = useState([])
    const [selectedOwner, setSelectedOwner] = useState('')
    const [nameDocs, setNameDocs] = useState('')
    const [docsDesc, setDocsDesc] = useState('')
    const [file, setFile] = useState([])
    const [filesInput, setFilesInput] = useState([])
    const [errorOwner, setErrorOwner] = useState(false)
    const [errorMessageOwner, setErrorMessageOwner] = useState('')
    const [errorDoc, setErrorDoc] = useState(false)
    const [errorMessageDoc, setErrorMessageDoc] = useState('')
    const handleChangeType = (event) => {
        setTypeOwner(event.target.value)
    }

    const handleChangeDesc = (event) => {
        setDescOwner(event.target.value)
    }
    const handleChangeName = (event) => {
        setNameOwner(event.target.value)
    }
    const handleChangeSelectedOwner = (event) => {
        setSelectedOwner(event.target.value)
    }
    const handleChangeFileDocs = (data) => {
        setFile(data)
    }
    const handleChangeDocDesc = (event) => {
        setDocsDesc(event.target.value)
    }
    const handleChangeDocInput = (event) => {
        setFilesInput(event.target.files[0])
    }

    const getAllOwners = async (event) => {
        await axios.get('http://localhost:3000/owner').then((res) => { setOwners(res.data) })
    }
    useEffect(() => {
        getAllOwners()
    }, ['owners'])
    useEffect((event) => {
        handleChangeDesc
        handleChangeName
        handleChangeType
    }, ['typeOwner', 'nameOwner', 'descOwner'])



    const validateOwner = () => {
        let errors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (typeOwner == '') {
            errors.typeErr = 'Selectionner le type';
        }

        if (!nameOwner.match(nameRegex)) {
            errors.nameErr = 'Nom invalid';
        }

        setOwnerErr(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmitOwner = (event) => {
        try {
            event.preventDefault()
            const isValid = validateOwner();
            if (isValid) {

                axios.post('http://localhost:3000/owner/create', {
                    description: descOwner,
                    nom: nameOwner,
                    type: typeOwner
                }).then(res => {
                    if (res.status === 200) {
                        window.location.href = '/archive'
                    }
                }).catch(err => {
                    setErrorOwner(true)
                    setErrorMessageOwner(err.response.data)
                })

            } else {
                console.log('error')
            }

        }
        catch (err) {
            console.log(err);
        }
    }


    const validateDoc = () => {

        let errors = {};
        if (selectedOwner == '') {
            errors.ownerErr = 'Selectionner le type';
        }
        console.log(file);

        if (file.length === 0) {
            errors.fileErr = 'Selectionner un document';
        }

        setDocErr(errors);

        return Object.keys(errors).length === 0;
    };


    const TopNotification = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,

    });

    function showAlert(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            width: 500,
            timer: 6000
        });
    }


    const handleSubmitDocument = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        console.log(token);
        const isValid = validateDoc()

        if (isValid) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('idOwner', parseInt(selectedOwner));
                formData.append('description', docsDesc);
                formData.append('idUser', 1);
                formData.append('idSubFolder', parseInt(id));

                await axios.post('http://localhost:3000/file/upload', formData).then(res => {
                    if (res.status === 201) {
                        navigate('/file/' + id)
                        window.location.href = '/file/' + id
                        TopNotification.fire({
                            icon: "success",
                            title: "Le fichier est archivée"
                        });
                    }
                }).catch((err) => {
                    setErrorDoc(true)
                    setErrorMessageDoc(err.response.data)
                    showAlert(
                        "warning",
                        "Erreur",
                        `Erreur lors du téléchargement du fichier ${err.response.data}`
                    );
                })
            } catch (error) {
                console.error('Erreur lors du téléchargement du fichier :', error);
                showAlert(
                    "warning",
                    "Erreur",
                    `Erreur lors du téléchargement du fichier ${error}`
                );
            }
        }
    }
    return (

        <div className='flex flex-col gap-4 mx-3' >
            <div className='bg-white shadow-2xl py-3'>
                <HeaderWorkspace title="Documents & Mails" >
                    <Link to="/charts/doc" >
                        <ItemLinkPage title="Dashboard" path="/charts/doc" />
                    </Link>
                    <Link to="#" onClick={handleBackClick2} >
                        <ItemLinkPage title={"/" + currentFolder.titre} />
                    </Link>
                    <Link to="#" onClick={handleBackClick1} >
                        <ItemLinkPage title={"/" + currentSubFolder.titre} path="/subfolders" />
                    </Link>
                </HeaderWorkspace>


            </div>
            <div className='bg-white shadow-2xl h-[700px]'>

                <WorkSpace message="Parcourez les fichiers et mails">
                    <div className='flex flex-wrap w-[100%] overflow-flex-auto h-[580px]'>
                        {/* Modal */}
                        {isOpen && (
                            <div className='absolute bg-[#70726e7c] flex flex-row inset-0 justify-center items-center'>
                                <div className="bg-gray-100 shadow-2xl p-4 w-[35%] modal-content" onClick={handleBackgroundClick}>
                                    <button className="text-[30px]" onClick={closeModal}>&times;</button>
                                    <div className="font-adamina text-[14px] flex w-full justify-end mx-auto mt-10">
                                        <div className="w-[650px] border border-gray-200 shadow-md">
                                            <form action="" encType="multipart/form-data">
                                                {
                                                    errorDoc && <PopupAlert message={errorMessageDoc} />
                                                }
                                                <ArchDocComp onChange={handleChangeDocDesc} onSubmit={handleSubmitDocument}
                                                    className=" bg-gray-200 resize-none p-5 w-full h-[120px] my-5 border-1  border-blue outline-none"
                                                >
                                                    <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Nom du proprietaire' onChange={handleChangeSelectedOwner} className='w-full h-14' >
                                                        <option value=""></option>
                                                        {
                                                            owners.map(owner => (
                                                                <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                                            ))
                                                        }
                                                    </CbxInput>
                                                    <DragComponent errMsg={docErr.fileErr} getFile={handleChangeFileDocs} />
                                                </ArchDocComp>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                        {/* End modal */}
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
                                    <File id={file.id} menuContex={true} title={file.name} />
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
                            <button
                                className='flex flex-row gap-3 justify-center items-center bg-blue-600 rounded-2xl w-[150px] h-[50px] text-white'
                                onClick={openModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5" /></svg>
                                <span>Archiver</span>
                            </button>
                        </div>
                    </div>
                </WorkSpace>
            </div>
        </div>
    )
}
