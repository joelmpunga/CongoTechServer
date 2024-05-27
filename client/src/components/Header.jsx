import { useState, useEffect } from 'react'
import { useMyContext } from '../contexts/MyContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ hasSearch, name, title, email, setSearchField }) {
    const [disconnect, setDisconnect] = useState(false)
    const [visibleProfil, setVisibleProfil] = useState(false)
    const navigate = useNavigate()
    const { updateIsAuthenticated } = useMyContext();

    const handleChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleLogout = () => {
        updateIsAuthenticated(false)
        unsetLocalStorage()
        navigate('/login')
    }

    const unsetLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('role')
        localStorage.removeItem('nom')
        localStorage.removeItem('postnom')
    }

    return (
        <div className='flex flex-col w-[100%] h-[100px]'>
            <div className='bg-white h-[75px] flex flex-row justify-between p-4'>
                {hasSearch ?
                    <div className='h-12 flex flex-row justify-center items-center  w-[80%] rounded-full bg-[#E2E8F0]'>
                        <img className='ml-4' src="../src/assets/images/search2.svg" alt="search" width={30} height={30} />
                        <input className='bg-[#E2E8F0] mx-5 outline-none w-full ' placeholder="Rechercher" onChange={handleChange} />
                    </div> :
                    <div className='h-12 flex flex-row justify-center items-center  w-[80%] rounded-full bg-[#E2E8F0]'>
                        <img className='ml-4' src="../src/assets/images/search2.svg" alt="search" width={30} height={30} />
                        <input className='bg-[#E2E8F0] mx-5 outline-none w-full ' placeholder="Rien à rechercher" onChange={handleChange} disabled/>
                    </div>
                }
                <div className='flex flex-row gap-4 items-center'>
                    <div className='flex flex-col '>
                        <span className='text-gray-600 text-[23px] font-bold '>{name}</span>
                        <span className='text-gray-500 text-[15px] w-[50%]'>{title}</span>
                    </div>
                    <img src="../src/assets/images/avatar-profil.svg" alt="" onClick={() => setVisibleProfil(!visibleProfil)} className='rounded-3xl w-12 h-12' />
                </div>
                {visibleProfil && (
                    <div className='w-[22%] text-[20px] flex flex-col items-center bg-[#E2E8F0] gap-6 mt-14 ml-[10%] absolute shadow-2xl border border-blue-200 p-4 profil-class top-10 right-4 rounded-lg'>
                        <span>{email}</span>
                        <img src="../src/assets/images/avatar-profil.svg" alt="" className='rounded-3xl w-12 h-12' />
                        <div className='flex flex-col items-center'>
                            <span className='text-gray-600 text-[23px] font-bold '>{name}</span>
                            <span className='text-gray-500 text-[15px] w-[50%]'>{title}</span>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-2 w-full '>
                            <button className='bg-white rounded-l-[20px] flex flex-row items-center justify-center w-full h-16 '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#4B5563" d="M10.56 11.87a3.75 3.75 0 1 1 3.75-3.75a3.76 3.76 0 0 1-3.75 3.75m0-6a2.25 2.25 0 1 0 2.25 2.25a2.25 2.25 0 0 0-2.25-2.25m-7 13a.75.75 0 0 1-.75-.75c0-4.75 5.43-4.75 7.75-4.75c.72 0 1.36 0 1.94.07a.75.75 0 0 1 .69.8a.76.76 0 0 1-.81.69c-.54 0-1.14-.06-1.82-.06c-5.18 0-6.25 1.3-6.25 3.25a.74.74 0 0 1-.75.75m9.11.76a.75.75 0 0 1-.53-.22a.72.72 0 0 1-.22-.59l.16-1.92a.75.75 0 0 1 .21-.47l5.52-5.52a2.06 2.06 0 0 1 2.8 0a2 2 0 0 1 .58 1.44a1.86 1.86 0 0 1-.53 1.33l-5.52 5.52a.74.74 0 0 1-.46.22l-1.94.18Zm.88-2.34l-.06.76l.78-.07l5.33-5.33a.4.4 0 0 0 .09-.27a.6.6 0 0 0-.14-.38a.57.57 0 0 0-.68 0Z" /></svg>
                                <span>Editer profil</span>
                            </button>
                            <button onClick={handleLogout} className='bg-white rounded-r-[20px] flex flex-row items-center justify-center w-full h-16 '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#4B5563" d="M4 20V4h8.02v1H5v14h7.02v1zm12.462-4.461l-.702-.72l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.702-.718L20 12z" /></svg>
                                <span>Deconexion</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
