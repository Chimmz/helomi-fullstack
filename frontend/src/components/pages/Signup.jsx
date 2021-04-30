import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { signupUser } from '../../redux/user/user.actions.creators';
import { addAlert, removeAlert } from '../../redux/alert/alert.action.creators';
import { v4 as uuidv4 } from 'uuid';

import { addAndRemoveAlert } from '../../redux/alert/alert.utils';
import TextInput from '../formUI/TextInput';
import * as utils from '../../utils';
import './Login-Signup.scss';

function Signup({ addAlert, removeAlert, signupUser, user }) {
   const [signupData, setSignupData] = useState({
      username: '',
      password: '',
      email: ''
   });

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setSignupData({ ...signupData, [name]: value });
   };

   const handleSubmit = ev => {
      ev.preventDefault();

      const emptyFields = utils.getEmptyFields(signupData);
      if (!emptyFields.length) {
         signupUser(signupData);
         return;
      }
      emptyFields
         .map(field => ({
            text: `The "${field}" field cannot be empty`,
            type: 'warning',
            id: uuidv4()
         }))
         .forEach((alert, i) => {
            addAndRemoveAlert(
               addAlert(alert),
               removeAlert(alert.id),
               2000 * (i + 1)
            );
         });
   };

   return user.isLoggedIn ? (
      <Redirect to="/" />
   ) : (
      <form className="auth text-center" onSubmit={handleSubmit}>
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

const mapStateToProps = createStructuredSelector({ user: selectUser });
const mapDispatchToProps = dispatch => ({
   addAlert: alert => dispatch(addAlert(alert)),
   removeAlert: id => dispatch(removeAlert(id)),
   signupUser: data => dispatch(signupUser(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
