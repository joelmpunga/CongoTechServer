import { useState, useEffect } from 'react';
import ContainerFolderFile from './ContainerFolderFile';
import BouttonIcon from './BouttonIcon';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';
import Swal from 'sweetalert2';
import { useMyContext } from '../contexts/MyContext';

export default function File({ title, data, isToClass = false, id }) {
  const { setIdFile, handleContextMenu} = useMyContext();
  const location = useLocation();
  const actualUrl = location.pathname;
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);

  setIdFile(id)


  const deleteFile = async () => {
    const confirmation = await Swal.fire({
      title: 'Confirmation',
      text: 'Etes vous sur de vouloir supprimer ce document ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/file/delete/${id}`);
        if (response.status === 200) {
          await Swal.fire('Succès', 'Supprimé avec succès!', 'success');
          navigate(actualUrl);
        } else {
          await Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression', 'error');
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        await Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression', 'error');
      }
    } else {
      await Swal.fire('Action annulée', '', 'info');
    }
  }


  // const [contextMenuVisible, setContextMenuVisible] = useState(false);
  // const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  // const handleContextMenu = (e) => {
  //   e.preventDefault();
  //   setContextMenuidfileVisible(true);
  //   setContextMenuPosition({ x: e.clientX, y: e.clientY });
  // };

  // const handleCloseContextMenu = () => {
  //   setContextMenuVisible(false);
  // };


  return (
    <ContainerFolderFile id={id}>
      <div className='flex'>
        <img src="../src/assets/images/icon-file.png" alt="" width={120} height={120} />
        <div id={id} onClick={handleContextMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="white"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" /><circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" /></g></svg>
          

        </div>
        {
          isToClass &&
          <Link key={id} to={{ pathname: `/folderclasser/${id}`, state: { id: id } }} className='flex flex-row'>
            <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" />
          </Link>
        }
      </div>
      <div className='flex flex-col'>
        <h3 className='mx-auto max-w-[100%] '>
          <LinesEllipsis
            text={title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </h3>
        <div className='flex gap-3 mx-auto max-w-[100%] text-wrap'>
          <Link to={`http://localhost:3000/file/show/${id}`}>
            <img src="../src/assets/images/eye.svg" alt="" />
          </Link>
          <img src="../src/assets/images/trash-can-alt-2.svg" alt="" onClick={deleteFile} />
          <a href={`http://localhost:3000/file/download/${id}`}><img src="../src/assets/images/download-alt.svg" alt="" /></a>
        </div>
      </div>
    </ContainerFolderFile>
  );
}
