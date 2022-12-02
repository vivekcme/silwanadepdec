import React, { useEffect, useState } from "react";
import Review from "./Review";
import PaymentDetail from "./PaymentDetail";
import { useSearchParams } from "react-router-dom";
import HotelGuestForm from "./HotelGuestForm";
import { useDispatch } from "react-redux";
import { resetCounts } from "../../../../features/bookings/hotelSlice";
import { isObject } from "lodash";

const HotelReview = () => {
  const [val, setVal] = useState([]);
  const [form, setForm] = useState([]);
  const [match, setMatch] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("here", JSON.parse(sessionStorage.getItem("hotelDetails")));
    let abc = JSON.parse(sessionStorage.getItem("hotelDetails"));
    setVal(abc);
    setForm(JSON.parse(sessionStorage.getItem("hotelForm")));
  }, []);

  const [searchParams] = useSearchParams();

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );
  // useEffect(() => {
  //   dispatch(resetCounts());
  // }, []);

  useEffect(() => {
    if (Object.keys(val).length > 0) {
      let ans = val.pricedata[0].Rooms.find((ele) => {
        console.log(ele.BookingCode, "elecode");
        console.log(queryData.BookingCode, "queryData");
        return ele.BookingCode == queryData.BookingCode;
      });

      setMatch(ans);
    }
  }, [val]);

  return (
    <>
      <section className="review-booking">
        <div className="container">
          <div className="row">
            <div>
              <h3 className="title">Review your Booking</h3>
            </div>
            <div className="col-lg-8">
              {match !== undefined && (
                <Review detail={val} formData={form} match={match} />
              )}

              {val.length !== 0 && match !== undefined && (
                <HotelGuestForm
                  code={queryData.BookingCode}
                  val={val}
                  match={match}
                  total={match.TotalFare}
                  guests={{ adults: form.adults, childs: form.childs }}
                />
              )}
            </div>
            <div className="col-lg-4">
              {match !== undefined && (
                <PaymentDetail formData={form} val={val} match={match} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelReview;
