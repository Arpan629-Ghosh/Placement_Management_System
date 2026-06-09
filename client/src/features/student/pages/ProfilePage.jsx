import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { getProfile } from "../studentThunks";

import {
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Pencil,
} from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.student);

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  if (loading || !profile) {
    return (
      <Layout>
        <Loader text="Loading Profile..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}

        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={
                  profile?.profilePicture?.url ||
                  "https://ui-avatars.com/api/?name=Student"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border"
              />

              <div>
                <h1 className="text-3xl font-bold">{profile?.user?.name}</h1>

                <p className="text-slate-500 mt-1">{profile?.department}</p>

                <div className="mt-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${
                        profile.availabilityStatus === "open"
                          ? "bg-green-100 text-green-700"
                          : profile.availabilityStatus === "placed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                      }
                    `}
                  >
                    {profile.availabilityStatus}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/student/profile/edit")}
              className="
                flex items-center gap-2
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-5 py-3
                rounded-xl
                font-medium
              "
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Section */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}

          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}

            <div className="bg-white rounded-3xl border p-6">
              <h2 className="text-xl font-semibold mb-5">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex gap-3">
                  <Mail className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Email</p>

                    <p>{profile?.user?.email}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Contact Number</p>

                    <p>{profile.contactNumber}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <GraduationCap className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Roll Number</p>

                    <p>{profile.rollNumber}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <GraduationCap className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Passing Year</p>

                    <p>{profile.yearOfPassing}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}

            <div className="bg-white rounded-3xl border p-6">
              <h2 className="text-xl font-semibold mb-5">Skills</h2>

              <div className="flex flex-wrap gap-3">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                        px-4 py-2
                        bg-indigo-50
                        text-indigo-700
                        rounded-full
                        text-sm
                        font-medium
                      "
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-500">No skills added.</p>
                )}
              </div>
            </div>

            {/* Work Experience */}

            <div className="bg-white rounded-3xl border p-6">
              <h2 className="text-xl font-semibold mb-5">Work Experience</h2>

              {profile.workExperience?.length > 0 ? (
                <div className="space-y-4">
                  {profile.workExperience.map((exp, index) => (
                    <div key={index} className="border rounded-xl p-4">
                      <div className="flex gap-2 items-center">
                        <Briefcase size={18} />

                        <h3 className="font-semibold">{exp.role}</h3>
                      </div>

                      <p className="text-slate-600 mt-1">{exp.company}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No work experience added.</p>
              )}
            </div>

            {/* Certifications */}

            <div className="bg-white rounded-3xl border p-6">
              <h2 className="text-xl font-semibold mb-5">Certifications</h2>

              {profile.certifications?.length > 0 ? (
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="border rounded-xl p-4">
                      <div className="flex gap-2 items-center">
                        <Award size={18} />

                        <h3 className="font-semibold">{cert.title}</h3>
                      </div>

                      <p className="text-slate-600 mt-1">{cert.issuedBy}</p>

                      <p className="text-sm text-slate-400">{cert.year}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No certifications added.</p>
              )}
            </div>
          </div>

          {/* Right */}

          <div>
            <div className="bg-white rounded-3xl border p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-5">Resume</h2>

              {profile?.resume?.url ? (
                <a
                  href={profile.resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex items-center justify-center gap-2
                    w-full
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-3
                    rounded-xl
                  "
                >
                  <FileText size={18} />
                  View Resume
                </a>
              ) : (
                <div
                  className="
                    border-2 border-dashed
                    rounded-xl
                    p-6
                    text-center
                    text-slate-500
                  "
                >
                  Resume not uploaded
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
