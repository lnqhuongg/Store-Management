'use client';
import Link from 'next/link';
import { Table } from 'react-bootstrap';

interface TableComponentProps {
  columns: string[];      // Tên các cột hiển thị
  dataKeys: string[];     // Key tương ứng trong dữ liệu
  data: any[];            // Mảng dữ liệu thực tế --- có data mới dùng (hoặc tạo data mẫu demo)
  editLink?: string;      // nút edit
  showActions?: boolean;  // Có hiển thị cột hành động không
}

export default function TableComponent({
  columns,
  dataKeys,
  data,
  editLink,
  showActions = true,
}: TableComponentProps) {

  return (
    <div className="table-responsive mt-4 mb-4">
      <Table bordered hover className="align-middle text-center">
        <thead className="table-dark">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            {showActions && <th>Tùy chỉnh</th>}
          </tr>
        </thead>
        <tbody>
         {/* nếu có data */}
          {data && data.length > 0 ? (
            data.map((item, idx) => (
                
              <tr key={idx}>
                {dataKeys.map((key, i) => (
                  <td key={i}>{item[key]}</td>
                ))}

                {/* có hành động thêm / xóa / sửa  */}
                {showActions && (
                  <td>
                    {editLink && (
                      <Link
                        href={`${editLink}/${item[dataKeys[0]]}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Sửa
                      </Link>
                    )}
                    <button className="btn btn-sm btn-danger">
                      Xóa
                    </button>
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
