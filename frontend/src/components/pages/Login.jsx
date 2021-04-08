import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { addAlert, removeAlert } from '../../redux/alert/alert.action.creators';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';

// prettier-ignore
import { authError, resetUser, setUser, } from '../../redux/user/user.actions.creators';

import { addAndRemoveAlert } from '../../redux/alert/alert.utils';
import * as utils from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import TextInput from '../formUI/TextInput';
import './Login-Signup.scss';

function Login(props) {
   // prettier-ignore
   const { user, addAlert, removeAlert, setUser, authError, resetUser, history } = props;
   const [loginData, setLoginData] = useState({ username: '', password: '' });

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setLoginData({ ...loginData, [name]: value });
   };
   const handleLogin = async () => {
      const res = await new utils.API().login(loginData);
      const alertId = uuidv4();
      switch (res.status) {
         case 'success':
            // prettier-ignore
            addAndRemoveAlert(
               () => addAlert({ text: 'You have been successfully logged in', type: 'success', id: alertId }),
               () => removeAlert(alertId)
            );
            history.push('/');
            resetUser(); // Also works without resetting
            setUser(res.data.user, res.data.token);
            break;

         case 'fail':
            // prettier-ignore
            addAndRemoveAlert(
               () => addAlert({ text: `${res.message}`, type: 'warning', id: alertId }),
               () => removeAlert(alertId)
            );
            authError();
            break;
         default:
      }
      console.log(res);
   };

   const handleSubmit = ev => {
      ev.preventDefault();
      const emptyFields = utils.getEmptyFields(loginData);

      if (!emptyFields.length) {
         handleLogin();
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
   );
}
const mapStateToProps = createStructuredSelector({
   user: selectUser
});
const mapDispatchToProps = dispatch => ({
   addAlert: alert => dispatch(addAlert(alert)),
   removeAlert: id => dispatch(removeAlert(id)),
   setUser: (user, token) => dispatch(setUser(user, token)),
   authError: () => dispatch(authError()),
   resetUser: () => dispatch(resetUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
