import React, {a, useState} from "react";
import "./Medicine.css";

const Medicine = () => {

  let centersArray = ['Khatry Nagar, 751030', 'Aryan Nagar, 751019']
  let medicines = [{name: 'Atorvastatin', strength: '500mg', dose: '20'}, {name: 'Levothyroxine', strength: '300mg', dose: '10'}, {name: 'Metformin', strength: '60mg', dose: '20'},]

  const [SelectedItem, updateSelectedItem] = useState("Select Center");

  function handleCenter(){
    updateSelectedItem("Khatry");
  }

  return (
    <div className="d-flex medicine">
      <div className="card" style={{ width: "60%" }}>
        <div className="card-body">
          <h5 className="card-title">Book Medicine</h5>
          <div className="medicine-center">
            <div className="nav-item dropdown">
          <a className="btn btn-secondary dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {SelectedItem}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {centersArray.map((item)=>{
              return <li><span className="dropdown-item" onClick={handleCenter}>{item}</span></li>
            })}
  
          </ul>
        </div>
          </div>
          <hr className="dropdown-divider" />
          <div className="book-medicine">
            <table className="table">
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
          </div>
          <button className="btn btn-dark">CONFIRM</button>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
