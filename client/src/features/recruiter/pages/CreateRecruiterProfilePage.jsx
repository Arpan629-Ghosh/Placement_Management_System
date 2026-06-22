import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";
import { createRecruiterProfile } from "../recruiterThunks";
import { toast } from "react-toastify";

const CreateRecruiterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileLoading } = useSelector((state) => state.recruiter);

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    designation: "",
    contactNumber: "",
    companyLogo: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      companyLogo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("companyName", formData.companyName);
    payload.append("companyWebsite", formData.companyWebsite);
    payload.append("designation", formData.designation);
    payload.append("contactNumber", formData.contactNumber);

    if (formData.companyLogo) {
      payload.append("companyLogo", formData.companyLogo);
    }

    const res = await dispatch(createRecruiterProfile(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(
        res.payload.message ||
          "Recruiter profile created successfully! Awaiting admin approval.",
      );
      navigate("/recruiter/pending-approval");
    } else {
      toast.error(
        res.payload?.message ||
          "Failed to create profile. Please try again later.",
      );
    }
  };

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Profile Setup"
      navbarSubtitle="Complete your recruiter profile to access all features"
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

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Company Logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="
      w-full
      border
      rounded-xl
      px-4
      py-3
    "
              />
            </div>

            {/* Submit */}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={profileLoading}
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
                {profileLoading
                  ? "Creating Profile..."
                  : "Create Recruiter Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRecruiterProfilePage;
