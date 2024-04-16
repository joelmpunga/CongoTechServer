import { useState, useEffect } from 'react'
import SignInSignUpComp from './SignInSignUpComp'
import InputsForm from './InputsForm'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useMyContext } from '../../contexts/MyContext';
// import jwt_decode from 'jwt-decode'

export default function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, updateIsAuthenticated,updateRole, updateNom, updatePostNom } = useMyContext();
    console.log("login",isAuthenticated);
    if (isAuthenticated==true) {
        updateIsAuthenticated(true)
        navigate('/folder/')
    }
    console.log("login",isAuthenticated);
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
    useEffect(() => {
        handleChangeEmail
    }, ['email'])
    useEffect(() => {
        handleChangePassword
    }, ['password'])
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/user/login', {
            email: email,
            password: password
        }).then(res => {
            console.log(res.data.userInfos)
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                console.log("login before",isAuthenticated);
                updateIsAuthenticated(true);
                console.log("login after",isAuthenticated);
                updateRole(res.data.userInfos.role)
                updateNom(res.data.userInfos.nom)
                updatePostNom(res.data.userInfos.postnom)
                if (res.data.userInfos.role === 'SECRETAIRE') {

                    navigate('/folder')
                }
                else if (res.data.userInfos.role === 'ADMIN') {
                    window.location.href = '/'
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
    }
    console.log(email, password);
    return (
        <SignInSignUpComp title1="Renseignez vos informations ci-dessous" title2="Se Connecter" btnName="Se Connecter" titleAdminContact1="Vous n’avez pas de compte?" titleAdminContact2="Contactez l’admin!" onClick={handleSubmit}>
            <InputsForm labelName="Email" htmlFor="Email" inputId="inputId" inputType="text" inputPlaceholder="Entrez votre Email" onChange={handleChangeEmail} />
            <InputsForm labelName="Password" htmlFor="Password" inputId="inputId" inputType="password" inputPlaceholder="8+ Caracteres, Majiscule exigé" onChange={handleChangePassword} />
        </SignInSignUpComp>
    )
}
