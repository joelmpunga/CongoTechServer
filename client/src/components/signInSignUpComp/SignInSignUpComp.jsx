import React from 'react'
import { Children } from 'react'

export default function SignInSignUpComp({ children, title1, title2, titleAdminContact1, titleAdminContact2, btnName }) {
    return (
        <div>
            <div className='flex flex-row w-[100%] h-screen '>
                <div className='w-[48%] flex flex-col  items-center gap-14 mt-14'>
                    <h1 className="font-bold text-gray-900 font-abril-fatface text-3xl">ArchiDrive</h1>
                    <p className="text-gray-500 text-center">Bienvenue sur ArchiDrive, l’application <br /> d’archivage pour la FEC</p>
                    <img className='w-[500px] h-[500px]' src="/src/assets/images/loginImg.svg" alt="" />
                </div>
                <div className='h- w-[2px] bg-zinc-300'></div>
                <div className='w-[48%] ml-24'>

                    <div className='w-[600px] flex flex-col gap-16 '>
                        <div>
                            <p className="text-gray-500 font-adamina mt-14">{title1}</p>
                            <h1 className='font-adamina text-3xl mt-8'>{title2}</h1>
                        </div>

                        <form action="">
                            
                            {children}
                            <button className="mb-10 w-full h-[70px] bg-blue-500 hover:bg-blue-700 text-white font-adamina py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                {btnName}
                            </button>
                            
                        </form>
                        
                        <span className='mt-10 font-adamamina w-full text-center'>{titleAdminContact1}<a className='text-blue-700' href="">{titleAdminContact2}</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
