'use client';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import SanPhamModalForm from "@/app/components/MUI/Modal/SanPhamModal";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function SanPham() {
    const columns = ['Mã sản phẩm', 'Tên sản phẩm', 'Loại', 'Nhà cung cấp', 'Tồn kho', 'Đơn giá', 'Mã vạch'];
    const dataKeys = ['id', 'tenSP', 'loaiSP', 'ncc', 'tonKho', 'gia', 'barcode'];

    const data = [
        {id : '1', tenSP: 'Áo thun',loaiSP: 'Áo thun', ncc: 'Vinamilk', tonKho: '10', gia: '80000', barcode: 'i4bjkfdrbi'},
        {id : '2', tenSP: 'Quần jean', loaiSP: 'Quần jean', ncc: 'TH true milk', tonKho: '10', gia: '150000', barcode: 'sirrfjo4w3'}
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');

    const [announce, setAnnounce] = useState<null | { type: string; message: string }>(null);

    useEffect(() => {
        if (announce) {
        const timer = setTimeout(() => setAnnounce(null), 5000);
        return () => clearTimeout(timer);
        }
    }, [announce]);

    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(null);
        setShowModal(true);
    };

    const handleEdit = (LoaiSP: any) => {
        setMode('edit');
        setSelectedIndex(LoaiSP);
        setShowModal(true);
    };

    const handleDelete = (LoaiSP: any) => {
        setSelectedIndex(LoaiSP);
        // alert('da bam vo button edit');
        setAnnounce({ type: "success", message: "Đã xóa sản phẩm thành công!" });
    }

    return (
        <section>
            <h4>Quản lý sản phẩm</h4>
            {announce && (
                <div className="my-3">
                <Alert
                    variant={announce.type}
                    dismissible
                    onClose={() => setAnnounce(null)}
                >
                    <strong>{announce.message}</strong>
                </Alert>
                </div>
            )}
            <div className="loaisanpham py-4">
                <div>
                    {/* gửi hành showmodal(true) cho button -- mở modal  */}
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
                        editLink="/admin/san-pham/edit"
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
            <SanPhamModalForm
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                mode={mode}
                SanPhamData={selectedIndex}
            />

        </section>
    );
}