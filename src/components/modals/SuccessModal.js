import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetBooked } from "../../features/bookings/hotelSlice";
import { resetTransferBooked } from "../../features/bookings/transferSlice";
import { resetCarrentBooked } from "../../features/bookings/carrentSlice";
import { resetInsuranceStaus } from "../../features/bookings/insuranceSlice";

const SuccessModal = ({ setShow, show, msg, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmit = () => {
    navigate({ pathname: "/", replace: true });

    // if (window.location.pathname.includes("transfer")) {
    dispatch(resetTransferBooked());
    // }
    dispatch(resetCarrentBooked());
    //
    dispatch(resetInsuranceStaus());

    dispatch(resetBooked());
  };

  return (
    <>
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"} shadow-none`}
        id="reset-password-Modal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              {/*  */}
              <form className="cmn-form login-form confirmed-booking">
                <div className="form-title text-center">
                  <h2>{status}</h2>
                </div>

                <div className="text-center">
                  <p>{msg}</p>
                </div>

                <div className="form-group text-center m-0 d-flex justify-content-center">
                  <button
                    className="cmn-btn form-btn inputbtn "
                    onClick={formSubmit}
                    type="button"
                  >
                    Ok
                  </button>
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

export default SuccessModal;
