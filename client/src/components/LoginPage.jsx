import React from 'react'
import SignInSignUpComp from './signInSignUpComp/SignInSignUpComp'
import InputsForm from './signInSignUpComp/InputsForm'


export default function LoginPage() {
    return (
        <div>
            <SignInSignUpComp title1='Renseignez vos informations ci-dessous' title2='Se connecter' titleAdminContact1='Vous n’avez pas de compte?' titleAdminContact2='Contactez l’admin!' btnName='Connexion'>
                <InputsForm labelName='Email' htmlFor='email' inputId='email' inputType='email' inputPlaceholder='Entrez votre email' />
                <InputsForm labelName='Mot de passe' htmlFor='password' inputId='password' inputType='password' inputPlaceholder='Entrez votre mot pass' />
            </SignInSignUpComp>
    
        </div>
    )
}
