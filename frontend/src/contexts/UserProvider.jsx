import React from 'react';
import { connect } from 'react-redux';

export const userContext = React.createContext();

const mapStateToProps = state => ({
   user: state.user
});

export const UserContextProvider = connect(mapStateToProps)(user => (
   <userContext.Provider value={user}></userContext.Provider>
));
