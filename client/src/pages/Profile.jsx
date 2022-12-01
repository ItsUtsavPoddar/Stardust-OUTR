import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {


  const [pdata, updatepData] = useState({id: "", name: "No Info", email: "No Info", mobile_no: "No Info" })

  const host = process.env.REACT_APP_ADD_SERVER;
  const [search, updateSearch] = useState("");
  const [data, updateData] = useState({success: false, record: [], doctor: [], hospital: []});
  const [hide, updateHide] = useState(true);
  const [found, updateFound] = useState(true);

  const navigate = useNavigate();


  // fetch personal info
  const personal = async () => { 
    let response = await fetch(`${host}/api/public/self/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'auth-token': localStorage.getItem('auth-token')
    }
  });

  const json = await response.json();
  console.log(json)
  if (json.success) {
    updatepData({id: json.user._id, name: json.user.name, email: json.user.email, mobile_no: json.user.mobile_no});
    console.log(pdata)
  } else {
    
  }

}

const handleClick = async (event)=>{

  updateHide(false);
  updateFound(true)

  const response = await fetch(`${host}/api/hospital/patient/getpatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user: pdata.id})
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




useEffect(()=>{
  personal();
},[])




  return (
    <>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24 out">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3 mrg">
            {" "}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">{data.record.length}</p>{" "}
                <p className="text-gray-400">Record</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">{4}</p>{" "}
                <p className="text-gray-400">Doctor</p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="font-bold text-gray-700 text-xl">{1}</p>{" "}
                <p className="text-gray-400">Hospital</p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button onClick= {handleClick} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                View Records
              </button>{" "}
              <button onClick={() => {
                  localStorage.removeItem('auth-token');
                  navigate('/')
                }} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Logout
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700">
              {pdata.name}
            </h1>{" "}{" "}
            <p className="mt-2 text-gray-500">{pdata.email}</p>{" "}
            <p className="mt-2 text-gray-500">{pdata.mobile_no}</p>{" "}
          </div>{" "}
        </div>
      </div>


      {!hide?<img src="./loading.gif" style={{width: "200px", margin: "auto"}}/>:""}
      {!found?<img src="404.png" style={{width: "400px", margin: "auto"}}/>:
      
<div className="overflow-x-auto relative">
    <table className="table-p text-sm text-left text-gray-500 dark:text-gray-400 m-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Doctor
                </th>
                <th scope="col" className="py-3 px-6">
                    Hospital
                </th>
                <th scope="col" className="py-3 px-6">
                    Date
                </th>
                <th scope="col" className="py-3 px-6">
                    Time
                </th>
            </tr>
        </thead>
        <tbody>

            {data.record.map((item, index)=>{
                return ( <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.doctor[index].name}
                </th>
                <td className="py-4 px-6">
                    {data.hospital[index].name}
                </td>
                <td className="py-4 px-6">
                    {item.datetime.toString().split("T")[0]}
                </td>
                <td className="py-4 px-6">
                    {item.datetime.toString().split("T")[1].split(".")[0]}
                </td>
            </tr>)
            })}
           
            
        </tbody>
    </table>
</div>}
    </>
  );
};

export default Profile;
