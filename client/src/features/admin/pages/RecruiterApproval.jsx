import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import UserTable from "../components/UserTable";

import { adminSidebarMenu } from "../constants/adminSidebarMenu";

import {
  getRecruiters,
  approveRecruiter,
  rejectRecruiter,
} from "../adminThunks";

const RecruiterApprovals = () => {
  const dispatch = useDispatch();

  const { recruiters, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getRecruiters());
  }, [dispatch]);

  const handleApprove = (recruiterId) => {
    dispatch(approveRecruiter(recruiterId));
  };

  const handleReject = (recruiterId) => {
    dispatch(rejectRecruiter(recruiterId));
  };

  const columns = [
    {
      key: "name",
      label: "Recruiter",
      render: (row) => row.user?.name,
    },

    {
      key: "email",
      label: "Email",
      render: (row) => row.user?.email,
    },

    {
      key: "companyName",
      label: "Company",
    },

    {
      key: "companyWebsite",
      label: "Website",
      render: (row) => {
        const website = row.companyWebsite?.startsWith("http")
          ? row.companyWebsite
          : `https://${row.companyWebsite}`;

        return (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="
          text-indigo-600
          hover:text-indigo-800
          hover:underline
        "
          >
            {row.companyWebsite}
          </a>
        );
      },
    },

    {
      key: "designation",
      label: "Designation",
    },

    {
      key: "approvalStatus",
      label: "Status",
      render: (row) => (
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium

            ${
              row.approvalStatus === "approved"
                ? "bg-green-100 text-green-700"
                : row.approvalStatus === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {row.approvalStatus}
        </span>
      ),
    },
  ];

  return (
    <Layout
      sidebarMenu={adminSidebarMenu}
      title="Admin Portal"
      subtitle="Placement Management System"
      navbarTitle="Recruiter Approvals"
      navbarSubtitle="  Approve or reject recruiter registrations."
    >
      <div className="space-y-6">
        {loading ? (
          <Loader text="Loading recruiters..." />
        ) : (
          <UserTable
            columns={columns}
            data={recruiters}
            renderActions={(row) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(row.user._id)}
                  disabled={row.approvalStatus === "approved"}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    bg-green-100
                    text-green-700
                    disabled:opacity-50
                  "
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(row.user._id)}
                  disabled={row.approvalStatus === "rejected"}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    bg-red-100
                    text-red-700
                    disabled:opacity-50
                  "
                >
                  Reject
                </button>
              </div>
            )}
          />
        )}
      </div>
    </Layout>
  );
};

export default RecruiterApprovals;
