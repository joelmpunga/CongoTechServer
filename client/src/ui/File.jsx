import { useState, useEffect } from 'react';
import ContainerFolderFile from './ContainerFolderFile';
import BouttonIcon from './BouttonIcon';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';
import Swal from 'sweetalert2';

export default function File({ title, data, isToClass = false, id, onContextMenu }) {
  const location = useLocation();
  const actualUrl = location.pathname;
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);

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

  return (
    <ContainerFolderFile>
      <div onContextMenu={onContextMenu} className='flex'>
        <img src="../src/assets/images/icon-file.png" alt="" width={120} height={120} />
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
