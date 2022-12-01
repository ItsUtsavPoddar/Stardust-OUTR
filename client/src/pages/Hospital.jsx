import React from 'react'
import PatientID from '../components/patientid/PatientID'

const Hospital = () => {
  return (
    <div>
        <PatientID />
        <div className=''>
            <h1 className='text-4xl tracking-tight font-extrabold text-black text-left sm:text-3xl md:text-4xl'>Active Orders</h1>
        </div>
    </div>
  )
}

export default Hospital