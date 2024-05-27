import React from 'react'
import CheckBox from '../ui/CheckBox'

export default function MailBrouillon({ allChk }) {
    return (
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <tr className="hover:bg-gray-100">
                <td><CheckBox allChk={allChk} /></td>
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="text-sm">
                        <div className="font-medium text-gray-700">Ilunga Christan</div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full  text-xs font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, explicabo?
                    </span>
                </td>
                <td className="px-6 py-4">25 November 2024</td>
                <td className='flex gap-3 pl-6'>
                    <img src="../src/assets/images/eye.svg" alt="" />
                    <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
                    <img src="../src/assets/images/download-alt.svg" alt="" />
                </td>

            </tr>
        </tbody>
    )
}
