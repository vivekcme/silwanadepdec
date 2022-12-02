import React from "react";
import CarrentForm from "./CarrentForm";
import FlightForm from "./FlightForm";
import HotelForm from "./HotelForm";
import TransferForm from "./TransferForm";
import SightForm from "./SightForm";

const CategoryForm = (props) => {
  const { category, setIsClicked } = props;
  const [myCategory, setMyCategory] = React.useState("");
  React.useEffect(() => {
    if (category.includes("-")) {
      setMyCategory(category.split("-")[0]);
    } else {
      setMyCategory(category);
    }
  }, [category]);

  switch (myCategory) {
    case "hotel":
      return <HotelForm />;

    case "flight":
      return <FlightForm />;

    case "transfer":
      return <TransferForm />;

    case "carrent":
      return <CarrentForm />;

    case "sight":
      return <SightForm />;

    case "visa":
      setIsClicked(false);
      return null;

    case "insurance":
      setIsClicked(false);
      return null;

    default:
      return <HotelForm />;
  }
};

export default CategoryForm;
