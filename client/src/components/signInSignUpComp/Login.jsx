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
    const setLocalStorage = (role, nom, postnom, email) => {
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('role', role)
        localStorage.setItem('nom', nom)
        localStorage.setItem('postnom', postnom)
        localStorage.setItem('email', email)
    }
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    // useEffect(()=>{
    //     const token = localStorage.getItem('token')
    //     if(token){
    //         const decoded = jwt_decode(token)
    //         if(decoded.exp < Date.now()/1000){
    //             localStorage.removeItem('token')
    //         }
    //     }
    // },['token'])

    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem('isAuthenticated');
    //     if (isAuthenticated) {
    //         navigate('/folder')
    //     }
    // }, [navigate]);

    // useEffect(() => {
    //     handleChangeEmail
    // }, [email])
    // useEffect(() => {
    //     handleChangePassword
    // }, [password])
    // const handleChangeEmail = (event) => {
    //     setEmail(event.target.value)
    // }
    // const handleChangePassword = (event) => {
    //     setPassword(event.target.value)
    // }
    // const handleSubmit = (event) => {
    //     event.preventDefault()

    // }
    // console.log(email, password);





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
                // console.log(res.data.userInfos)
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    console.log("login before", isAuthenticated);
                    //updateIsAuthenticated(true);
                    console.log("login after", isAuthenticated);
                    // updateRole(res.data.userInfos.role)
                    // updateNom(res.data.userInfos.nom)
                    // updatePostNom(res.data.userInfos.postnom)
                    // console.log(res.data.userInfos);
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