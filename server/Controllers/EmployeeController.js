import multer from "multer";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import path from "path/posix";
import Departments from "../models/Department.js";
import { use } from "react";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const AddEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalstatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User Already Registred in emp" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const NewUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      proflileImage: req.file ? req.file.filename : "",
    });

    const SavedUser = await NewUser.save();

    const newEmployee = new Employee({
      userId: SavedUser._id,
      employeeId,
      dob,
      gender,
      maritalstatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();
    return res.status(200).json({ success: true, message: "Employee Created" });
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, message: "not Added Employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Recievid employees From Database" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    let employee;
     employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      if(!employee){
        employee=await Employee.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500)
      .json({ success: false, error: "Not Recievid employees From Database" });
  }
};


const UpdateEmploye = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, maritalstatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      res
        .status(404)
        .json({ success: false, error: "Not Found employees From Database" });
    }

    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "Not User Found From Database" });
    }

    const updateuser = await User.findByIdAndUpdate({_id:employee.userId},{name})
    const updateEmploye = await Employee.findByIdAndUpdate({_id:id},{maritalstatus,designation,department,salary})

    if(!updateuser || !updateEmploye){
        res
      .status(500)
      .json({ success: false, error: "document not found" });
    }
    return res.status(200).json({success:true,message:'Successfully Updated'})

  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Upadate employees From Database" });
  }
};

const fetchEmployeesByDepId = async (req,res)=>{
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Recievid employees by Dep ID From Database" });
  }
}

export { AddEmployee, upload, getEmployees, getEmployee, UpdateEmploye ,fetchEmployeesByDepId};
