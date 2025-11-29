'use client';
import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import SearchInput from "@/app/components/MUI/Input/SearchInput"; // Component chung, không sửa
import TableComponent from "@/app/components/MUI/Table/Table";     // Component chung, không sửa
import PaginationComponent from "@/app/components/Pagination/Pagination"; // Component chung, không sửa
import DonHangModal from "@/app/components/MUI/Modal/DonHangModal";

import { getAll, getById, IOrderFilter, IDonHang } from '@/app/controllers/DonHang/DonHangController';

export default function DonHangPage() {
    // Cấu hình bảng
    const columns = ['Mã đơn', 'Khách hàng', 'Ngày đặt', 'Tổng tiền', 'Trạng thái'];
    const dataKeys = ['orderId', 'customerName', 'orderDate', 'totalAmount', 'orderStatus'];

    const [data, setData] = useState<IDonHang[]>([]);

    // State quản lý bộ lọc (Keyword + Ngày + Tiền)
    const [filter, setFilter] = useState<IOrderFilter>({
        keyword: "",
        dateFrom: "",
        dateTo: "",
        minTotal: undefined,
        maxTotal: undefined
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Hàm load dữ liệu
    const loadData = async () => {
        try {
            const result = await getAll(currentPage, 5, filter);

            const formattedData = result.data.map((item: any) => ({
                ...item,
                customerName: item.customerName || "Khách vãng lai",
                orderDate: item.orderDate ? new Date(item.orderDate).toLocaleDateString('vi-VN') : '',
                totalAmount: item.totalAmount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                orderStatus: item.status === 'paid'
                    ? '<span class="badge bg-success">Đã thanh toán</span>'
                    : item.status === 'pending'
                        ? '<span class="badge bg-warning text-dark">Chờ xác nhận</span>'
                        : item.status === 'canceled'
                            ? '<span class="badge bg-danger">Đã huỷ</span>'
                            : '<span class="badge bg-secondary">Không xác định</span>'
            }));



            setData(formattedData);
            setTotalPages(result.pagination.totalPages || 1);
        } catch (err: any) {
            console.error("Lỗi load đơn hàng:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, [currentPage, filter]);

    // --- MODAL XEM CHI TIẾT ---
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IDonHang | null>(null);

    const handleViewDetail = async (item: any) => {
        try {
            const detail = await getById(item.orderId);
            setSelectedOrder(detail);
            setShowModal(true);
        } catch (err: any) {
            alert('Lỗi tải chi tiết: ' + err.message);
        }
    };

    return (
        <section className="p-3">
            <h4 className="mb-4 font-bold text-xl">Quản lý Đơn Hàng</h4>

            <div className="bg-white p-3 rounded shadow-sm mb-3">
                {/* 1. Ô TÌM KIẾM (Dùng component chung) */}
                <div className="mb-3" style={{ maxWidth: '400px' }}>
                    <SearchInput
                        // 👇 ĐÃ SỬA: Xóa placeholder đi để không bị lỗi đỏ
                        onSearch={(value) => {
                            setFilter({ ...filter, keyword: value });
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* 2. BỘ LỌC NÂNG CAO (Phần này riêng của Đơn hàng) */}
                <Row className="g-2 mb-3">
                    <Col md={3}>
                        <Form.Label className="small fw-bold text-muted">Từ ngày</Form.Label>
                        <Form.Control
                            type="date" size="sm"
                            onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label className="small fw-bold text-muted">Đến ngày</Form.Label>
                        <Form.Control
                            type="date" size="sm"
                            onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label className="small fw-bold text-muted">Tiền tối thiểu</Form.Label>
                        <Form.Control
                            type="number" size="sm" placeholder="0"
                            onChange={(e) => setFilter({ ...filter, minTotal: Number(e.target.value) || undefined })}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label className="small fw-bold text-muted">Tiền tối đa</Form.Label>
                        <Form.Control
                            type="number" size="sm" placeholder="VNĐ"
                            onChange={(e) => setFilter({ ...filter, maxTotal: Number(e.target.value) || undefined })}
                        />
                    </Col>
                </Row>
            </div>

            {/* Bảng dữ liệu */}
            <div className="bg-white rounded shadow-sm">
                <TableComponent
                    columns={columns}
                    dataKeys={dataKeys}
                    data={data}
                    onEdit={(item) => handleViewDetail(item)} // Nút Edit đóng vai trò Xem chi tiết
                />
            </div>

            <div className="mt-3">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

            {/* Modal chỉ hiển thị */}
            <DonHangModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                orderData={selectedOrder}
            />
        </section>
    );
}