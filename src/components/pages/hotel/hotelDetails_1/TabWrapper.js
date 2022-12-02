import React from "react";

const TabWrapper = ({ vals }) => {
  const { name, description } = vals;
  return (
    <>
      <section className="hotel-list-tabs my-5">
        <div className="tabs-wrapper">
          <div className="container">
            <ul
              className="nav nav-tabs border-0 justify-content-between"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#Overview"
                >
                  Overview
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#Rooms">
                  Rooms
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#Location">
                  Location
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#Amenities">
                  Amenities
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#Property-Rules"
                >
                  Property Rules
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#User-Overview"
                >
                  User Overview
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <div id="Overview" className="container tab-pane active">
            <h2 className="title">About {name}</h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          {/* <div id="Rooms" className="container tab-pane fade">
            <h2 className="title">About JW Marriott Marquis Hotel Dubai</h2>
            <p>
              Minutes away from Dubai Water Canal Waterfall, JW Marriott Marquis
              Hotel invites guests for a grand and luxurious stay, offering
              recreational activities such as the in-house bowling alley and
              windsurfing. JW Marriott Marquis Hotel Dubai is a great choice for
              travellers looking for a 5 star hotel in Dubai. It is located in
              Sheikh Zayed Road. This Hotel stands out as one of the highly
              recommended hotel in Dubai and is recommended by 87% of our
              guests. Hotel is rated 4.2 out of 5, which is considered as very
              good. The property enjoys a great location advantage and provides
              easy and fast connectivity to the major transit points of the
              city. Some of the popular transit points from JW s.
            </p>
          </div>
          <div id="Location" className="container tab-pane fade">
            <h2 className="title">About JW Marriott Marquis Hotel Dubai</h2>
            <p>
              Minutes away from Dubai Water Canal Waterfall, JW Marriott Marquis
              Hotel invites guests for a grand and luxurious stay, offering
              recreational activities such as the in-house bowling alley and
              windsurfing. JW Marriott Marquis Hotel Dubai is a great choice for
              travellers looking for a 5 star hotel in Dubai. It is located in
              Sheikh Zayed Road. This Hotel stands out as one of the highly
              recommended hotel in Dubai and is recommended by 87% of our
              guests. Hotel is rated 4.2 out of 5, which is considered as very
              good. The property enjoys a great location advantage and provides
              easy and fast connectivity to the major transit points of the
              city. Some of the popular transit points from JW s).
            </p>
          </div>
          <div id="Amenities" className="container tab-pane fade">
            <h2 className="title">About JW Marriott Marquis Hotel Dubai</h2>
            <p>
              Minutes away from Dubai Water Canal Waterfall, JW Marriott Marquis
              Hotel invites guests for a grand and luxurious stay, offering
              recreational activities such as the in-house bowling alley and
              windsurfing. JW Marriott Marquis Hotel Dubai is a great choice for
              travellers looking for a 5 star hotel in Dubai. It is located in
              Sheikh Zayed Road. This Hotel stands out as one of the highly
              recommended hotel in Dubai and is recommended by 87% of our
              guests. Hotel is rated 4.2 out of 5, which is considered as very
              good. The property enjoys a great location advantage and provides
              easy and fast connectivity to the major transit points of the
              city. Some of the popular transit points from JW s).
            </p>
          </div>
          <div id="Property-Rules" className="container tab-pane fade">
            <h2 className="title">About JW Marriott Marquis Hotel Dubai</h2>
            <p>
              Minutes away from Dubai Water Canal Waterfall, JW Marriott Marquis
              Hotel invites guests for a grand and luxurious stay, offering
              recreational activities such as the in-house bowling alley and
              windsurfing. JW Marriott Marquis Hotel Dubai is a great choice for
              travellers looking for a 5 star hotel in Dubai. It is located in
              Sheikh Zayed Road. This Hotel stands out as one of the highly
              recommended hotel in Dubai and is recommended by 87% of our
              guests. Hotel is rated 4.2 out of 5, which is considered as very
              good. The property enjoys a great location advantage and provides
              easy and fast connectivity to the major transit points of the
              city. Some of the popular transit points from JW s).
            </p>
          </div>
          <div id="User-Overview" className="container tab-pane fade">
            <h2 className="title">About JW Marriott Marquis Hotel Dubai</h2>
            <p>
              Minutes away from Dubai Water Canal Waterfall, JW Marriott Marquis
              Hotel invites guests for a grand and luxurious stay, offering
              recreational activities such as the in-house bowling alley and
              windsurfing. JW Marriott Marquis Hotel Dubai is a great choice for
              travellers looking for a 5 star hotel in Dubai. It is located in
              Sheikh Zayed Road. This Hotel stands out as one of the highly
              recommended hotel in Dubai and is recommended by 87% of our
              guests. Hotel is rated 4.2 out of 5, which is considered as very
              good. The property enjoys a great location advantage and provides
              easy and fast connectivity to the major transit points of the
              city. Some of the popular transit points from JW s).
            </p>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default TabWrapper;
