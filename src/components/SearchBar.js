/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

// eslint-disable-next-line react/prop-types
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <form className="ui form">
      <div className="field">
        <label>Books Search by Title</label>
        <input
          className=""
          type="text"
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
          // eslint-disable-next-line no-unused-expressions
          onKeyPress={(ev) => { ev.key === 'Enter' && ev.preventDefault(); }}
        />
      </div>
    </form>
  );
}

export default SearchBar;
