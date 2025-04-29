import ArchDocComp from "./archDoc/ArchDocComp";
import DragComponent from "./archDoc/DragDrop/DragComponent";
import Title from "./archDoc/Title";
import Inputs from "./archDoc/Inputs";
import CbxInput from "./archDoc/comboBox/CbxInput";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../contexts/MyContext";
import PopupAlert from "../ui/Popup";
import HeaderWorkspace from "./HeaderWorkspace";
import ItemLinkPage from "../ui/ItemLinkPage";
import Swal from "sweetalert2";

export default function ModalWindow() {
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
  const navigate = useNavigate();

  //const { isAuthenticated, updateIsAuthenticated } = useMyContext();
  const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
  if (!isAuthenticatedLocalStorage) {
    navigate('/login')
  }
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
          nom: nameOwner
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
    const isValid = validateDoc()
    if (isValid) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('idOwner', parseInt(selectedOwner));
        formData.append('description', docsDesc);
        formData.append('idUser', 1);

        await axios.post('http://localhost:3000/file/upload', formData).then(res => {
          if (res.status === 201) {
            navigate('/archive')
            window.location.href = '/archive'
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
    <>
      <div>
        <button onClick={openModal}>Ouvrir la modal</button>
        {isOpen && (
          <div className="bg-gray-100 shadow-2xl p-4 w-[35%] ml-[40%] absolute modal-content" onClick={handleBackgroundClick}>
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
                      <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Nom du service' onChange={handleChangeSelectedOwner} className='w-full h-14' >
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
        )}
      </div>
    </>
  )
}
