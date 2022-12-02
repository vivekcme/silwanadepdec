import React from "react";
import { TranferDateFormatter } from "../../../../helpers/helper";

const CarrentDetail = ({ carRental }) => {
  return (
    <>
      <div>
        <div className="my-trip-cancel">
          <div className="row cmn-box">
            <div className="col-lg-5">
              <div>
                <img src={carRental.carRent_master.image} alt="car-img" />
              </div>
            </div>
            <div className="col-lg-7">
              <div>
                <ul className="transfer-lists m-0">
                  <li>
                    <p>{carRental.carRent_master.name}</p>
                  </li>

                  <li>
                    <p>{carRental.carRent_master.registered_number}</p>
                  </li>
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/car-rental/petrol.svg"
                        alt="petrol"
                      />
                    </div>
                    <p>{carRental.carRent_master.fual_type}</p>
                  </li>
                  {/* <li><p>{carRental.carRent_master.gear_type}</p></li> */}
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/car-rental/icon4.svg"
                        alt="transfer"
                      />
                    </div>
                    <p>{carRental.carRent_master.seat_capacity}</p>
                  </li>
                  <li>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/car-rental/luggage.svg"
                        alt="transfer"
                      />
                    </div>
                    <p>{carRental.carRent_master.luggage_capacity}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row cmn-box mt-4">
            <p>{carRental.pickup_from}</p>
            <p>{TranferDateFormatter(carRental.drop_date)}</p>
            <p>{carRental.drop_time}</p>

            <div
              dangerouslySetInnerHTML={{
                __html: carRental.carRent_master.cancellation_policy,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CarrentDetail;
