import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";

import { createProfile } from "../studentThunks";
import { studentSidebarMenu } from "../constants/SidebarMenu";
import { toast } from "react-toastify";

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

    certifications: [
      {
        title: "",
        issuedBy: "",
        year: "",
      },
    ],

    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ],
  });

  // ===================================================
  // BASIC FIELDS
  // ===================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================================
  // CERTIFICATIONS
  // ===================================================

  const handleCertificationChange = (index, field, value) => {
    const updated = [...formData.certifications];

    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      certifications: updated,
    }));
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          title: "",
          issuedBy: "",
          year: "",
        },
      ],
    }));
  };

  const removeCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // ===================================================
  // WORK EXPERIENCE
  // ===================================================

  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.workExperience];

    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      workExperience: updated,
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      yearOfPassing: Number(formData.yearOfPassing),

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      certifications: formData.certifications.filter(
        (cert) => cert.title.trim() !== "",
      ),

      workExperience: formData.workExperience.filter(
        (exp) => exp.company.trim() !== "",
      ),
    };

    const res = await dispatch(createProfile(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message || "Profile created successfully");
      navigate("/student/dashboard");
    } else {
      toast.error(res.payload?.message || "Failed to create profile");
    }
  };

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Create Profile"
      navbarSubtitle="Create profile to access the dashboard"
      userName="Student"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>

          <p className="text-slate-500 mb-8">
            Fill your details before accessing the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ================================================= */}
            {/* BASIC INFO */}
            {/* ================================================= */}

            <div>
              <h2 className="text-xl font-semibold mb-5">Basic Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
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
                  <label className="block mb-2 font-medium">
                    Contact Number
                  </label>

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
                  <label className="block mb-2 font-medium">
                    Year Of Passing
                  </label>

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
                    placeholder="React, Node, Java, Spring Boot"
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
              </div>
            </div>

            {/* ================================================= */}
            {/* CERTIFICATIONS */}
            {/* ================================================= */}

            <div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Certifications</h2>

                <button
                  type="button"
                  onClick={addCertification}
                  className="text-indigo-600 font-medium"
                >
                  + Add Certification
                </button>
              </div>

              <div className="space-y-4">
                {formData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-5 grid md:grid-cols-3 gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Certification Title"
                      value={cert.title}
                      onChange={(e) =>
                        handleCertificationChange(
                          index,
                          "title",
                          e.target.value,
                        )
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    <input
                      type="text"
                      placeholder="Issued By"
                      value={cert.issuedBy}
                      onChange={(e) =>
                        handleCertificationChange(
                          index,
                          "issuedBy",
                          e.target.value,
                        )
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    <input
                      type="number"
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) =>
                        handleCertificationChange(index, "year", e.target.value)
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* EXPERIENCE */}
            {/* ================================================= */}

            <div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Work Experience</h2>

                <button
                  type="button"
                  onClick={addExperience}
                  className="text-indigo-600 font-medium"
                >
                  + Add Experience
                </button>
              </div>

              <div className="space-y-5">
                {formData.workExperience.map((exp, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-5 grid md:grid-cols-2 gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(index, "company", e.target.value)
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        handleExperienceChange(index, "role", e.target.value)
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    <input
                      type="date"
                      value={exp.endDate}
                      disabled={exp.currentlyWorking}
                      onChange={(e) =>
                        handleExperienceChange(index, "endDate", e.target.value)
                      }
                      className="border rounded-xl px-4 py-3"
                    />

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={exp.currentlyWorking}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "currentlyWorking",
                            e.target.checked,
                          )
                        }
                      />
                      Currently Working
                    </label>

                    {formData.workExperience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* SUBMIT */}
            {/* ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                py-4
                rounded-xl
                font-semibold
              "
            >
              {loading ? "Creating Profile..." : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProfilePage;
