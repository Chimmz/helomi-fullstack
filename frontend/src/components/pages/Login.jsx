import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alerts from '../Alerts';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addAlert, removeAlert } from '../../redux/alert/alert.action.creators';
import { selectUser } from '../../redux/user/user.selectors';
import { selectAllAlerts } from '../../redux/alert/alert.selectors';
import { loginUser } from '../../redux/user/user.actions.creators';

import * as utils from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { addAndRemoveAlert } from '../../redux/alert/alert.utils';
import TextInput from '../formUI/TextInput';
import LoadingSpinner from '../UI/Loader';
import './Login-Signup.scss';

function Login(props) {
   const { user, alerts, loginUser, addAlert, removeAlert } = props;
   const [loginData, setLoginData] = useState({ username: '', password: '' });
   const [showSpinner, setShowSpinner] = useState(false);

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setLoginData({ ...loginData, [name]: value });
   };

   const handleSubmit = ev => {
      ev.preventDefault();
      const emptyFields = utils.getEmptyFields(loginData);

      if (!emptyFields.length) {
         loginUser(loginData);
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
               () => addAlert(alert),
               () => removeAlert(alert.id),
               2000 * (i + 1)
            );
         });
   };
   return user.isLoggedIn ? (
      <Redirect to="/" />
   ) : (
      <>
         <Alerts alerts={alerts} />
         <form action="" className="auth text-center" onSubmit={handleSubmit}>
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
      </>
   );
}
const mapStateToProps = createStructuredSelector({
   user: selectUser,
   alerts: selectAllAlerts
});

const mapDispatchToProps = dispatch => ({
   addAlert: alert => dispatch(addAlert(alert)),
   removeAlert: id => dispatch(removeAlert(id)),
   loginUser: loginData => dispatch(loginUser(loginData))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
