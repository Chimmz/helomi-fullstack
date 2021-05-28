import { useState } from 'react';

export const useToggle = function (initState = false) {
   const [state, setState] = useState(false);

   const toggle = () => setState(!state);
   const reset = () => setState(initState);
   return [state, setState, toggle, reset];
};
