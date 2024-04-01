import { useState } from "react"

export default function Menu({ title, children, iconeLeft, iconeRightOff, iconeRightOn, hasManyMenuItems, hasNumberCount, number }) {
    const [actived, setActived] = useState(false)
    const handleClick = () => {
        setActived(!actived)
    }
    return (
        <div className="mx-8 my-5 h-full text-fontSize-extra-large">
            {
                actived ?
                    <div>
                        <h2 className='flex gap-3 w-[80%] mx-auto text-white bg-custom-dark-blue hover:bg-blue-900' onClick={handleClick}>
                            <img src={iconeLeft} alt="iconMenu" />
                            {title}
                            {hasManyMenuItems ?
                                <img src={iconeRightOn} alt="iconOn" />
                                : hasNumberCount ? { number } : ""}
                        </h2>
                        <div className="text-left my-5">
                            {children}
                        </div>
                    </div> :
                    <h2 className='flex gap-3 w-[80%] mx-auto text-white bg-custom-dark-blue hover:bg-blue-900' onClick={handleClick}>
                        <img src={iconeLeft} alt="iconMenu" />
                        {title}
                        {hasManyMenuItems ?
                            <img src={iconeRightOff} alt="iconOff" />
                            : hasNumberCount ? { number } : ""}
                    </h2>
            }
        </div>
    )
}
