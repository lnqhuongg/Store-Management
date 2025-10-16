'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";

export default function KhachHang() {
    // header cho table Thông tin khách hàng
    const columns = ['Mã khách hàng', 'Tên khách hàng', 'Email', 'Số điện thoại'];
    const dataKeys = ['id', 'tenKhachHang', 'email', 'soDienThoai'];
    // data mẫu
    const data = [
        { id: 1, tenKhachHang: 'Nguyễn Văn C', email: 'nguyenvanc@example.com', soDienThoai: '0123456789' },
        { id: 2, tenKhachHang: 'Lê Thị D', email: 'lethid@example.com', soDienThoai: '0987654321' },
    ];

    // data mẫu chạy thử phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;

    return (
        <section>
            <h4>Quản lý Thông tin khách hàng</h4>
            <div className="khachhang py-4">
                <div>
                    <ButtonAdd />
                </div>
                <div>
                    <SearchInput />
                </div>
                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={data}
                        editLink="/admin/khach-hang/edit"
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
        </section>
    );
}