import React from "react";

const More = () => {
  return (
    <>
      <section className="get-more">
        <div className="container position-relative">
          <div className="getmore-img">
            <img
              src="assets/images/hotel-booking-pana.svg"
              className="position-absolute hotel-booking-pana"
              alt="hotel-booking-pana"
            />
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="getmore-wrap p-100">
                <h2 className="title">
                  Get more out of SilwanaGO.com with our mobile app
                </h2>
                <h6>
                  Download the SilwanaGO.com mobile app for one-touch access to
                  your next travel adventure. With the Kiwi.com mobile app
                  you’ll get access to hidden features and special offers.
                </h6>
                <div className="get-more-list">
                  <div>
                    <div>
                      <img src="assets/images/check.svg" alt="check" />
                    </div>
                    <p>Download Boarding Passes</p>
                  </div>
                  <div>
                    <div>
                      <img src="assets/images/check.svg" alt="check" />
                    </div>
                    <p>Download Boarding Passes</p>
                  </div>
                  <div>
                    <div>
                      <img src="assets/images/check.svg" alt="check" />
                    </div>
                    <p>Download Boarding Passes</p>
                  </div>
                  <div>
                    <div>
                      <img src="assets/images/check.svg" alt="check" />
                    </div>
                    <p>Download Boarding Passes</p>
                  </div>
                </div>
                <div className="app-download">
                  <a href="#">
                    <img src="assets/images/app-store.png" alt="app-store" />
                  </a>
                  <a href="#">
                    <img
                      src="assets/images/Google_Play_Store.png"
                      alt="Google_Play_Store"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default More;
