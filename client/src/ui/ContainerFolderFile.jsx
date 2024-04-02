import React from 'react'

export default function ContainerFolderFile({children}) {
  return (
    <div className='bg-gray-200 rounded-3xl w-[15rem] h-[15rem] m-8 p-6 hover:bg-gray-300'>
      {
        children
      }
    </div>
  )
}
