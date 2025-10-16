'use client';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';

interface MaGiamGia {
    id: number;
    code: string;
    description: string;
    discount: number;
    startDate: string;
    endDate: string;
    status: string;
}

const mockData: MaGiamGia[] = [
    {
        id: 1,
        code: 'SALE10',
        description: 'Giảm 10% cho đơn hàng từ 500k',
        discount: 10,
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        status: 'Đang hoạt động',
    },
    {
        id: 2,
        code: 'FREESHIP',
        description: 'Miễn phí vận chuyển',
        discount: 0,
        startDate: '2024-06-01',
        endDate: '2024-06-15',
        status: 'Hết hạn',
    },
    // Thêm dữ liệu mẫu khác nếu cần
];

export default function MaGiamGiaPage() {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredData = mockData.filter(
        (item) =>
            item.code.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const pagedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <section>
            <h4 className="mb-4">Quản lý Phiếu giảm giá</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="success">
                    <i className="bi bi-plus-lg me-2"></i>Thêm mới
                </Button>
                <InputGroup style={{ maxWidth: 350 }}>
                    <Form.Control
                        placeholder="Tìm kiếm mã hoặc mô tả..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <Button variant="outline-secondary">
                        <i className="bi bi-search"></i>
                    </Button>
                </InputGroup>
            </div>
            <div className="table-responsive">
                <Table bordered hover className="align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Mã giảm giá</th>
                            <th>Mô tả</th>
                            <th>Giá trị (%)</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Trạng thái</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedData.length > 0 ? (
                            pagedData.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>{(currentPage - 1) * pageSize + idx + 1}</td>
                                    <td>{item.code}</td>
                                    <td>{item.description}</td>
                                    <td>{item.discount > 0 ? `${item.discount}%` : '-'}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>
                                        <span
                                            className={
                                                item.status === 'Đang hoạt động'
                                                    ? 'badge bg-success'
                                                    : 'badge bg-secondary'
                                            }
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8}>Không có dữ liệu...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                    {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item
                            key={idx + 1}
                            active={currentPage === idx + 1}
                            onClick={() => setCurrentPage(idx + 1)}
                        >
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    />
                </Pagination>
            </div>
        </section>
    );
}
