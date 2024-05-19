import { useState, useEffect } from 'react'
import { useMyContext } from '../contexts/MyContext';
import { useNavigate } from 'react-router-dom';
import SaveCancelBtns from './archDoc/SaveCancelBtns';

export default function Header({ hasSearch, name, title }) {
    const [disconnect, setDisconnect] = useState(false)
    const [visibleProfil, setVisibleProfil] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, updateIsAuthenticated, role, updateRole, nom, updateNom, postnom, updatePostNom } = useMyContext();
    const showLogOut = () => {
        setDisconnect(true)
    }
    const hideLogOut = () => {
        setDisconnect(false)
    }
    const showVisible = () => {
        setVisibleProfil(true)
    }

    const closeVisible = () => {
        setVisibleProfil(false)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.profil-class') && visibleProfil) {
                closeVisible();
            }
        };

        if (visibleProfil) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [visibleProfil]);
    
    useEffect(() => {
        const handleOutsideClickLogOut = (e) => {
            if (!e.target.closest('.logout-class') && disconnect) {
                hideLogOut();
            }
        };

        if (disconnect) {
            document.addEventListener('mousedown', handleOutsideClickLogOut);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClickLogOut);
        };
    }, [disconnect]);

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
            <div className='bg-white h-[75px] flex flex-row justify-center items-center'>
                {
                    hasSearch &&
                    <div className='h-12 flex flex-row justify-center items-center mx-5 w-[100%] rounded-full bg-[#E2E8F0]'>
                        <img className='ml-5' src="../src/assets/images/search2.svg" alt="search" width={30} height={30} />
                        <input className='bg-[#E2E8F0] mx-5 outline-none w-full ' placeholder="Rechercher" />
                    </div>
                }
                <div className='flex flex-row  w-70 mr-5'>
                    <div className='flex flex-row gap-2 w-60'>
                        <div className='flex flex-col  '>
                            <span className='text-gray-600 text-[23px] font-bold '>{name}</span>
                            <span className='text-gray-500 text-[15px] w-[50%]'>{title}</span>
                        </div>
                        <img src="../src/assets/images/avatar-profil.svg" alt="" onClick={showVisible} className='rounded-3xl w-12 h-12'/>
                        {
                            visibleProfil && (
                                <div className='text-[20px] flex flex-col bg-slate-100 gap-6 mt-14 -ml-[10%] absolute shadow-2xl border border-blue-300 p-4 profil-class'>
                                    <form action="" className='flex flex-col gap-6'>
                                        <div className='flex gap-4'>
                                            <label htmlFor="">Nom</label>
                                            <input type="text" value="default" className='h-8 p-2  outline-2 bg-slate-200 rounded-xl' />
                                        </div>

                                        <label htmlFor=""> Post Nom
                                            <input type="text" value="default" />
                                        </label>
                                        <label htmlFor=""> Email
                                            <input type="text" value="default" />
                                        </label>
                                        <label htmlFor=""> Role
                                            <input type="text" value="default" />
                                        </label>
                                        <div className="flex gap-5 flex-row-reverse w-full  ">
                                            <button className="bg-blue-600 text-white h-10 w-36" type="submit" onClick="">Enregistrer</button>
                                            <button className="w-36 h-10 border-2 border-blue-600" onClick={closeVisible} >Annuler</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>

                    {
                        !disconnect ? <img src="../src/assets/images/chevron-down.svg" alt="log out" onClick={showLogOut} /> : <img src="../src/assets/images/chevron-up-black.svg" alt="log out" onClick={showLogOut} />
                    }
                </div>
            </div>
            {
                disconnect && <button className="bg-blue-500 text-white min-w-[5rem] mx-[93%] h-10 rounded p-2 absolute top-20 left-0 logout-class" onClick={handleLogout}>Log Out</button>
            }
        </div>
    )
}
