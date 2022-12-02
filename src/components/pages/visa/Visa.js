import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  appendVisa,
  applyVisaAsync,
  fetchMyVisaBookings,
  fetchVisaAsync,
  getApplyStatus,
  getVisaBookings,
  getVisaCounts,
  getVisaTypes,
  resetVisaStatus,
} from "../../../features/bookings/visaSlice";
import { scrollFunc } from "../../../helpers/helper";
import { useForm } from "../../../hooks/useForm";
import DocList from "./DocList";
import VisaDetails from "./VisaDetails";

const Visa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const visaType = useSelector(getVisaTypes);
  const visaCount = useSelector(getVisaCounts);
  const status = useSelector(getApplyStatus);
  const visaBookings = useSelector(getVisaBookings);

  const [selectedVisaType, setSelectedVisaType] = useState("1");
  const [travellers, setTravellers] = useState([]);
  const [visaDetails, setVisaDetails] = useState({});

  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  // scrollFunc();

  const {
    isSubmit,
    formErrors,
    handleFormSubmit,
    handleInputDynamic,
    checkDyncErrors,
  } = useForm({
    dyncVals: {
      items: travellers,
      setItems: setTravellers,
      arrItems: ["FirstName", "LastName", "Age", "Gender"],
    },
    // inValidate: customValidate,
  });

  //
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const User = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    dispatch(fetchVisaAsync());
    dispatch(fetchMyVisaBookings(User.Authorization));
  }, []);

  useEffect(() => {
    setVisaDetails(visaType[0]);
    if (visaCount === 1) {
      let arr = [
        {
          FirstName: "",
          LastName: "",
          Age: "",
          Gender: "",
        },
      ];
      setTravellers(arr);
    } else if (travellers.length < visaCount) {
      setTravellers([
        ...travellers,
        { FirstName: "", LastName: "", Age: "", Gender: "" },
      ]);
    } else {
      let newArr = travellers.slice(0, -1);
      setTravellers(newArr);
    }
  }, [visaCount, visaType]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let total = parseFloat(
        parseInt(visaDetails.embassy_fee) +
          parseInt(visaDetails.service_fee) +
          parseInt(visaDetails.tax)
      );
      dispatch(applyVisaAsync({ travellers, total, selectedVisaType, User }));
    }
  }, [formErrors, isSubmit]);

  useEffect(() => {
    if (status !== "") {
      if (status) {
        navigate(`/visa-document?id=${status[0].id}`);
        dispatch(resetVisaStatus());
      }
    }
  }, [status]);

  // const handleDyncInput = (ind, e) => {
  //   let name = e.target.name.split("[]")[0];
  //   let update = travellers;
  //   update[ind][name] = e.target.value;

  //   let arr = [
  //     ...travellers.slice(0, ind),
  //     update[ind],
  //     ...travellers.slice(ind + 1),
  //   ];

  //   setTravellers(arr);
  // };

  const handleSelectVisa = (e) => {
    setSelectedVisaType(e.target.value);
    let arr = visaType.filter((ele) => {
      return parseInt(ele.id) === parseInt(e.target.value);
    });
    setVisaDetails(arr[0]);
  };

  const remove = (ind) => {
    let arr = travellers.filter((ele, i) => {
      return i !== ind;
    });

    delete formErrors[ind];

    setTravellers(arr);
  };

  // const validate = () => {
  //   let errors = {};

  //   travellers.map((ele, ind) => {
  //     errors[ind] = {};

  //     ["FirstName", "LastName", "Age", "Gender"].map((val) => {
  //       if (ele[val].trim() === "") {
  //         errors[ind][val] = `${val} Is Required!`;
  //       }
  //     });

  //     Object.keys(errors[ind]).length === 0 && delete errors[ind];
  //   });

  //   return errors;
  // };

  // const checkDyncErrors = (ind, e) => {
  //   let name = e.target.name.split("[]")[0];

  //   let obj = {};
  //   if (formErrors[ind] !== undefined) {
  //     obj = formErrors[ind];
  //   } else {
  //     obj = {};
  //   }

  //   if (travellers[ind][name].trim() === "") {
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
  //   setFormErrors(validate());
  //   setIsSubmit(true);
  // };

  return (
    <>
      <section className="entry-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h4 className="title">Visa Type</h4>

              <div className="name-detail">
                <div>
                  <select onChange={handleSelectVisa}>
                    {visaType.length > 0 &&
                      visaType.map((val, i) => (
                        <option defaultValue={""} value={val.id} key={i}>
                          {val.typeofvisa}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="visa-type-wrap">
                  {visaType.length > 0 &&
                    visaType.map((data, i) => {
                      if (data.id === parseInt(selectedVisaType)) {
                        return (
                          <div key={i}>
                            <p>
                              Visa processing takes{" "}
                              <span>{data.processing_time}</span>
                            </p>
                            <p> {data.detail}</p>
                            <p>
                              Embassy Fees <span> {data.embassy_fee}</span>
                            </p>
                            <p>
                              Validity <span>{data.validity}</span>
                            </p>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>

              <DocList />

              <div>
                <h4 className="title mt-5">Traveller Details</h4>
                <div className="name-detail guest-details-wrapper">
                  <form className="">
                    {travellers.map((ele, index) => (
                      <div key={index}>
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name={"FirstName[]"}
                            onChange={(e) => handleInputDynamic(index, e)}
                            value={ele.FirstName}
                            onBlur={(e) => checkDyncErrors(index, e)}
                            autoComplete="off"
                          />
                          <span className="error">
                            {formErrors[index]?.FirstName}
                          </span>
                        </div>

                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name={"LastName[]"}
                            onChange={(e) => handleInputDynamic(index, e)}
                            value={ele.LastName}
                            onBlur={(e) => checkDyncErrors(index, e)}
                            autoComplete="off"
                          />
                          <span className="error">
                            {formErrors[index]?.LastName}
                          </span>
                        </div>

                        <div className="form-group">
                          <label>Age</label>
                          <input
                            type="number"
                            name={"Age[]"}
                            onChange={(e) => handleInputDynamic(index, e)}
                            value={ele.Age}
                            onBlur={(e) => checkDyncErrors(index, e)}
                            autoComplete="off"
                          />
                          <span className="error">
                            {formErrors[index]?.Age}
                          </span>
                        </div>

                        <div className="form-group">
                          <label>Gender</label>
                          <select
                            defaultValue=""
                            name={"Gender[]"}
                            onChange={(e) => handleInputDynamic(index, e)}
                            // value={ele.Gender}
                            onBlur={(e) => checkDyncErrors(index, e)}
                            autoComplete="off"
                          >
                            <option value={""}>Select Gender</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                          </select>
                          <span className="error">
                            {formErrors[index]?.Gender}
                          </span>
                        </div>

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => dispatch(appendVisa())}
                    >
                      + Add Traveller
                    </button>
                    <input
                      type="submit"
                      onClick={handleFormSubmit}
                      value={"Proceed To Payment"}
                    />
                  </form>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-lg-4">
              <div className="name-detail my-visa-list-wrap">
                <div>
                  <h4>My visa details</h4>
                  {visaBookings.length > 0 &&
                    visaBookings.map((data, i) => (
                      <div key={i}>
                        <p> {data.email}</p>
                        <span
                          className="cmn-btn"
                          onClick={() => {
                            setShow(true);
                            setModalData(data);
                          }}
                        >
                          View
                        </span>
                      </div>
                    ))}
                  {/*  */}
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>

        {show ? (
          <VisaDetails setShow={setShow} show={show} modalData={modalData} />
        ) : null}
      </section>
    </>
  );
};

export default Visa;
