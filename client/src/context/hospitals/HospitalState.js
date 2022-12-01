import React, { useState, useContext } from "react";
import HospitalContext from "./hospitalContext";

const HospitalState = (props) => {
  const host = process.env.REACT_APP_ADD_SERVER;

    // This is for Alert Context
   // const contextAlert = useContext(AlertContext);
   // const { updateAlert } = contextAlert;

  const [hospitals, setHospitals] = useState([]);

  // Set Alert
  const updateHospitals = (id)=> {
    setHospitals(id);
  };

  const fetchHospitals = async ()=>{
      const response = await fetch(`${host}/api/public/hospitals/gethospitals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const json = await response.json();
      if (json.success) {
        //updateAlert('Person Deleted!', "success");
        // setting hospitals as state
        return json.hospitals;

      } else {
        //updateAlert(json.error, "danger");
        let arr = [];
        return arr;
      }
  }

  const getSlots = async (id)=>{
    const response = await fetch(`${host}/api/public/hospitals/getslots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({hospital: id})
      });
  
      const json = await response.json();
      if (json.success) {
        //updateAlert('Person Deleted!', "success");
        // setting hospitals as state
        return json;

      } else {
        //updateAlert(json.error, "danger");
        let arr = [];
        return arr;
      }
  }

  return (
    <HospitalContext.Provider value={{ hospitals, fetchHospitals, getSlots}}>
      {props.children}
    </HospitalContext.Provider>
  );
};

export default HospitalState;