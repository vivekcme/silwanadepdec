import React from "react";
import CarsList from "../CarsList";
import Driver from "./Driver";
import GreatChoice from "./GreatChoice";
import IncludedPrice from "./IncludedPrice";
import Price from "./Price";
import { useSelector } from "react-redux";

const CarrentDetails = () => {
  const carDetail = JSON.parse(sessionStorage.getItem("selectedCar"));

  return (
    <>
      <section className="transfer car-rental-payment">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="transfer-inner-wrap">
                <h4 className="title">Easy Boarding</h4>
                <CarsList carDetail={carDetail} book={false} />
                <GreatChoice carDetail={carDetail} />
                <IncludedPrice carDetail={carDetail} />
                <Driver />
              </div>
            </div>
            <Price />
          </div>
        </div>
      </section>
    </>
  );
};

export default CarrentDetails;
