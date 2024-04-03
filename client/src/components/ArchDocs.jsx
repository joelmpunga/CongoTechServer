import { useState } from "react"


export default function ArchDocs() {
    let liste = ['Candidature', 'Entreprise'];
    const [value, setValue] = useState('Candidature')
    return (
        <div className="flex flex-col m-5">
            <div className="flex flex-row border h-12">
                <p className="">Information du document</p>
            </div>
            <div className="flex flex-row pt-3 my-5 justify-start gap-5">
                <div className="flex flex-col ">
                    <p>Nom du proprietaire</p>
                    {/* <ComboBox />   */}
                </div>
                <div className="flex flex-col">
                    <p>Nom à attribuer au document</p>
                    <input className="border h-14 w-72 " type="text" placeholder="Nom du proprietaire" />

                                      
                </div>
            </div>
            <p>Inserer le document</p>
            <div className="my-5 h-40 border-dashed border-blue-600 border-2 blue bg-blue-gray-200">
                
            {/* <DragComponent /> */}

                
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
