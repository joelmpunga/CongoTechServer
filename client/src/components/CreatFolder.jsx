import ArchDocComp from "./archDoc/ArchDocComp"





export default function CreatFolder(){
    return (
        <>
            <h2 className="m-5">Créer un dossier et un sous-dossier</h2>
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