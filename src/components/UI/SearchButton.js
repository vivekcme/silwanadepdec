import React from "react";

const SearchButton = ({ func }) => {
  return (
    <>
      <div className="">
        <button
          type="button"
          className="cmn-btn search-btn position-absolute"
          onClick={func}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchButton;
