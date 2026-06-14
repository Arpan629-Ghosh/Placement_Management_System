import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";
import {
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../recruiterThunks";

const EditRecruiterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.recruiter);

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    designation: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (!profile) {
      dispatch(getRecruiterProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName || "",
        companyWebsite: profile.companyWebsite || "",
        designation: profile.designation || "",
        contactNumber: profile.contactNumber || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(updateRecruiterProfile(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/recruiter/profile");
    }
  };

  if (loading && !profile) {
    return (
      <Layout
        sidebarMenu={recruiterSidebarMenu}
        navbarTitle="Recruiter Dashboard"
        navbarSubtitle="Manage jobs and candidates"
        userName={profile?.user?.name}
        department={profile?.companyName}
        profilePicture={profile?.companyLogo?.url}
      >
        <Loader text="Loading Profile..." />
      </Layout>
    );
  }

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Recruiter Dashboard"
      navbarSubtitle="Manage jobs and candidates"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-2">Edit Recruiter Profile</h1>

          <p className="text-slate-500 mb-8">
            Update your recruiter information.
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

            {/* Contact Number */}

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
                {loading ? "Updating Profile..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditRecruiterProfilePage;
