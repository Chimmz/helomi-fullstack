import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChats } from '../redux/chat/chat.selectors';

import { searchChatByQuery } from '../redux/chat/chat.utils';
import Dropdown from './formUI/Dropdown';
import TextInput from './formUI/TextInput';

import '../sass/textfield.scss';
import './Sidenav-search.scss';

function SidenavSearch({ chats, history }) {
   const [query, setQuery] = useState('');
   const [showResults, setShowResults] = useState(false);
   const [searchResults, setSearchResults] = useState([]);

   useEffect(() => {
      setShowResults(Boolean(query));
      setSearchResults([...searchChatByQuery(chats, query)]);
   }, [query]);

   // Delayed by 100ms so that in case the focusOut is triggered by clicking a search result item, the effect triggered by clicking on this result item will be done before setting this state to false
   const onFocusOut = _ => setTimeout(() => setShowResults(false), 100);
   const onFocus = _ => setShowResults(Boolean(query));
   const onChange = ({ target: { value } }) => setQuery(value);

   return (
      <div className="search-section">
         <form className="allchats__search" onSubmit={() => {}}>
            <TextInput
               type="text"
               className="textfield allchats__search-field"
               placeholder="Search chats"
               onChange={onChange}
               onFocusOut={onFocusOut}
               onFocus={onFocus}
            />
            <i className="fas fa-search allchats__search-icon"></i>

            <Dropdown
               showIf={showResults}
               className="allchats__search__results remove-bullets"
               children={
                  searchResults.length ? (
                     searchResults.map(chat => (
                        <Link
                           to={`/chats/${chat._id}`}
                           key={chat.id}
                           className="allchats__search__results__result"
                        >
                           {chat.username}
                        </Link>
                     ))
                  ) : (
                     <span className="allchats__search__results__result">
                        No results
                     </span>
                  )
               }
            />
         </form>
      </div>
   );
}
const mapStateToProps = createStructuredSelector({ chats: selectChats });
export default connect(mapStateToProps)(SidenavSearch);
