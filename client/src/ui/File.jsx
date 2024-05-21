import { useState, useEffect } from 'react';
import ContainerFolderFile from './ContainerFolderFile';
import BouttonIcon from './BouttonIcon';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';
import Swal from 'sweetalert2';
import { useMyContext } from '../contexts/MyContext';

export default function File({ title, data, isToClass = false, id, menuContex }) {
  const { setIdFile, handleContextMenu } = useMyContext();
  const location = useLocation();
  const actualUrl = location.pathname;
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const handleHover = () => {
    setIsHover(true);
  }

  const hideHover = () => {
    setIsHover(false);
  }

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
    <ContainerFolderFile onMouseOver={handleHover} onMouseOut={hideHover} id={id}>
      <div className='flex'>
        <img src="../src/assets/images/icon-file.png" alt="" width={120} height={120} className='' />
        {/* {
          menuContex && <div id={id} onClick={handleContextMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="black"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" /><circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" /></g></svg>
          </div>
        } */}
        {/* {
          isToClass &&
          <Link key={id} to={{ pathname: `/folderclasser/${id}`, state: { id: id } }} className='flex flex-row'>
            <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" />
          </Link>
        } */}
      </div>
      {
        isHover && (
          <div className='absolute outset-0'>
            <div className='flex gap-5 text-wrap bg-blue-100 -ml-5 rounded-2xl w-[170px] h-[40px] p-2 shadow-xl justify-around'>
              <Link to={`http://localhost:3000/file/show/${id}`}>
                <img src="../src/assets/images/eye.svg" alt="" width={30} />
              </Link>
              <button>
                <img src="../src/assets/images/trash-can-alt-2.svg" alt="" onClick={deleteFile} width={30} />
              </button>
              <a href={`http://localhost:3000/file/download/${id}`}>
                <img src="../src/assets/images/download-alt.svg" alt="" width={30} />
              </a>

              {
                isToClass &&
                <Link key={id} to={{ pathname: `/folderclasser/${id}`, state: { id: id } }} className=''>
                  {/* <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="gray" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5" /></svg>

                </Link>
              }

              {
                menuContex && <div id={id} onClick={handleContextMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"><g fill="black"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" /><circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" /></g></svg>
                </div>
              }


            </div>
          </div>
        )
      }
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


      </div>
    </ContainerFolderFile>
  );
}
