import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detial = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [leaves, setLeaves] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detial/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(response.data.leave);
        if (response.data.success) {
          console.log("yes");
          setLeaves(response.data.leave);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const updateStatus = async (id,status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,{status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if(response.data.success){
        navigate('/admin-dashboard/leave');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };
  return (
    <>
      {loading ? (
        <div>Loadding ...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Leaves Detials
          </h2>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <img
                className="rounded-full border w-55"
                src={`http://localhost:5000/${leaves.employeeId?.userId?.proflileImage}`}
              ></img>

              <div className="">
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Emp Id:</p>
                    <p className="font-medium">
                      {leaves.employeeId?.employeeId}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Name:</p>
                    <p className="font-medium">
                      {leaves.employeeId?.userId?.name}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Date of Birth:</p>
                    <p className="font-medium">
                      {new Date(leaves.employeeId?.dob).toDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Gender:</p>
                    <p className="font-medium">{leaves.employeeId?.gender}</p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Department:</p>
                    <p className="font-medium">
                      {leaves.employeeId?.department?.dep_name}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Reason:</p>
                    <p className="font-medium">{leaves.reason}</p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Marital Status:</p>
                    <p className="font-medium">
                      {leaves.employeeId?.maritalstatus}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Start Date:</p>
                    <p className="font-medium">
                      {new Date(leaves.startDate).toDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">End Date:</p>
                    <p className="font-medium">
                      {new Date(leaves.endDate).toDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">
                      {leaves.status === "pending" ? "Action" : "Status"}
                    </p>
                    {leaves.status === "pending" ? (
                      <div className="flex space-x-2">
                        <button
                          className="px-2 py-0.5 bg-red-300 hover:bg-red-400 rounded-md"
                          onClick={() => updateStatus(leaves._id, "approved")}
                        >
                          Approved
                        </button>
                        <button
                          className="px-2 py-0.5 bg-red-300 hover:bg-red-400 rounded-md"
                          onClick={() => updateStatus(leaves._id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="font-medium">{leaves.status}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detial;
