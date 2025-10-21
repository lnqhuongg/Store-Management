'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import KhachHangModal from "@/app/components/MUI/Modal/KhachHangModal";

export default function KhachHang() {
    // Header cho bảng Khách hàng
    const columns = ['Mã khách hàng', 'Tên khách hàng', 'Email', 'Số điện thoại'];
    const dataKeys = ['id', 'tenKhachHang', 'email', 'soDienThoai'];

    // Dữ liệu mẫu
    const data = [
        { id: 1, tenKhachHang: 'Nguyễn Văn C', email: 'nguyenvanc@example.com', soDienThoai: '0123456789' },
        { id: 2, tenKhachHang: 'Lê Thị D', email: 'lethid@example.com', soDienThoai: '0987654321' },
    ];

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    // ------------------------------- xử lý modal thêm/sửa khách hàng -------------------------------

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Khi bấm nút "Thêm mới"
    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(null);
        setShowModal(true);
    };

    // Khi bấm nút "Sửa"
    const handleEdit = (khachHang: any) => {
        setMode('edit');
        setSelectedIndex(khachHang);
        setShowModal(true);
    };

    return (
        <section>
            <h4>Quản lý Thông tin khách hàng</h4>
            <div className="khachhang py-4">
                <div>
                    {/* Gọi modal thêm khách hàng */}
                    <ButtonAdd onClick={handleAdd} />
                </div>
                <div>
                    <SearchInput />
                </div>
                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={data}
                        onEdit={(item) => handleEdit(item)}  // chỉ có sửa
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

            {/* Modal thêm / sửa khách hàng */}
            <KhachHangModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                KhachHangData={selectedIndex}
            />
        </section>
    );
}