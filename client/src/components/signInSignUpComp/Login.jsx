import { useState, useEffect } from 'react'
import SignInSignUpComp from './SignInSignUpComp'
import InputsForm from './InputsForm'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useMyContext } from '../../contexts/MyContext';
import PopupAlert from '../../ui/Popup';
// import jwt_decode from 'jwt-decode'

export default function Login() {
    const navigate = useNavigate();
    //const { isAuthenticated, updateIsAuthenticated, updateRole, updateNom, updatePostNom } = useMyContext();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
        navigate('/folder')
    }
    const setLocalStorage = (role, nom, postnom, email,userId) => {
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('role', role)
        localStorage.setItem('nom', nom)
        localStorage.setItem('postnom', postnom)
        localStorage.setItem('email', email)
        localStorage.setItem('userId', userId)
    }

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {


        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{8,}$/;
        

        if (!emailRegex.test(formData.email)) {
            errors.email = 'Email invalid';
        }

        if (!formData.password.match(passwordRegex)) {
            errors.password = 'Mot de pass invalide';
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
            // Submit the form, for now just log the data
            axios.post('http://localhost:3000/user/login', formData
               ).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    //updateIsAuthenticated(true);
                    // updateRole(res.data.userInfos.role)
                    // updateNom(res.data.userInfos.nom)
                    // updatePostNom(res.data.userInfos.postnom)
                    setLocalStorage(res.data.userInfos.role, res.data.userInfos.nom, res.data.userInfos.postnom,res.data.userInfos.email,res.data.userInfos.userId)
                    if (res.data.userInfos.role === 'SECRETAIRE') {
                        navigate('/charts/doc')
                    }
                    else if (res.data.userInfos.role === 'ADMIN') {
                        navigate('/userlist')
                    }
                    //pour recuperer le token en localStorage
                    //const local = localStorage.getItem('token')
                }
            }).catch((err) => {
                setError(true)
                setErrorMessage(err.response.data.message)
            })
            setFormData({
                email: '',
                password: '',
            });
            setFormErrors({
                email: '',
                password: '',
            });
        }
    };
    return (
        <SignInSignUpComp type="submit" title1="Renseignez vos informations ci-dessous" title2="Se Connecter" btnName="Se Connecter" titleAdminContact1="Vous n’avez pas de compte?" titleAdminContact2="Contactez l’admin!" onSubmit={handleSubmit}>
            {
                error && <PopupAlert message={errorMessage} />
            }
 

            <InputsForm
                labelName="Email"
                // htmlFor="Email"
                inputId="inputId"
                inputType="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                inputPlaceholder="Entrez votre Email"
                msgErr={formErrors.email}
            // onChange={handleChangeEmail} 
            />
            <InputsForm
                labelName="Mot de passe"
                // htmlFor="Password"
                inputId="inputId"
                inputType="password"
                inputPlaceholder="Enter votre mot de passe"
                msgErr={formErrors.password}
                // onChange={handleChangePassword}
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
        </SignInSignUpComp>
    )
}