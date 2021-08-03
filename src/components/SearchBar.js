import React from 'react';

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
          onKeyPress={(ev) => { ev.key === 'Enter' && ev.preventDefault(); }}
        />
      </div>
    </form>
  );
}

export default SearchBar;
