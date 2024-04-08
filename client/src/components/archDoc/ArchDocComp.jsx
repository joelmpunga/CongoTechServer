import { Children, useState } from "react"
// import ComboBox from "./comboBox/ComboBox";
import DragComponent from "./DragDrop/DragComponent";
import SaveCancelBtns from "./SaveCancelBtns";
import Inputs from "./Inputs";
import Title from "./Title";



export default function ArchDocComp({ title, dragDrop, ownNametypeDoc, attName, children, onChange,onSubmit }) {

    const [value, setValue] = useState('Candidature')
    return (
        <div className="flex flex-col m-5">
            <div >
                {children}
            </div>
            <div>
                <p>Decription</p>
                <div >
                    <textarea className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none" name="" id="" cols="30" rows="10" onChange={onChange}>
                    </textarea>
                </div>
            </div>
            <SaveCancelBtns onSubmit={onSubmit} />
        </div>
    )
}
