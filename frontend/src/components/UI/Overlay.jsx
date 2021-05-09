import React from 'react';
import './Overlay.scss';

const Overlay = ({ showIf: isVisible, ...restProps }) => (
   <div
      className={`overlay overlay--${!isVisible && 'hidden'}`}
      {...restProps}
   ></div>
);
export default Overlay;
