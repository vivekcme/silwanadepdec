import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  GroundOverlay,
} from "react-google-maps";

function Map({ lat, lng }) {
  return (
    <GoogleMap
      defaultZoom={15}
      // 22.989418792643086, 72.58871934179528
      defaultCenter={{ lat: lat, lng: lng }}
    >
      <Marker
        // key={park.properties.PARK_ID}

        defaultOptions={{}}
        // 28.664969709277386, 76.89000879658718
        position={{
          lat: lat,
          lng: lng,
        }}
      />
    </GoogleMap>
  );
}

const MapWrapped = withGoogleMap(Map);

export default function Maps(props) {
  console.log("latlong", props.latlong);
  let latLon = props.latlong !== undefined && props.latlong.split("|");
  console.log("latitude", latLon[0]);
  let latitudes = parseFloat(latLon[0]);
  let longitudes = parseFloat(latLon[1]);
  console.log(latitudes, longitudes);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapWrapped
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAeCDbEPFYP5aVlxPzE8ZDE2O3I_pelYOM&v=3.exp&libraries=places"
        }
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={latitudes}
        lng={longitudes}
      />
    </div>
  );
}
