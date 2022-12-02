import React from "react";

const Intro = () => {
  return (
    <>
      <section className="selection p-100">
        <div className="container">
          <div className="row">
            <div className="selection-wrap">
              <div className="row">
                <div className="col-xl-4 col-lg-12">
                  <div className="selection-inner-wrap">
                    <h5>Introducting</h5>
                    <h2 className="title">Luxe Selection</h2>
                    <p>
                      Escape to the epitomeof luxury, Packed with Signature
                      amenities and Services
                    </p>
                    <button className="cmn-btn">Load More</button>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-12">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                      <div className="selection-inner">
                        <div className="selection-img-wrap">
                          <img
                            src="assets/images/img1.png"
                            alt="selection-img"
                          />
                        </div>
                        <div className="selection-detail-wrap">
                          <h6>Explore by Brands</h6>
                          <p>Taj, Marriott, Hyatt & More</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="selection-inner">
                        <div className="selection-img-wrap">
                          <img
                            src="assets/images/img2.png"
                            alt="selection-img"
                          />
                        </div>
                        <div className="selection-detail-wrap">
                          <h6>Luxe Villas</h6>
                          <p>Premium Vills with Superlative Experience</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="selection-inner">
                        <div className="selection-img-wrap">
                          <img
                            src="assets/images/img3.png"
                            alt="selection-img"
                          />
                        </div>
                        <div className="selection-detail-wrap">
                          <h6>Discover by Themes</h6>
                          <p>Explore Luxury Stays Based on your Intresrt</p>
                        </div>
                      </div>
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

export default Intro;
