import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NotificationIcon from "./NotificationIcon";

dayjs.extend(relativeTime);

const NotificationItem = ({ notification, onClick }) => {
  return (
    <button
      onClick={() => onClick(notification)}
      className={`
        w-full
        text-left
        p-4
        flex
        gap-4
        hover:bg-slate-50
        transition
        border-b
        last:border-b-0
        ${!notification.isRead ? "bg-indigo-50/40" : "bg-white"}
      `}
    >
      <NotificationIcon type={notification.type} />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p
            className={`
              text-sm
              ${
                notification.isRead
                  ? "text-slate-600"
                  : "text-slate-900 font-medium"
              }
            `}
          >
            {notification.message}
          </p>

          {!notification.isRead && (
            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-indigo-600
                mt-1
              "
            />
          )}
        </div>

        <p
          className="
            text-xs
            text-slate-400
            mt-2
          "
        >
          {dayjs(notification.createdAt).fromNow()}
        </p>
      </div>
    </button>
  );
};

export default NotificationItem;
