import { populate } from "dotenv";
import Employee from "../models/Employee.js";
import { Leave } from "../models/Leave.js";

const getLeaveDetial = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name, proflileImage" },
      ],
    });

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Not Received All Leaves From Database",
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Not Received All Leaves From Database",
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ userId: id });
    const leave = await Leave.find({ employeeId: employee._id });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Recievid leave From Database" });
  }
};

//---------------------

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employeeid = await Employee.findOne({ userId });
    const newLeave = new Leave({
      employeeId: employeeid._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({
      success: true,
      message: "Leave added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status },
    );

    if (!leave) {
      res.status(404).json({ success: false, message: "not updated status" });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { addLeave, getLeaves, getAllLeaves, getLeaveDetial, updateLeave };
