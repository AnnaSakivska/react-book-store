import React from 'react';
import './FilterBooks.scss';

// eslint-disable-next-line react/prop-types
function FilterBooks({ setFilterPrice }) {
  const filterHandler = (ev) => {
    const { value } = ev.target;
    if (value === 'none') setFilterPrice({ min: 0, max: Infinity });
    if (value === '0-25') setFilterPrice({ min: 0, max: 25 });
    if (value === '25-50') setFilterPrice({ min: 25, max: 50 });
    if (value === '50-above') setFilterPrice({ min: 50, max: Infinity });
  };
  return (
    <div className="price-filter">
      <select className="price-select" onChange={(ev) => filterHandler(ev)}>
        <option value="" hidden defaultValue>Price</option>
        <option value="none">none</option>
        <option value="0-25">0 - 25</option>
        <option value="25-50">25 - 50</option>
        <option value="50-above">50 - above</option>
      </select>
    </div>
  );
}

export default FilterBooks;
