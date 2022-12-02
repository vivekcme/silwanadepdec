import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyInsurance,
  getInsuranceList,
} from "../../features/bookings/insuranceSlice";

const InsuranceModal = ({ vals }) => {
  const { show, setShow, setModal } = vals;
  const dispatch = useDispatch();
  const list = useSelector(getInsuranceList);

  React.useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("userData"));
    if (user !== null) {
      const { Authorization } = user;

      dispatch(fetchMyInsurance(Authorization));
    }
  }, []);

  return (
    <>
      <div
        className={`modal  my-auto ${show ? "d-flex" : "d-none"}`}
        id="loginModal"
      >
        <div className="modal-dialog modal-lg ">
          <div className="modal-content">
            <div className="modal-body ">
              <div className="cmn-form login-form ">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShow(false);
                  }}
                ></button>

                <div className="my-visa-details">
                  <h3>My Insurance Detail</h3>
                </div>

                {list?.map((val, i) => {
                  return (
                    <div key={i}>
                      <h6>{val.travel_country}</h6>
                      <p>
                        {val.start_date} -{val.end_date}
                      </p>

                      <div className="row">
                        {val.insurance_booking_details.map((detail, i) => {
                          return (
                            <div key={i} className="col-lg-6">
                              <div className="travellers-wrap">
                                <p>Traveller {i + 1}</p>
                                <div className="travellers-detail">
                                  <ul className="p-0 mb-0">
                                    <ul className="d-flex p-0 mb-0">
                                      <li className="d-block mt-0">
                                        <p>Pre Disease :</p>
                                        <p>
                                          {detail.pre_disease === 0 ||
                                          detail.pre_disease === "0"
                                            ? "No Disease"
                                            : detail.pre_disease}
                                        </p>
                                      </li>
                                      <li className="d-block mt-0">
                                        <p>Age :</p>
                                        <p>{detail.passanger_age} Yrs</p>
                                      </li>
                                    </ul>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceModal;
