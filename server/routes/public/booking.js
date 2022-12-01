// Using enviroment variables to save data from being published online
require("dotenv").config();

const expess = require("express");
const router = expess.Router();
const User = require("../../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../../middleware/fetchuser");
const { Auth } = require("two-step-auth");
const Hospital = require("../../models/Hospital");
const Doctor = require("../../models/Doctor");
const Record = require("../../models/Record");
const Slot = require("../../models/Slot");
const Shift = require("../../models/Shift");

const JWT_SECRET = process.env.JWT_SECRET;

// Route to get hospital info (doesn't require login)
router.route("/").post(fetchuser, async (req, res) => {
  let success = false;

  const data = req.body;

  try {
    // Check if patient exists
    let patient = await User.findById(req.user.id);
    if (!patient) {
      return res.status(400).json({ success, info: "User is invalid!" });
    }

    // Check if doctor exists
    let doctor = await Doctor.findById(data.doctor);
    if (!doctor) {
      return res.status(400).json({ success, info: "Doctor is invalid!" });
    }

    // check if doctor is available for the given time slot
    let shift = await Shift.findById(doctor.shift);

    let startTime = shift.startTime.getUTCHours();
    let endTime = shift.endTime.getUTCHours();
    let slotTime = new Date(data.time).getHours();

    if (
      (slotTime >= startTime && endTime == 0) ||
      (slotTime >= startTime && slotTime < endTime)
    ) {
      // TODO - Book Slot

      // Setting the slot
      let slot = await Slot.create({
        patient: req.user.id,
        doctor: data.doctor,
        time: data.time,
      });

      // Actually setting the data and returning the slip
      let record = await Record.create({
        patient: req.user.id,
        hospital: doctor.hospital,
        doctor: data.doctor,
        reason: data.reason,
        location: data.location,
        datetime: data.time,
        slot: slot,
      });

      let returndata = {
        name: patient.name,
        mobile_no: patient.mobile_no,
        slot: slot,
        doctor: doctor.name,
      };

      success = true;
      return res.json({ success });
    } else {
      return res.status(400).json({ success, info: "Slot not available!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Something Went Wrong!" });
  }
});

router.route("/treated").post(fetchuser, async (req, res) => {
  let success = false;

  const data = req.body;

  try {
    // Check if patient exists
    let patient = await User.findById(req.user);
    if (!patient) {
      return res.status(400).json({ success, info: "User is invalid!" });
    }

    let record = await Record.findById(data.record);
    if (!record) {
      return res.status(400).json({ success, info: "Record is invalid!" });
    }

    await Record.findByIdAndUpdate(data.record, { treated: true });

    success = true;
    return res.json({ success, info: "Treated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Something Went Wrong!" });
  }
});

module.exports = router;
