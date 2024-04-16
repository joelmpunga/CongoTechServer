import { useState } from "react"

export default function Menu({ title, children, iconeLeft, iconeRightOff, iconeRightOn, hasManyMenuItems, hasNumberCount, number }) {
    const [actived, setActived] = useState(false)
    const handleClick = () => {
        setActived(!actived)
    }
    return (
        <div className="mx-8 my-5 text-fontSize-extra-large p-4 rounded-xl  bg-black hover:bg-blue-900">
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
