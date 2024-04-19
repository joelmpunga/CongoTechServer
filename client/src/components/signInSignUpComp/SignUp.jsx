import React from 'react'
import SignInSignUpComp from './SignInSignUpComp'
import InputsForm from './InputsForm'
import CbxInput from '../archDoc/comboBox/CbxInput'
import { useState } from 'react'
export default function SignUp() {


  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    password: '',
    selection:'',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    firstName: '',
    email: '',
    password: '',
    selection:'',
  });

  const validateForm = () => {
    let errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!formData.name.match(nameRegex)) {
      errors.name = 'Nom incorrect';
    }

    if (!formData.firstName.match(nameRegex)) {
      errors.firstName = 'Prénom invalide';
    }

    if (!formData.email.match(emailRegex)) {
      errors.email = 'Adresse e-mail invalide';
    }

    if (!formData.password.match(passwordRegex)) {
      errors.password = 'Mot de passe doit être d\'au moins 8 caractères';
    }

    if (formData.selection === "") {
      errors.selection = 'Vous devez selectioner un role';
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // joel, on peux integret ici
      console.log(formData);
      // Reset form fields
      setFormData({
        name: '',
        firstName: '',
        email: '',
        password: '',
        selection:'',
      });
      setFormErrors({
        name: '',
        firstName: '',
        email: '',
        password: '',
        selection:'',
      });
    } else {
      console.log('joel Le formulaire contient des erreurs');
    }
  };

  return (
    <SignInSignUpComp title2="Créer un compte" btnName="Créer un compte" onSubmit={handleSubmit}>

      <InputsForm
        labelName="Nom"
        name="name"
        // htmlFor="Email"
        inputId="nameId"
        inputType="text"
        inputPlaceholder="Entrez votre Email"
        msgErr={formErrors.name}
        value={formData.name}
        onChange={handleChange}
      />

      <InputsForm
        labelName="Postnom"
        name="firstName"
        // htmlFor="label"
        inputId="firstNameId"
        inputType="text"
        inputPlaceholder="Entrez votre postnom"
        msgErr={formErrors.firstName}
        value={formData.firstName}
        onChange={handleChange}
      />

      <InputsForm
        name="email"
        labelName="Email"
        // htmlFor="Email"
        inputId="EmailId"
        inputType="email"
        inputPlaceholder="Entrez votre Email"
        msgErr={formErrors.email}
        value={formData.email}
        onChange={handleChange}
      />

      <InputsForm
        labelName="Mot de passe"
        name="password"
        // htmlFor="label"
        inputId="passwordId"
        inputType="password"
        inputPlaceholder="8+ Caracteres, Majiscule exigé"
        msgErr={formErrors.password}
        value={formData.password}
        onChange={handleChange}
      />

      <CbxInput
        name="selection"
        ownNametypeDoc="Role"
        msgErr={formErrors.selection}
        value={formData.selection}
        onChange={handleChange}
        className=" h-[70px] shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"

      >
        <option value=""></option>
        <option value="admin">Administrateur</option>
        <option value="user">Utilisateur</option>
      </ CbxInput>

    </SignInSignUpComp>
  )
}
