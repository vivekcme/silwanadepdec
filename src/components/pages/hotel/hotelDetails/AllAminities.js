import React,{useState} from "react";


const AllAminities = ({ vals }) => {

  const { Hotel_Facilities, map } = vals;
  // const [wifi,setWifi] = useState(true); 
  return (
    <>
      <section className="popular-amenities mt-1">

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="select-room-main">
                <div className="title-main">
                  <h5 className="title">Amenities</h5>
                </div>
              </div>
              <div className="popular-amenities-wrap">
                <div className="popular-amenities-wrap-detail">
                  <h6 className="mb-0">Popular Amenities</h6>
                </div>
                
                <div className="row">
                  {Hotel_Facilities !== undefined && Hotel_Facilities.length > 0
                    ? Hotel_Facilities.map((val, i) => (
                       
                      <div
                          className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
                          key={i}
                        >

                        <div className="pop-list-amineties">
                          <div>
                            <img src="assets/images/red-check.svg" alt="red-check"/>
                          </div>
                          <p> {val.facilities_name}</p>
                        </div>

                        
                        </div>
                      ))
                    : "No Aminities To Show!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllAminities;
