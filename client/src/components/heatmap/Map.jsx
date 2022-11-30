import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "../node_modules/leaflet/dist/leaflet.css";

import HeatmapLayer from "react-leaflet-heatmap-layer";
import { geojson } from "./atd";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 12.9716,
      lng: 77.5946,
      zoom: 12,
      position: [12.9716, 77.5946]
    };
  }

  render() {
    return (
      <LeafletMap center={this.state.position} zoom={this.state.zoom}>
        <HeatmapLayer
          points={geojson.features}
          longitudeExtractor={(m) => m.geometry.coordinates[0]}
          latitudeExtractor={(m) => m.geometry.coordinates[1]}
          intensityExtractor={(m) => parseFloat(m.geometry.coordinates[1])}
          max={100}
          minOpacity={0.2}
        />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    );
  }
}

export default Map;