import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Menu({ title, children, iconeLeft, iconeRightOff, iconeRightOn, hasManyMenuItems, hasNumberCount, number }) {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const [borderLeft, setBorderLeft] = useState("border-l-8")
    const [actived, setActived] = useState(false)
    const handleClick = () => {
        setActived(!actived)
    }
    // if (hasManyMenuItems) {
    //     setBorderLeft("border-l-8")
    // } else {
    //     setBorderLeft("")
    // }
    const nn = "border-l-8"
  
    return (
        <div className={(actived?"border-l-8":"")+" text-fontSize-extra-large p-4 hover:bg-gray-600 backdrop-blur-sm "}>
            {
                actived ?
                    <div>
                        <h2 className='flex flex-row justify-between w-[100%] text-white' onClick={handleClick}>
                            <div className="flex gap-4">
                                <img src={iconeLeft} alt="iconMenu" />
                                {title}
                            </div>
                            {hasManyMenuItems ?
                                <img src={iconeRightOn} alt="iconOn" />
                                : hasNumberCount ? number : ""}
                        </h2>
                        <div className="text-left my-5">
                            {children}
                        </div>
                    </div> :
                    <h2 className='flex flex-row justify-between w-[100%] text-white' onClick={handleClick}>
                        <div className="flex gap-4">
                            <img src={iconeLeft} alt="iconMenu" />
                            {title}
                        </div>
                        {hasManyMenuItems ?
                            <img src={iconeRightOff} alt="iconOff" />
                            : hasNumberCount ? <div className="bg-blue-500 h-7 rounded-md min-w-6 px-3 py-auto my-auto">{number}</div> : ""}
                    </h2>
            }
        </div>
    )
}
