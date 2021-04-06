import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../formUI/TextInput';
import './Login-Signup.scss';

function Login() {
   const [loginData, setLoginData] = useState({ username: '', password: '' });

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setLoginData({ ...loginData, [name]: value });
   };

   const handleLogin = ev => {
      ev.preventDefault();
      alert('Submitted');
   };
   return (
      <form action="" className="auth text-center" onSubmit={handleLogin}>
         <h1 className="heading-primary auth__heading">Log in</h1>
         <div className="auth__formgroup">
            <TextInput
               type="text"
               className="auth__forminput textfield"
               placeholder="Enter your username"
               name="username"
               value={loginData.username}
               onChange={onChangeData}
            />
            <i className="fas fa-user auth__formgroup__icon"></i>
         </div>
         <div className="auth__formgroup">
            <TextInput
               type="password"
               className="auth__forminput textfield"
               placeholder="Enter your password"
               name="password"
               value={loginData.password}
               onChange={onChangeData}
            />
            <i className="fas fa-lock auth__formgroup__icon"></i>
         </div>
         <div className="auth__formgroup">
            <button type="submit" className="btn auth__submit">
               Log into my account
            </button>
         </div>
         <p className="go-to-sign-up">
            Don't have an account?{' '}
            <Link to="/signup">Create a new account</Link>
         </p>
      </form>
   );
}
export default Login;
