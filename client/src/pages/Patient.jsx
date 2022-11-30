import React from 'react'
import Map from '../components/heatmap/Map'
import Slots from '../components/slots/Slots';
import MedicineSlip from '../components/medicineSlip/MedicineSlip';
import HospitalBookingSlip from '../components/hospitalBookingSlip/HospitalBookingSlip';
import Medicine from '../components/medicine/Medicine';

const Patient = () => {
  return (
    <div>
        <Map />
        <Slots />
        <MedicineSlip />
        <HospitalBookingSlip />
        <Medicine />
    </div>
  )
}

export default Patient