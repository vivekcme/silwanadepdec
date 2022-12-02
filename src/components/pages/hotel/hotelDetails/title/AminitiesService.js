import React, { useState } from "react";
import Maps from "../../../../common/Maps";

const AminitiesService = ({ vals, map }) => {
  const [amenitiesLimit, setamenitiesLimit] = useState(3);
  const [LimitText, setLimitText] = useState("View all Amenities");

  const amenitiesHanlder = (num, type) => {
    if (type !== "View Less") {
      setamenitiesLimit(num);
      setLimitText("View Less");
    } else {
      setamenitiesLimit(3);
      setLimitText("View all Amenities");
    }
  };

  const LimitStyle = {
    height: "350px",
    overflowY: "scroll",
  };

  const NolimitStyle = {
    overflowY: "none",
    height: "auto",
  };

  return (
    <>
      <div className="col-lg-3 col-md-6 mt-lg-0 mt-5">
        <div
          className="amenities overflow-auto"
          style={true === "View Less" ? LimitStyle : NolimitStyle}
        >
          <div className="get-more-list">
            <h4>Amenities & Services</h4>
            <div className="get-more-list amenities-list">
              {vals?.length > 0 ? (
                <>
                  {vals !== undefined &&
                    vals.slice(0, amenitiesLimit).map((data, i) => (
                      <div key={i}>
                        <div>
                          <img
                            src="assets/images/red-check.svg"
                            alt="red-check"
                          />
                        </div>
                        <p>{data.facilities_name}</p>
                      </div>
                    ))}
                  <span
                    onClick={() => amenitiesHanlder(vals.length, LimitText)}
                    className="view-text"
                  >
                    {LimitText}
                  </span>
                </>
              ) : (
                "No Aminities to Show!"
              )}
            </div>
          </div>
        </div>
        <div className="hotel-map">
          {typeof map === typeof "" && <Maps latlong={map} />}
        </div>
      </div>
    </>
  );
};

export default AminitiesService;
