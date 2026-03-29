import { Schema, mongoose } from "mongoose";

const leaveSchema = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annaul Leave"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Leave = mongoose.model("Leave", leaveSchema);

export { Leave };
