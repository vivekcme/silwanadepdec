import React from "react";

const Location = ({ vals }) => {
  const { name, cityname, rating } = vals;
  return (
    <>
      <section className="user-rating-reviews my-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="select-room-main">
                <div className="title-main">
                  <h5 className="title mb-0">Select Location</h5>
                  <p>
                    The Location of {name} Hotel {cityname} has been rated{" "}
                    {rating} out of 5.
                  </p>
                </div>

                <div className="location-wrap">
                  <div className="form-group">
                    <i className="fa fa-search g-text" aria-hidden="true"></i>
                    <input
                      type="search"
                      placeholder="Search Area, Landmark or Transit nearby"
                      className="border-0"
                    />
                  </div>
                  <div className="row">
                    {/*  */}
                    <div className="col-lg-12 col-md-6">
                      <div className="hotel-map select-room-map">
                        {/* <Maps latlong={props.latlon} /> */}
                        {/* <div className="hotel-map"> */}
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.081899630774!2d72.56774811484959!3d23.020764922172656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8501082e40e3%3A0xed90ace2392db00a!2sPakwan%20Dining%20Hall!5e0!3m2!1sen!2sin!4v1657281592130!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          // style="border:0;"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
