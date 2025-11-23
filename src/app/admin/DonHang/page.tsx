'use client';
import { useEffect, useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import DonHangModal from "@/app/components/MUI/Modal/DonHangModal"; // <-- File modal mới
import { getAll, getById, create } from '@/app/controllers/DonHang/DonHangController';

export default function DonHangPage() {
    // Header cho table Đơn hàng
    const columns = ['Mã đơn', 'Khách hàng', 'Ngày đặt', 'Tổng tiền'];
    // Key phải trùng với DTO trả về từ API getAll
    const dataKeys = ['orderId', 'customerName', 'orderDate', 'totalAmount'];

    const [data, setData] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Load data lên bảng
    const loadData = async () => {
        try {
            const result = await getAll(currentPage, 5, keyword);
            
            // Format dữ liệu hiển thị (Ngày tháng, Tiền tệ)
            const formattedData = result.data.map((item: any) => ({
                ...item,
                customerName: item.customerName || "Khách vãng lai",
                orderDate: item.orderDate ? new Date(item.orderDate).toLocaleDateString('vi-VN') : '',
                totalAmount: item.totalAmount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            }));

            setData(formattedData);
            setTotalPages(result.pagination.totalPages || 1);
        } catch (err: any) {
            alert(err.message || 'Lỗi tải dữ liệu');
        }
    };

    useEffect(() => {
        loadData();
    }, [currentPage, keyword]);

    // ----------------------------------------
    const [showModal, setShowModal] = useState(false);
    // mode 'add' là tạo mới, 'view' là xem chi tiết
    const [mode, setMode] = useState<'add' | 'view'>('add'); 
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Khi bấm nút thêm
    const handleAdd = () => {
        setMode('add');
        setSelectedItem(null);
        setShowModal(true);
    };

    // Khi bấm nút sửa (Ở đây là Xem chi tiết)
    const handleView = async (item: any) => {
        try {
            const detail = await getById(item.orderId); 
            setMode('view');
            setSelectedItem(detail);
            setShowModal(true);
        } catch (err: any) {
            alert(err.message || 'Không tải được thông tin đơn hàng!');
        }
    };

    // Lưu dữ liệu (Chỉ dùng cho Tạo mới)
    const handleSave = async (formData: any) => {
        try {
            if (mode === 'add') {
                await create(formData);
                alert("Tạo đơn hàng thành công!");
            } 
            // Không xử lý update ở đây
            
            await loadData(); // RELOAD BẢNG
        } catch (err: any) {
            alert(err.message || 'Lỗi khi tạo đơn hàng!');
        }
    };

    // Không có handleDelete vì đơn hàng hạn chế xóa

    return (
        <section>
            <h4>Quản lý Đơn Hàng</h4>
            <div className="donhang py-4">
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
                        onEdit={(item) => handleView(item)} // Nút bút chì dùng để xem chi tiết
                        onDelete={() => {}} // Tắt nút xóa hoặc để trống
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
            
            <DonHangModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                DonHangData={selectedItem}
                onSave={handleSave}
            />
        </section>
    );
}