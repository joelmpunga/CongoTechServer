import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'


export default function FoldersClasser() {
    return (
        <>
            <HeaderWorkspace title="Classer Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <div className='flex '>
                    <Folder title="Dossier 1" />
                    <Folder title="Dossier 2" />
                    <Folder title="Dossier 3" />
                    <Folder title="Dossier 4" />
                    <Folder title="Dossier 5" />
                    <Folder title="Dossier 6" />
                    <Folder title="Dossier 7" />
                    <Folder title="Dossier 8" />
                    <Folder title="Dossier 9" />
                    <Folder title="Dossier 10" />
                    <Folder title="Dossier 11" />
                    <Folder title="Dossier 12" />
                    <Folder title="Dossier 13" />
                    <Folder title="Dossier 14" />
                    <Folder title="Dossier 15" />
                    <Folder title="Dossier 16" />
                    <Folder title="Dossier 17" />
                </div>
                <div className='w-[95%] flex justify-end gap-2'>
                    <div className='bg-blue-600'>
                    <img src="" alt="<--" />
                    </div>
                    <div className='bg-blue-300'>
                        <img src="" alt="-->" />
                    </div>
                </div>
                <div className='flex gap-5 p-10 bg-green-200 w-[50%] h-80 border-8 border-l-green-600'>
                    <img src="" alt="Ok" />
                    <div>
                        <h4>Informations</h4>
                        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti blanditiis expedita harum amet consequatur aut suscipit ab culpa dolorum ipsam neque saepe cupiditate quam voluptates, voluptas error totam perferendis est.</span>
                    </div>
                </div>
                <div className='w-[95%] flex justify-end gap-2'>
                    <div className='bg-red-600 w-14 h-14'>
                        <div className='bg-red-400 w-7 h-7 m-auto'>
                            <img src="" alt="X" className='w-[90%] m-auto'/>
                        </div>
                    </div>
                </div>
            </WorkSpace>
        </>
    )
}
