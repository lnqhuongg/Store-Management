'use client';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import SanPhamModalForm from "@/app/components/MUI/Modal/SanPhamModal";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";


export default function SanPham() {
    const columns = ['Mã sản phẩm', 'Tên sản phẩm', 'Loại', 'Nhà cung cấp', 'Tồn kho', 'Đơn giá'];
    const dataKeys = ['id', 'tenSP', 'loaiSP', 'ncc', 'tonKho', 'gia'];

    const data = [
        {id : '1', tenSP: 'Áo thun',loaiSP: 'Áo thun', ncc: 'Vinamilk', tonKho: '10', gia: '80000', barcode: 'i4bjkfdrbi', unit: 'chiếc'},
        {id : '2', tenSP: 'Quần jean', loaiSP: 'Quần jean', ncc: 'TH true milk', tonKho: '10', gia: '150000', barcode: 'sirrfjo4w3', unit: 'chiếc'}
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');

    const [isIncrease, setIsIncrease] = useState(true);

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

    const handleToggleIcon = () => {
        setIsIncrease(prev => !prev);
    };

    return (
        <section>
            <h4>Quản lý Sản phẩm</h4>
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
                <div className="d-flex justify-content-start gap-5">
                    {/* gửi hành showmodal(true) cho button -- mở modal  */}
                    <ButtonAdd onClick={handleAdd} />
                    <div className="w-40">
                        <select className="form-select" aria-label="Default select example">
                            <option >Lọc theo loại</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <button className="bg-white p-1 rounded" onClick={handleToggleIcon}>
                        <img src={isIncrease ? "/icons/increase.png" : "/icons/decrease.png"} alt="" className="h-8 w-8" />
                    </button>
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
            <SanPhamModalForm
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                mode={mode}
                SanPhamData={selectedIndex}
            />

        </section>
    );
}