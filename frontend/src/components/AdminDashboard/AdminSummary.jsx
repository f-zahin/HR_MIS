import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWaveAlt,
  FaMoneyCheckAlt,
  FaTimesCircle,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Summary Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employee"
          number={4}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={4}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWaveAlt />}
          text="Monthly Salary"
          number={4}
          color="bg-red-600"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Detials</h4>
        <div className="grid grid-colos-1 md:grid-cols-2 gap-6 mt-6">
    <SummaryCard icon={<FaFileAlt/>} text={'Leave Applied'} number={5} color="bg-teal-600"/>
    <SummaryCard icon={<FaCheckCircle/>} text={'Leave Approved'} number={3} color="bg-green-600"/>
    <SummaryCard icon={<FaHourglassHalf/>} text={'Leave Pending'} number={5} color="bg-yellow-600"/>
    <SummaryCard icon={<FaTimesCircle/>} text={'Leave Reajected'} number={5} color="bg-red-600"/>
       
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
