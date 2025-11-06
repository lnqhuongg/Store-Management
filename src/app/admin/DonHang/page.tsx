'use client';
import { useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import DonHangTableComponent from "@/app/components/MUI/Table/DonHangTable";
import PaginationComponent from "@/app/components/Pagination/Pagination";

import DonHangModal from "@/app/components/MUI/Modal/DonHangModal";
import ChiTietDHModal from '@/app/components/MUI/Modal/ChiTietDHModal';

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
            total: 2500000,
            date: '2025-01-05',
        },
        {
            id: 'HD002',
            customer: 'Lê Thị C',
            staff: 'Phạm Văn D',
            coupon: 'KM05',
            discount: '5%',
            total: 1750000,
            date: '2025-01-10',
        },
        {
            id: 'HD003',
            customer: 'Trần Quốc E',
            staff: 'Nguyễn Hồng F',
            coupon: '—',
            discount: '0%',
            total: 3200000,
            date: '2025-02-12',
        },
        {
            id: 'HD004',
            customer: 'Phạm Minh G',
            staff: 'Lý Thị H',
            coupon: 'KM15',
            discount: '15%',
            total: 4080000,
            date: '2025-02-20',
        },
        {
            id: 'HD005',
            customer: 'Đỗ Văn I',
            staff: 'Bùi Thị J',
            coupon: 'KM10',
            discount: '10%',
            total: 5400000,
            date: '2025-03-01',
        },
        {
            id: 'HD006',
            customer: 'Hoàng Thị K',
            staff: 'Phan Văn L',
            coupon: 'KM05',
            discount: '5%',
            total: 2280000,
            date: '2025-03-10',
        },
        {
            id: 'HD007',
            customer: 'Nguyễn Hữu M',
            staff: 'Lê Thị N',
            coupon: 'KM20',
            discount: '20%',
            total: 3600000,
            date: '2025-03-25',
        },
        {
            id: 'HD008',
            customer: 'Trần Văn O',
            staff: 'Phạm Thị P',
            coupon: '—',
            discount: '0%',
            total: 1950000,
            date: '2025-04-03',
        },
        {
            id: 'HD009',
            customer: 'Lê Thanh Q',
            staff: 'Ngô Văn R',
            coupon: 'KM10',
            discount: '10%',
            total: 6750000,
            date: '2025-04-15',
        },
        {
            id: 'HD010',
            customer: 'Nguyễn Thị S',
            staff: 'Trần Văn T',
            coupon: 'KM05',
            discount: '5%',
            total: 2100000,
            date: '2025-04-25',
        },
        {
            id: 'HD011',
            customer: 'Phan Văn U',
            staff: 'Lý Thị V',
            coupon: 'KM15',
            discount: '15%',
            total: 4250000,
            date: '2025-05-02',
        },
        {
            id: 'HD012',
            customer: 'Đinh Hoàng W',
            staff: 'Võ Thị X',
            coupon: '—',
            discount: '0%',
            total: 1480000,
            date: '2025-05-10',
        },
        {
            id: 'HD013',
            customer: 'Bùi Hữu Y',
            staff: 'Nguyễn Thị Z',
            coupon: 'KM10',
            discount: '10%',
            total: 3960000,
            date: '2025-05-20',
        },
        {
            id: 'HD014',
            customer: 'Vũ Minh AA',
            staff: 'Phạm Văn AB',
            coupon: 'KM20',
            discount: '20%',
            total: 5200000,
            date: '2025-06-01',
        },
        {
            id: 'HD015',
            customer: 'Lý Thị AC',
            staff: 'Trần Văn AD',
            coupon: 'KM05',
            discount: '5%',
            total: 2850000,
            date: '2025-06-10',
        },
        {
            id: 'HD016',
            customer: 'Ngô Quang AE',
            staff: 'Bùi Thị AF',
            coupon: '—',
            discount: '0%',
            total: 4000000,
            date: '2025-06-25',
        },
        {
            id: 'HD017',
            customer: 'Trịnh Văn AG',
            staff: 'Phan Thị AH',
            coupon: 'KM15',
            discount: '15%',
            total: 3570000,
            date: '2025-07-05',
        },
        {
            id: 'HD018',
            customer: 'Phạm Quốc AI',
            staff: 'Lê Thị AJ',
            coupon: 'KM10',
            discount: '10%',
            total: 2430000,
            date: '2025-07-18',
        },
        {
            id: 'HD019',
            customer: 'Hoàng Anh AK',
            staff: 'Nguyễn Văn AL',
            coupon: 'KM05',
            discount: '5%',
            total: 3990000,
            date: '2025-08-02',
        },
        {
            id: 'HD020',
            customer: 'Nguyễn Hồng AM',
            staff: 'Trần Thị AN',
            coupon: 'KM10',
            discount: '10%',
            total: 63000000,
            date: '2025-08-15',
        },
    ];

    // data mau~ chay thu phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const rows = 10;
    const totalPages = Math.ceil(sampleData.length / rows); // lam tron so trang len 1

    const start = (currentPage - 1) * rows;

    const currentData = sampleData.slice(start, start + rows);

    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // typescript - state này chỉ có giá trị là 'add' hoặc 'edit' không có giá trị khác 
    // '<>' là type, kiểu dữ liệu của state - hinh nhu là union type 
    // khởi tạo mode = 'add'
    const [mode, setMode] = useState<'add' | 'edit' | 'detail'>('add');

    // này để xác định mình bấm edit của thằng nào trong mấy dòng của table
    const [selectedIndex, setSelectedIndex] = useState<any | undefined>(undefined);

    // Khi bấm nút thêm
    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(undefined);
        setShowModal(true);
    };

    const handleViewDetail = (donHang: any) => {
        setMode('detail');
        setSelectedIndex(donHang);
        setShowDetailModal(true);
    };

    // Khi bấm nút sửa
    // kieu du lieu la any - la kieu du lieu gi cung dc, int hay object gi cung duoc, mot' thay = id
    const handleEdit = (DonHang: any) => {
        setMode('edit');
        setSelectedIndex(DonHang);
        setShowModal(true);
    };

    // KHI BAM NUT XOA 
    const handleDelete = (DonHang: any) => {
        setSelectedIndex(DonHang);
        alert('da bam vo button edit');
    }

    return (
        <section>
            <h4>Quản lý Đơn hàng</h4>
            <div className="donhang py-4">

                {/* Ô tìm kiếm */}
                <div className="search">
                    <SearchInput />
                </div>

                <div className='filter flex flex-row justify-between items-center w-full h-auto mb-4 bg-gray-100 px-6 py-2 rounded-lg shadow'>
                    {/* Lọc theo giá */}
                    <div className='flex flex-col w-1/3'>
                        <label htmlFor='price' className='text-gray-700 font-medium mb-1'>
                            Lọc theo giá
                        </label>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                placeholder='Từ'
                                className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='number'
                                placeholder='Đến'
                                className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    {/* Lọc theo ngày */}
                    <div className='flex flex-col w-1/3'>
                        <label htmlFor='date' className='text-gray-700 font-medium mb-1'>
                            Lọc theo ngày
                        </label>
                        <div className='flex items-center gap-2'>
                            <input
                                type='date'
                                className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type='date'
                                className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    {/* Nút lọc */}
                    <div className='flex justify-end w-1/6'>
                        <button className='bg-[#212529] text-white px-6 py-2 rounded-lg !rounded-lg hover:bg-gray-700 transition'>
                            Lọc
                        </button>
                    </div>
                </div>


                <div>
                    <DonHangTableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={currentData}
                        editLink="/admin/don-hang/edit"
                        onDetail={(item) => handleViewDetail(item)}
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

                <DonHangModal show={showModal}
                    handleClose={() => setShowModal(false)}
                    mode={mode}
                    DonHangData={selectedIndex}
                />

                <ChiTietDHModal
                    show={showDetailModal}
                    handleClose={() => setShowDetailModal(false)}
                    DonHangData={selectedIndex}
                />
            </div>
        </section>
    );
}