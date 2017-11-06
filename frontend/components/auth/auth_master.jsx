import React from 'react';
import AuthContainer from './auth_form.jsx'

export const Login = () => {
  return (
    <AuthContainer inputs={["Email"]}
      inputText="Log in"/> )
}

export const SignIn = () => {
  return (
    <AuthContainer inputs={["Email", "First Name", "Last Name"]}
      inputText="Sign up"/> )
}
