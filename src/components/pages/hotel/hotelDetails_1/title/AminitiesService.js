import React, { useState } from "react";

const AminitiesService = ({ vals }) => {
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
      </div>
    </>
  );
};

export default AminitiesService;
