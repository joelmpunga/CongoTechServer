import React from 'react'
import SignInSignUpComp from './SignInSignUpComp'
import InputsForm from './InputsForm'
import CbxInput from '../archDoc/comboBox/CbxInput'
export default function SignUp() {
    return (
        <SignInSignUpComp title1="Renseignez vos informations ci-dessous" title2="Créer un compte" btnName="Créer un compte" titleAdminContact1="titeAdm1" titleAdminContact2="titleAdmin2">
            <InputsForm labelName="Nom" htmlFor="Email" inputId="inputId" inputType="text" inputPlaceholder="Entrez votre Email" />
            <InputsForm labelName="Postnom" htmlFor="label" inputId="inputId" inputType="text" inputPlaceholder="8+ Caracteres, Majiscule exigé" />
            <InputsForm labelName="Email" htmlFor="Email" inputId="inputId" inputType="text" inputPlaceholder="Entrez votre Email" />
            <InputsForm labelName="Password" htmlFor="label" inputId="inputId" inputType="password" inputPlaceholder="8+ Caracteres, Majiscule exigé" />
            <CbxInput ownNametypeDoc="ownNameTypeDoc"/>
        </SignInSignUpComp>
    )
}
