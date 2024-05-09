import React from 'react'
import cbxInput from './comboBox/CbxInput'
export default function Inputs({
    ownNametypeDoc,
    attName,
    children,
    onChange, 
    value,
    errMsg,
    placeholder
}) {
    return (
        <div>
            <div className="flex flex-row justify-start gap-5 w-[100%]">

                {children}

                <div className="flex flex-col w-[100%]">
                    <p>{attName}</p>
                    <input className="border h-14 w-full " value={value} name="name" type="text" placeholder={placeholder} onChange={onChange} required />
                    <span className='text-red-600 '>{errMsg}</span>
                </div>
            </div>
        </div>
    )
}
