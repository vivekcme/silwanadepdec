import React, { useEffect, useState } from "react";
import { userLoginAsync, getLogin } from "../../features/userSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ vals }) => {
  const { show, setShow, setModal, extraData } = vals;
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(userLoginAsync(state)); //login dispatch here

      setState({
        email: "",
        password: "",
      });
      setShow(false);
      setIsSubmit(false);
    }
  }, [formErrors]);

  const setErrors = (e) => {
    let newErrors = {};
    Object.keys(formErrors).filter((ele) => {
      return ele !== e.target.name
        ? Object.assign(newErrors, { [ele]: formErrors[ele] })
        : null;
    });
    setFormErrors(newErrors);
    setIsSubmit(false);
  };

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const validate = (state) => {
    let errors = {};
    Object.keys(state).map((ele) => {
      let err = `${ele.charAt(0).toUpperCase() + ele.slice(1)} Is Required!`;
      return state[ele] === "" ? (errors[ele] = err) : null;
    });

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (!emailRegex.test(state.email) && errors.email === undefined) {
      errors.email = "Please Enter A Valid Email!";
    }

    if (state.password.length < 3 && errors.password === undefined) {
      errors.password = "Password Must Be Greater Than 3!";
    } else if (state.password.length > 10) {
      errors.password = "Password Must Be Less Than  10!";
    }

    return errors;
  };

  //just to check
  const checkErrors = (e) => {
    let check = validate(state);
    let name = e.target.name;

    if (name in check) {
      setFormErrors({ ...formErrors, [name]: check[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(state));
    setIsSubmit(true);
  };
  const setForgot = () => {
    setModal("forgotPassword");
    setShow(true);
  };
  return (
    <>
      <div className={`modal  ${show ? "d-flex" : "d-none"}`} id="loginModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <form action="" className="cmn-form login-form">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setShow(false);
                      extraData(false);
                    }}
                  ></button>

                  <div className="form-title">
                    <h2>Welcome to SilwanaGO</h2>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInputChange}
                      value={state.email}
                      placeholder=" Email"
                      autoComplete="off"
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                    />
                    <p className="text-danger">{formErrors?.email}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInputChange}
                      value={state.password}
                      placeholder="Enter Password"
                      autoComplete="off"
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                    />
                    <p className="text-danger">{formErrors?.password}</p>
                  </div>
                  <div className="text-end">
                    <a
                      className="forgot-pass reset-password"
                      data-bs-toggle="modal"
                      data-bs-target="#reset-password-Modal"
                      onClick={setForgot}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="cmn-btn form-btn"
                      value="Log in"
                      onClick={handleFormSubmit}
                    />
                  </div>
                  <div className="text-center">
                    <p className="already-member">
                      Already a member? Signup{" "}
                      <a
                        href="#"
                        className="signup"
                        data-bs-toggle="modal"
                        data-bs-target="#signup-Modal"
                        onClick={() => setModal("register")}
                      >
                        here
                      </a>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
