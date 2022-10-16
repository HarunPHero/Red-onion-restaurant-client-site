import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFtdW43MzkiLCJhIjoiY2w0ZWRyYnN1MDJrNTNicGc2MWlmemM3OCJ9.FyJx3n9L4SiJBacUvsKVQA";
const Mapboxgl = () => {
   useEffect(()=>{
    const map = new mapboxgl.Map({
      container: "map",
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/streets-v11",
      center: [88.636794, 25.626777],
      zoom: 15
    });
  
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({
      color:"#ff476b"
    })
      .setLngLat([88.636794, 25.626777])
      .addTo(map);
  
  },[])
  return (
    <div>
      <div  className="shadow-5xl mt-10 rounded-lg ..." id="map"></div>
    </div>
  );
};

export default Mapboxgl;
