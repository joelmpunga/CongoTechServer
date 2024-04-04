import ArchDocComp from "./ArchDocComp";
import DragComponent from "./DragDrop/DragComponent";
import Title from "./Title";
import Inputs from "./Inputs";
import CbxInput from "./comboBox/CbxInput";


export default function ArchDocs() {
    return (
        <>
            {/* tilte, dragDrop, ownNametypeDoc, attName */}

            <div className="m-5 flex flex-row justify-between w-[1250px]">
                <h2>Archiver les documents</h2>
                <p>Dashboard / Archive</p>
            </div>
            <div className="flex">
                <div className="w-[650px]">
                    <ArchDocComp   >
                        <Title title='Information du document' />
                        <Inputs attName='Nom à attribuer au document' >
                            <CbxInput ownNametypeDoc='Nom du proprietaire' />
                        </Inputs>
                        <DragComponent />
                    </ArchDocComp>

                </div>
                <div className="w-[650px]">
                    <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' >
                        <Title title='Ajouter un propriétaire' />
                        <Inputs attName='Nom à attribuer au document' >
                            <CbxInput ownNametypeDoc='Nom du proprietaire' />
                        </Inputs>
                    </ArchDocComp>
                </div>
            </div>
        </>
    )
}

