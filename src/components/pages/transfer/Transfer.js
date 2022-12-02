import React, { useEffect, useState } from "react";
import Fliter from "../../common/filter/Fliter";
import StarRating from "../../common/filter/StarRating";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getSearchedTransfers,
  transferSearchAsync,
  transferSearchReturnAsync,
} from "../../../features/bookings/transferSlice";
import TransferList from "./TransferList";

import Loader from "../../../helpers/Loader";
import MainModal from "../../modals/MainModal";
import SelectedVehicle from "./SelectedVehicle";
import { scrollFunc } from "../../../helpers/helper";

const Transfer = () => {
  const [modal, setModal] = useState("login");
  const [show, setShow] = useState(false);

  const transferSearched = useSelector(getSearchedTransfers);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();
  const tcount = JSON.parse(sessionStorage.getItem("departure")).tcount;

  const [pickupVehicle, setPickupVehicle] = useState("");
  const [viewRoundTrip, setviewRoundTrip] = useState(false);

  const [retrunTransfer, setReturnTransfer] = useState(false);
  const signatureData = JSON.parse(sessionStorage.getItem("signatureData"));

  useEffect(() => {
    let depature = JSON.parse(sessionStorage.getItem("departure"));

    if (depature !== null) {
      let returnData = JSON.parse(sessionStorage.getItem("return"));

      if (returnData === null) {
        dispatch(transferSearchAsync({ depature, signatureData }));
      } else {
        const { returnJourney } = returnData;
        console.log(returnData, "here");
        dispatch(
          transferSearchReturnAsync({ depature, returnJourney, signatureData })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (transferSearched === undefined) {
      dispatch(
        transferSearchAsync(JSON.parse(sessionStorage.getItem("transferForm")))
      );
    }
  }, [transferSearched]);

  useEffect(() => {
    let val = JSON.parse(sessionStorage.getItem("roundTrip"));
    setReturnTransfer(val);
  }, [transferSearched]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="hotel-listing-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Fliter />
              <StarRating />
            </div>
            <div className="col-lg-9 mt-4">
              <div className="title2">
                <h5>Onwards Journey</h5>

                {!viewRoundTrip && (
                  <>
                    {transferSearched?.TransferResults?.length === 0
                      ? "No Vehicel avialable for this date or time please change and try"
                      : transferSearched?.TransferResults?.filter(
                          (veh) => veh.Vehicles[0].PaxCapacity >= tcount //this pax capacity should be dynamic
                        ).map((val, ind) => {
                          return (
                            <TransferList
                              val={val}
                              key={ind}
                              setShow={setShow}
                              show={show}
                              returnTransfer={retrunTransfer}
                              setModal={setModal}
                              methods={{ setPickupVehicle, setviewRoundTrip }}
                            />
                          );
                        })}
                  </>
                )}

                {viewRoundTrip && (
                  <>
                    <SelectedVehicle pickupVehicle={pickupVehicle} />
                    <div className="title2">
                      <h5>Return Journey</h5>
                    </div>
                    {transferSearched?.TransferReturnResults?.filter(
                      (veh) => veh.Vehicles[0].PaxCapacity >= 2
                    ).map((val, ind) => {
                      return (
                        <TransferList
                          val={val}
                          key={ind}
                          setShow={setShow}
                          show={show}
                          setModal={setModal}
                          methods={{ setPickupVehicle, setviewRoundTrip }}
                        />
                      );
                    })}
                  </>
                )}

                {show ? (
                  <MainModal
                    modal={modal}
                    setShow={setShow}
                    show={show}
                    setModal={setModal}
                    // extraData={val.DayRates[0]}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transfer;
