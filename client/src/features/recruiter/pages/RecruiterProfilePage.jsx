import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Mail,
  Phone,
  Globe,
  Pencil,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";
import { getRecruiterProfile } from "../recruiterThunks";

const RecruiterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.recruiter);

  useEffect(() => {
    if (!profile) {
      dispatch(getRecruiterProfile());
    }
  }, [dispatch, profile]);

  if (loading || !profile) {
    return (
      <Layout sidebarMenu={recruiterSidebarMenu}>
        <Loader text="Loading Profile..." />
      </Layout>
    );
  }

  const getStatusConfig = () => {
    switch (profile.approvalStatus) {
      case "approved":
        return {
          icon: CheckCircle2,
          badge: "bg-green-100 text-green-700",
          text: "Approved",
        };

      case "rejected":
        return {
          icon: XCircle,
          badge: "bg-red-100 text-red-700",
          text: "Rejected",
        };

      default:
        return {
          icon: Clock3,
          badge: "bg-yellow-100 text-yellow-700",
          text: "Pending",
        };
    }
  };

  const status = getStatusConfig();

  const StatusIcon = status.icon;

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Recruiter Dashboard"
      navbarSubtitle="Manage jobs and candidates"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {profile?.companyLogo?.url ? (
                <img
                  src={profile.companyLogo.url}
                  alt="Company Logo"
                  className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    border
                  "
                />
              ) : (
                <div
                  className="
                    w-28
                    h-28
                    rounded-full
                    bg-indigo-600
                    flex
                    items-center
                    justify-center
                    text-white
                    text-4xl
                    font-bold
                  "
                >
                  {profile.companyName?.charAt(0)?.toUpperCase()}
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold">{profile.user?.name}</h1>

                <p className="text-slate-500 mt-1">{profile.companyName}</p>

                <div className="mt-3">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      inline-flex
                      items-center
                      gap-2
                      ${status.badge}
                    `}
                  >
                    <StatusIcon size={16} />
                    {status.text}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/recruiter/profile/edit")}
              className="
                flex
                items-center
                gap-2
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
              "
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Information */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border p-6">
              <h2 className="text-xl font-semibold mb-6">
                Company Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <Mail className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Email</p>

                    <p>{profile.user?.email}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Contact Number</p>

                    <p>{profile.contactNumber || "-"}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Building2 className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Designation</p>

                    <p>{profile.designation}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Globe className="text-indigo-600" />

                  <div>
                    <p className="text-sm text-slate-500">Website</p>

                    <a
                      href={profile.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-indigo-600
                        hover:underline
                      "
                    >
                      {profile.companyWebsite || "Not Provided"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}

          <div>
            <div className="bg-white rounded-3xl border p-6">
              <h2 className="text-xl font-semibold mb-5">Approval Status</h2>

              <div
                className={`
                  p-4
                  rounded-2xl
                  ${status.badge}
                `}
              >
                <div className="flex items-center gap-3">
                  <StatusIcon size={22} />

                  <div>
                    <p className="font-semibold">{status.text}</p>

                    <p className="text-sm">
                      {profile.approvalStatus === "approved"
                        ? "Admin verified company profile"
                        : profile.approvalStatus === "rejected"
                          ? "Profile rejected by admin"
                          : "Awaiting admin approval"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterProfilePage;
