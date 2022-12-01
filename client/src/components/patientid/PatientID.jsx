import React from "react";
import { useState } from "react";
import './pid.css'

const PatientID = () => {
    const host = process.env.REACT_APP_ADD_SERVER;
    const [search, updateSearch] = useState("");
    const [data, updateData] = useState({success: false, record: [], doctor: [], hospital: []});
    const [hide, updateHide] = useState(true);
    const [found, updateFound] = useState(true);


    const handleChange = (event) => {
        let value = event.target.value;
        updateSearch(value);
      };

    const handleClick = async (event)=>{

        updateHide(false);
        updateFound(true)

        const response = await fetch(`${host}/api/hospital/patient/getpatient`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({user: search})
          });
      
          const json = await response.json();
          console.log(json)
          if (json.success) {
            updateData(json);
            updateHide(true)
          } else {
            updateFound(false)
            updateHide(true)
          }

    }


  return (

    <div>
      <h4 className="text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl pl-20">
        Get Patient Records
      </h4>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96 stretch">
          <div className="input-group relative flex  items-stretch w-full mb-4">
            <input
              type="input"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search Patient"
              aria-label="Search"
              aria-describedby="button-addon2"
              name="search"
              value ={search}
              onChange={handleChange}
            />
            <button
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
              onClick={handleClick}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {!hide?<img src="./loading.gif" style={{width: "200px", margin: "auto"}}/>:""}
      {!found?<img src="404.png" style={{width: "400px", margin: "auto"}}/>:
      
<div class="overflow-x-auto relative">
    <table class="table-p text-sm text-left text-gray-500 dark:text-gray-400 m-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Doctor
                </th>
                <th scope="col" class="py-3 px-6">
                    Hospital
                </th>
                <th scope="col" class="py-3 px-6">
                    Date
                </th>
                <th scope="col" class="py-3 px-6">
                    Time
                </th>
            </tr>
        </thead>
        <tbody>

            {data.record.map((item, index)=>{
                return ( <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.doctor[index].name}
                </th>
                <td class="py-4 px-6">
                    {data.hospital[index].name}
                </td>
                <td class="py-4 px-6">
                    {item.datetime.toString().split("T")[0]}
                </td>
                <td class="py-4 px-6">
                    {item.datetime.toString().split("T")[1].split(".")[0]}
                </td>
            </tr>)
            })}
           
            
        </tbody>
    </table>
</div>

      
      }
    </div>
  );
};

export default PatientID;
