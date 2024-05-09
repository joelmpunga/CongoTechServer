import React from 'react'

export default function ActionBtns({className, src, label}) {
    return (

        <button className={className}>
            <img src={src} alt="" />
            <span>{label}</span>
        </button>


    )
}
