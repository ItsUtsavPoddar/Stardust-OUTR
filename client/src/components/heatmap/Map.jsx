// import React from "react";
// import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
// import HeatmapLayer from "react-leaflet-heatmap-layer";
// import { geojson } from "./atd";

// class Map extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       lat: 12.9716,
//       lng: 77.5946,
//       zoom: 12,
//       position: [12.9716, 77.5946]
//     };
//   }

//   render() {
//     return (
//       <LeafletMap center={this.state.position} zoom={this.state.zoom}>
//         <HeatmapLayer
//           points={geojson.features}
//           longitudeExtractor={(m) => m.geometry.coordinates[0]}
//           latitudeExtractor={(m) => m.geometry.coordinates[1]}
//           intensityExtractor={(m) => parseFloat(m.geometry.coordinates[1])}
//           max={100}
//           minOpacity={0.2}
//         />

//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
//       </LeafletMap>
//     );
//   }
// }

// export default Map;

import React from 'react'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import HeatmapLayer from "react-leaflet-heatmap-layer-v3/lib/HeatmapLayer";
import { geojson } from "./atd";


import L from 'leaflet';

let hospitalIcon = L.icon({
    iconUrl: "https://www.shareicon.net/data/512x512/2016/08/04/806609_medical_512x512.png",
    iconSize: [25, 25],
    iconAnchor: [15, 15],
    
});

let pharmaIcon = L.icon ({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/8/8115.png",
  iconSize: [25, 25],
  iconAnchor: [15, 15],
})


// L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {

  let hospital = [{x: 20.505, y: 85.10}, {x: 21.0, y: 86.0}]
  let pharmacy = [{x: 19.505, y: 85.10}, {x: 21.0, y: 85.0}]

  

  return (
    <>
    <div className='map-c'>
    <h4 className="text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl pl-40">Heatmap</h4>
    <div className='map d-flex'>

    <MapContainer style={{ width: "60rem", height: "30rem", display: "inline-block", margin: "auto", borderRadius: "10px"}} center={[20.3,85.83]} zoom={8} scrollWheelZoom={true} >

    <HeatmapLayer

          points={geojson.features}
          longitudeExtractor={(m) => m.geometry.coordinates[0]}
          latitudeExtractor={(m) => m.geometry.coordinates[1]}
          intensityExtractor={(m) => parseFloat(m.geometry.coordinates[1])}
          max={100}
          minOpacity={0.2}
        />

  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  />

 
</MapContainer>
    </div>
    {/*<div className="heat-map"><Heat /></div>*/}
    
    </div>
    </>
  )


}

export default Map