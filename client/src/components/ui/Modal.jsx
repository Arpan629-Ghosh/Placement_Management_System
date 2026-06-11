import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-950/70"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
