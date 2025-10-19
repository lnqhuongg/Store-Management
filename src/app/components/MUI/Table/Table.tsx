'use client';
import { Table } from 'react-bootstrap';
import ButtonEdit from '@/app/components/MUI/Button/ButtonEdit';
import ButtonDelete from '@/app/components/MUI/Button/ButtonDelete';

interface TableComponentProps {
  columns: string[];      // Tên các cột hiển thị
  dataKeys: string[];     // Key tương ứng trong dữ liệu
  data: any[];            // Mảng dữ liệu thực tế
  editLink?: string;      // Link chuyển đến khi bấm edit (nếu có)
  showActions?: boolean;  // Có hiển thị cột hành động không
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function TableComponent({
  columns,
  dataKeys,
  data,
  editLink,
  showActions = true,
  onEdit,
  onDelete,
}: TableComponentProps) {
  return (
    <div className="table-responsive mt-4 mb-4">
      <Table bordered hover className="align-middle text-center">
        <thead className="table-dark">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            {showActions && (onEdit || onDelete) && <th>Tùy chỉnh</th>}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={idx}>
                {dataKeys.map((key, i) => (
                  <td key={i}>{item[key]}</td>
                ))}

                {showActions && (onEdit || onDelete) && (
                  <td>
                    {/* Hiện nút sửa nếu có truyền onEdit */}
                    {onEdit && <ButtonEdit onClick={() => onEdit(item)} />}

                    {/* Hiện nút xóa nếu có truyền onDelete */}
                    {onDelete && <ButtonDelete onClick={() => onDelete(item)} />}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (showActions ? 1 : 0)}>
                Không có dữ liệu...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
