import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import { useTracker } from "meteor/react-meteor-data";
import mapCoordination from "../../../libs/mapCoordination";
const MapAddress = (props) => {
  //  -----------
  const [viewport, setViewport] = useState({
    latitude: props.lat || 34.48288436626787,
    longitude: props.long || 10,
    zoom: 7.1,
  });

  const coordination = useTracker(() => {
    return mapCoordination.get("coordination");
  });

  const handleAddClick = (e) => {
    if (props.readOnly) {
      return;
    }
    const longitude = e.lngLat.lng;
    const latitude = e.lngLat.lat;

    mapCoordination.set("coordination", {
      lat: latitude,
      long: longitude,
    });
  };
  return (
    <Map
      initialViewState={{
        ...viewport,
      }}
      onMove={(evt) => setViewport(evt.viewport)}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/aymen01/cl0tpzbru00pd15o88ue7vj24"
      mapboxAccessToken="pk.eyJ1IjoiYXltZW4wMSIsImEiOiJjbDB0bm94NXgwZXdtM2psemJxeGdka3U3In0.LegRjKkiK0c75qRmTUwhmQ"
      onClick={handleAddClick}
    >
      <GeolocateControl />

      <NavigationControl />

      <Marker
        latitude={props.lat || coordination.lat}
        longitude={props.long || coordination.long}
      >
        <Room
          style={{
            fontSize: "40px",
            color: "tomato",
            cursor: "pointer",
          }}
        />
      </Marker>
    </Map>
  );
};

export default MapAddress;
