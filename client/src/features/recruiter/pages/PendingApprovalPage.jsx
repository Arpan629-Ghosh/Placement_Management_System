import { useSelector } from "react-redux";
import { Clock3, CheckCircle2, XCircle } from "lucide-react";

import Layout from "@/components/common/Layout";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";

const PendingApprovalPage = () => {
  const { profile } = useSelector((state) => state.recruiter);

  const approvalStatus = profile?.approvalStatus || "pending";

  const statusConfig = {
    pending: {
      icon: Clock3,
      title: "Approval Pending",
      description:
        "Your recruiter account is currently under review by the administrator. You will gain access to recruiter features once approved.",
      badgeClass: "bg-yellow-100 text-yellow-700",
      iconClass: "text-yellow-500",
      badgeText: "Pending Review",
    },

    approved: {
      icon: CheckCircle2,
      title: "Account Approved",
      description:
        "Your recruiter account has been approved. You can now access all recruiter features.",
      badgeClass: "bg-green-100 text-green-700",
      iconClass: "text-green-500",
      badgeText: "Approved",
    },

    rejected: {
      icon: XCircle,
      title: "Approval Rejected",
      description:
        "Your recruiter profile was rejected by the administrator. Please update your profile and contact the administrator if necessary.",
      badgeClass: "bg-red-100 text-red-700",
      iconClass: "text-red-500",
      badgeText: "Rejected",
    },
  };

  const currentStatus = statusConfig[approvalStatus];

  const StatusIcon = currentStatus.icon;

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
        <div className="bg-white rounded-3xl border shadow-sm p-10">
          {/* Header */}

          <div className="flex flex-col items-center text-center">
            <StatusIcon
              size={80}
              className={`${currentStatus.iconClass} mb-6`}
            />

            <h1 className="text-3xl font-bold mb-3">{currentStatus.title}</h1>

            <span
              className={`
                px-4 py-2
                rounded-full
                text-sm
                font-semibold
                ${currentStatus.badgeClass}
              `}
            >
              {currentStatus.badgeText}
            </span>

            <p className="text-slate-500 mt-6 max-w-2xl">
              {currentStatus.description}
            </p>
          </div>

          {/* Recruiter Details */}

          <div className="mt-10 border rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">
              Recruiter Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500">Company Name</p>

                <p className="font-medium">{profile?.companyName || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Designation</p>

                <p className="font-medium">{profile?.designation || "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Company Website</p>

                <p className="font-medium break-all">
                  {profile?.companyWebsite || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Contact Number</p>

                <p className="font-medium">{profile?.contactNumber || "-"}</p>
              </div>
            </div>
          </div>

          {/* Message */}

          <div className="mt-8 bg-slate-50 rounded-2xl p-5">
            <p className="text-sm text-slate-600">
              <strong>Note:</strong> Until your account is approved, you won't
              be able to create jobs, manage applications, or schedule
              interviews.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PendingApprovalPage;
