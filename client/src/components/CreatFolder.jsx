import ArchDocComp from "./archDoc/ArchDocComp";
import Title from "./archDoc/Title";
import Inputs from "./archDoc/Inputs";
import CbxInput from "./archDoc/comboBox/CbxInput";

export default function CreatFolder() {
    return (
        <>
            <div className="m-5 flex flex-row justify-between w-[1250px]">
                <h2 className="">Créer un dossier et un sous-dossier</h2>
                <p>Dashboard / dossier</p>
            </div>
            <div className="flex">
                <div className="w-[650px]">
                    <ArchDocComp   >
                        <Title title='Création d’un sous dossier' />
                        <Inputs attName='Nom du dossier parent' >
                            <CbxInput ownNametypeDoc='Nom à attribuer au sous dossier' />
                        </Inputs>
                    </ArchDocComp>

                </div>
                <div className="w-[650px]">
                    <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' >
                        <Title title='Ajouter un propriétaire' />
                        <Inputs attName='Nom du dossier ' />
                    </ArchDocComp>
                </div>
            </div>
        </>
    )

}