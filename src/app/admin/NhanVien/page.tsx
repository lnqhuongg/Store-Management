'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import NhanVienModal from "@/app/components/MUI/Modal/NhanVienModal";

export default function NhanVien() {
    const columns = ['ID Nhân viên', 'Tên nhân viên', 'Email', 'Chức vụ', 'Trạng thái'];
    const dataKeys = ['id', 'tenNhanVien', 'email', 'chucVu', 'trangThai'];

    const [data, setData] = useState([
        { id: 1, tenNhanVien: 'Nguyễn Văn A', email: 'nguyenvana@example.com', chucVu: 'Quản lý', trangThai: 'Đang làm việc' },
        { id: 2, tenNhanVien: 'Trần Thị B', email: 'tranthib@example.com', chucVu: 'Nhân viên', trangThai: 'Đã nghỉ việc' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(data.length / pageSize);
    const pagedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [selectedNhanVien, setSelectedNhanVien] = useState<
        { id: number; tenNhanVien: string; email: string; chucVu: string; trangThai: string } | undefined
    >(undefined);

    const handleAdd = () => {
        setMode('add');
        setSelectedNhanVien(undefined); // Sử dụng undefined thay vì null
        setShowModal(true);
    };

    const handleEdit = (nhanVien: any) => {
        setMode('edit');
        setSelectedNhanVien(nhanVien);
        setShowModal(true);
    };

    const handleSubmit = (formData: any) => {
        if (mode === 'add') {
            setData((prev) => [...prev, formData]);
        } else {
            setData((prev) =>
                prev.map((item) => (item.id === formData.id ? formData : item))
            );
        }
    };

    return (
        <section>
            <h4>Quản lý Nhân viên</h4>
            <div className="nhanvien py-4">
                <div>
                    <ButtonAdd onClick={handleAdd} />
                </div>
                <div>
                    <SearchInput />
                </div>
                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={pagedData.map((item) => ({
                            ...item,
                            trangThai: (
                                <span
                                    className={
                                        item.trangThai === 'Đang làm việc'
                                            ? 'badge bg-success'
                                            : 'badge bg-secondary'
                                    }
                                >
                                    {item.trangThai}
                                </span>
                            ),
                        }))}
                        onEdit={(item) => handleEdit(item)} // Chỉ giữ nút chỉnh sửa
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
            <NhanVienModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                nhanVienData={selectedNhanVien}
                onSubmit={handleSubmit}
            />
        </section>
    );
}