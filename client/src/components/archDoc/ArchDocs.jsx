import ArchDocComp from "./ArchDocComp";
import DragComponent from "./DragDrop/DragComponent";

export default function ArchDocs() {
    return (
        <>
            {/* tilte, dragDrop, ownNametypeDoc, attName */}
            <h2 className="m-5">Archiver les documents</h2>
            <div className="flex">
                <div className="">
                    <ArchDocComp tilte='Information du document' ownNametypeDoc='Nom du proprietaire' attName='Nom à attribuer au document' >
                        <DragComponent />
                    </ArchDocComp>
                </div>
                <div>
                    <ArchDocComp tilte='Ajouter un propriétaire' ownNametypeDoc='Type du proprietaire' attName='Nom' />
                </div>
            </div>
        </>
    )
}

