import React from "react";

const GreatChoice = ({ carDetail }) => {
  return (
    <>
      <div className="transfer-inner-wrap">
        <h4 className="title mt-5">Great choice!</h4>
        <div className="transfer-wrap border-0">
          <div className="transfer-inner">
            <div className="row">
              <div className="col-lg-12">
                {<div dangerouslySetInnerHTML={{ __html: carDetail.detail }} />}
                {/* 
                <ul className="transfer-lists border-0 m-0">
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Customer rating: 7.1 / 10
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Easy to find counter
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Well-maintained cars
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Most popular fuel policy
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img src="assets/images/transfer/check.svg" alt="check" />
                      Helpful counter staff
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img src="assets/images/transfer/check.svg" alt="check" />
                      Free Cancellation
                    </p>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreatChoice;
