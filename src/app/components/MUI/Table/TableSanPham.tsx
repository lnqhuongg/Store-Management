'use client';
import { Table } from 'react-bootstrap';
import ButtonEdit from '@/app/components/MUI/Button/ButtonEdit';
import ButtonDelete from '@/app/components/MUI/Button/ButtonDelete';

interface TableComponentProps {
  columns: string[];      // Tên các cột hiển thị
  dataKeys: string[];     // Key tương ứng trong dữ liệu
  data: any[];            // Mảng dữ liệu thực tế --- có data mới dùng (hoặc tạo data mẫu demo)
  showActions?: boolean;  // Có hiển thị cột hành động không
  onEdit?: (id: any) => void;
  onDelete?: (id: any) => void; // có thực hiện hành động bấm nút edit hay ko
  onDetail?: (id: any) => void;
}

export default function TableComponent({
  columns,
  dataKeys,
  data,
  showActions = true,
  onEdit,
  onDelete,
}: TableComponentProps) {
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => {
      // Xử lý optional chaining (?.) trong path
      const cleanKey = key.replace('?', '');
      return current && current[cleanKey] !== undefined ? current[cleanKey] : '';
    }, obj);
  };
  const formatPrice = (price: number | string, currency: string = 'VND'): string => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(numPrice);
    };
  const renderCellValue = (columnName: string, key: string, item: any) => {
    const value = getNestedValue(item, key);
    
    // Kiểm tra nếu cột là "Đơn giá" hoặc key chứa "price"
    if (columnName.toLowerCase().includes('giá') || key.toLowerCase().includes('price')) {
      return formatPrice(value);
    }
    
    return value;
  };

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
                  <td key={i}>{renderCellValue(columns[i], key, item)}</td>
                ))}

                {/* có hành động thêm / xóa / sửa */}
                {showActions && (
                  <td>
                    <ButtonEdit onClick={() => onEdit?.(item)} /> {/* 👈 gọi cha, truyền item */}
                    {onDelete && <ButtonDelete onClick={() => onDelete?.(item)} />} {/* 👈 chỉ hiển thị nếu onDelete được truyền */}
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