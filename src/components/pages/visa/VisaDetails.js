import React from "react";
import { useNavigate } from "react-router-dom";

const VisaDetails = ({ modalData, setShow, show }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"}`}
        id="loginModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <div className="cmn-form login-form">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setShow(false);
                      //   extraData(false);
                    }}
                  ></button>
                  <div className="my-visa-details">
                    <h3>My visa details</h3>

                    {modalData.visa_booking_details.map((val, i) => (
                      <div className="travellers-wrap" key={i}>
                        <p>Traveller {i + 1}</p>
                        <div className="travellers-detail">
                          <ul className="p-0 mb-0">
                            <li>
                              <p>
                                Full Name :{" "}
                                {val.passport_back === null ? (
                                  <span>
                                    <img
                                      src="assets/images/doc.svg"
                                      alt="doc"
                                    />{" "}
                                    Documents Pending
                                  </span>
                                ) : (
                                  <span>
                                    {" "}
                                    <img
                                      src="assets/images/doc.svg"
                                      alt="doc"
                                    />{" "}
                                    Documents Uploaded
                                  </span>
                                )}
                              </p>
                              <p>David Matthew</p>
                            </li>
                            <ul className="d-flex p-0 mb-0">
                              <li className="d-block">
                                <p>Gender :</p>
                                <p>Male</p>
                              </li>
                              <li className="d-block">
                                <p>Age :</p>
                                <p>24 Yrs</p>
                              </li>
                            </ul>
                            {val.passport_back !== null && (
                              <div className="visa-uploaded-img-wrap">
                                <div>
                                  <img src={val.passport_back} alt="img" />
                                </div>
                                <div>
                                  <img src={val.passport_front} alt="img" />
                                </div>
                                <div>
                                  <img src={val.photograph} alt="img" />
                                </div>
                              </div>
                            )}
                          </ul>
                        </div>
                        <button
                          className="cmn-btn mt-4"
                          onClick={() => {
                            navigate(`/visa-document?id=${modalData.id}`);
                          }}
                        >
                          Upload Document
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaDetails;
