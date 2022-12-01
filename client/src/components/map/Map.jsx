import React, { useContext, useEffect, useState } from 'react'
import './Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import HospitalContext from '../../context/hospitals/hospitalContext';
import Slots from '../slots/Slots';

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

  let pharmacy = [{x: 19.505, y: 85.10}, {x: 21.0, y: 85.0}]

  const contextHospital = useContext(HospitalContext);
  const { fetchHospitals } = contextHospital;

  // State for hospitals
  const [hospital, updateHospital] = useState([])

  // State for selected Hospital
  const [selectedHospital, updateSelectedHospital] = useState({hos: "", index: 0});

  useEffect( ()=>{
    async function gethosp(){
      let hosp =  await fetchHospitals();
      updateHospital(hosp);
    }
    gethosp();
  },[fetchHospitals])


  return (
    <>
    <div className='map-c'>
    <div className='map d-flex'>

    <MapContainer style={{ width: "60rem", height: "30rem", display: "inline-block", margin: "auto", borderRadius: "10px"}} center={[20.283185644116134, 85.80019968614499]} zoom={13} scrollWheelZoom={false} >

  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  />


  {hospital.map((item, index)=>{
    return (
    <Marker position={item.location} icon= {hospitalIcon} 
    eventHandlers={{
      click: (e) => {
        updateSelectedHospital({hos: item._id, index: index});
      },
    }}>
      <Popup>
        {item.name}<br />
      </Popup>
    </Marker>)
  })}


  {pharmacy.map((item)=>{
    return (
    <Marker position={[item.x, item.y]} icon= {pharmaIcon}>
      <Popup>
        Laude Ka Hospital <br />
      </Popup>
    </Marker>)
  })}
 
</MapContainer>
    </div>
    {/*<div className="heat-map"><Heat /></div>*/}
    
    </div>

    {(selectedHospital.hos==="")?"":<Slots id={selectedHospital.hos} key={selectedHospital.index} />}
    </>
  )


}

export default Map