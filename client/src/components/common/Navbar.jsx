import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import {
  getNotifications,
  markNotificationRead,
} from "@/features/notifications/notificationThunks";

import NotificationDropdown from "@/features/notifications/components/NotificationDropdown";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title, subtitle, userName, department, profilePicture }) => {
  const dispatch = useDispatch();

  const avatarLetter = userName?.charAt(0)?.toUpperCase() || "U";

  const [openNotifications, setOpenNotifications] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { notifications, unreadCount, fetched } = useSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    if (!fetched) {
      dispatch(getNotifications());
    }
  }, [dispatch, fetched]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await dispatch(markNotificationRead(notification._id));
    }

    setOpenNotifications(false);

    switch (notification.type) {
      case "application":
      case "interview":
        if (notification.meta?.applicationId) {
          navigate(`/student/applications/${notification.meta.applicationId}`);
        }
        break;

      case "job":
        if (notification.meta?.jobId) {
          navigate(`/student/jobs/${notification.meta.jobId}`);
        }
        break;

      default:
        navigate("/notifications");
    }
  };

  const handleViewAll = () => {
    setOpenNotifications(false);
    navigate("/notifications");
  };

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-8
      "
    >
      {/* Left */}

      <div>
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        {/* Notifications */}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenNotifications((prev) => !prev)}
            className="
              relative
              p-2
              rounded-xl
              hover:bg-slate-100
              transition
            "
          >
            <Bell size={22} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-[18px]
                  h-[18px]
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                "
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {openNotifications && (
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              onNotificationClick={handleNotificationClick}
              onViewAll={handleViewAll}
            />
          )}
        </div>

        {/* Profile */}

        <div className="flex items-center gap-3">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="profile"
              className="
                h-10
                w-10
                rounded-full
                object-cover
                border
              "
            />
          ) : (
            <div
              className="
                h-10
                w-10
                rounded-full
                bg-indigo-600
                text-white
                flex
                items-center
                justify-center
                font-semibold
                text-sm
              "
            >
              {avatarLetter}
            </div>
          )}

          <div>
            <p className="font-medium">{userName}</p>

            {department && (
              <p className="text-xs text-slate-500">{department}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
