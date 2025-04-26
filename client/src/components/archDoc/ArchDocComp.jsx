import { Children, useState } from "react"
// import ComboBox from "./comboBox/ComboBox";
import DragComponent from "./DragDrop/DragComponent";
import SaveCancelBtns from "./SaveCancelBtns";
import Inputs from "./Inputs";
import Title from "./Title";



export default function ArchDocComp({ title, dragDrop, ownNametypeDoc, attName, children, onChange, onSubmit, className, annuler, description=true }) {
    return (
        <div className="flex flex-col m-5">
            <div >
                {children}
            </div>
            {
                description && (<div>
                <p className="mt-3">Decription</p>
                    <div >
                        <textarea className={className} name="" id="" cols="30" rows="10" onChange={onChange}>
                        </textarea>
                    </div>
                </div>)
            }
            <SaveCancelBtns annuler={annuler} onSubmit={onSubmit} />
        </div>
    )
}
