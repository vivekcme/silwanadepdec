import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingDetail,
  getSingleTransferDetails,
} from "../../../../features/allBookingSlice";
import {
  IsotoSimpleDate,
  TranferDateFormatter,
} from "../../../../helpers/helper";

const TransferDetail = ({ ConfirmationNo, checkRef }) => {
  const dispatch = useDispatch();
  const transferModalDetail = useSelector(getSingleTransferDetails);
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));
  const { timestamp, token } = JSON.parse(
    sessionStorage.getItem("signatureData")
  );

  React.useEffect(() => {
    if (checkRef.current === true) {
      dispatch(
        getBookingDetail({ ConfirmationNo, Authorization, timestamp, token })
      );
    }
    return () => {
      checkRef.current = false;
    };
  }, []);

  return (
    <>
      <div>
        <div className="transfer-booking-details-main">
          <div>
            <h4>Transfer Booking Details</h4>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="transfer-booking-detail-wrap">
                <h6>Tranfer Vehicle Details</h6>
                <div className="transfer-detail-wrapper cmn-box">
                  <div className="booking-img-wrap">
                    <img src="assets/images/car-img.png" alt="car-img" />
                  </div>
                  <div>
                    <h6>{transferModalDetail?.TransferVehicleDetails?.Name}</h6>
                    <p className="black-reg-10">
                      Type{" "}
                      <span>
                        {" "}
                        <img
                          src="assets/images/type-check.svg"
                          alt="type-check"
                        />{" "}
                        {transferModalDetail?.TransferVehicleDetails?.Type}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="transfer-booking-detail-wrap pickup-detail-wrap">
                <h6>Pick Up Details</h6>
                <div className="transfer-detail-wrapper cmn-box">
                  <div>
                    <img src="assets/images/airport.svg" alt="airport" />
                  </div>
                  <div>
                    <div>
                      <h6>
                        {transferModalDetail.PickUpType === 2
                          ? "From Airport"
                          : "From Hotel"}{" "}
                      </h6>
                      <p className="black-medium-12">
                        {transferModalDetail.PickUpName}
                      </p>
                    </div>
                    <div>
                      <h6>Pick up Code</h6>
                      <p className="black-medium-16">
                        {transferModalDetail.PickUpCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="transfer-booking-detail-wrap pickup-detail-wrap">
                <h6>Drop Off Details</h6>
                <div className="transfer-detail-wrapper cmn-box">
                  <div>
                    <img src="assets/images/hotel-location.svg" alt="airport" />
                  </div>
                  <div>
                    <div>
                      <h6>
                        {transferModalDetail.PickUpType === 1
                          ? "From Hotel"
                          : "From Airport"}{" "}
                      </h6>
                      <p className="black-medium-12">
                        {transferModalDetail.DropOffName}
                      </p>
                    </div>
                    <div>
                      <h6>Drop Off Code</h6>
                      <p className="black-medium-16">
                        {transferModalDetail.DropOffCode}
                      </p>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="transfer-booking-detail-wrap pickup-detail-wrap drop-off-detail">
                <h6>Pick Up Details</h6>
                <div className="transfer-detail-wrapper cmn-box">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: transferModalDetail.PickUpRemarks,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="transfer-booking-detail-wrap pickup-detail-wrap">
                <h6>Transfer Contact Information</h6>
                <div className="transfer-detail-wrapper cmn-box flex-column">
                  <div className="d-flex align-items-start">
                    <div>
                      <img src="assets/images/call.svg" alt="call" />
                    </div>
                    <div>
                      <div>
                        <p className="black-medium-12">
                          Emergency Contact Number
                        </p>
                        <p className="black-medium-12 mb-0">
                          {
                            transferModalDetail?.TransferContactInfo
                              ?.EmergencyNumber
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div>
                      <img src="assets/images/language.svg" alt="language" />
                    </div>
                    <div>
                      <div>
                        <p className="black-medium-12">Language - English</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div>
                      <img src="assets/images/clock.svg" alt="clock" />
                    </div>
                    <div>
                      <div>
                        <p className="black-medium-12">Time From</p>
                        <p className="black-medium-12 mb-0">
                          {transferModalDetail?.TransferContactInfo?.TimeFrom}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="transfer-booking-detail-wrap pickup-detail-wrap traveller-details-wrap d-block">
                <div className="d-flex">
                  <h6>Traveller Details</h6>
                </div>
                <div className="transfer-detail-wrapper cmn-box flex-column">
                  <h4>{`${transferModalDetail?.PaxDetail?.FirstName} ${transferModalDetail?.PaxDetail?.LastName}`}</h4>
                  <div className="d-flex align-items-start cmn-box w-100">
                    <div className="m-0">
                      <img src="assets/images/call.svg" alt="call" />
                    </div>
                    <div>
                      <div>
                        <p className="black-medium-12">
                          {" "}
                          {transferModalDetail?.PaxDetail?.MobileNo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-start cmn-box w-100">
                    <div className="m-0">
                      <img src="assets/images/mail.svg" alt="mail" />
                    </div>
                    <div>
                      <div>
                        <p className="black-medium-12">
                          {" "}
                          {transferModalDetail?.PaxDetail?.Email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
            <div className="col-lg-12  transfer-booking-detail-wrap d-block cancellation-policy-main">
              <h6>Cancellation Policy</h6>

              <div className="cancellation-policy-wrap">
                <div className="cancellation-policy-inner cancel-1">
                  <p>
                    If you cancel between{" "}
                    {TranferDateFormatter(
                      IsotoSimpleDate(
                        transferModalDetail?.TransferVehicleDetails
                          ?.CancellationPolicy[0]?.FromDate
                      )
                    )}{" "}
                    To{" "}
                    {TranferDateFormatter(
                      IsotoSimpleDate(
                        transferModalDetail?.TransferVehicleDetails
                          ?.CancellationPolicy[0]?.ToDate
                      )
                    )}
                    your cancellation charge will be{" "}
                    <i className="fa fa-dollar-sign"></i>{" "}
                    {
                      transferModalDetail?.TransferVehicleDetails
                        ?.CancellationPolicy[0]?.Charge
                    }
                  </p>
                </div>
                {}
                <div className="cancellation-policy-inner cancel-2">
                  <p>
                    If you cancel between{" "}
                    {TranferDateFormatter(
                      IsotoSimpleDate(
                        transferModalDetail?.TransferVehicleDetails
                          ?.CancellationPolicy[1]?.FromDate
                      )
                    )}{" "}
                    To{" "}
                    {TranferDateFormatter(
                      IsotoSimpleDate(
                        transferModalDetail?.TransferVehicleDetails
                          ?.CancellationPolicy[1]?.ToDate
                      )
                    )}
                    your cancellation charge will be{" "}
                    <i className="fa fa-dollar-sign"></i>{" "}
                    {
                      transferModalDetail?.TransferVehicleDetails
                        ?.CancellationPolicy[1]?.Charge
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferDetail;
