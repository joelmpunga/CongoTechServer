import { useState, useEffect } from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LinesEllipsis from 'react-lines-ellipsis';
import { useNavigate } from 'react-router-dom'


export default function Folder({ title, taille, isToClass = false, idFile, idSub, isVisible, position, onContextMenu }) {
    const navigate = useNavigate()
    const onClickClasser = async () => {
        await axios.put(`http://localhost:3000/file/classer/${idFile}`, { idSub }).then(() => {
            navigate(`/file/draft`)
        });
    }


    return (
        <>

            <ContainerFolderFile onContextMenu={onContextMenu}  >
                {isVisible && (
                    <div
                        className="absolute bg-white border border-gray-300 p-2 shadow-md"
                        style={{ left: position.x, top: position.y }}
                    >
                        <ul>
                            <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Ouvrir</li>
                            <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Renomer</li>
                            <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Supprimer</li>
                            <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Détails du dossier</li>
                        </ul>
                    </div>
                )}

                <img src="../src/assets/images/dossier.png" alt="" width={150} height={150} />
                {
                    !isToClass &&  <div className=''>
                    <h3 className=''>
                        <LinesEllipsis
                            text={title}
                            maxLine="1"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                        />
                    </h3>
                </div>
                }
                {
                    isToClass &&
                    <div className='flex flex-row gap-5 justify-end w-40'>
                        <div className=''>
                            <h3 className=''>
                                <LinesEllipsis
                                    text={title}
                                    maxLine="1"
                                    ellipsis="..."
                                    trimRight
                                    basedOn="letters"
                                />
                            </h3>
                        </div>
                        <div>
                            <Link to="" onClick={onClickClasser}> <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" taille="w-6 h-6" /></Link>

                        </div>
                    </div>
                }

            </ContainerFolderFile>
        </>


    )
}
