import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVisaDocumentAsync,
  fetchMyVisaBookings,
  getVisaBookings,
} from "../../../features/bookings/visaSlice";

const UploadModal = ({ setShow, show, modalData }) => {
  const [photograph, setPhotograph] = useState(modalData.photograph);
  const [passportBack, setPassportBack] = useState(modalData.passport_back);
  const [passportFront, setPassportFront] = useState(modalData.passport_front);

  const [state, setState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      state.id = modalData.id;
      dispatch(addVisaDocumentAsync({ state, Authorization }));
      dispatch(fetchMyVisaBookings(Authorization));
    }
  }, [formErrors, isSubmit]);

  const handleChange = (e) => {
    if (e.target.name === "photograph") {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      setPhotograph(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.name === "passportFront") {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      setPassportFront(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.name === "passportBack") {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      setPassportBack(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validate = () => {
    let errors = {};
    Object.keys(state).map((ele) => {
      let myFile = state[ele];

      if (myFile?.type !== "image/jpeg" && myFile?.type !== "image/png") {
        errors[ele] = "Only Jpeg And Png Images Can be Uploaded!";
      } else if (myFile?.size > 150678) {
        errors[ele] = "Image Can be Only 150 KB Max!";
      }
    });
    return errors;
  };

  const checkErrors = (e) => {
    let check = validate();
    let name = e.target.name;

    if (name in check) {
      setFormErrors({ ...formErrors, [name]: check[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  return (
    <>
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"}`}
        id="loginModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <form
                  className="cmn-form login-form"
                  encType="multipart/form-data"
                >
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setShow(false);
                    }}
                  ></button>
                  {/*  */}
                  <div className="passport-upload">
                    <div className="form-group position-relative">
                      <p>PhotoGraph</p>
                      <label className="form__container" id="upload-container">
                        <div className="id-proof">
                          <img src={photograph !== null ? photograph : null} />
                        </div>
                        <p>
                          {" "}
                          <img
                            src="assets/images/upload.svg"
                            alt="upload"
                          />{" "}
                          Choose your file{" "}
                        </p>
                      </label>
                      <input
                        type="file"
                        name="photograph"
                        className="form__file"
                        onChange={handleChange}
                        onBlur={(e) => {
                          checkErrors(e);
                        }}
                      />
                      <span className="error">{formErrors?.photograph}</span>
                    </div>
                    <div className="form-group position-relative">
                      <p>Passport Front</p>
                      <label className="form__container" id="upload-container">
                        <div className="id-proof">
                          <img
                            src={passportFront !== null ? passportFront : null}
                          />
                        </div>
                        <p>
                          {" "}
                          <img
                            src="assets/images/upload.svg"
                            alt="upload"
                          />{" "}
                          Choose your file{" "}
                        </p>
                      </label>
                      <input
                        type="file"
                        name="passportFront"
                        className="form__file"
                        onChange={handleChange}
                        onBlur={(e) => {
                          checkErrors(e);
                        }}
                      />
                      <span className="error">{formErrors?.passportFront}</span>
                    </div>
                    <div className="form-group position-relative">
                      <p>Passport Back</p>
                      <label className="form__container" id="upload-container">
                        <div className="id-proof">
                          <img
                            src={passportBack !== null ? passportBack : null}
                          />
                        </div>
                        <p>
                          {" "}
                          <img
                            src="assets/images/upload.svg"
                            alt="upload"
                          />{" "}
                          Choose your file{" "}
                        </p>
                      </label>
                      <input
                        type="file"
                        name="passportBack"
                        className="form__file"
                        onChange={handleChange}
                        onBlur={(e) => {
                          checkErrors(e);
                        }}
                      />
                      <span className="error">{formErrors?.passportBack}</span>
                    </div>
                  </div>
                  <button className="cmn-btn" onClick={handleSubmit}>
                    {" "}
                    upload Document{" "}
                  </button>
                  {/*  */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
