import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../redux/user/user.actions';

import TextInput from '../formUI/TextInput';
import * as utils from '../../utils';
import './Login-Signup.scss';

function Signup({ signupUser }) {
   const [signupData, setSignupData] = useState({
      username: '',
      password: '',
      email: ''
   });

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setSignupData({ ...signupData, [name]: value });
   };

   const handleSignup = ev => {
      ev.preventDefault();
      const emptyFields = utils.getEmptyFields(signupData);
      if (!emptyFields.length) signupUser(signupData);
      else console.log(emptyFields, 'are empty');
   };

   return (
      <form className="auth text-center" onSubmit={handleSignup}>
         <h1 className="heading-primary auth__heading">
            Create your new account
         </h1>
         <div className="auth__formgroup">
            <TextInput
               type="text"
               className="auth__forminput textfield"
               placeholder="Enter your username"
               name="username"
               value={signupData.username}
               onChange={onChangeData}
            />
            <i className="fas fa-user auth__formgroup__icon"></i>
         </div>
         <div className="auth__formgroup">
            <TextInput
               type="email"
               className="auth__forminput textfield"
               placeholder="Enter your email"
               name="email"
               value={signupData.email}
               onChange={onChangeData}
            />
            <i className="fas fa-envelope auth__formgroup__icon"></i>
         </div>
         <div className="auth__formgroup">
            <TextInput
               type="password"
               className="auth__forminput textfield"
               placeholder="Enter a password"
               name="password"
               value={signupData.password}
               onChange={onChangeData}
               autoComplete="off"
            />
            <i className="fas fa-lock auth__formgroup__icon"></i>
         </div>
         <div className="auth__formgroup">
            <button type="submit" className="btn auth__submit">
               Create my new account
            </button>
         </div>
         <p className="go-to-sign-up">
            Already have an account? <Link to="/login">Log in</Link>
         </p>
      </form>
   );
}

const mapDispatchToProps = dispatch => ({
   signupUser: details => dispatch(userActions.signup(details))
});
export default connect(null, mapDispatchToProps)(Signup);
