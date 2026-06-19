import { BellOff } from "lucide-react";

const EmptyNotifications = () => {
  return (
    <div
      className="
        py-14
        flex
        flex-col
        items-center
        justify-center
      "
    >
      <BellOff size={48} className="text-slate-300" />

      <h3
        className="
          mt-4
          font-semibold
          text-slate-700
        "
      >
        No Notifications
      </h3>

      <p
        className="
          text-sm
          text-slate-500
          mt-1
        "
      >
        You're all caught up.
      </p>
    </div>
  );
};

export default EmptyNotifications;
