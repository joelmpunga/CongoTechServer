import React from 'react'
import SignInSignUpComp from './SignInSignUpComp'
import InputsForm from './InputsForm'
import CbxInput from '../archDoc/comboBox/CbxInput'
import { useState } from 'react'
import PopupAlert from '../../ui/Popup'
import axios from 'axios'
export default function SignUp() {

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    email: '',
    password: '',
    role: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    firstName: '',
    email: '',
    password: '',
    role: '',
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

    if (formData.role === "") {
      errors.role = 'Vous devez selectioner un role';
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
      console.log(formData);

      axios.post('http://localhost:3000/user/signup', {
        nom: formData.name,
        postnom: formData.firstName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }).then(res => {
        console.log(res.data, res.status);
        if (res.status === 200) {
          console.log("user created");
          window.location.href = '/register'
        }
      }).catch(err => {
        setError(true)
        setErrorMessage(err.response.data.message)
      })
      setFormData({
        name: '',
        firstName: '',
        email: '',
        password: '',
        role: '',
      });
      setFormErrors({
        name: '',
        firstName: '',
        email: '',
        password: '',
        role: '',
      });
    } else {
      console.log('joel Le formulaire contient des erreurs');
    }
  };

  return (
    <SignInSignUpComp title2="Créer un compte" btnName="Créer un compte" onSubmit={handleSubmit}>

      {
        error && <PopupAlert message={errorMessage} />
      }

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
        name="role"
        ownNametypeDoc="Role"
        msgErr={formErrors.role}
        value={formData.role}
        onChange={handleChange}
        className=" h-[70px] shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"

      >
        <option value=""></option>
        <option value="ADMIN">Administrateur</option>
        <option value="SECRETAIRE">Secretaire</option>
      </ CbxInput>

    </SignInSignUpComp>
  )
}
