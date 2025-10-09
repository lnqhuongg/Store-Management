'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";


export default function LoaiSanPham() {
    // header cho table
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

    return (
        <section>
            <h4>Quản lý Loại sản phẩm</h4>
            <div className="loaisanpham py-4">
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
                        editLink="/admin/loai-san-pham/edit"
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