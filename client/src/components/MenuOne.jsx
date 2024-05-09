import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function MenuOne({ title, iconeLeft }) {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const [actived, setActived] = useState(false)
    const handleClick = () => {
        setActived(!actived)
    }
    return (
        <div className="mx-8 my-5 text-fontSize-extra-large p-4 rounded-xl hover:bg-blue-900 backdrop-blur-sm bg-gray-600 ">
            {
                actived ?
                    
                        <h2 className='flex gap-3 w-[80%] mx-auto text-white' onClick={handleClick}>
                            <img src={iconeLeft} alt="iconMenu" />
                            {title}

                        </h2>
                    :

                    <h2 className='flex gap-3 w-[80%] mx-auto text-white' onClick={handleClick}>
                        <img src={iconeLeft} alt="iconMenu" />
                        {title}

                    </h2>
            }
        </div>
    )
}
