import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getKey,
  getLogin,
  logout,
  resetKey,
  resetResend,
  resetVarified,
} from "../../../features/userSlice";
import MainModal from "../../modals/MainModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { errorToast, infoToast, successToast } from "../../../helpers/toaster";

const Header = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState("");
  const [name, setName] = useState("");
  const login = useSelector(getLogin);
  const navRef = React.useRef();
  const key = useSelector(getKey);

  const location = useLocation();
  let { state } = location;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginStatus = useSelector(
    (state) => state.user.loginStatus,
    shallowEqual
  );
  const backErrors = useSelector((state) => state.user.errors, shallowEqual);
  const forgotApproved = useSelector(
    (state) => state.user.forgotApproved,
    shallowEqual
  );

  const varified = useSelector((state) => state.user.varified, shallowEqual);
  useEffect(() => {
    if (login[0] !== undefined) {
      setName(login[0].data.firstName);
      state = { success: true, logout: false };
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (Object.keys(login).length > 0 && login[0] === undefined) {
      setIsLoggedIn(true);
      setName(login?.firstName);
    }

    setModal("login");
  }, [login]);

  useEffect(() => {
    // if (state !== null) {
    if (state?.success) {
      // if (loginStatus !== "") {
      //   loginStatus
      //     ? successToast("Successfully Logged In!")
      //     : successToast("Successfully Logged out!");
      // }
      setName(login[0]?.data.firstName);
    } else if (state?.otp === true) {
      // infoToast("OTP Sent To Your Email!");
      dispatch(resetResend());
    } else {
      // console.log(backErrors, "now");
      //backErrors[0]?.success === false && errorToast(backErrors[0]?.message);
      // setModal("login");
    }
    // }
    window.history.replaceState({}, document.title);
  }, [state, backErrors, loginStatus, login]);

  useEffect(() => {
    if (backErrors[0]?.success === false) {
      if (
        backErrors[0]?.message === "user is not activated,Please varify email."
      ) {
        //setModal("emailVarification");
        // dispatch(resetKey());
        //setShow(true);
      }
    }
  }, [backErrors]);

  useEffect(() => {
    // if (varified !== "" && varified === true) {
    //   infoToast("Varified Email Successfully!");
    //   setModal("login");
    //   setShow(false);
    //   dispatch(resetVarified());
    // }

    if (varified === false && forgotApproved === false) {
      // alert("varified")
      if (key !== "" && key !== undefined && Object?.keys(key)?.length !== 0) {
        setModal("emailVarification");
        setShow(true);
      }
    }
  }, [varified, key, forgotApproved]);

  const [show, setShow] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // console.log(navRef.current);
    window.onscroll = () => {
      if (window.scrollY >= 10) {
        navRef.current.classList.add("active-bg");
      } else {
        // console.log("called");
        navRef?.current?.classList.remove("active-bg");
      }
      // nav.className = "";
      // else nav.className = "scroll";
    };
  }, [navRef]);

  const logoutUser = () => {
    dispatch(logout());
    setIsClicked(false);
    setShow(false);
    navigate("/", { state: { success: true, logout: true }, replace: true });
  };

  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  return (
    <>
      <header id="navigation_bar" ref={navRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg p-0">
                <div className="container p-0">
                  <Link to={"/"} className="navbar-brand p-0" href="index.php">
                    <img src="./assets/images/logo.svg" alt="logo-img" />
                  </Link>
                  {/* <button
                    className="navbar-toggler"
                    type="button"
                    // data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavbar"
                  >
                    <span className="navbar-toggler-icon">
                      <i className="fas fa-bars"></i>
                     
                    </span>
                  </button> */}

                  <button className="openbtn" onClick={() => openNav()}>
                    ☰
                  </button>
                  <div id="collapsibleNavbar">
                    <button
                      className=" cmn-btn notification-btn"
                      type="button"
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell"></i>
                    </button>
                    {/* ------mobile-deivce---notification-btn-- */}
                    <button
                      className="mobile-notification-btn"
                      type="button"
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell"></i>
                    </button>
                    {/* -----mobile-side-nav-- */}
                    {/* <div id="mySidepanel" className="sidepanel">
                      <Link className="closebtn" onClick={() => closeNav()}>
                        ×
                      </Link>

                      -----mobile-side-nav-profile--
                      {isloggedIn ? (
                        <div className="dropdown my-profile mobile-side-nav-profile">
                          <button
                            className="dropdown-toggle cmn-btn"
                            type="button"
                            id="dropdownMenuButton9"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <div className="login-icon">
                              <img
                                src="assets/images/login.svg"
                                className="login-icon-img"
                                alt="login-icon"
                              />
                            </div>
                            Hey {name}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton9"
                          >
                            <li>
                              <Link className="dropdown-item" to={"/profile"}>
                                {" "}
                                <div className="login-icon">
                                  <img
                                    src="assets/images/profile.svg"
                                    alt="profile"
                                  />
                                </div>{" "}
                                <p>My Profile</p>{" "}
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to={"/mytrip"}>
                                {" "}
                                <div className="login-icon">
                                  <img
                                    src="assets/images/trip.svg"
                                    alt="trip"
                                  />
                                </div>{" "}
                                <p>My Trip</p>{" "}
                              </Link>
                            </li>
                            <li onClick={() => logoutUser()}>
                              <Link className="dropdown-item">
                                {" "}
                                <div className="login-icon">
                                  <img
                                    src="assets/images/logout.svg"
                                    alt="logout"
                                  />
                                </div>{" "}
                                <p>Logout</p>{" "}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setShow(true);
                            setModal("login");
                          }}
                        >
                          <Link
                            className="cmn-btn d-flex text-decoration-none"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                          >
                            <div className="login-icon">
                              <img
                                src="assets/images/login.svg"
                                className="login-icon-img"
                                alt="login-icon"
                              />
                            </div>{" "}
                            Login / Sign Up
                          </Link>
                        </div>
                      )}

                      <Link href="#">About</Link>
                      <Link href="#">Services</Link>
                      <Link href="#">Clients</Link>
                      <Link href="#">Contact</Link>
                    </div> */}

                    {/* ------mobile-deivce---notification-btn--end-- */}

                    {isloggedIn ? (
                      <div className="dropdown lg-nav-profile-btn my-profile">
                        <button
                          className="dropdown-toggle cmn-btn lg-nav-profile-btn"
                          type="button"
                          id="dropdownMenuButton9"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className="login-icon">
                            <img
                              src="assets/images/login.svg"
                              className="login-icon-img"
                              alt="login-icon"
                            />
                          </div>
                          Hey {name}
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton9"
                        >
                          <li>
                            <Link className="dropdown-item" to={"/profile"}>
                              {" "}
                              <div className="login-icon">
                                <img
                                  src="assets/images/profile.svg"
                                  alt="profile"
                                />
                              </div>{" "}
                              <p>My Profile</p>{" "}
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to={"/mytrip"}>
                              {" "}
                              <div className="login-icon">
                                <img src="assets/images/trip.svg" alt="trip" />
                              </div>{" "}
                              <p>My Trip</p>{" "}
                            </Link>
                          </li>
                          <li onClick={() => logoutUser()}>
                            <Link
                              to={window.location.pathname}
                              className="dropdown-item"
                            >
                              {" "}
                              <div className="login-icon">
                                <img
                                  src="assets/images/logout.svg"
                                  alt="logout"
                                />
                              </div>{" "}
                              <p>Logout</p>{" "}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setShow(true);
                          setModal("login");
                        }}
                      >
                        <Link
                          className="cmn-btn d-flex text-decoration-none"
                          id="outer-login-btn"
                        >
                          <div className="login-icon">
                            <img
                              src="assets/images/login.svg"
                              className="login-icon-img"
                              alt="login-icon"
                            />
                          </div>{" "}
                          Login / Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </div>
            <ToastContainer autoClose={2000} />
          </div>
        </div>
      </header>

      {/* -----mobile-side-nav-- */}
      <div id="mySidepanel" className="sidepanel">
        <Link
          className="closebtn"
          to={window.location.pathname}
          onClick={() => closeNav()}
        >
          ×
        </Link>
        {/* -----mobile-side-nav-profile-- */}
        {isloggedIn ? (
          <div className="dropdown my-profile mobile-side-nav-profile">
            <button
              className="dropdown-toggle cmn-btn"
              type="button"
              id="dropdownMenuButton9"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="login-icon">
                <img
                  src="assets/images/login.svg"
                  className="login-icon-img"
                  alt="login-icon"
                />
              </div>
              Hey {name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton9">
              <li>
                <Link className="dropdown-item" to={"/profile"}>
                  {" "}
                  <div className="login-icon">
                    <img src="assets/images/profile.svg" alt="profile" />
                  </div>{" "}
                  <p>My Profile</p>{" "}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/mytrip"}>
                  {" "}
                  <div className="login-icon">
                    <img src="assets/images/trip.svg" alt="trip" />
                  </div>{" "}
                  <p>My Trip</p>{" "}
                </Link>
              </li>
              <li onClick={() => logoutUser()}>
                <Link className="dropdown-item" to={"/"}>
                  {" "}
                  <div className="login-icon">
                    <img src="assets/images/logout.svg" alt="logout" />
                  </div>{" "}
                  <p>Logout</p>{" "}
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div
            onClick={() => {
              setShow(true);
              setModal("login");
            }}
            className="mobile-side-nav-profile"
          >
            <Link
              to={window.location.pathname}
              className="cmn-btn d-flex text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              <div className="login-icon">
                <img
                  src="assets/images/login.svg"
                  className="login-icon-img"
                  alt="login-icon"
                />
              </div>{" "}
              Login / Sign Up
            </Link>
          </div>
        )}
        {/* <Link href="#">About</Link>
        <Link href="#">Services</Link>
        <Link href="#">Clients</Link>
        <Link href="#">Contact</Link> */}
      </div>
      {/* -----mobile-side-nav-end-- */}

      <Banner
        show={show}
        setShow={setShow}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      {show ? (
        <MainModal
          modal={modal}
          setShow={setShow}
          show={show}
          setModal={setModal}
          extraData={setIsClicked}
        />
      ) : null}
    </>
  );
};

export default Header;
