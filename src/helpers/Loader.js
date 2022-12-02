import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader-wrapper" style={{ opacity: "100000" }}>
        <div className="loader">
          <img src="./assets/images/loader.gif" alt="gif" />
        </div>
      </div>
    </>
  );
};

export default Loader;
