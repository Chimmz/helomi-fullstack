import React, { useState } from 'react';

function TextInput({ onFocusOut, ...restProps }) {
   return <input {...restProps} onBlur={onFocusOut} />;
}
export default TextInput;
