import React from 'react'

export default function InputsForm({labelName, htmlFor, inputId, inputType, inputPlaceholder,}) {
    return (
        <div>
            <label className="block text-gray-500 text-sm font-adamina mb-2" htmlFor={htmlFor}>
                {labelName}
            </label>
            <input
                className=" mb-12 font-adamina h-[70px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={inputId}
                type={inputType}
                placeholder={inputPlaceholder}
            />

        </div>
    )
}
