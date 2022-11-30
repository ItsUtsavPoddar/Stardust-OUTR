import React from "react";
import "./MedicineSlip.css";

const MedicineSlip = () => {

  let medicines = [{name: 'Atorvastatin', strength: '500mg', dose: '20'}, {name: 'Levothyroxine', strength: '300mg', dose: '10'}, {name: 'Metformin', strength: '60mg', dose: '20'},]


  return (
    <div className="d-flex medicine">
      <div className="card" style={{ width: "25rem" }}>
        <img
          className="card-img-top"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="Card cap"
        />
        <div className="card-body">
          <h5 className="card-title">Medicine Slip</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Strength</th>
                <th scope="col">Dose</th>
              </tr>
            </thead>
            <tbody>

              {medicines.map((item, index)=>{
                return (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{item.name}</td>
                  <td>{item.strength}</td>
                  <td>{item.dose}</td>
                </tr>
                )
              })}
              
            
            </tbody>
          </table>
          <button className="btn btn-dark">PRINT</button>
        </div>
      </div>
    </div>
  );
};

export default MedicineSlip;
