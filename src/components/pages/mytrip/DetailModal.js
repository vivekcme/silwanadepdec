import React from "react";
import { useMemo } from "react";
import CancelBooking from "./tripModals/CancelBooking";
import CarrentDetail from "./tripModals/CarrentDetail";

import HotelDetail from "./tripModals/HotelDetail";
import TransferDetail from "./tripModals/TransferDetail";

const DetailModal = ({
  show,
  setShow,
  detailType,
  modalData,
  checkRef,
  deleting,
  setDeleting,
}) => {
  const callComp = (detailType) => {
    switch (detailType) {
      case "hotel":
        return <HotelDetail hotel={modalData} />;
      case "transfer":
        return (
          <TransferDetail ConfirmationNo={modalData} checkRef={checkRef} />
        );
      case "carrent":
        return <CarrentDetail carRental={modalData} />;
      // case "cancel":
      //   return <CancelBooking id={modalData} setShow={setShow} />;
    }
  };

  const deleteData = (val) => {
    if (val !== "") {
      return (
        <CancelBooking
          id={modalData}
          type={val}
          setShow={setShow}
          setDeleting={setDeleting}
        />
      );
    }
  };

  // const deleteFunc=(val)=>{
  //   switch(val):{
  //     case "hotel":
  //   }
  // }

  const callMemo = useMemo(() => callComp(detailType), [detailType]);

  return (
    <>
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"}`}
        id="loginModal"
      >
        <div
          className={`${
            detailType === "transfer"
              ? "container-fluid mt-5"
              : "modal-dialog modal-lg"
          }`}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div
                action=""
                className={`cmn-form ${
                  detailType === "transfer"
                    ? "cmn-form transfer-detail-main-wrapper"
                    : "cmn-form transfer-detail-main-wrapper hotel-wrapper"
                }`}
              >
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShow(false);
                    // extraData(false);
                  }}
                ></button>
                {/* {callComp(detailType)} */}
                {callMemo}
                {deleteData(deleting)}
                {/* {detailType === "hotel" && <HotelDetail />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailModal;
