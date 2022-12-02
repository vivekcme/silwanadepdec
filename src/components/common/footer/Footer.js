import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="footer-wrap first-footer-wrap">
                <div className="footer-logo">
                  <Link href="#">
                    <img src="assets/images/logo2.svg" alt="logo2" />
                  </Link>
                </div>
                <div className="footer-title">
                  <h4 className="wtext">Follow Us On</h4>
                  <div className="social-links">
                    <Link href="#">
                      <img src="assets/images/fb.svg" alt="" />
                    </Link>
                    <Link href="#">
                      <img src="assets/images/insta.svg" alt="" />
                    </Link>
                    <Link href="#">
                      <img src="assets/images/twitter.svg" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="app-download footer-title">
                  <h4 className="wtext">Download our Mobile Apps</h4>
                  <Link href="#">
                    <img
                      src="assets/images/app-store.png"
                      className="me-3"
                      alt="app-store"
                    />
                  </Link>
                  <Link href="#">
                    <img
                      src="assets/images/Google_Play_Store.png"
                      className="me-3"
                      alt="Google_Play_Store"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="footer-wrap">
                <div className="footer-title">
                  <h4 className="wtext">Quick Links</h4>
                </div>
                <ul className="footer-lists d-flex">
                  <div>
                    <li>
                      <Link to={"/hotel"} className="wtext">
                        Hotel
                      </Link>
                    </li>
                    <li>
                      <Link to={"/flight"} className="wtext">
                        Flight
                      </Link>
                    </li>
                    <li>
                      <Link to={"/transfer"} className="wtext">
                        Transfer
                      </Link>
                    </li>
                    <li>
                      <Link to={"/carrent"} className="wtext">
                        Car Rental
                      </Link>
                    </li>
                  </div>
                  <div className="">
                    <li>
                      <Link to={"/sight"} className="wtext">
                        Sight seeing
                      </Link>
                    </li>
                    <li>
                      <Link to={"/visa"} className="wtext">
                        Dubai Visa
                      </Link>
                    </li>
                    <li>
                      <Link to={"/insurance"} className="wtext">
                        Insurance
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="footer-wrap">
                <div className="footer-title">
                  <h4 className="wtext">Company</h4>
                </div>
                <ul className="footer-lists">
                  <li>
                    <Link href="about-us.php" className="wtext">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="wtext">
                      News & Events
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="wtext">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="t&c.php" className="wtext">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="wtext">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="footer-wrap">
                <div className="footer-title">
                  <h4 className="wtext">Features</h4>
                </div>
                <ul className="footer-lists">
                  <li>
                    <Link href="#" className="wtext">
                      Sign in / Register
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="wtext">
                      Mobile App
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="wtext">
                      Cheap Flights
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="wtext">
                      Site Map
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="copyright-text">
                <p className="wtext">
                  Copyright © <span>SilwanaGO</span>. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
