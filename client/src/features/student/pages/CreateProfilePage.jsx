import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../studentThunks";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";
import { studentSidebarMenu } from "../constants/SidebarMenu";

const CreateProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    rollNumber: "",
    contactNumber: "",
    department: "",
    yearOfPassing: "",
    skills: "",
    availabilityStatus: "open",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    const res = await dispatch(createProfile(payload));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/student/dashboard");
    }
  };

  return (
    <Layout sidebarMenu={studentSidebarMenu}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>

          <p className="text-slate-500 mb-8">
            Fill your details before accessing the dashboard.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block mb-2 font-medium">Roll Number</label>

              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Contact Number</label>

              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Department</label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Year Of Passing</label>

              <input
                type="number"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Skills</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node, Java, SQL"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Availability Status
              </label>

              <select
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="open">Open</option>
                <option value="placed">Placed</option>
                <option value="not_looking">Not Looking</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                {loading ? "Creating Profile..." : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProfilePage;
