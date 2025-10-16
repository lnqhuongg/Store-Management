'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";


export default function DonHang() {
    // header cho table Loai san pham (thay doi header neu la muc quan ly khac)
    /*
        `order_id` int PRIMARY KEY AUTO_INCREMENT,
        `customer_id` int,
        `user_id` int,
        `promo_id` int,
        `order_date` timestamp DEFAULT CURRENT_TIMESTAMP,
        `status` enum('pending','paid','canceled') DEFAULT 'pending',
        `total_amount` decimal(10,2),
        `discount_amount` decimal(10,2) DEFAULT 0
    */
    const columns = ['Mã đơn hàng', 'Khách hàng', 'Nhân viên', "Mã khuyến mãi", "Giảm giá", "Tổng tiền", "Ngày mua"];
    const dataKeys = ['id', 'customer', 'staff', 'coupon', 'discount', 'total', 'date'];
    // data mau~
    const sampleData = [
        {
            id: 'HD001',
            customer: 'Nguyễn Văn A',
            staff: 'Trần Thị B',
            coupon: 'KM10',
            discount: '10%',
            total: '2,500,000 VND',
            date: '2025-01-05',
        },
        {
            id: 'HD002',
            customer: 'Lê Thị C',
            staff: 'Phạm Văn D',
            coupon: 'KM05',
            discount: '5%',
            total: '1,750,000 VND',
            date: '2025-01-10',
        },
        {
            id: 'HD003',
            customer: 'Trần Quốc E',
            staff: 'Nguyễn Hồng F',
            coupon: '—',
            discount: '0%',
            total: '3,200,000 VND',
            date: '2025-02-12',
        },
        {
            id: 'HD004',
            customer: 'Phạm Minh G',
            staff: 'Lý Thị H',
            coupon: 'KM15',
            discount: '15%',
            total: '4,080,000 VND',
            date: '2025-02-20',
        },
        {
            id: 'HD005',
            customer: 'Đỗ Văn I',
            staff: 'Bùi Thị J',
            coupon: 'KM10',
            discount: '10%',
            total: '5,400,000 VND',
            date: '2025-03-01',
        },
        {
            id: 'HD006',
            customer: 'Hoàng Thị K',
            staff: 'Phan Văn L',
            coupon: 'KM05',
            discount: '5%',
            total: '2,280,000 VND',
            date: '2025-03-10',
        },
        {
            id: 'HD007',
            customer: 'Nguyễn Hữu M',
            staff: 'Lê Thị N',
            coupon: 'KM20',
            discount: '20%',
            total: '3,600,000 VND',
            date: '2025-03-25',
        },
        {
            id: 'HD008',
            customer: 'Trần Văn O',
            staff: 'Phạm Thị P',
            coupon: '—',
            discount: '0%',
            total: '1,950,000 VND',
            date: '2025-04-03',
        },
        {
            id: 'HD009',
            customer: 'Lê Thanh Q',
            staff: 'Ngô Văn R',
            coupon: 'KM10',
            discount: '10%',
            total: '6,750,000 VND',
            date: '2025-04-15',
        },
        {
            id: 'HD010',
            customer: 'Nguyễn Thị S',
            staff: 'Trần Văn T',
            coupon: 'KM05',
            discount: '5%',
            total: '2,100,000 VND',
            date: '2025-04-25',
        },
        {
            id: 'HD011',
            customer: 'Phan Văn U',
            staff: 'Lý Thị V',
            coupon: 'KM15',
            discount: '15%',
            total: '4,250,000 VND',
            date: '2025-05-02',
        },
        {
            id: 'HD012',
            customer: 'Đinh Hoàng W',
            staff: 'Võ Thị X',
            coupon: '—',
            discount: '0%',
            total: '1,480,000 VND',
            date: '2025-05-10',
        },
        {
            id: 'HD013',
            customer: 'Bùi Hữu Y',
            staff: 'Nguyễn Thị Z',
            coupon: 'KM10',
            discount: '10%',
            total: '3,960,000 VND',
            date: '2025-05-20',
        },
        {
            id: 'HD014',
            customer: 'Vũ Minh AA',
            staff: 'Phạm Văn AB',
            coupon: 'KM20',
            discount: '20%',
            total: '5,200,000 VND',
            date: '2025-06-01',
        },
        {
            id: 'HD015',
            customer: 'Lý Thị AC',
            staff: 'Trần Văn AD',
            coupon: 'KM05',
            discount: '5%',
            total: '2,850,000 VND',
            date: '2025-06-10',
        },
        {
            id: 'HD016',
            customer: 'Ngô Quang AE',
            staff: 'Bùi Thị AF',
            coupon: '—',
            discount: '0%',
            total: '4,000,000 VND',
            date: '2025-06-25',
        },
        {
            id: 'HD017',
            customer: 'Trịnh Văn AG',
            staff: 'Phan Thị AH',
            coupon: 'KM15',
            discount: '15%',
            total: '3,570,000 VND',
            date: '2025-07-05',
        },
        {
            id: 'HD018',
            customer: 'Phạm Quốc AI',
            staff: 'Lê Thị AJ',
            coupon: 'KM10',
            discount: '10%',
            total: '2,430,000 VND',
            date: '2025-07-18',
        },
        {
            id: 'HD019',
            customer: 'Hoàng Anh AK',
            staff: 'Nguyễn Văn AL',
            coupon: 'KM05',
            discount: '5%',
            total: '3,990,000 VND',
            date: '2025-08-02',
        },
        {
            id: 'HD020',
            customer: 'Nguyễn Hồng AM',
            staff: 'Trần Thị AN',
            coupon: 'KM10',
            discount: '10%',
            total: '6,300,000 VND',
            date: '2025-08-15',
        },
    ];

    // data mau~ chay thu phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const rows = 10;
    const totalPages = Math.ceil(sampleData.length / rows); // lam tron so trang len 1

    const start = (currentPage - 1) * rows;

    const currentData = sampleData.slice(start, start + rows);

    return (
        <section>
            <h4>Quản lý Đơn hàng</h4>
            <div className="donhang py-4">
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
                        data={currentData}
                        editLink="/admin/don-hang/edit"
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