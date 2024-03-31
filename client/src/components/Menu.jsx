import { useState } from "react"

export default function Menu({ title, children, iconeLeft, iconeRightOff, iconeRightOn, hasManyMenuItems, hasNumberCount, number }) {
    const [actived, setActived] = useState(false)
    const handleClick = () => {
        setActived(!actived)
    }
    return (
        <>
            {
                actived ?
                    <>
                        <h2 className='flex text-white bg-black hover:bg-blue-900' onClick={handleClick}>
                            <img src={iconeLeft} alt="iconMenu" />
                            {title}
                            {hasManyMenuItems ?
                                <img src={iconeRightOn} alt="iconOn" />
                                : hasNumberCount ? { number } : ""}
                        </h2>
                        <div>
                            {children}
                        </div>
                    </> :
                    <h2 className='flex text-white bg-black hover:bg-blue-900' onClick={handleClick}>
                        <img src={iconeLeft} alt="iconMenu" />
                        {title}
                        {hasManyMenuItems ?
                            <img src={iconeRightOff} alt="iconOff" />
                            : hasNumberCount ? { number } : ""}
                    </h2>
            }
        </>
    )
}
