import React from 'react'

export default function ActionBtns({className, src, label, onClick}) {
    return (

        <button onClick={onClick} className={className}>
            <img src={src} alt="" />
            <span>{label}</span>
        </button>


    )
}
