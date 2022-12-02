import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../UI/Counter";
import {
  fetchCitiesAsync,
  fetchHotelSearchPrice,
  getCounts,
  getHotelCities,
  getHotelSearched,
  getLoading,
  hotelSearchAsync,
  setCounts,
} from "../../features/bookings/hotelSlice";
import {
  adultInc,
  roomInc,
  childInc,
  adultDec,
  roomDec,
  childDec,
} from "../../features/bookings/hotelSlice";
import _ from "lodash";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Loader from "../../helpers/Loader";
import SearchButton from "../UI/SearchButton";

const HotelForm = () => {
  const [state, setState] = useState({
    checkIn: "",
    checkOut: "",
    city: "",
    adults: 1,
    childs: 0,
    rooms: 1,
    childAge: "0",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [listShow, setListShow] = useState(false);
  const [ageDrop, setAgeDrop] = useState("");
  const [city, setCity] = useState("");
  const [childs, setChilds] = useState([]);
  const [changed, setChanged] = useState(false);

  const [placeHolder, setPlaceHolder] = useState("1 Adult - 0 Child, 1 Room");

  const [startCheckIn, setStartCheckIn] = useState(
    new Date().setFullYear(new Date().getFullYear())
  );
  const endDateAll = new Date().setFullYear(new Date().getFullYear() + 1);

  const [startCheckOut, setStartCheckOut] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const todayMinDate = new Date().setFullYear(new Date().getFullYear());
  const { adultsCount, roomsCount, childsCount, childAge } =
    useSelector(getCounts);
  const loading = useSelector(getLoading);
  const hotelSearched = useSelector(getHotelSearched);

  const [searchParams] = useSearchParams();

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );

  useEffect(() => {
    if (new Date(startCheckIn) >= new Date(startCheckOut)) {
      setStartCheckOut(new Date().getFullYear() + startCheckIn);
    }
  }, [startCheckIn]);

  const cities = useSelector(getHotelCities);

  useEffect(() => {
    if (city?.length > 1) {
      dispatch(fetchCitiesAsync(city));
      changed === false && setListShow(true);
    } else {
      setListShow(false);
    }
  }, [city]);

  useEffect(() => {
    setList(cities);
    listShow ? setListShow(true) : setListShow(false);
  }, [cities, listShow]);

  // useEffect(() => {
  //   const hotelForm = JSON.parse(sessionStorage.getItem("hotelForm"));
  //   if (hotelForm !== null) {
  //     // if (hotelForm.BookingCode !== undefined) {
  //     let val = JSON.parse(sessionStorage.getItem("hotelForm"));
  //     dispatch(setCounts(val));

  //     // }
  //     //  else {
  //     //   dispatch(setCounts(queryData));
  //     // }
  //     // dispatch(hotelSearchAsync(queryData));
  //   }
  // }, []);

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     adults: adultsCount,
  //     childs: childsCount,
  //     rooms: roomsCount,
  //   });
  // }, [adultsCount, roomsCount, childsCount, childAge]);

  useEffect(() => {
    if (Object.keys(queryData).length > 0) {
      setState(queryData);
      setCity(queryData.cityname);
      setChanged(true);

      dispatch(setCounts(queryData));

      const { adults, rooms, childs } = queryData;
      setPlaceHolder(`${adults} Adult - ${childs} Child, ${rooms} Room`);
      let ci = queryData.checkIn;
      setStartCheckIn(
        new Date(ci).getTime() - new Date(ci).getTimezoneOffset() * 60000
      );
      let co = queryData.checkOut;
      setStartCheckOut(
        new Date(co).getTime() - new Date(co).getTimezoneOffset() * 60000
      );
    } else {
      const hotelForm = JSON.parse(sessionStorage.getItem("hotelForm"));
      if (hotelForm !== null && hotelForm !== undefined) {
        setState(hotelForm);
        setCity(hotelForm.cityname);
        setChanged(true);

        dispatch(setCounts(hotelForm));

        const { adults, rooms, childs } = hotelForm;
        setPlaceHolder(`${adults} Adult - ${childs} Child, ${rooms} Room`);
        let ci = hotelForm.checkIn;
        setStartCheckIn(
          new Date(ci).getTime() - new Date(ci).getTimezoneOffset() * 60000
        );
        let co = hotelForm.checkOut;
        setStartCheckOut(
          new Date(co).getTime() - new Date(co).getTimezoneOffset() * 60000
        );
      }
    }
  }, [queryData]);

  // useEffect(() => {
  //   const hotelForm = JSON.parse(sessionStorage.getItem("hotelForm"));
  //   if (hotelForm !== null) {
  //     const { cityname } = hotelForm;

  //     setPlaceHolder(
  //       `${adultsCount} Adult - ${childsCount} Child, ${roomsCount} Room`
  //     );
  //     setCity(cityname);
  //     setChanged(true);
  //   }
  // }, [hotelSearched]);

  useEffect(() => {
    state.cityname = city;

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // const hotelForm = JSON.parse(sessionStorage.getItem("hotelForm"));
      // if (JSON.stringify(hotelForm) !== JSON.stringify(state)) {
      // }

      sessionStorage.setItem("hotelForm", JSON.stringify(state));
      dispatch(hotelSearchAsync(state));
      dispatch(fetchHotelSearchPrice(state));

      loading ? (
        <Loader />
      ) : (
        <>
          {navigate({
            pathname: "/hotel-listing",
            search: `${createSearchParams(state)}`,
          })}
        </>
      );

      setIsSubmit(false);
    }
  }, [formErrors, isSubmit]);

  const [hotelForm, setHotelForm] = useState(
    JSON.parse(sessionStorage.getItem("hotelForm"))
  );

  // useEffect(() => {
  //   if (hotelForm !== null) {
  //     hotelForm.adults = adultsCount;
  //     hotelForm.childs = childsCount;
  //     hotelForm.rooms = roomsCount;
  //     setState(hotelForm);

  //     setPlaceHolder(
  //       `${adultsCount} Adult - ${childsCount} Child, ${roomsCount} Room`
  //     );
  //     setCity(hotelForm.cityname);
  //     setChanged(true);

  //     let ci = hotelForm.checkIn;
  //     setStartCheckIn(
  //       new Date(ci).getTime() - new Date(ci).getTimezoneOffset() * 60000
  //     );

  //     let co = hotelForm.checkOut;
  //     setStartCheckOut(
  //       new Date(co).getTime() - new Date(co).getTimezoneOffset() * 60000
  //     );

  //     // dispatch(setCounts(hotelForm));
  //   }
  // }, [adultsCount, roomsCount, childsCount, hotelForm]);

  const handleCheckIn = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setStartCheckIn(e.getTime() - e.getTimezoneOffset() * 60000);
    setState({ ...state, checkIn: myDate });

    if (new Date(myDate) >= new Date(state.checkOut)) {
      setState({ ...state, checkOut: myDate, checkIn: myDate });
    }
  };

  const handleCheckOut = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setState({ ...state, checkOut: myDate });
    setStartCheckOut(e.getTime() - e.getTimezoneOffset() * 60000);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setChanged(false);
    setState({
      ...state,
      city: "",
    });
  };

  const handleApplyBtn = () => {
    setChildAges();
    let obj = {
      adults: adultsCount,
      childs: childsCount,
      rooms: roomsCount,
      childAge: state.childAge,
    };
    setAgeDrop("");
    setPlaceHolder(
      `${adultsCount} Adult - ${childsCount} Child, ${roomsCount} Room`
    );
    dispatch(setCounts(obj));
    setTimeout(() => {
      setState({
        ...state,
        adults: adultsCount,
        childs: childsCount,
        rooms: roomsCount,
      });
    }, 800);
  };

  const validate = () => {
    let errors = {};
    if (city?.trim() === "") {
      errors.city = "Please Enter City Name!";
    } else if (state.city === "") {
      errors.city = "Please Select a Valid City Name!";
    }
    if (state.checkIn === "") {
      errors.checkIn = "Please Select Check In Date!";
    }
    if (state.checkOut === "") {
      errors.checkOut = "Please Select Check Out Date!";
    }
    return errors;
  };

  //just to check
  const checkErrors = (e) => {
    let check = validate();
    let name = e.target.name;

    if (name in check) {
      setFormErrors({ ...formErrors, [name]: check[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const hotelSearchData = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  const setChildAges = () => {
    let childs = document.querySelectorAll(".childs");
    let arr = [];
    childs.forEach((ele) => arr.push(ele.value));
    arr.length > 0 &&
      setState({ ...state, childAge: arr.join(","), childs: arr.length });
  };
  const style = {
    height: "250px",
    overflow: "scroll",
  };

  return (
    <>
      <div className="catgories-detail position-relative">
        <form>
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/location.svg" alt="location" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">city</label>
              <input
                type="search"
                className="form-control"
                value={city}
                name="city"
                placeholder="Where are you going?"
                onChange={handleInputChange}
                onBlur={(e) => {
                  setListShow(false);
                  checkErrors(e);
                }}
                // onFocus={(e) => setErrors(e)}
                autoComplete="off"
              />
              <p className="text-danger">{formErrors?.city}</p>
            </div>
            <ul
              style={style}
              className={`${
                listShow ? "d-block city-detail-list" : "d-none p-0"
              } mt-4`}
            >
              {list.length > 0
                ? list.map((ele, ind) => {
                    return (
                      <li
                        onMouseDown={() => {
                          setCity(ele.name);
                          setState({ ...state, city: ele.city_code });
                          setListShow(false);
                        }}
                        key={ind}
                      >
                        {ele.name}
                      </li>
                    );
                  })
                : "No Matches Found!"}
            </ul>
            {/*  */}
          </div>
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/calendar.svg" alt="calendar" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">Check In</label>
              <DatePicker
                onChange={handleCheckIn}
                peekNextMonth
                showMonthDropdown
                selected={startCheckIn}
                showYearDropdown
                dropdownMode="select"
                minDate={todayMinDate}
                maxDate={endDateAll}
                dateFormat="yyyy/MM/dd"
                name="checkIn"
                placeholderText="yyyy/mm/dd"
                value={state.checkIn}
                // onFocus={(e) => setErrors(e)}
                className="form-control"
                style={{ Zindex: "100" }}
                autoComplete="off"
                onBlur={(e) => checkErrors(e)}
              />
              <p className="text-danger">{formErrors?.checkIn}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/calendar.svg" alt="calendar" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">Check Out</label>
              <DatePicker
                onChange={handleCheckOut}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={startCheckOut}
                minDate={startCheckIn}
                maxDate={endDateAll}
                dateFormat="yyyy/MM/dd"
                name="checkOut"
                placeholderText="yyyy/mm/dd"
                value={state.checkOut}
                // onFocus={(e) => setErrors(e)}
                className="form-control"
                style={{ Zindex: "100" }}
                autoComplete="off"
                onBlur={(e) => checkErrors(e)}
              />
              <p className="text-danger">{formErrors?.checkOut}</p>
            </div>
          </div>
          <div className="form-group position-relative">
            <div className="categories-icon">
              <img src="assets/images/travel.svg" alt="user" />
            </div>
            <div className="categories-detail-list guest-room-select">
              <label htmlFor="">Guests & Rooms</label>
              <div className="btn-group">
                <ul
                  className={`dropdown-menu ${ageDrop}`}
                  aria-labelledby="dropdownMenuClickableInside"
                  data-popper-placement="bottom-start"
                >
                  <li>
                    <div className="dropdown-item">
                      <div className="people-counter">
                        <div className="input-group text-center">
                          <div>
                            <h5 className="semi16">Rooms</h5>
                            <h6 className="medium12">(Max 8)</h6>
                          </div>
                          <div>
                            <Counter
                              count={roomsCount}
                              inc={roomInc}
                              dec={roomDec}
                              max={8}
                              min={1}
                            />
                          </div>
                        </div>
                        <div className="input-group text-center">
                          <div>
                            <h5 className="semi16">Adults</h5>
                            <h6 className="medium12">(Aged 12+ yrs)</h6>
                          </div>
                          <div>
                            <Counter
                              count={adultsCount}
                              inc={adultInc}
                              dec={adultDec}
                              max={12}
                              min={1}
                            />
                          </div>
                        </div>
                        <div className="input-group text-center">
                          <div>
                            <h5 className="semi16">Children</h5>
                            <h6 className="medium12">(Aged 0-12 yrs)</h6>
                          </div>
                          <div>
                            <Counter
                              count={childsCount}
                              inc={childInc}
                              dec={childDec}
                              max={4}
                              min={0}
                            />
                          </div>
                        </div>
                        {/*  */}
                      </div>

                      <div>
                        <div>
                          <h6>Rooms</h6>
                        </div>
                        <div>
                        <div className="input-group text-center">
                        <div>
                          <h5 className="semi16">Adults</h5>
                          <h6 className="medium12">(Aged 12+ yrs)</h6>
                        </div>
                        <div>
                          <Counter
                            count={adultsCount}
                            inc={adultInc}
                            dec={adultDec}
                            max={12}
                            min={1}
                          />
                        </div>
                      </div>
                        </div>
                        <div>
                        <div className="input-group text-center">
                        <div>
                          <h5 className="semi16">Children</h5>
                          <h6 className="medium12">(Aged 0-12 yrs)</h6>
                        </div>
                        <div>
                          <Counter
                            count={childsCount}
                            inc={childInc}
                            dec={childDec}
                            max={4}
                            min={0}
                          />
                        </div>
                      </div>
                        </div>
                      </div>

                      <div className="traveller-age-main">
                        {childsCount > 0 &&
                          new Array(childsCount)
                            .fill(0)
                            .map(function (ele, ind) {
                              return (
                                <div key={ind}>
                                  <h5>Traveller {ind + 1} age</h5>
                                  <select
                                    name=""
                                    className="childs"
                                    defaultValue={childAge?.split(",")[ind]}
                                    // defaultValue={"5"}
                                    // onChange={handleSelectChange}
                                  >
                                    {new Array(12)
                                      .fill(0)
                                      .map(function (ele, ind) {
                                        return (
                                          <option value={ind + 1} key={ind}>
                                            {ind + 1} Year
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              );
                            })}
                      </div>
                      {/*  */}
                      <div className="text-end">
                        <a
                          className="cmn-btn text-decoration-none"
                          onClick={handleApplyBtn}
                        >
                          Apply
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <input
                type="text"
                onFocus={() => setAgeDrop("show")}
                placeholder={placeHolder}
              />
            </div>
          </div>
          {/* search button */}
          <SearchButton func={hotelSearchData} />
        </form>
      </div>
    </>
  );
};

export default HotelForm;
