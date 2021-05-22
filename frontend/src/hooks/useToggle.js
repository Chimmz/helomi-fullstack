import { useState } from 'react';

export const useToggle = function (initState = false) {
   const [toggleState, setToggleState] = useState(false);

   return [
      toggleState,
      setToggleState,
      () => setToggleState(!toggleState),
      () => setToggleState(initState) // To basically reset
   ];
};
