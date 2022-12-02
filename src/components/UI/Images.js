import React, { useState } from "react";

const Images = (props) => {
  const [imageError, setImageError] = useState(false);
  return (
    <img
      className={props.class}
      src={
        props.img === "" || props.img === undefined
          ? props.dummy
          : imageError
          ? props.dummy
          : props.img
      }
      onError={(e) => setImageError(true)}
    />
  );
};

export default Images;
