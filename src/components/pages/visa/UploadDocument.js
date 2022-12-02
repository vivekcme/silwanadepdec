import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  fetchMyVisaBookings,
  fetchVisaAsync,
  getVisaBookings,
  getVisaTypes,
  resetUploadStatus,
  resetVisaBookings,
} from "../../../features/bookings/visaSlice";
import Loader from "../../../helpers/Loader";
import { successToast } from "../../../helpers/toaster";
import UploadModal from "./UploadModal";
import VisaDetails from "./VisaDetails";

const UploadDocument = () => {
  const visaTypes = useSelector(getVisaTypes);

  const documentStatus = useSelector(
    (state) => state.visa.documentStatus,
    shallowEqual
  );
  const loading = useSelector((state) => state.visa.loading, shallowEqual);

  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [visaType, setVisaType] = useState({});
  const [searchParams] = useSearchParams();
  const [changeId, setChangeId] = useState("");

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );
  const [master, setMaster] = useState({});
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));
  useEffect(() => {
    // dispatch(resetVisaBookings());
    dispatch(fetchMyVisaBookings(Authorization));
  }, []);

  const visaBookings = useSelector(
    (state) => state.visa.visaBookings,
    shallowEqual
  );
  useEffect(() => {
    if (visaTypes.length === 0) {
      dispatch(fetchVisaAsync());
    }
  }, [visaTypes]);

  useEffect(() => {
    let arr = visaBookings.find((ele) => {
      const { id } = queryData;

      return ele.id === parseInt(id);
    });

    setMaster(arr);

    if (arr?.visa_masters_id !== undefined) {
      let newArr = visaTypes.find(
        (ele) => ele.id === parseInt(arr.visa_masters_id)
      );
      setVisaType(newArr);
    }
  }, [queryData, visaBookings, visaTypes]);

  useEffect(() => {
    if (documentStatus) {
      successToast("Documents Uploaded Successfully!");
      setShow(false);
      dispatch(fetchMyVisaBookings(Authorization));
      dispatch(resetUploadStatus());
      setCheck(!check);
    }
  }, [documentStatus]);

  function totalPrice() {
    if (visaType !== undefined) {
      return (
        master.visa_booking_details.length *
        (visaType.embassy_fee + visaType.service_fee + visaType.tax)
      );
    }
  }

  const UploadDoc = (val, id) => {
    setShow(true);
    setModalData(val);
    setChangeId(id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="dubai-visa-detail">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h4 className="title">Visa Detail</h4>
              <div className="name-detail visa-type-wrap">
                <div className="row">
                  <p>
                    Visa processing takes{" "}
                    <span>{visaType?.processing_time}</span>
                  </p>
                  <p>{visaType?.detail}</p>
                </div>
              </div>
              <h4 className="title">Traveller Detail</h4>
              {master !== undefined &&
                Object.keys(master).length > 0 &&
                master.visa_booking_details.map((val, i) => (
                  <div className="name-detail traveller-details-main" key={i}>
                    {val.passport_back === null ? (
                      <span> document pending </span>
                    ) : (
                      <span> document uploaded </span>
                    )}
                    <div className="travel-name-group traveller-details-wrap">
                      <div>
                        <label>Age</label>
                        <span>{val.age}</span>
                      </div>
                      <div>
                        <label>Gender</label>
                        <span>{val.gender}</span>
                      </div>
                    </div>
                    <button onClick={() => UploadDoc(val, val.id)}>
                      upload Document
                    </button>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
              <div className="name-detail">
                <div className="price-summary">
                  <h6>Price Summary</h6>
                  {master?.visa_booking_details !== undefined && (
                    <div>
                      <p>
                        Total Traveller{" "}
                        <span> {master.visa_booking_details.length}</span>
                      </p>
                      <p>
                        Visa Embassy fees{" "}
                        <span> {visaType?.embassy_fee || 0} </span>
                      </p>
                      <p>
                        service fees <span> {visaType?.service_fee || 0} </span>
                      </p>
                      <p>
                        tax <span> {visaType?.tax || 0} </span>
                      </p>
                      <p className="total-amount">
                        Total Amount to be Paid <span> {totalPrice()} </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {show ? (
          <UploadModal setShow={setShow} show={show} modalData={modalData} />
        ) : null}
      </section>
    </>
  );
};

export default UploadDocument;
