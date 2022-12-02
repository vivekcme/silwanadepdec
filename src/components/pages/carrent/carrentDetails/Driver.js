import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  carBookAsync,
  getCarBookingStatus,
  getLoading,
} from "../../../../features/bookings/carrentSlice";
import SuccessModal from "../../../modals/SuccessModal";
import Loader from "../../../../helpers/Loader";
import { useForm } from "../../../../hooks/useForm";

const Driver = () => {
  // const [state, setState] = useState({
  //   FirstName: "",
  //   LastName: "",
  //   MobileNo: "",
  // });
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState({});

  // const [isSubmit, setIsSubmit] = useState(false);
  // const [formErrors, setFormErrors] = useState({});

  const imageRef = useRef();

  const customValidate = (errors, setState) => {
    const myFile = imageRef.current?.files[0];

    if (myFile === undefined) {
      errors.image = "Please Upload an Image!";
    } else if (myFile?.type !== "image/jpeg" && myFile?.type !== "image/png") {
      errors.image = "Only Jpeg And Png Images Can be Uploaded!";
    } else if (myFile?.size > 150678) {
      errors.image = "Image Can be Only 150 KB Max!";
    } else {
      setState({ ...state, image: myFile });
    }
  };

  const {
    state,
    isSubmit,
    formErrors,
    handleInputChange,
    handleFormSubmit,
    checkErrors,
  } = useForm({
    val: {
      FirstName: "",
      LastName: "",
      MobileNo: "",
    },
    inValidate: customValidate,
  });
  //
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const dispatch = useDispatch();
  const bookingStatus = useSelector(getCarBookingStatus);
  const loading = useSelector(getLoading);
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(state, "state");
      dispatch(carBookAsync({ state, fileData, Authorization }));
    }
  }, [formErrors, isSubmit]);

  useEffect(() => {
    if (isBooked === true) {
      if (Object?.keys(bookingStatus).length > 0) {
        // if (bookingStatus.success) {
        setMsg(
          "Your booking has been Confirmed. Check your emails for details."
        );
        setStatus("Awesome!");
        // }
      } else {
        setMsg("Something Went Wrong!");
        setStatus("Failed!");
      }
      setShow(true);
    }
  }, [bookingStatus]);

  // const handleInputChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // const setErrors = (e) => {
  //   let newErrors = {};
  //   Object.keys(formErrors).filter((ele) => {
  //     return ele !== e.target.name
  //       ? Object.assign(newErrors, { [ele]: formErrors[ele] })
  //       : null;
  //   });
  //   setFormErrors(newErrors);
  //   setIsSubmit(false);
  // };

  // const checkErrors = (e) => {
  //   let check = validate();
  //   let name = e.target.name;

  //   if (name in check) {
  //     setFormErrors({ ...formErrors, [name]: check[name] });
  //   }
  // };

  // const validate = () => {
  //   let errors = {};
  //   Object.keys(state).map((ele) => {
  //     if (state[ele].trim() === "") {
  //       errors[ele] = `${ele} Is Required!`;
  //     }
  //   });

  //   if (errors.MobileNo === undefined && state.MobileNo.length !== 10) {
  //     errors.MobileNo = "Mobile Number Must be 10 Digits!";
  //   }

  //   const myFile = imageRef.current?.files[0];

  //   if (myFile === undefined) {
  //     errors.image = "Please Upload an Image!";
  //   } else if (myFile?.type !== "image/jpeg" && myFile?.type !== "image/png") {
  //     errors.image = "Only Jpeg And Png Images Can be Uploaded!";
  //   } else if (myFile?.size > 150678) {
  //     errors.image = "Image Can be Only 150 KB Max!";
  //   } else {
  //     setState({ ...state, image: myFile });
  //   }

  //   return errors;
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate());
  //   setIsBooked(true);
  //   setIsSubmit(true);
  // };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="transfer-inner-wrap">
        <h4 className="title mt-5">Main driver's details</h4>
        <div className="review-booking-wrapper guest-details-wrapper">
          <form
            action=""
            className="guest-detail-form"
            encType="multipart/form-data"
          >
            <h5 className="r-b-14">As they appear on driving licence</h5>
            <div className="name-detail">
              <div className="row w-100">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="FirstName"
                      value={state.FirstName}
                      onChange={handleInputChange}
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                      autoComplete="off"
                    />
                    <span className="error">{formErrors?.FirstName}</span>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="LastName"
                      value={state.LastName}
                      onChange={handleInputChange}
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                      autoComplete="off"
                    />
                    <span className="error">{formErrors?.LastName}</span>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="row">
              <div className="col-lg-12">
                <div className="name-detail mobile-number">
                  <div className="form-group">
                    <label htmlFor="">Mobile Number</label>
                    <input
                      type="Number"
                      placeholder="Enter Phone Number"
                      name="MobileNo"
                      value={state.MobileNo}
                      onChange={handleInputChange}
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                      autoComplete="off"
                    />
                    <span className="error">{formErrors?.MobileNo}</span>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="form-group">
              <label htmlFor="">Upload ID proof</label>
              <label className="form__container" id="upload-container">
                <p>
                  {" "}
                  <img src="assets/images/upload.svg" alt="upload" /> Choose
                  your file{" "}
                </p>
                <input
                  className="form__file"
                  id="upload-files"
                  type="file"
                  //   multiple="multiple"
                  name="file"
                  onChange={handleFileChange}
                  ref={imageRef}
                />
                <div className="id-proof">
                  <img src={file} />
                </div>
              </label>
              <span className="error">{formErrors?.image}</span>
            </div>
            {/*  */}
          </form>
        </div>
      </div>
      <div>
        <button
          className="cmn-btn reserve-btn d-block w-100"
          onClick={(e) => {
            handleFormSubmit(e);
            setIsBooked(true);
          }}
        >
          {" "}
          Go to Checkout
        </button>
      </div>
      {show ? (
        <SuccessModal setShow={setShow} show={show} msg={msg} status={status} />
      ) : null}
    </>
  );
};

export default Driver;
