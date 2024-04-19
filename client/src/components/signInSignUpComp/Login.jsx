import { useState, useEffect } from 'react'
import SignInSignUpComp from './SignInSignUpComp'
import InputsForm from './InputsForm'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useMyContext } from '../../contexts/MyContext';
// import jwt_decode from 'jwt-decode'

export default function Login() {
    const navigate = useNavigate();
    //const { isAuthenticated, updateIsAuthenticated, updateRole, updateNom, updatePostNom } = useMyContext();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated == true) {
        navigate('/folder')
    }
    const setLocalStorage = (role, nom, postnom) => {
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('role', role)
        localStorage.setItem('nom', nom)
        localStorage.setItem('postnom', postnom)
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // useEffect(()=>{
    //     const token = localStorage.getItem('token')
    //     if(token){
    //         const decoded = jwt_decode(token)
    //         if(decoded.exp < Date.now()/1000){
    //             localStorage.removeItem('token')
    //         }
    //     }
    // },['token'])

    const [formData, setFormData] = useState({ email: '', password: '', });
    const [formErrors, setFormErrors] = useState({ email: '', password: '', });

    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.match(emailRegex)) {
            errors.email = 'Email invalid';
        }

        if (formData.password.length < 8) {
            errors.password = 'Mot de passe incorrect';
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


    // useEffect(() => {
    //     handleChangeEmail
    // }, ['email'])
    // useEffect(() => {
    //     handleChangePassword
    // }, ['password'])
    // const handleChangeEmail = (event) => {
    //     setEmail(event.target.value)
    // }
    // const handleChangePassword = (event) => {
    //     setPassword(event.target.value)
    // }



    const handleSubmit = (event) => {
        event.preventDefault()


        const isValid = validateForm();
        if (isValid) {

            console.log(formData);
            axios.post('http://localhost:3000/user/login', {
                email: formData.email,
                password: formData.password
            }).then(res => {
                console.log(res.data.userInfos)
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    console.log("login before", isAuthenticated);
                    //updateIsAuthenticated(true);
                    console.log("login after", isAuthenticated);
                    // updateRole(res.data.userInfos.role)
                    // updateNom(res.data.userInfos.nom)
                    // updatePostNom(res.data.userInfos.postnom)
                    setLocalStorage(res.data.userInfos.role, res.data.userInfos.nom, res.data.userInfos.postnom)
                    if (res.data.userInfos.role === 'SECRETAIRE') {
                        navigate('/folder')
                    }
                    else if (res.data.userInfos.role === 'ADMIN') {
                        navigate('/')
                    }
                    //pour recuperer le token en localStorage
                    //const local = localStorage.getItem('token')
                    //console.log(local);
                } else {
                    alert("Erreur!", res.data.message)
                }
            }).catch(err => {
                console.log(err)
            })

            setFormData({email: '', password: '',});
            setFormErrors({email: '',password: '',});

        } else {
            
            console.log('the Form has errors');
        }

    }
    return (
        <SignInSignUpComp title1="Renseignez vos informations ci-dessous" title2="Se Connecter" btnName="Se Connecter" titleAdminContact1="Vous n’avez pas de compte?" titleAdminContact2="Contactez l’admin!" onClick={handleSubmit}>
            <InputsForm
                labelName="Email"
                // htmlFor="Email"
                inputId="mailId"
                inputType="text"
                inputPlaceholder="Entrez votre Email"
                // onChange={handleChangeEmail}
                name="email"
                value={formData.email}
                onChange={handleChange}
                msgErr={formErrors.email}
            />


            <InputsForm
                labelName="Mot de passe"
                // htmlFor="Password"
                inputId="passId"
                inputType="password"
                inputPlaceholder="Entrez votre mot de passe"
                // onChange={handleChangePassword}
                name="password"
                value={formData.password}
                onChange={handleChange}
                msgErr={formErrors.password}
            />

        </SignInSignUpComp>
    )
}
