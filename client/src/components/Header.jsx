import { useState, useEffect } from 'react'

export default function Header({ hasSearch, name, title }) {
    const [disconnect, setDisconnect] = useState(false)
    const handleClick = () => {
        setDisconnect(!disconnect)
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='bg-white flex justify-between mx-20'>
                {
                    hasSearch &&
                    <div className='flex w-[100%] gap-4'>
                        <img src="../src/assets/images/search2.svg" alt="search" width={30} height={30} />
                        <input className='my-auto outline-none' placeholder="Type for search" />
                    </div>
                }
                <div className='flex gap-6'>
                    <div>
                        <h2>{name}</h2>
                        <h3>{title}</h3>
                    </div>
                    <img src="../src/assets/images/avatar.svg" alt="" />
                    {
                        !disconnect ? <img src="../src/assets/images/chevron-down.svg" alt="log out" onClick={handleClick} /> : <img src="../src/assets/images/chevron-up-black.svg" alt="log out" onClick={handleClick} />
                    }
                </div>
            </div>
            {
                disconnect && <button className="bg-blue-500 text-white min-w-[5rem] mx-[93%] h-10 rounded-2xl p-2">Log Out</button>
            }
        </div>
    )
}
