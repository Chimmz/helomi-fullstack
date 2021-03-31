import React, { useState } from 'react';
import { withRouter } from 'react-router';

import '../sass/textfield.scss';
import Dropdown from './formUI/Dropdown';
import TextInput from './formUI/TextInput';
import './Sidenav-search.scss';

function SidenavSearch({ history }) {
   const [query, setQuery] = useState('');
   const [resultsShown, setResultsShown] = useState(false);

   const onClickItem = id => {
      setQuery('');
      setResultsShown(false);
      history.push('/chat/3');
   };
   const onFocusOut = () => {
      setResultsShown(false);
   };
   const onChange = ({ target: { value } }) => {
      setQuery(value);
      setResultsShown(value);
   };

   return (
      <div className="search-section">
         <div className="allchats__search">
            <TextInput
               type="text"
               className="textfield allchats__search-field"
               placeholder="Search chats"
               onChange={onChange}
               onFocusOut={onFocusOut}
            />
            <i className="fas fa-search allchats__search-icon"></i>

            {resultsShown && (
               <ul className="allchats__search__results remove-bullets">
                  <Dropdown
                     items={['Gloria Washer', 'Smith Jane']}
                     itemClassName="allchats__search__results__result"
                     onClickItem={onClickItem}
                     isVisible={resultsShown}
                  />
               </ul>
            )}
         </div>
      </div>
   );
}
export default withRouter(SidenavSearch);
