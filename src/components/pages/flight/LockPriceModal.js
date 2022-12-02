import React from "react";

const LockPriceModal = ({ show, setShow }) => {
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
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShow(false);
                  }}
                ></button>
                <h5 className="title">Now Lock Prices & Pay Later!</h5>
                {/* <img src="" alt="" /> */}
                <p>
                  Unsure of your travel plans? Lock this ticket price for a
                  small fee and complete your booking up to 7 days later!
                </p>
              </form>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockPriceModal;
