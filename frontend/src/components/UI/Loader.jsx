import React from 'react';
import { toFirstLetterUpper } from '../../utils';
import './Loader.scss';

function LoadingSpinner({ size, msg }) {
   return (
      <div className="loader">
         <div className={`loader__spinner loader__spinner--${size}`}></div>
         {msg && (
            <h4 className={`loader__msg loader__msg--${size}`}>
               {toFirstLetterUpper(msg)}
            </h4>
         )}
      </div>
   );
}
export default LoadingSpinner;
