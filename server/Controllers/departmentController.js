import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Recievid From Database" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const new_Dep = new Department({
      dep_name,
      description,
    });
    await new_Dep.save();
    return res.status(200).json({ success: true, department: new_Dep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "adding Department Faild" });
  }
};

const getDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Recievid From Database" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      },
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Updated From Database" });
  }
};

const delteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteDep = await Department.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, DeleteDep });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Not Deleted From Database" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  delteDepartment,
};
