import React from "react";
import { TranferDateFormatter } from "../../../helpers/helper";
import Images from "../../UI/Images";

const SelectedVehicle = ({ pickupVehicle }) => {
  return (
    <>
      <div>
        <div className="transfer-wrap selected">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="car-rental-image-wrap">
                <Images
                  img={pickupVehicle.Vehicles[0].FlashLinks}
                  alter={"FlashLinks"}
                  dummy={"assets/images/dummyCar.png"}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-6">
              <div className="transfer-inner">
                <h4 className="bold20">{pickupVehicle.Vehicles[0].Name}</h4>
                <div className="d-flex passengers-text">
                  <p className="medium14">4 passengers allowed</p>
                  <p className="medium14">{pickupVehicle.Vehicles[0].Type}</p>
                </div>
                <ul className="transfer-lists">
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/transfer/icon1.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">
                      {pickupVehicle.Vehicles[0].LuggageCapacity} Bags
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
                      {pickupVehicle.Vehicles[0].PaxCapacity} Seats
                    </p>
                  </li>
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/transfer/icon2.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">{pickupVehicle.Vehicles[0].Type}</p>
                  </li>
                  {pickupVehicle.Vehicles[0].CancellationPolicy.map(
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
                          charges will be
                          <i className="fa fa-dollar-sign"></i>
                          {val.Charge}{" "}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="transfer-inner car-rental-wrap">
                <div className="total-availabity text-start position-static">
                  <h2>
                    <i className="fa fa-dollar-sign"></i>
                    {parseFloat(
                      pickupVehicle.Vehicles[0].Price.TotalPrice
                    ).toFixed(2)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedVehicle;
