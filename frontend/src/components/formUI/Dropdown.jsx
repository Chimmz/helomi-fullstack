import React from 'react';

function Dropdown(props) {
   const {
      showIf: isVisble,
      className,
      children: listItems,
      ...restProps
   } = props;
   return (
      isVisble && (
         <ul className={className + ' remove-bullets'} {...restProps}>
            {listItems}
         </ul>
      )
   );
}
export default Dropdown;
