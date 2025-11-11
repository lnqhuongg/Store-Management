'use client';
import { useEffect, useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import NhanVienModal from "@/app/components/MUI/Modal/NhanVienModal";

import { getAll, getById, create, update } from '@/app/controllers/NhanVien/NhanVienController';
import { NhanVienFilter } from '@/app/controllers/NhanVien/NhanVienController';

export default function NhanVienPage() {
    const columns = ['ID', 'Tên đăng nhập', 'Họ tên', 'Vai trò', 'Trạng thái'];
    const dataKeys = ['userId', 'username', 'fullName', 'role', 'status'];

    const [data, setData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [roleFilter, setRoleFilter] = useState<'admin' | 'staff' | ''>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const loadData = async () => {
        try {
            const filter: NhanVienFilter = { keyword };
            if (roleFilter) filter.role = roleFilter;

            const result = await getAll(currentPage, 5, filter);
            setData(result.data);
            setTotalPages(result.pagination.totalPages || 1);
        } catch (err: any) {
            alert(err.message || 'Lỗi tải danh sách nhân viên!');
        }
    };

    useEffect(() => {
        loadData();
    }, [currentPage, keyword, roleFilter]);

    const handleAdd = () => {
        setMode('add');
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleEdit = async (item: any) => {
        try {
            const detail = await getById(item.userId);
            setMode('edit');
            setSelectedItem(detail);
            setShowModal(true);
        } catch (err: any) {
            alert(err.message || 'Không tải được thông tin nhân viên!');
        }
    };

    const handleSave = async (formData: any) => {
        try {
            if (mode === 'add') {
                await create(formData as any); 
                alert("Thêm nhân viên thành công!");
            } else {
                if (!selectedItem?.userId) throw new Error("Không tìm thấy ID nhân viên");
                await update(selectedItem.userId, {
                    username: formData.username.trim(),
                    fullName: formData.fullName.trim(),
                    role: formData.role,
                    status: formData.status
                });
                alert("Cập nhật nhân viên thành công!");
            }
            await loadData();
            setShowModal(false);
        } catch (err: any) {
            alert(err.message || 'Lỗi khi lưu nhân viên!');
        }
    };

    const handleDelete = async (item: any) => {
        if (!confirm(`Xóa nhân viên "${item.fullName}"?`)) return;
        alert("Xóa thành công! (Backend chưa hỗ trợ)");
    };

    return (
        <section>
            <h4 className="mb-4">Quản lý Nhân viên</h4>

            <div className="py-4">
                {/* DÒNG 1: Nút Thêm + Lọc role (chung 1 hàng) */}
                <div className="d-flex justify-content-start gap-3 align-items-center mb-3">
                    <ButtonAdd onClick={handleAdd} />
                    <div className="w-40">
                        <select
                            className="form-select"
                            value={roleFilter}
                            onChange={(e) => {
                                setRoleFilter(e.target.value as 'admin' | 'staff' | '');
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Tất cả vai trò</option>
                            <option value="admin">Quản trị viên</option>
                            <option value="staff">Nhân viên</option>
                        </select>
                    </div>
                </div>

                {/* DÒNG 2: Thanh tìm kiếm - GIỐNG HỆT LOAISANPHAM */}
                <div>
                    <SearchInput
                        onSearch={(value) => {
                            setKeyword(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* DÒNG 3: Bảng */}
                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={data.map(item => ({
                            ...item,
                            role: (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {item.role === 'admin' ? 'Quản trị' : 'Nhân viên'}
                                </span>
                            ),
                            status: (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {item.status === 1 ? 'Hoạt động' : 'Ngừng'}
                                </span>
                            )
                        }))}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

                {/* DÒNG 4: Phân trang */}
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
                nhanVienData={selectedItem}
                onSave={handleSave}
            />
        </section>
    );
}