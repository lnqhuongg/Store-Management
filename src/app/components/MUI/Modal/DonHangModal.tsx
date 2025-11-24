'use client';
import { Modal, Button, Row, Col, Table, Badge } from 'react-bootstrap';
import { IDonHang } from '@/app/controllers/DonHang/DonHangController';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    orderData?: IDonHang | null; // Dữ liệu đơn hàng cần xem
}

export default function DonHangModal({ show, handleClose, orderData }: ModalProps) {
    if (!show || !orderData) return null;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>
                    Chi Tiết Đơn Hàng <span className="text-primary">#{orderData.orderId}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 1. THÔNG TIN CHUNG */}
                <div className="mb-4 p-3 bg-light rounded border">
                    <h6 className="text-uppercase fw-bold text-secondary mb-3">Thông tin đơn hàng</h6>
                    <Row>
                        <Col md={6}>
                            <p className="mb-1"><strong>Khách hàng:</strong> {orderData.customerName || "Khách lẻ"}</p>
                            <p className="mb-1"><strong>Ngày đặt:</strong> {new Date(orderData.orderDate || "").toLocaleString('vi-VN')}</p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <p className="mb-1"><strong>Trạng thái:</strong> <span className="badge bg-success">Hoàn thành</span></p>
                            {/* Nếu backend có trả về Nhân viên thì hiện ở đây */}
                            {/* <p className="mb-1"><strong>Nhân viên:</strong> {orderData.userName}</p> */}
                        </Col>
                    </Row>
                </div>

                {/* 2. DANH SÁCH SẢN PHẨM */}
                <h6 className="text-uppercase fw-bold text-secondary mb-2">Danh sách sản phẩm</h6>
                <Table striped bordered hover responsive size="sm">
                    <thead className="table-dark text-center">
                        <tr>
                            <th style={{ width: '50px' }}>#</th>
                            <th>Tên sản phẩm</th>
                            <th style={{ width: '100px' }}>Số lượng</th>
                            <th style={{ width: '120px' }}>Đơn giá</th>
                            <th style={{ width: '120px' }}>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.items?.map((item, index) => (
                            <tr key={index} className="align-middle">
                                <td className="text-center">{index + 1}</td>
                                <td>
                                    <span className="fw-bold text-primary">{item.productName}</span>
                                    {/* <br/><small className="text-muted">Mã: {item.productId}</small> */}
                                </td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-end">{item.price?.toLocaleString()} ₫</td>
                                <td className="text-end fw-bold">
                                    {(item.subtotal || (item.price * item.quantity)).toLocaleString()} ₫
                                </td>
                            </tr>
                        ))}
                        {(!orderData.items || orderData.items.length === 0) && (
                            <tr>
                                <td colSpan={5} className="text-center text-muted fst-italic">
                                    Không có sản phẩm nào trong đơn này.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {/* TỔNG TIỀN */}
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="text-end fw-bold text-uppercase">Tổng cộng:</td>
                            <td className="text-end fw-bold text-danger fs-5">
                                {orderData.totalAmount?.toLocaleString()} ₫
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                {/* Có thể thêm nút In hóa đơn ở đây nếu cần */}
                <Button variant="primary" onClick={() => window.print()}>In hóa đơn</Button>
            </Modal.Footer>
        </Modal>
    );
}