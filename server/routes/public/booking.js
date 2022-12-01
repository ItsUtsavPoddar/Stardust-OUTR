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
    let hospital = await Hospital.findById(data.hospital);
    if (!hospital) {
      return res.status(400).json({ success, info: "Hospital is invalid!" });
    }

    // find doctor 
    let doctors = await Doctor.find({hospital: data.hospital});

    var doc = Math.floor(Math.random() * Object.keys(doctors).length);

    
      // TODO - Book Slot

      // Setting the slot
      let slot = await Slot.create({
        patient: req.user.id,
        doctor: doctors[doc],
        time: data.time,
      });

      // Actually setting the data and returning the slip
      let record = await Record.create({
        patient: req.user.id,
        hospital: data.hospital,
        doctor: doctors[doc],
        reason: data.reason,
        location: data.location,
        datetime: data.time,
        slot: slot,
      });

      let returndata = {
        name: patient.name,
        mobile_no: patient.mobile_no,
        slot: slot,
        doctor: doctors[doc].name,
      };

      success = true;
      return res.json({ success });
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
