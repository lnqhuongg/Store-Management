"use client";
import { useState } from "react";
import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import MaGiamGiaModal from "@/app/components/MUI/Modal/MaGiamGiaModal";

export default function MaGiamGia() {
    // header cho table Ma giam gia
    const columns = [
        "Mã giảm giá",
        "Mô tả",
        "Giá trị (%)",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Trạng thái",
    ];
    const dataKeys = [
        "code",
        "description",
        "discount",
        "startDate",
        "endDate",
        "status",
    ];
    // data mẫu
    const data = [
        {
            id: 1,
            code: "SALE10",
            description: "Giảm 10% cho đơn hàng từ 500k",
            discount: 10,
            startDate: "2024-06-01",
            endDate: "2024-06-30",
            status: "Đang hoạt động",
        },
        {
            id: 2,
            code: "FREESHIP",
            description: "Miễn phí vận chuyển",
            discount: 0,
            startDate: "2024-06-01",
            endDate: "2024-06-15",
            status: "Hết hạn",
        },
    ];

    // data mẫu chạy thử phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    // ------------------------------- update 16/10/2025

    const [showModal, setShowModal] = useState(false);
    // typescript - state này chỉ có giá trị là 'add' hoặc 'edit' không có giá trị khác
    // '<>' là type, kiểu dữ liệu của state - union type
    // khởi tạo mode = 'add'
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    // này để xác định mình bấm edit của thằng nào trong mấy dòng của table
    const [selectedIndex, setSelectedIndex] = useState(null);
    // Khi bấm nút thêm
    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(null);
        setShowModal(true);
    };
    // Khi bấm nút sửa
    // kiểu dữ liệu là any - là kiểu dữ liệu gì cũng được, int hay object gì cũng được, một thay = id
    const handleEdit = (MaGiamGia: any) => {
        setMode('edit');
        setSelectedIndex(MaGiamGia);
        setShowModal(true);
    };
    // KHI BẤM NÚT XÓA
    const handleDelete = (MaGiamGia: any) => {
        setSelectedIndex(MaGiamGia);
        alert('Đã bấm vào button xóa');
    };
    return (
        <section>
            <h4>Quản lý Mã giảm giá</h4>
            <div className="magiamgia py-4">
                <div>
                    {/* gửi hàm showmodal(true) cho button -- mở modal  */}
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
                        onEdit={(item) => handleEdit(item)} // truyền vào item/đối tượng item, mốt truyền vào id
                        onDelete={(item) => handleDelete(item)}
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
            <MaGiamGiaModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                MaGiamGiaData={selectedIndex}
            />
        </section>
    );
}