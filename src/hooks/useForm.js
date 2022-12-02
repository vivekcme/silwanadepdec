// import memoize from "fast-memoize";
import React, { useCallback, useMemo, useState } from "react";

export function useForm(pass) {
  const { inValidate, val, dyncVals } = pass || {};

  const { items, setItems, arrItems } = dyncVals || {};

  const [state, setState] = useState(val);
  // const state = React.useRef(val);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputDynamic = (ind, e) => {
    let name = e.target.name.split("[]")[0];
    let update = items;
    if (items !== undefined && items !== null) {
      update[ind][name] = e.target.value;
      let arr = [...items.slice(0, ind), update[ind], ...items.slice(ind + 1)];
      setItems(arr);
    }
  };

  const checkDyncErrors = (ind, e) => {
    let name = e.target.name.split("[]")[0];

    let obj = {};
    if (formErrors[ind] !== undefined) {
      obj = formErrors[ind];
    } else {
      obj = {};
    }

    if (items !== undefined && items !== null) {
      if (items[ind][name]?.trim() === "") {
        let msg = name.split(/(?=[A-Z])/);
        if (msg.length > 1) {
          msg = msg.join(" ");
        }
        obj[name] = `${msg} Is Required!`;

        if (msg[0] === "Dob") {
          obj[name] = "Date Of Birth Is Required!";
        }
      } else {
        if (obj !== undefined && obj !== null) {
          obj[name] !== undefined && obj[name] !== null && delete obj[name];
        }
      }
    }

    setFormErrors({ ...formErrors, [ind]: obj });
  };

  const dyncValidate = (errors) => {
    // console.log(dyncVals, "now");

    items.map((ele, ind) => {
      errors[ind] = {};
      arrItems.map((val) => {
        if (ele[val].trim() === "") {
          let msg = val.split(/(?=[A-Z])/);
          if (msg.length > 1) {
            msg = msg.join(" ");
          }
          errors[ind][val] = `${msg} Is Required!`;
          if (msg[0] === "Dob") {
            errors[ind][val] = "Date Of Birth Is Required!";
          }
        }
      });
      Object.keys(errors[ind]).length === 0 && delete errors[ind];
    });
  };

  const validate = () => {
    let errors = {};
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (state !== undefined && state !== null) {
      Object.keys(state).map((ele) => {
        if (state[ele] === "") {
          let msg = ele.split(/(?=[A-Z])/);
          if (msg.length > 1) {
            msg = msg.join(" ");
            msg = msg[0].charAt(0).toUpperCase() + msg.slice(1);
          }
          errors[ele] = `${msg} Is Required!`;
        }
      });
    }

    if (val?.hasOwnProperty("Email")) {
      if (errors?.Email === undefined && !emailRegex.test(state.Email)) {
        errors.Email = "Please Enter a Valid Email!";
      }
    }

    if (val?.hasOwnProperty("MobileNo")) {
      let MobileRegex = /^[0-9]*$/;
      if (errors?.MobileNo === undefined && state?.MobileNo?.length !== 10) {
        errors.MobileNo = "Mobile Number Must be Exactly 10 Digits!";
      } else if (!MobileRegex.test(state?.MobileNo)) {
        errors.MobileNo = "Only Numbers Are Allowed!";
      }
    }

    if (inValidate !== null && inValidate !== undefined) {
      inValidate(errors, setState);
    }

    if (dyncVals !== null && dyncVals !== undefined) {
      dyncValidate(errors);
    }

    return errors;
  };

  const checkErrors = (e) => {
    let check = validate();
    let name = e.target.name;
    if (name in check) {
      setFormErrors({ ...formErrors, [name]: check[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  return {
    state,
    formErrors,
    isSubmit,
    handleInputChange,
    handleFormSubmit,
    checkErrors,
    setIsSubmit,
    setState,
    setFormErrors,
    handleInputDynamic,
    checkDyncErrors,
    // setState,
  };
}
