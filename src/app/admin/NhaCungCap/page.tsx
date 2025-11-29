'use client';
import { useEffect, useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import NhaCungCapModal from "@/app/components/MUI/Modal/NhaCungCapModal";
import { getAll, getById, create, update, deleteItem } from '@/app/controllers/NhaCungCap/NhaCungCapController';

export default function NhaCungCapPage() {
  // header cho table Supplier
  const columns = ['Mã NCC', 'Tên nhà cung cấp', 'Email', 'SĐT', 'Địa chỉ', 'Status'];
  const dataKeys = ['supplierId', 'name', 'email', 'phone', 'address', 'status'];

  // khởi tạo data để mỗi khi qua phân trang khác, 10 bản ghi khác lại được lấy lên từ databasee
  const [data, setData] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  // khởi tạo usestate cho currentpage & totalpages
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // hàm để load data lên table
  const loadData = async () => {
    try {
      const result = await getAll(currentPage, 10, keyword);
      const formattedData = result.data.map((item: any) => ({
        ...item,
        status: item.status === 1
          ? '<span class="badge bg-success">Hoạt động</span>'
          : item.status === 0
            ? '<span class="badge bg-secondary">Tạm ngưng</span>'
            : '<span class="badge bg-secondary">Không xác định</span>'
      }));
      setData(formattedData);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err: any) {
      alert(err.message || 'Lỗi tải dữ liệu');
    }
  };

  // gọi hàm, thay đổi mỗi khi đổi phân trang 
  useEffect(() => {
    loadData();
  }, [currentPage, keyword]);

  const [showModal, setShowModal] = useState(false);

  // typescript - state này chỉ có giá trị là 'add' hoặc 'edit' không có giá trị khác 
  // '<>' là type, kiểu dữ liệu của state - hinh nhu là union type 
  // khởi tạo mode = 'add'
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  // này để xác định mình bấm edit của thằng nào trong mấy dòng của table
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Khi bấm nút create
  const handleAdd = () => {
    setMode('add');
    setSelectedItem(null);
    setShowModal(true);
  };

  // Khi bấm nút sửa -- này chỉ là mở modal sửa
  // kieu du lieu la any - la kieu du lieu gi cung dc, int hay object gi cung duoc, mot' thay = id
  const handleEdit = async (item: any) => {
    try {
      const detail = await getById(item.supplierId);
      setMode('edit');
      setSelectedItem(detail);
      setShowModal(true);
    } catch (err: any) {
      alert(err.message || 'Không tải được thông tin!');
    }
  };

  // lưu dữ liệu (dữ liệu đc gửi từ modal thêm / sửa)
  const handleSave = async (formData: any) => {
    try {
      if (mode === 'add') {
        await create(formData);
        alert("Thêm nhà cung cấp thành công!");
      } else {
        if (!selectedItem?.supplierId) {
          throw new Error("Không tìm thấy ID nhà cung cấp");
        }
        await update(selectedItem.supplierId,
          {
            supplierId: selectedItem.supplierId,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            status: formData.status
          });
        alert("Cập nhật nhà cung cấp thành công!");
      }
      await loadData(); // reload table
      if (currentPage > 1 && data.length <= 1) {
        setCurrentPage(prev => Math.max(1, prev - 1));  //chịu chết
      }
    } catch (err: any) {
      alert(err.message || 'Lỗi khi thêm/sửa nhà cung cấp!');
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Xóa nhà cung cấp "${item.name}"?`)) return;
    try {
      await deleteItem(item.supplierId);
      alert('Xóa nhà cung cấp thành công!');
      await loadData();   //reload table
    } catch (err: any) {
      alert(err.message || 'Không thể xóa nhà cung cấp!');
    }
  };

  return (
    <section>
      <h4>Quản lý Nhà cung cấp</h4>
      <div className="loaisanpham py-4">
        <div>
          <ButtonAdd onClick={handleAdd} />
        </div>
        <div>
          <SearchInput
            onSearch={(value) => {
              setKeyword(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div>
          <TableComponent
            columns={columns}
            dataKeys={dataKeys}
            data={data}
            onEdit={(item) => handleEdit(item)}
            // onDelete={(item) => handleDelete(item)}
          />
        </div>
        <div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <NhaCungCapModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        mode={mode}
        NhaCungCapData={selectedItem}
        onSave={handleSave}
      />
    </section>
  );
}
