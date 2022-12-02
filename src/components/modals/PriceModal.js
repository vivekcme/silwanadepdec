import React from "react";

const PriceModal = ({ vals }) => {
  const { show, setShow, setModal, extraData } = vals;
  //   console.log(show, "show val");
  return (
    <>
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"} shadow-none`}
        id="reset-password-Modal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <ul className="cmn-form login-form daily-rates">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShow(false)}
                  //   onClick={props.closeModal}
                ></button>
                <div className="form-title">
                  <h2>All rates According to days</h2>
                </div>
                {extraData.length > 0 &&
                  extraData.map((val, i) => (
                    <li key={i}>
                      <span>
                      Day {i + 1}
                      </span>
                      <span>
                      ${Math.round((val.BasePrice + Number.EPSILON) * 100) / 100}
                      </span>
                    </li>
                  ))}
              </ul>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceModal;
