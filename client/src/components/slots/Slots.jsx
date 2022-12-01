import React, {useContext, useState, useEffect} from "react";
import HospitalContext from "../../context/hospitals/hospitalContext";
import './Slots.css'

const Slots = (props) => {


  const count = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];

  const contextHospital = useContext(HospitalContext);
  const { getSlots } = contextHospital;

  const [bookedSlots, updateBookedSlots] = useState([]);
  const [allSlots, updateAllSlots] = useState([[0,0]]);

  // this here is a list of all doctor shifts (slots to be shown);



  useEffect(()=>{
    async function getslots(){
      let promise =  await getSlots(props.id);
      // this here is for all booked slots (slots not to be shown);
      updateBookedSlots(promise.slots);

      promise.doctors.map((item, index)=>{
        let t = [0, 0]
        if(item.shift[0] === '638735d46d63a8bb5211fda9') {
          t = [0, 6];
          updateAllSlots([...allSlots, t])
          console.log(allSlots)
        }
        else if(item.shift[0] === '638735f66d63a8bb5211fdab') {
          t = [6, 12];
          updateAllSlots([...allSlots, t])
        }
        else if(item.shift[0] === '638735ff6d63a8bb5211fdad') {
          t = [12, 18];
          updateAllSlots([...allSlots, t])
        }

        else if(item.shift[0] === '638736076d63a8bb5211fdaf') {
          t = [18, 0];
          updateAllSlots([...allSlots, t])
        }
        
      })

    }
    setInterval (()=>{
      getslots();
    }, 3000)
  },[getSlots])


  return (
    <div className="d-flex">
      <div class="card">
        <div class="card-body slots">
          {count.map((day)=>{
            // Create new Date instance
            var date = new Date()
            // Add a day
            date.setDate(date.getDate() + day)

            return (<button type="button" className="btn btn-light btn-md">{date.toDateString()}</button>)
          })}
        
        </div>
        <hr class="dropdown-divider" />
        <div class="card-body slots">

          {allSlots.map((item, index)=>{
            return (
            <button type="button" className="btn btn-light btn-sm booked" disabled>2PM-3PM</button>
            )
          })}

        
        </div>
        <div className="book-slot">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded">
          Book Slot
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default Slots;
