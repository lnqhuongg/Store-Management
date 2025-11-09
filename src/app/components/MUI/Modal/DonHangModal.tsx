'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit' | 'detail';     // chế độ: thêm hay sửa
    DonHangData?: any;           // dữ liệu cũ khi sửa
}

export default function ModalForm({ show, handleClose, mode, DonHangData }: ModalFormProps) {
    const [formData, setFormData] = useState({
        maDonHang: DonHangData?.id || '',
        tenKhachHang: DonHangData?.customer || '',
        nhanVien: DonHangData?.staff || '',
        maKhuyenMai: DonHangData?.coupon || '',
        giamGia: DonHangData?.discount || '',
        tongTien: DonHangData?.total || 0,
        ngayMua: DonHangData?.date || '',
    });

    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (mode === 'edit' && DonHangData) {
            setFormData({
                maDonHang: DonHangData?.id || '',
                tenKhachHang: DonHangData?.customer || '',
                nhanVien: DonHangData?.staff || '',
                maKhuyenMai: DonHangData?.coupon || '',
                giamGia: DonHangData?.discount || '',
                tongTien: DonHangData?.total || 0,
                ngayMua: DonHangData?.date || '',
            });
        } else {
            // reset form khi thêm mới
            setFormData({
                maDonHang: '',
                tenKhachHang: '',
                nhanVien: '',
                maKhuyenMai: '',
                giamGia: '',
                tongTien: 0,
                ngayMua: '',
            });
        }
    }, [mode]);


    // handle submit xác định nút đó là add hay sửa
    const handleSubmit = () => {
        if (mode === "add") {
            console.log("thêm", formData);
            // call POST API
        } else {
            console.log("sửa", formData);
            // call PUT API
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Thêm Đơn hàng" : mode === "edit" ? "Sửa Đơn hàng" : "Xem chi tiết Đơn hàng"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Label>Mã đơn hàng</Form.Label>
                                <Form.Control type="text" disabled value={DonHangData?.id} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Khách hàng</Form.Label>
                                <Form.Select
                                    disabled={mode === 'detail'}
                                    onChange={(e) => setFormData({ ...formData, tenKhachHang: e.target.value })}
                                >
                                    <option value={formData.tenKhachHang}>{formData.tenKhachHang}</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label>Nhân viên</Form.Label>
                                <Form.Select
                                    disabled={mode === 'detail'}
                                    onChange={(e) => setFormData({ ...formData, nhanVien: e.target.value })}
                                >
                                    <option value={formData.nhanVien}>{formData.nhanVien}</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Label>Mã khuyến mãi</Form.Label>
                                <Form.Select
                                    disabled={mode === 'detail'}
                                    onChange={(e) => setFormData({ ...formData, maKhuyenMai: e.target.value })}
                                >
                                    <option value={formData.maKhuyenMai}>{formData.maKhuyenMai}</option>
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label>Giảm giá</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    value={formData.giamGia}
                                    onChange={(e) => setFormData({ ...formData, giamGia: e.target.value })}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Label>Tổng tiền</Form.Label>
                                <Form.Control
                                    type="number"
                                    disabled={mode === 'detail'}
                                    value={formData.tongTien}
                                    onChange={(e) => setFormData({ ...formData, tongTien: e.target.value })}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Ngày mua</Form.Label>
                                <Form.Control
                                    type="date"
                                    disabled={mode === 'detail'}
                                    onChange={(e) => setFormData({ ...formData, ngayMua: e.target.value })}
                                    value={formData.ngayMua} />
                            </Col>
                        </Row>

                    </Form.Group>

                    {/* tui lấy trường này ví dụ cho mng làm cái nút edit chứ thật chất ko có  */}

                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Hủy
                        </Button>
                        <Button variant="success" type="submit">
                            {mode === "add" ? "Thêm mới" : "Cập nhật"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}