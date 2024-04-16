import React, { useContext } from 'react'
import Auth from '../contexts/Auth'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default function AuthenticatedRoute({path,component}) {
    const {isAuthenticated} = useContext(Auth)
  return isAuthenticated ? (
    <Route exact path = {path} component  = {component} />
  ):(
    <Redirect to = '/login'/>
  )
}
