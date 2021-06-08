import React from 'react';
import { selectUser } from '../redux/user/user.selectors';

const ProtectedComponent = function (component, user) {};

const mapStateToProps = createStructuredSelector({ user: selectUser });
export default connect(mapStateToProps)(ProtectedComponent);
