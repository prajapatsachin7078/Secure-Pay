import React from 'react';

const SearchBar = ({ filter, setFilter }) => (
    <div className="mb-6">
        <input
            type="text"
            placeholder="Search accounts..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
    </div>
);

export default SearchBar;
