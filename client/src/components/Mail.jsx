import React from 'react'
import ContainerFolderFile from '../ui/ContainerFolderFile'

export default function Mail({ title, data }) {
    return (
        <ContainerFolderFile>
            <img src="../src/assets/images/icon-mail.png" alt="" width={100} height={100} className='mx-auto' />
            <div className='my-2'>
                <div>
                    <h4 className='mx-auto max-w-[90%] '>{data.name}</h4>
                    <h4 className='mx-auto max-w-[90%] '>{data.date}</h4>
                    <h4 className='mx-auto max-w-[90%] text-blue-600'>{data.address}</h4>
                </div>
                <div className='flex gap-3 mx-auto w-[90%]'>
                    <img src="../src/assets/images/eye.svg" alt="" />
                    <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
                    <img src="../src/assets/images/download-alt.svg" alt="" />
                </div>
            </div>
        </ContainerFolderFile>
    )
}
