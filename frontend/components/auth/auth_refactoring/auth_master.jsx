import React from 'react';
import AuthContainer from './auth_form.jsx'

export const Login = () => {
  return (
    <AuthContainer inputs={["Email"]}
      inputText="Log in"/> )
}

//could add header prop and handleForm prop here as well, and bottom text
// here as well
// (would then have to connect it!)
export const SignIn = () => {
  return (
    <AuthContainer inputs={["Email", "First Name", "Last Name"]}
      inputText="Sign up"/> )
}
