import React from 'react'

export default function Title({title}) {
    return (
        <div>
            <div className="flex flex-row border h-14 ">
                <p className="m-4">{title}</p>
            </div>
        </div>
    )
}
