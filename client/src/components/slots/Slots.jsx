import React from "react";
import './Slots.css'

const Slots = () => {
  return (
    <div className="d-flex">
      <div class="card">
        <div class="card-body slots">
        <button type="button" className="btn btn-light btn-md booked" disabled>12-12-2022</button>
        <button type="button" className="btn btn-light btn-md">13-12-2022</button>
        <button type="button" className="btn btn-light btn-md">14-12-2022</button>
        <button type="button" className="btn btn-light btn-md">15-12-2022</button>
        <button type="button" className="btn btn-light btn-md">16-12-2022</button>
        <button type="button" className="btn btn-light btn-md booked" disabled>17-12-2022</button>
        <button type="button" className="btn btn-light btn-md">18-12-2022</button>
        <button type="button" className="btn btn-light btn-md booked" disabled>19-12-2022</button>
        <button type="button" className="btn btn-light btn-md">20-12-2022</button>
        <button type="button" className="btn btn-light btn-md">21-12-2022</button>
        <button type="button" className="btn btn-light btn-md">22-12-2022</button>
        </div>
        <hr class="dropdown-divider" />
        <div class="card-body slots">
        <button type="button" className="btn btn-light btn-sm booked" disabled>2PM-3PM</button>
        <button type="button" className="btn btn-light btn-sm booked" disabled>3PM-3:15PM</button>
        <button type="button" className="btn btn-light btn-sm booked" disabled>3PM-3:15PM</button>
        <button type="button" className="btn btn-light btn-sm">3PM-3:15PM</button>
        <button type="button" className="btn btn-light btn-sm">3PM-3:15PM</button>
        <button type="button" className="btn btn-light btn-sm booked" disabled>3PM-3:15PM</button>
        </div>
        <div className="book-slot">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Book Slot
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default Slots;
