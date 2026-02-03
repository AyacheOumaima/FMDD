import React from 'react';

const AdminTable = ({ 
  columns, 
  data = [], 
  loading = false, 
  error = null, 
  emptyMessage = "Aucune donnée disponible",
  onEdit,
  onDelete
}) => {

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900 mx-auto"></div>
        <p className="mt-1 text-xs text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        
        {/* HEADER */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key} 
                className="px-2 py-1.5 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-2 py-1.5 text-right text-[11px] font-semibold text-gray-500 lowercase">
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className="px-2 py-1.5 whitespace-wrap text-gray-700"
                  >
               {row[column.key] ?? '-'}



                  </td>
                ))}

                {/* ACTIONS */}
                <td className="px-2 py-1.5 text-right">
                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      onClick={() => onEdit(row.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length + 1} 
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default AdminTable;
