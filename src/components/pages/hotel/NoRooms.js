import React from "react";

const NoRooms = ({nohotel}) => {
  return (
    <>

   
     
      {nohotel ? 
      <div className="my-trip-wrap hotel-listing-wrap">
      <div className="my-trip-img-wrap">
          <img src="assets/images/my-trip/bag-boy.svg" alt="bag-boy"/>
      </div>
      <div className="my-trip-text">
          <h4 className="b-b-24">No Hotels Available.</h4>
          <p className="medium16">Please Modify Your Search.</p>
        
      </div>
     </div>

      :
        <div className="no-room-wrapper">
          <div>
            <h6>Sorry ! No Rooms Available</h6>
          </div>
          <div className="no-room-inner-wrapper">
            <div className="no-room-img">
              <img src="assets/images/hotel/norooms.png" alt="img" />
            </div>
            <div className="no-room-img">
              <h6>Looks empty, you've no Rooms Available</h6>
              <p>Please Change Date and explore more rooms</p>
            </div>
          </div>
        </div>
      }
     
   
    </>
  );
};

export default NoRooms;
