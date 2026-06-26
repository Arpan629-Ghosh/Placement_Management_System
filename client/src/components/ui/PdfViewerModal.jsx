import Modal from "./Modal";

const PdfViewerModal = ({ open, onClose, url, title = "Resume Preview" }) => {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="space-y-4">
        <div className="h-[75vh] overflow-hidden rounded-2xl border bg-slate-100">
          {url ? (
            <iframe src={url} title={title} className="h-full w-full" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              No preview available.
            </div>
          )}
        </div>

        {url && (
          <div className="flex justify-end gap-3">
            <a
              href={url}
              download
              target="_blank"
              className="rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Download
            </a>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
            >
              Open in new tab
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PdfViewerModal;
