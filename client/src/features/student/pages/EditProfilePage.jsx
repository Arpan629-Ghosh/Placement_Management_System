import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import {
  getProfile,
  updateProfile,
  uploadResume,
  uploadProfilePicture,
} from "../studentThunks";

import { Upload, Save, ArrowLeft } from "lucide-react";
import { studentSidebarMenu } from "../constants/SidebarMenu";
import PdfViewerModal from "@/components/ui/PdfViewerModal";
import { optimizePdfFile } from "@/utils/optimizePdfFile";
import { getResumeProxyUrl } from "@/utils/resumeUrl";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.student);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);

  const [formData, setFormData] = useState({
    rollNumber: "",
    contactNumber: "",
    department: "",
    yearOfPassing: "",
    skills: "",
    availabilityStatus: "open",

    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ],

    certifications: [
      {
        title: "",
        issuedBy: "",
        year: "",
      },
    ],
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState("");

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        rollNumber: profile.rollNumber || "",
        contactNumber: profile.contactNumber || "",
        department: profile.department || "",
        yearOfPassing: profile.yearOfPassing || "",
        skills: profile.skills?.join(", ") || "",
        availabilityStatus: profile.availabilityStatus || "open",

        workExperience:
          profile.workExperience?.length > 0
            ? profile.workExperience
            : [
                {
                  company: "",
                  role: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                },
              ],

        certifications:
          profile.certifications?.length > 0
            ? profile.certifications
            : [
                {
                  title: "",
                  issuedBy: "",
                  year: "",
                },
              ],
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!resumeFile) {
      setResumePreviewUrl(
        getResumeProxyUrl(
          profile?.resume?.url || "",
          profile?.resume?.public_id || "",
          profile?.resume?.format || "pdf",
          profile?.resume?.version || "",
        ),
      );
      return;
    }

    const objectUrl = URL.createObjectURL(resumeFile);
    setResumePreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [
    resumeFile,
    profile?.resume?.url,
    profile?.resume?.public_id,
    profile?.resume?.format,
    profile?.resume?.version,
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updated = [...formData.workExperience];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      workExperience: updated,
    }));
  };

  const addWorkExperience = () => {
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

  const removeWorkExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    const updated = [...formData.certifications];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      workExperience: formData.workExperience.filter(
        (item) => item.company || item.role,
      ),

      certifications: formData.certifications.filter((item) => item.title),
    };

    const res = await dispatch(updateProfile(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message || "Profile updated successfully");
      navigate("/student/profile");
    } else {
      toast.error(res.payload?.message || "Failed to update profile");
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;

    const optimizedResume = await optimizePdfFile(resumeFile);

    const formDataObj = new FormData();

    formDataObj.append("resume", optimizedResume);

    const res = await dispatch(uploadResume(formDataObj));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message || "Resume uploaded successfully");
    } else {
      toast.error(res.payload?.message || "Failed to upload resume");
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profileImage) return;

    const formDataObj = new FormData();

    formDataObj.append("profilePicture", profileImage);

    const res = await dispatch(uploadProfilePicture(formDataObj));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success(
        res.payload.message || "Profile picture uploaded successfully",
      );
    } else {
      toast.error(res.payload?.message || "Failed to upload profile picture");
    }
  };

  if (!profile) {
    return (
      <Layout
        sidebarMenu={studentSidebarMenu}
        navbarTitle="Edit Profile"
        navbarSubtitle="Update your profile information"
        userName={profile?.user?.name}
        department={profile?.department}
        profilePicture={profile?.profilePicture?.url}
      >
        <Loader text="Loading Profile..." />
      </Layout>
    );
  }

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Edit Profile"
      navbarSubtitle="Update your profile information"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <PdfViewerModal
        open={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        url={resumePreviewUrl}
        title="Resume Preview"
      />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/student/profile")}
            className="flex items-center gap-2 text-slate-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>

        {/* Profile Picture */}

        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>

          <div className="flex flex-col md:flex-row gap-5 items-center">
            <img
              src={
                profile?.profilePicture?.url ||
                "https://ui-avatars.com/api/?name=Student"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />

              <button
                type="button"
                onClick={handleProfilePictureUpload}
                className="
                  mt-3
                  bg-indigo-600
                  text-white
                  px-5
                  py-2
                  rounded-xl
                "
              >
                {loading ? "Uploading..." : "Upload Picture"}
              </button>
            </div>
          </div>
        </div>

        {/* Resume */}

        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-semibold mb-4">Resume</h2>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            />

            <button
              type="button"
              onClick={handleResumeUpload}
              className="
                bg-indigo-600
                text-white
                px-5
                py-2
                rounded-xl
                flex
                items-center
                gap-2
              "
            >
              <Upload size={18} />
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

            {resumePreviewUrl && (
              <button
                type="button"
                onClick={() => setIsResumePreviewOpen(true)}
                className="
                  bg-slate-100
                  text-slate-700
                  px-5
                  py-2
                  rounded-xl
                  flex
                  items-center
                  gap-2
                "
              >
                Preview Resume
              </button>
            )}
          </div>

          {profile?.resume?.url && (
            <p className="mt-4 text-sm text-slate-500">
              Current resume is available in the preview above.
            </p>
          )}
        </div>

        {/* Profile Form */}

        <form
          onSubmit={handleProfileUpdate}
          className="bg-white rounded-3xl border p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Roll Number</label>

              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
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
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Passing Year</label>

              <input
                type="number"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Skills</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node, Java"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Work Experience</h3>

                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="text-indigo-600 font-medium"
                >
                  + Add Experience
                </button>
              </div>

              <div className="space-y-4">
                {formData.workExperience.map((exp, index) => (
                  <div key={index} className="border rounded-xl p-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "company",
                          e.target.value,
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "role",
                          e.target.value,
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={exp.startDate?.split("T")[0] || ""}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "startDate",
                            e.target.value,
                          )
                        }
                        className="border rounded-xl px-4 py-3"
                      />

                      <input
                        type="date"
                        value={exp.endDate?.split("T")[0] || ""}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "endDate",
                            e.target.value,
                          )
                        }
                        className="border rounded-xl px-4 py-3"
                      />
                    </div>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.currentlyWorking}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "currentlyWorking",
                            e.target.checked,
                          )
                        }
                      />
                      Currently Working Here
                    </label>

                    {formData.workExperience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Certifications</h3>

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
                  <div key={index} className="border rounded-xl p-4 space-y-3">
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
                      className="w-full border rounded-xl px-4 py-3"
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
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                      type="number"
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) =>
                        handleCertificationChange(index, "year", e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
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

          <button
            type="submit"
            disabled={loading}
            className="
              mt-8
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-6
              py-3
              rounded-xl
              flex
              items-center
              gap-2
            "
          >
            <Save size={18} />

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfilePage;
