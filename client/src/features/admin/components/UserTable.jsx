const UserTable = ({ columns = [], data = [], renderActions }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              bg-slate-50
              border-b
            "
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="
                    text-left
                    px-6
                    py-4
                    font-semibold
                    text-slate-700
                  "
                >
                  {column.label}
                </th>
              ))}

              {renderActions && (
                <th
                  className="
                    text-left
                    px-6
                    py-4
                    font-semibold
                    text-slate-700
                  "
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row._id || index}
                  className="
                    border-b
                    hover:bg-slate-50
                  "
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}

                  {renderActions && (
                    <td className="px-6 py-4">{renderActions(row)}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="
                    text-center
                    py-10
                    text-slate-500
                  "
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
