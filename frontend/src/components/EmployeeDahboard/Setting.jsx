import React, { useState } from "react";
import { userAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = userAuth();
  const [setting, setSettings] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChagne = (e) => {
    const { name, value } = e.target;
    setSettings({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not Matched");
      console.log(setting.newPassword + "  " + setting.confirmPassword);
    } else {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${token})}`,
            },
          },
        );

        if(response.data.success){
          console.log('done')
              navigate("/employee-dashboard");
            
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log(error.response.data.error);
        }
      }
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <p className="text-red-500">{error}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="old Password"
              onChange={handleChagne}
              className="mt-1 w-full p-2 border border-gray-600 rounded-md"
            />
          </div>
          {/* newPassword */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="new Password"
              onChange={handleChagne}
              className="mt-1 w-full p-2 border border-gray-600 rounded-md"
            />
          </div>
          {/* ConfirmPassword */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm Password"
              onChange={handleChagne}
              className="mt-1 w-full p-2 border border-gray-600 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
