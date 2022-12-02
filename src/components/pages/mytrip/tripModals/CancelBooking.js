import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  carrentBookingCancelAsync,
  fetchAllMyBookings,
  getCancelStatus,
  hotelBookingCancelAsync,
  resetCancelStatus,
  transferBookingCancelAsync,
} from "../../../../features/allBookingSlice";
import { successToast } from "../../../../helpers/toaster";

const CancelBooking = ({ id, setShow, type, setDeleting }) => {
  const dispatch = useDispatch();
  const checkRef = React.useRef(true);
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));
  const { timestamp, token } = JSON.parse(
    sessionStorage.getItem("signatureData")
  );

  //
  const cancelStatus = useSelector(getCancelStatus);

  React.useEffect(() => {
    if (checkRef.current === true) {
      if (cancelStatus === true) {
        successToast("Booking Cancelled Successfully!");
        dispatch(resetCancelStatus());
        setDeleting("");
        setShow(false);
        dispatch(fetchAllMyBookings(Authorization));
      }
    }
    return () => {
      checkRef.current = false;
    };
  }, [cancelStatus]);

  const cancelBooking = () => {
    switch (type) {
      case "hotel":
        dispatch(hotelBookingCancelAsync({ id, Authorization }));
      case "transfer":
        dispatch(
          transferBookingCancelAsync({ id, Authorization, timestamp, token })
        );
      case "carrent":
        dispatch(carrentBookingCancelAsync({ id, Authorization }));
    }
  };
  return (
    <>
      <div className="my-trip-cancel-booking">
        <h1>Are you you sure you want to cancel Booking ?</h1>
        <p>
          If you confirm the simple transition you will not have a chance to
          undo it.
        </p>
        <div className="text-end cancel-confirm-wrap">
          <span className="cmn-btn yes-btn" onClick={cancelBooking}>
            Yes, Confirm
          </span>
          <span className="cmn-btn" onClick={() => setShow(false)}>
            Cancel
          </span>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default CancelBooking;
