import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 2);

    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        mt-8
      "
    >
      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          bg-white
          hover:bg-slate-50
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <ChevronLeft size={18} />
        Prev
      </button>

      {/* First Page */}

      {currentPage > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="
              w-10
              h-10
              rounded-xl
              border
              hover:bg-slate-50
            "
          >
            1
          </button>

          <span className="px-2 text-slate-400">...</span>
        </>
      )}

      {/* Page Numbers */}

      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-10
            h-10
            rounded-xl
            border
            transition

            ${
              page === currentPage
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white hover:bg-slate-50"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}

      {currentPage < totalPages - 2 && (
        <>
          <span className="px-2 text-slate-400">...</span>

          <button
            onClick={() => onPageChange(totalPages)}
            className="
              w-10
              h-10
              rounded-xl
              border
              hover:bg-slate-50
            "
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          bg-white
          hover:bg-slate-50
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
