import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";
import { createRecruiterProfile } from "../recruiterThunks";

const CreateRecruiterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.recruiter);

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    designation: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(createRecruiterProfile(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/recruiter/pending-approval");
    }
  };

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Recruiter Dashboard"
      navbarSubtitle="Manage jobs and candidates"
      userName="Recruiter"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-2">
            Complete Recruiter Profile
          </h1>

          <p className="text-slate-500 mb-8">
            Fill your company information before accessing recruiter features.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Company Name */}

            <div>
              <label className="block mb-2 font-medium">Company Name</label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Google"
                required
              />
            </div>

            {/* Designation */}

            <div>
              <label className="block mb-2 font-medium">Designation</label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="HR Manager"
                required
              />
            </div>

            {/* Website */}

            <div>
              <label className="block mb-2 font-medium">Company Website</label>

              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="https://company.com"
              />
            </div>

            {/* Contact */}

            <div>
              <label className="block mb-2 font-medium">Contact Number</label>

              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="9876543210"
              />
            </div>

            {/* Submit */}

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
                {loading ? "Creating Profile..." : "Create Recruiter Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRecruiterProfilePage;
