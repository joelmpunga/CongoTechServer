import { Children, useState } from "react"
import ComboBox from "./ComboBox";

export default function ArchDocComp({tilte, ownNametypeDoc, attName, children}) {
    
    return (
        <div className="flex flex-col m-5">
            <div className="flex flex-row border h-12">
                <p className="">{tilte}</p>
            </div>
            <div className="flex flex-row pt-3 my-5 justify-start gap-5">
                <div className="flex flex-col ">
                    <p>{ownNametypeDoc}</p>
                    <ComboBox />  
                </div>
                <div className="flex flex-col">
                    <p>{attName}</p>
                    <input className="border h-14 w-72 " type="text" placeholder="Nom du proprietaire" />                    
                </div>
            </div>
            <div >
            {children}    
            </div>
           
            <div>
                <p>Decription</p>
                <div >
                    <textarea className=" bg-blue-200 w-full h-42 my-5 border-1  border-blue outline-none"  name="" id="" cols="30" rows="10"> 
                    </textarea>
                </div>
            </div>
            <div className="flex gap-5 flex-row-reverse w-full  ">
                <button className="bg-blue-600 text-white h-10 w-36">Enrgistrer</button>
                <button className="w-36 h-10 border-2 border-blue-600 " >Annuler</button>
            </div>

        </div>
    )
}
