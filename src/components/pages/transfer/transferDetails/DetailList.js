import React, { useEffect } from "react";

import { useState } from "react";
import { TranferDateFormatter } from "../../../../helpers/helper";
import Images from "../../../UI/Images";

const DetailList = () => {
  const SelectedTransfer = JSON.parse(
    sessionStorage.getItem("transferSelected")
  );

  const roundTrip = JSON.parse(sessionStorage.getItem("roundTrip"));

  const returnTransfer = JSON.parse(sessionStorage.getItem("returnSelected"));

  return (
    <>
      <div className="transfer-wrap">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="car-rental-image-wrap">
              <Images
                img={SelectedTransfer.Vehicles[0].FlashLinks}
                alter={"FlashLinks"}
                dummy={"assets/images/dummyCar.png"}
              />
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-sm-6">
            <div className="transfer-inner mt-3">
              <h4 className="bold20"> {SelectedTransfer.Vehicles[0].Name}</h4>
              <div className="d-flex passengers-text">
                <p className="medium14 mb-0">
                  {SelectedTransfer.Vehicles[0].PaxCapacity} passengers allowed
                </p>
                <p className="medium14 mb-0">
                  {SelectedTransfer.Vehicles[0].Type}
                </p>
              </div>
              <ul className="transfer-lists mb-0">
                <li>
                  <div className="transfer-icon-wrap">
                    <img
                      src="assets/images/transfer/icon1.svg"
                      alt="transfer"
                    />
                  </div>
                  <p className="semib14">
                    {SelectedTransfer.Vehicles[0].LuggageCapacity} Bags
                  </p>
                </li>
                <li>
                  <div className="transfer-icon-wrap">
                    <img
                      src="assets/images/car-rental/icon4.svg"
                      alt="transfer"
                    />
                  </div>
                  <p className="semib14">
                    {SelectedTransfer.Vehicles[0].PaxCapacity} Seats
                  </p>
                </li>
                <li>
                  <div className="transfer-icon-wrap">
                    <img
                      src="assets/images/transfer/icon2.svg"
                      alt="transfer"
                    />
                  </div>
                  <p className="semib14">{SelectedTransfer.Vehicles[0].Type}</p>
                </li>
                <ul className="transfer-lists m-0 border-0">
                  {SelectedTransfer.Vehicles[0].CancellationPolicy.map(
                    (val, i) => (
                      <li key={i}>
                        <div className="transfer-icon-wrap">
                          <img
                            src="assets/images/transfer/icon3.svg"
                            alt="transfer"
                          />
                        </div>
                        <p className="semib14">
                          From{" "}
                          {TranferDateFormatter(val.FromDate.split("T")[0])} To{" "}
                          {TranferDateFormatter(val.ToDate.split("T")[0])}{" "}
                          charges will be <i className="fa fa-dollar-sign"></i>
                          {val.Charge}{" "}
                        </p>
                      </li>
                    )
                  )}

                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/transfer/icon3.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">
                      Last Cancellation Date{" "}
                      {TranferDateFormatter(
                        SelectedTransfer.Vehicles[0].LastCancellationDate.split(
                          "T"
                        )[0]
                      )}
                    </p>
                  </li>
                  {/*  */}
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* return */}

      {roundTrip && (
        <div className="transfer-wrap">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="car-rental-image-wrap">
                <Images
                  img={returnTransfer.Vehicles[0].FlashLinks}
                  alter={"FlashLinks"}
                  dummy={"assets/images/dummyCar.png"}
                />
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-6">
              <div className="transfer-inner">
                <h4 className="bold20">{returnTransfer.Vehicles[0].Name}</h4>
                <ul className="transfer-lists">
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/transfer/icon1.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">
                      {returnTransfer.Vehicles[0].LuggageCapacity} Bags
                    </p>
                  </li>
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/car-rental/icon4.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">
                      {returnTransfer.Vehicles[0].PaxCapacity} Seats
                    </p>
                  </li>
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/transfer/icon2.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">{returnTransfer.Vehicles[0].Type}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailList;
