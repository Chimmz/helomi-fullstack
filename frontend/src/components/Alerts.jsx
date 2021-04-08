import React from 'react';
import './Alerts.scss';
import Alert from './Alert';

function Alerts({ alerts }) {
   return (
      <div className="alerts">
         {alerts.map(alert => (
            <Alert
               key={alert.id}
               {...alert}
               // id={alert.id}
               // type={alert.type}
               // text={alert.text}
            />
         ))}

         {/* <div className="alert alert--danger alert--alignleft">
            <p>You're about to delete your account</p>
            <span className="alert__cancel">&times;</span>
         </div>
         <div className="alert alert--success alert--alignleft">
            <p>Post successfully created</p>
            <span className="alert__cancel">&times;</span>
         </div> */}
      </div>
   );
}

export default Alerts;
