'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import LoaiSPModal from "@/app/components/MUI/Modal/LoaiSPModal";


export default function LoaiSanPham() {
    // header cho table Loai san pham (thay doi header neu la muc quan ly khac)
    const columns = ['Mã loại', 'Tên loại sản phẩm'];
    const dataKeys = ['id', 'tenLoai'];
    // data mau~
    const data = [
        { id: 1, tenLoai: 'Áo thun', moTa: 'Chất liệu cotton' },
        { id: 2, tenLoai: 'Quần jean', moTa: 'Form slim fit' },
    ];

    // data mau~ chay thu phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    // ------------------------------- update 16/10/2025

    const [showModal, setShowModal] = useState(false);
    
    // typescript - state này chỉ có giá trị là 'add' hoặc 'edit' không có giá trị khác 
    // '<>' là type, kiểu dữ liệu của state - hinh nhu là union type 
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
    // kieu du lieu la any - la kieu du lieu gi cung dc, int hay object gi cung duoc, mot' thay = id
    const handleEdit = (LoaiSP: any) => {
        setMode('edit');
        setSelectedIndex(LoaiSP);
        setShowModal(true);
    };

    // KHI BAM NUT XOA 
    const handleDelete = (LoaiSP: any) => {
        setSelectedIndex(LoaiSP);
        alert('da bam vo button edit');
    }

    return (
        <section>
            <h4>Quản lý Loại sản phẩm</h4>
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
                        editLink="/admin/loai-san-pham/edit"
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
            <LoaiSPModal show={showModal} 
                         handleClose={() => setShowModal(false)} 
                         mode={mode}
                         LoaiSPData={selectedIndex}
            />
        </section>
        
    );
}