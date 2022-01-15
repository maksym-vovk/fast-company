import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ handleSearch, searchValue }) => {
    return (
        <div>
            <div className="form-floating mb-2">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Search"
                    onChange={handleSearch}
                    value={searchValue}
                />
                <label htmlFor="floatingInput">Search...</label>
            </div>
        </div>
    );
};

SearchField.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
};

export default SearchField;
