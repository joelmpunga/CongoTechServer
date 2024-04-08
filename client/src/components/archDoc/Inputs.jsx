import React from 'react'
import cbxInput from './comboBox/CbxInput'
export default function Inputs({ ownNametypeDoc, attName, children, onChange }) {
    return (
        <div>
            <div className="flex flex-row pt-3 my-5 justify-start gap-5 w-[100%]">

                {children}

                <div className="flex flex-col w-[100%]">
                    <p>{attName}</p>
                    <input className="border h-14 w-full " type="text" placeholder="Nom du proprietaire" onChange={onChange} />
                </div>
            </div>
        </div>
    )
}
