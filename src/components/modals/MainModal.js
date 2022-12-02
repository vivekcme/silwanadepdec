import React, { useEffect } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { shallowEqual, useSelector } from "react-redux";
import { getKey } from "../../features/userSlice";
import EmailVarifyModal from "./EmailVarifyModal";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import PriceModal from "./PriceModal";
import InsuranceModal from "./InsuranceModal";

const MainModal = ({ modal, show, setShow, setModal, extraData }) => {
  const key = useSelector(getKey);
  const navigate = useNavigate();

  useEffect(() => {
    // if (modal === "emailVarification") {
    //   setModal("emailVarification");
    // }
    // if (modal === "dailyRates") {
    //   setModal("dailyRates");
    // }
    // if (modal === "insurance") {
    //   setModal("insurance");
    // }
    // modal !== "login" && setModal("login");
  }, [show]);

  useEffect(() => {
    if (key !== "" && key!==undefined && key!==null) {
      navigate(window.location.pathname, { state: { otp: true } });
      // setModal("emailVarification");
      // setShow(true);
    }
  }, [key]);

  switch (modal) {
    case "login":
      return <LoginModal vals={{ show, setShow, setModal, extraData }} />;
    case "register":
      return <RegisterModal vals={{ show, setShow, setModal }} />;
    case "emailVarification":
      return <EmailVarifyModal vals={{ show, setShow, setModal }} />;
    case "forgotPassword":
      return <ForgotPassword vals={{ show, setShow, setModal }} />;
    case "changePassword":
      return <ChangePassword vals={{ show, setShow, setModal }} />;
    case "dailyRates":
      return <PriceModal vals={{ show, setShow, setModal, extraData }} />;
    case "insurance":
      return <InsuranceModal vals={{ show, setShow, setModal }} />;
    default:
      <LoginModal vals={{ show, setShow, setModal }} />;
  }
};

export default MainModal;
