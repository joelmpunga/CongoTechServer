import { useState, useEffect } from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import LinesEllipsis from 'react-lines-ellipsis';

export default function File({ title, data, isToClass = false, id }) {
  const location = useLocation();
  const actualUrl = location.pathname;
  const navigate = useNavigate()
  const [imageURL, setImageURL] = useState(null)
  const deleteFile = async () => {
    if (confirm("Etes vous sur de vouloir supprimer ce document ?")) {
      return await axios.delete("http://localhost:3000/file//delete/" + id).then(res => {
        if (res.status == 200) {
          alert("Supprimé avec succes!")
          navigate(actualUrl)
        }
      })
    }
    else {
      alert("Action annulée")
    }
  }

  // const fetchImage = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/file/download/" + id, {
  //       responseType: 'arraybuffer' // Indiquer que la réponse est binaire
  //     });


  //     // Convertir le contenu binaire en une chaîne base64
  //     const binaryData = new Uint8Array(response.data);
  //     const CHUNK_SIZE = 8192; // Taille des morceaux

  //     const chunks = [];
  //     for (let i = 0; i < binaryData.length; i += CHUNK_SIZE) {
  //       const chunk = binaryData.slice(i, i + CHUNK_SIZE);
  //       chunks.push(chunk);
  //     }

  //     const base64Chunks = chunks.map(chunk => btoa(String.fromCharCode(...chunk)));
  //     const base64Image = base64Chunks.join('');
  //     // Convertir les données binaires en tableau d'octets
  //     const imageUrlDecoded = `data:image/png;base64,${base64Image}`;
  //     setImageURL(imageUrlDecoded);
  //     console.log(imageUrlDecoded);
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération de l\'image:', error);
  //   }
  // };
  return (
    <ContainerFolderFile>
      <div className='flex'>
        <img src="../src/assets/images/icon-file.png" alt="" width={150} height={150} />
        {
          isToClass &&
          <Link key={id} to={{ pathname: `/folderclasser/${id}`, state: { id: id } }} className='flex flex-row'>
            <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" />
          </Link>
        }
      </div>
      <div className='flex flex-col my-4'>
        <h3 className='mx-auto max-w-[90%] text-wrap '>
          <LinesEllipsis
            text={title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </h3>
        <div className='flex gap-3 mx-auto max-w-[40%] text-wrap'>
          <Link to = {"http://localhost:3000/file/show/" + id}>
            <img src="../src/assets/images/eye.svg" alt="" />
          </Link>
          <img src="../src/assets/images/trash-can-alt-2.svg" alt="" onClick={deleteFile} />
          <a href={"http://localhost:3000/file/download/" + id}><img src="../src/assets/images/download-alt.svg" alt="" /></a>
        </div>
      </div>
    </ContainerFolderFile>
  )
}
