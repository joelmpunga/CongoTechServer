import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Menu({ title, children, iconeLeft, iconeRightOff, iconeRightOn, hasManyMenuItems, hasNumberCount, number }) {
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
                    <div>
                        <h2 className='flex gap-3 w-[80%] mx-auto text-white' onClick={handleClick}>
                            <img src={iconeLeft} alt="iconMenu" />
                            {title}
                            {hasManyMenuItems ?
                                <img src={iconeRightOn} alt="iconOn" />
                                : hasNumberCount ? number : ""}
                        </h2>
                        <div className="text-left my-5">
                            {children}
                        </div>
                    </div> :
                    <h2 className='flex gap-3 w-[80%] mx-auto text-white' onClick={handleClick}>
                        <img src={iconeLeft} alt="iconMenu" />
                        {title}
                        {hasManyMenuItems ?
                            <img src={iconeRightOff} alt="iconOff" />
                            : hasNumberCount ? <div className="bg-blue-500 h-7 rounded-md min-w-6 px-3 py-auto my-auto">{number}</div> : ""}
                    </h2>
            }
        </div>
    )
}
