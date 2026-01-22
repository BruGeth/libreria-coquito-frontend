import type { ReactNode } from 'react';
import './Table.css';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

function Table<T extends { id: number | string }>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No hay datos disponibles',
}: TableProps<T>) {
  // Validar que data sea un array
  const safeData = Array.isArray(data) ? data : [];
  
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="table-header-cell"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {safeData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            safeData.map((item) => (
              <tr
                key={item.id}
                className={`table-row ${onRowClick ? 'table-row-clickable' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render
                      ? column.render(item)
                      : String((item as any)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
