import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { adminSidebarMenu } from "../constants/adminSidebarMenu";

import { getUsers, updateUserStatus } from "../adminThunks";

import UserTable from "../components/UserTable";
import { toast } from "react-toastify";

const UserManagementPage = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchRole = !roleFilter || user.role === roleFilter;

      const matchStatus = !statusFilter || user.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const handleStatusChange = async (userId, status) => {
    setActionLoading(userId);

    const res = await dispatch(
      updateUserStatus({
        userId,
        status,
      }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message || "User status updated successfully!");
    } else {
      toast.error(
        res.payload?.message ||
          "Failed to update user status. Please try again later.",
      );
    }

    setActionLoading(null);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs
          ${
            row.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <Layout
      sidebarMenu={adminSidebarMenu}
      title="Admin Portal"
      subtitle="Placement Management System"
      navbarTitle="User Management"
      navbarSubtitle="Manage student and recruiter existence."
      userName="Admin"
      department="Placement Cell"
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-2xl border flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-2"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-xl px-4 py-2"
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {loading ? (
          <Loader text="Loading users..." />
        ) : (
          <UserTable
            columns={columns}
            data={filteredUsers}
            renderActions={(row) => (
              <button
                onClick={() =>
                  handleStatusChange(
                    row._id,
                    row.status === "active" ? "blocked" : "active",
                  )
                }
                disabled={actionLoading === row._id}
                className={`
      px-3
      py-2
      rounded-lg
      disabled:opacity-50
      ${
        row.status === "active"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }
    `}
              >
                {actionLoading === row._id
                  ? row.status === "active"
                    ? "Blocking..."
                    : "Activating..."
                  : row.status === "active"
                    ? "Block"
                    : "Activate"}
              </button>
            )}
          />
        )}
      </div>
    </Layout>
  );
};

export default UserManagementPage;
