import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import {
  getNotifications,
  markNotificationRead,
} from "../../notifications/notificationThunks";

import EmptyNotifications from "../../notifications/components/EmptyNotifications";

import { studentSidebarMenu } from "@/features/student/constants/SidebarMenu";
import NotificationItem from "../../notifications/components/NotificationItem";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications, loading } = useSelector((state) => state.notification);

  const { profile } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      dispatch(markNotificationRead(notification._id));
    }

    switch (notification.type) {
      case "application":
      case "interview":
        navigate(`/student/applications/${notification.meta?.applicationId}`);
        break;

      case "job":
        navigate(`/student/jobs/${notification.meta?.jobId}`);
        break;

      default:
        break;
    }
  };

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Notifications"
      navbarSubtitle="Stay updated"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <div className="bg-white rounded-3xl border overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Notifications</h1>

          <p className="text-slate-500 mt-1">All your updates in one place.</p>
        </div>

        {loading ? (
          <div className="py-16">
            <Loader text="Loading Notifications..." />
          </div>
        ) : notifications?.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <div>
            {notifications?.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NotificationPage;
