import React from 'react';

// prettier-ignore
function Dropdown({ items, itemClassName, isVisible, onClickItem, ...restProps }) {
   return isVisible && (
      <>
         {items.map(item => (
            <li className={itemClassName} {...restProps} onClick={() => onClickItem(2)}>
               <span>{item}</span>
            </li>
         ))}
      </>
   )
}
export default Dropdown;
