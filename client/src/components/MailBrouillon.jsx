import React from 'react'
import CheckBox from '../ui/CheckBox'

export default function MailBrouillon() {
    return (
        <div className='flex gap-10 text-[20px] text-gray-600 p-4 justify-between'>
            <td className='w-[5%]'><CheckBox /></td>
            <td className='w-[20%]'>Ilunga Christan</td>
            <td className='w-[50%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, explicabo?</td>
            <td className='w-[15%]'>25 November 2024</td>
            <td className='flex gap-3 w-[10%]'>
                <img src="../src/assets/images/eye.svg" alt="" />
                <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
                <img src="../src/assets/images/download-alt.svg" alt="" />
            </td>
        </div>
    )
}
