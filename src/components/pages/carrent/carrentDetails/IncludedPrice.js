import React from "react";

const IncludedPrice = ({ carDetail }) => {
  return (
    <>
      <div className="transfer-inner-wrap">
        <h4 className="title mt-5">Cancellation Policy</h4>
        <div className="transfer-wrap border-0">
          <div className="transfer-inner">
            <div className="row">
              <div className="col-lg-12">
                {
                  <div
                    dangerouslySetInnerHTML={{
                      __html: carDetail.included,
                    }}
                  />
                }

                {/* <ul className="transfer-lists border-0 m-0">
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Free cancellation up to 48 hours before pick-up
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Collision Damage Waiver with ₹0 excess
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Theft Protection with ₹0 excess
                    </p>
                  </li>
                  <li>
                    <p className="semib14">
                      {" "}
                      <img
                        src="assets/images/transfer/check.svg"
                        alt="check"
                      />{" "}
                      Unlimited mileage
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

export default IncludedPrice;
