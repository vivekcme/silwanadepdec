import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordAsync,
  resetALL,
  resetForgot,
} from "../../features/userSlice";
import { toast } from "react-toastify";
import { infoToast } from "../../helpers/toaster";

const ForgotPassword = ({ vals }) => {
  const { setShow, show, setModal } = vals;

  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const forgotApproved = useSelector(
    (state) => state.user.forgotApproved,
    shallowEqual
  );

  const validate = () => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (email === "") {
      error.email = "Email Is Required!";
    } else if (!emailRegex.test(email)) {
      error.email = "Please Enter A Valid Email!";
    }
    return error;
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      dispatch(forgotPasswordAsync(email));
      setEmail("");
      setIsSubmit(false);
    }
  }, [error, isSubmit]);

  useEffect(() => {
    console.log(forgotApproved,"asd")
    if (forgotApproved) {
      infoToast("Varify Email And Reset Password");
      setModal("changePassword");
      setShow(true);
      // dispatch(resetForgot());
    }
  }, [forgotApproved]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate());
    setIsSubmit(true);
  };

  return (
    <>
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"}`}
        id="reset-password-Modal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <form action="" className="cmn-form login-form">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setShow(false)}
                ></button>

                <div className="form-title">
                  <h2>Reset Password</h2>
                </div>
                <div className="form-group">
                  <label htmlFor="reset">Email Address</label>
                  <input
                    type="text"
                    id="reset"
                    placeholder="Enter Email"
                    autoComplete="off"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => {
                      setError({});
                      setIsSubmit(false);
                    }}
                  />
                  <p className="text-danger">{error?.email}</p>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="cmn-btn form-btn"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
