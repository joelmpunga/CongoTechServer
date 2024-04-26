import { useState, useEffect } from 'react'
import { useMyContext } from '../contexts/MyContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ hasSearch, name, title }) {
    const [disconnect, setDisconnect] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, updateIsAuthenticated, role, updateRole, nom, updateNom, postnom, updatePostNom } = useMyContext();
    const handleClick = () => {
        setDisconnect(!disconnect)
    }
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
        <div className='flex flex-col w-[100%] gap-2'>
            <div className='bg-white flex justify-between mx-5 mt-5'>
                {
                    hasSearch &&
                    <div className='flex w-[100%]'>
                        <img src="../src/assets/images/search2.svg" alt="search" width={30} height={30} />
                        <input className=' mx-5 outline-none w-full' placeholder="Rechercher" />
                    </div>
                }
                <div className='flex'>
                    <div className='flex'>
                        <div>
                            <span>{name} </span>
                            <span>{title}</span>
                        </div>
                        <img src="../src/assets/images/avatar.svg" alt="" />
                    </div>
                    
                    {
                        !disconnect ? <img src="../src/assets/images/chevron-down.svg" alt="log out" onClick={handleClick} /> : <img src="../src/assets/images/chevron-up-black.svg" alt="log out" onClick={handleClick} />
                    }
                </div>
            </div>
            {
                disconnect && <button className="bg-blue-500 text-white min-w-[5rem] mx-[93%] h-10 rounded p-2 absolute top-20 left-0 " onClick={handleLogout}>Log Out</button>
            }
        </div>
    )
}
