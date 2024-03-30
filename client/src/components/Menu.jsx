import React from 'react'

export default function Menu({ actived, title, children, iconeLeft, iconeRightOff, iconeRightOn, hasManyMenuItems }) {
    return (
        <>
            {actived ?
                <h2 className='bg-black hover:bg-blue-900'>
                    <span>
                        <img src={iconeLeft} alt="iconMenu" />
                    </span>{title}
                    {hasManyMenuItems ?
                        <span>
                            <img src={iconeRightOn} alt="" />
                        </span>
                        : ""}
                </h2> :
                <h2 className='bg-black hover:bg-blue-900'>
                    <span>
                        <img src={iconeLeft} alt="iconMenu" />
                    </span>{title}
                    {hasManyMenuItems ?
                        <span>
                            <img src={iconeRightOff} alt="" />
                        </span>
                        : ""}
                </h2>}

            {
                children
            }
        </>
    )
}
