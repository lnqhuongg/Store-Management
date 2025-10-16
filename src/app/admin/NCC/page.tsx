'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/NCCTable";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import NCCModal from "@/app/components/MUI/Modal/NCCModal";


export default function NhaCungCap() {
    // header cho table Loai san pham (thay doi header neu la muc quan ly khac)
    const columns = ['Mã nhà cung cấp', 'Tên nhà cung cấp', 'SĐT', 'Email', 'Địa chỉ'];
    const dataKeys = ['id', 'tenNcc', 'sdt', 'email', 'adress'];
    // data mau~
    const data = [
        { id: 1, tenNcc: 'Công ty ABC', sdt: '0909123456' , email: 'abc@gmail.com', adress:'Hà Nội'},
        { id: 2, tenNcc: 'Công ty XYZ', sdt: '0912123456' , email: 'xyz@gmail.com', adress:'TP HCM'},
        { id: 3, tenNcc: 'Công ty 123', sdt: '0933123456' , email: '123@gmail.com', adress:'Đà Nẵng'},
    ];

    // data mau~ chay thu phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    // ------------------------------- update 16/10/2025

    const [showModal, setShowModal] = useState(false);
    
    // typescript - state này chỉ có giá trị là 'add' hoặc 'edit' không có giá trị khác 
    // '<>' là type, kiểu dữ liệu của state - hinh nhu là union type 
    // khởi tạo mode = 'add'
    const [mode, setMode] = useState<'add' | 'edit'>('add') ;

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
    const handleEdit = (NCC: any) => {
        setMode('edit');
        setSelectedIndex(NCC);
        setShowModal(true);
    };


    return (
        <section>
            <h4>Quản lý nhà cung cấp</h4>
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
                        editLink="/admin/nha-cung-cap/edit"
                        onEdit={(item) => handleEdit(item)} // truyền vào item/đối tượng item, mốt truyền vào id
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
            <NCCModal show={showModal} 
                         handleClose={() => setShowModal(false)} 
                         mode={mode}
                         NCCData={selectedIndex}
            />
        </section>
        
    );
}