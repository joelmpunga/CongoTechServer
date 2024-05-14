

export default function SaveCancelBtns({onSubmit}) {
    return (
        <div>
            <div className="flex gap-5 flex-row-reverse w-full  ">
                <button className="bg-blue-600 text-white h-10 w-36" type="submit" onClick={onSubmit}>Enregistrer</button>
                <button className="w-36 h-10 border-2 border-blue-600 " >Annuler</button>
            </div>
        </div>
    )
}
