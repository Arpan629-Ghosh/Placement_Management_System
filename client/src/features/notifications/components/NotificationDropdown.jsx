import NotificationItem from "./temp";
import EmptyNotifications from "./EmptyNotifications";

const NotificationDropdown = ({
  notifications = [],
  unreadCount = 0,
  onNotificationClick = () => {},
  onViewAll = () => {},
}) => {
  return (
    <div
      className="
        absolute
        top-14
        right-0
        w-[420px]
        bg-white
        rounded-3xl
        border
        shadow-xl
        overflow-hidden
        z-50
      "
    >
      <div
        className="
          p-5
          border-b
          flex
          justify-between
          items-center
        "
      >
        <div>
          <h3 className="font-bold text-lg">Notifications</h3>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {unreadCount} unread
          </p>
        </div>
      </div>

      <div
        className="
          max-h-[450px]
          overflow-y-auto
        "
      >
        {notifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onClick={onNotificationClick}
            />
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={onViewAll}
          className="
            w-full
            py-3
            rounded-xl
            bg-indigo-600
            text-white
            font-medium
            hover:bg-indigo-700
          "
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
