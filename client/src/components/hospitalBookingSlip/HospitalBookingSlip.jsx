import React from "react";
import "./HospitalBookingSlip.css";

const HospitalBookingSlip = () => {

  const {name, mob_no, date, slot, doctor, room} = {name: 'Dhrub Khatry', mob_no: '9929923456', date: '12/12/22', slot: '3PM-3:45PM', doctor: 'Dr. Ayush Kejriwal', room: 'H10-527' }


  return (
    <div className="d-flex medicine">
      <div className="card" style={{ width: "25rem" }}>
        <img
          className="card-img-top"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="Card cap"
        />
        <div className="card-body">
          <h5 className="card-title">Hospital Slip</h5>
         <div className="hospital-slip-info">
          <h6><strong>Name: </strong> {name}</h6>
          <h6><strong>Mobile No: </strong> {mob_no}</h6>
          <h6><strong>Date: </strong> {date}</h6>
          <h6><strong>Slot: </strong> {slot}</h6>
          <h6><strong>Doctor: </strong> {doctor}</h6>
          <h6><strong>Room No: </strong> {room}</h6>
         </div>
          <button className="btn btn-dark">PRINT</button>
        </div>
      </div>
    </div>
  );
};

export default HospitalBookingSlip;
