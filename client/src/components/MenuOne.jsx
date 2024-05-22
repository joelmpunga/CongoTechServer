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
        <div className={(actived ? "border-l-8" : "") + " text-fontSize-extra-large p-4 hover:bg-gray-600 backdrop-blur-sm "}>
            {
                actived ?
                    
                        <h2 className='flex gap-4 w-[100%] mx-auto text-white' onClick={handleClick}>
                            <img src={iconeLeft} alt="iconMenu" />
                            {title}

                        </h2>
                    :

                    <h2 className='flex gap-4 w-[100%] mx-auto text-white' onClick={handleClick}>
                        <img src={iconeLeft} alt="iconMenu" />
                        {title}

                    </h2>
            }
        </div>
    )
}
