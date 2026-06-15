import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Building2,
  Globe,
  Phone,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";
import { getRecruiterProfile } from "../recruiterThunks";

const RecruiterDashboard = () => {
  const dispatch = useDispatch();

  const { profile, dashboardLoading } = useSelector((state) => state.recruiter);

  useEffect(() => {
    if (!profile) {
      dispatch(getRecruiterProfile());
    }
  }, [dispatch, profile]);

  if (dashboardLoading || !profile) {
    return (
      <Layout sidebarMenu={recruiterSidebarMenu}>
        <Loader text="Loading Dashboard..." />
      </Layout>
    );
  }

  const getStatusConfig = () => {
    switch (profile.approvalStatus) {
      case "approved":
        return {
          icon: CheckCircle2,
          badgeColor: "bg-green-100 text-green-700",
          title: "Approved",
          description:
            "Your recruiter account has been approved by the administrator.",
        };

      case "rejected":
        return {
          icon: XCircle,
          badgeColor: "bg-red-100 text-red-700",
          title: "Rejected",
          description:
            "Your recruiter account was rejected by the administrator.",
        };

      default:
        return {
          icon: Clock3,
          badgeColor: "bg-yellow-100 text-yellow-700",
          title: "Pending Approval",
          description: "Your recruiter account is currently under review.",
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
      <div className="space-y-8">
        {/* Header */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-8
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome Back, {profile?.user?.name}
              </h1>

              <p className="text-slate-500 mt-2">
                Manage your company profile and recruitment activities.
              </p>
            </div>

            {profile?.companyLogo?.url ? (
              <img
                src={profile.companyLogo.url}
                alt="Company Logo"
                className="
                  h-16
                  w-16
                  rounded-full
                  object-cover
                  border
                "
              />
            ) : (
              <div
                className="
                  h-16
                  w-16
                  rounded-full
                  bg-indigo-600
                  flex
                  items-center
                  justify-center
                  text-white
                  text-2xl
                  font-bold
                "
              >
                {profile?.companyName?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Approval Status */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-6
          "
        >
          <h2 className="text-xl font-semibold mb-5">Approval Status</h2>

          <div
            className={`
              flex
              items-center
              gap-4
              p-5
              rounded-2xl
              ${status.badgeColor}
            `}
          >
            <StatusIcon size={28} />

            <div>
              <h3 className="font-semibold text-lg">{status.title}</h3>

              <p className="text-sm">{status.description}</p>
            </div>
          </div>
        </div>

        {/* Company Information */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-6
          "
        >
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <Building2 className="text-indigo-600" />

              <div>
                <p className="text-sm text-slate-500">Company Name</p>

                <p className="font-medium">{profile.companyName}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="text-indigo-600" />

              <div>
                <p className="text-sm text-slate-500">Contact Number</p>

                <p className="font-medium">{profile.contactNumber || "-"}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Building2 className="text-indigo-600" />

              <div>
                <p className="text-sm text-slate-500">Designation</p>

                <p className="font-medium">{profile.designation}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Globe className="text-indigo-600" />

              <div>
                <p className="text-sm text-slate-500">Website</p>

                <p className="font-medium break-all">
                  {profile.companyWebsite || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-6
          "
        >
          <h2 className="text-xl font-semibold mb-3">Upcoming Features</h2>

          <div className="space-y-3 text-slate-600">
            <p>• Job Management</p>
            <p>• Candidate Applications</p>
            <p>• Interview Scheduling</p>
            <p>• Recruitment Analytics</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
