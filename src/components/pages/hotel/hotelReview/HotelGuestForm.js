import React, { useEffect, useRef, useState } from "react";
import { callingCode } from "../../../../helpers/helper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getRoomBooked,
  hotelBookAsync,
  selectHotelRoomAsync,
} from "../../../../features/bookings/hotelSlice";
import SuccessModal from "../../../modals/SuccessModal";
import Loader from "../../../../helpers/Loader";
import { useForm } from "../../../../hooks/useForm";
import { useSearchParams } from "react-router-dom";

const HotelGuestForm = ({ code, val, total, guests }) => {
  const [myGuests, setGuests] = useState({});
  const [show, setShow] = useState(false);

  const [customers, setCustomers] = useState([]);

  const [searchParams] = useSearchParams();

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );

  const customValidate = (errors) => {
    // customers.map((ele, ind) => {
    //   errors[ind] = {};
    //   ["Title", "FirstName", "LastName"].map((val) => {
    //     if (ele[val].trim() === "") {
    //       errors[ind][val] = `${val} Is Required!`;
    //     }
    //   });
    //   Object.keys(errors[ind]).length === 0 && delete errors[ind];
    // });
  };

  const {
    state,
    setState,
    isSubmit,
    formErrors,
    handleInputChange,
    handleFormSubmit,
    checkErrors,
    handleInputDynamic,
    checkDyncErrors,
  } = useForm({
    val: {
      Email: "",
      MobileNo: "",
      CountryCode: "",
    },
    dyncVals: {
      items: customers,
      setItems: setCustomers,
      arrItems: ["Title", "FirstName", "LastName"],
    },
    // inValidate: customValidate,
  });
  // const [state, setState] = useState({
  //   email: "",
  //   mobile: "",
  //   countryCode: "",
  // });
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  // const []

  const [etc, setEtc] = useState(false);

  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const roomBooked = useSelector(getRoomBooked);
  const loading = useSelector(getLoading);
  const backErrors = useSelector((state) => state.hotel.errors, shallowEqual);
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    if (roomBooked !== "") {
      roomBooked === "Booked" ? (
        <>
          {setMsg(
            "Your booking has been Confirmed. Check your emails for details."
          )}
          {setStatus("Awesome!")}
        </>
      ) : (
        <>
          {setMsg("Something Went Wrong!")}
          {setStatus("Failed!")}
        </>
      );
      setShow(true);
    }
  }, [roomBooked]);

  useEffect(() => {
    val.TotalFare !== undefined > 0 &&
      setState({
        ...state,
        BookingCode: code,
        TotalFare: total,
        hotelId: val.id,
      });
  }, [val, total]);

  useEffect(() => {
    setGuests(guests);
    dispatch(selectHotelRoomAsync({ code, Authorization }));
    let arr = [];

    for (let index = 0; index < guests.adults; index++) {
      arr.push({
        FirstName: "",
        LastName: "",
        Type: "Adult",
        Title: "",
      });
    }

    for (let index = 0; index < guests.childs; index++) {
      arr.push({
        FirstName: "",
        LastName: "",
        Type: "Child",
        Title: "",
      });
    }
    setCustomers(arr);
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let Obj = { state, customers };
      const { rooms, adults, childs } = queryData || {};
      dispatch(hotelBookAsync({ Obj, Authorization, rooms, adults, childs }));
    }
  }, [formErrors]);

  // const handleInputChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleInputDynamic = (ind, e) => {
  //   let name = e.target.name.split("[]")[0];
  //   let update = customers;
  //   update[ind][name] = e.target.value;

  //   let arr = [
  //     ...customers.slice(0, ind),
  //     update[ind],
  //     ...customers.slice(ind + 1),
  //   ];

  //   setCustomers(arr);
  // };

  // const validate = () => {
  //   let errors = {};
  //   const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  //   if (state.email.trim() === "") {
  //     errors.email = "Email Is Required!";
  //   } else if (!emailRegex.test(state.email)) {
  //     errors.email = "Invalid Email Address!";
  //   }

  //   if (state.mobile === "") {
  //     errors.mobile = "Mobile Number Is Required!";
  //   } else if (state.mobile.length !== 10) {
  //     errors.mobile = "Mobile Number Should be Exactly 10 Digits!";
  //   }

  //   if (state.countryCode === "") {
  //     errors.countryCode = "Country Code Is Required!";
  //   }

  //   customers.map((ele, ind) => {
  //     errors[ind] = {};

  //     ["Title", "FirstName", "LastName"].map((val) => {
  //       if (ele[val].trim() === "") {
  //         errors[ind][val] = `${val} Is Required!`;
  //       }
  //     });

  //     Object.keys(errors[ind]).length === 0 && delete errors[ind];
  //   });

  //   return errors;
  // };

  // const setSingleError = (e) => {
  //   let errs = validate();
  //   let abc = e.target.name;
  //   // console.log(errs[abc] === undefined);
  //   if (errs[abc] === undefined) {
  //     setFormErrors({ ...formErrors, [abc]: "" });
  //   } else {
  //     setFormErrors({ ...formErrors, [abc]: errs[abc] });
  //   }
  // };

  // const checkDyncErrors = (ind, e) => {
  //   let name = e.target.name.split("[]")[0];

  //   let obj = {};
  //   if (formErrors[ind] !== undefined) {
  //     obj = formErrors[ind];
  //   } else {
  //     obj = {};
  //   }

  //   if (customers[ind][name].trim() === "") {
  //     obj[name] = `${name} Is Required!`;
  //   } else {
  //     if (obj !== undefined && obj !== null) {
  //       obj[name] !== undefined && obj[name] !== null && delete obj[name];
  //     }
  //   }

  //   setFormErrors({ ...formErrors, [ind]: obj });
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // checkErrors();
  //   setFormErrors(validate());
  //   setIsSubmit(true);
  // };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="review-booking-wrapper guest-details-wrapper guest-details-adults">
        <form className="guest-detail-form">
          {customers.map((ele, ind) => {
            return (
              <div key={ind}>
                <h5>
                  Guest {ind + 1} <span>{ele.Type}</span>
                </h5>
                <div className="name-detail">
                  <div className="form-group">
                    <label htmlFor="">Title</label>
                    <select
                      name="Title[]"
                      className="form-control"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      onBlur={(e) => checkDyncErrors(ind, e)}
                      autoComplete="off"
                    >
                      <option value="">Title</option>
                      <option value="Mr.">Mr</option>
                      <option value="Mrs.">Mrs</option>
                    </select>
                    <span className="error">{formErrors[ind]?.Title}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      className="firstName"
                      placeholder="Enter First Name"
                      name="FirstName[]"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      onBlur={(e) => checkDyncErrors(ind, e)}
                      autoComplete="off"
                    />
                    <span className="error">{formErrors[ind]?.FirstName}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="LastName[]"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      autoComplete="off"
                      onBlur={(e) => checkDyncErrors(ind, e)}
                    />
                    <span className="error">{formErrors[ind]?.LastName}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/*  */}

          {/*  */}
          <div className="form-group ">
            <label htmlFor="">
              Email Address  <span className="medium14">(Your booking voucher will be sent to this email address)</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={state.Email}
              name="Email"
              onChange={handleInputChange}
              // onBlur={(e) => setSingleError(e)}
              onBlur={(e) => checkErrors(e)}
              autoComplete="off"
              // onFocus={(e) => setErrors(e)}
            />
          </div>
          <span className="error">{formErrors?.Email}</span>
          <div className="row mobile-num-wrap">
            {/*  */}
            <div className="col-lg-6 p-0">
              <div className="form-group">
                <label>Country Code</label>
                <select
                  name="CountryCode"
                  className="form-control"
                  // onFocus={(e) => setErrors(e)}
                  autoComplete="off"
                  // onBlur={(e) => setSingleError(e)}
                  onBlur={(e) => checkErrors(e)}
                  onChange={handleInputChange}
                >
                  <option value="">Select Country code</option>
                  {callingCode.map((ele, ind) => (
                    <option key={ind} value={ele.value}>
                      {ele.label}
                    </option>
                  ))}
                </select>
                <span className="error">{formErrors?.CountryCode}</span>
              </div>
            </div>

            <div className="col-lg-6 p-0">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="MobileNo"
                  value={state.MobileNo}
                  onChange={handleInputChange}
                  autoComplete="off"
                  onBlur={(e) => checkErrors(e)}
                  // onFocus={(e) => setErrors(e)}
                  // onBlur={(e) => setSingleError(e)}
                />
                <br />
                <span className="error">{formErrors?.MobileNo}</span>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="text-center border-top-0">
            <button
              className="cmn-btn reserve-btn d-block w-100"
              type="submit"
              onClick={handleFormSubmit}
            >
              Reserve Now
            </button>
          </div>
        </form>

        {show ? (
          <SuccessModal
            setShow={setShow}
            show={show}
            msg={msg}
            status={status}
          />
        ) : null}
      </div>
    </>
  );
};

export default HotelGuestForm;
