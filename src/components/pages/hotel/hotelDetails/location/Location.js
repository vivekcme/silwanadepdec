import React from "react";
import Maps from "../../../../common/Maps";

const Location = ({ vals, latlon }) => {
  const { name, cityname, rating, map } = vals;

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
                  <div className="row">
                    {/*  */}
                    <div className="col-lg-12 col-md-6">
                      <div className="hotel-map select-room-map">
                        {typeof map === typeof "" && <Maps latlong={map} />}
                        {/* <div className="hotel-map"> */}
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
