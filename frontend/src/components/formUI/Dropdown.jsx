import React from 'react';

function Dropdown(props) {
   const { showIf, listClassName, children: listItems, ...restProps } = props;
   return (
      showIf && (
         <ul className={listClassName} {...restProps}>
            {listItems}
         </ul>
      )
   );
}
export default Dropdown;
