import React from 'react'

export default function ContainerFolderFile({children, onContextMenu,id}) {
  return (
    <div id={id} onContextMenu={onContextMenu} className='flex flex-col justify-center items-center bg-gray-200 rounded-3xl w-[13rem] h-[13rem] m-5 p-4 hover:bg-gray-300'>
      
      {
        children
      }
    </div>
  )
}
