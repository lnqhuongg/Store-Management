'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface KhachHangModalProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';       // chế độ: thêm hoặc sửa
    KhachHangData?: any;        // dữ liệu khách hàng khi sửa
}

export default function KhachHangModal({ show, handleClose, mode, KhachHangData }: KhachHangModalProps) {
    const [formData, setFormData] = useState({
        tenKhachHang: '',
        email: '',
        soDienThoai: ''
    });

    // Khi mode là edit thì nạp dữ liệu cũ vào form
    useEffect(() => {
        if (mode === "edit" && KhachHangData) {
            setFormData(KhachHangData);
        } else {
            setFormData({
                tenKhachHang: '',
                email: '',
                soDienThoai: ''
            });
        }
    }, [mode, KhachHangData]);

    // Submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === "add") {
            console.log("Thêm khách hàng:", formData);
            // Gọi API POST thêm khách hàng
        } else {
            console.log("Sửa khách hàng:", formData);
            // Gọi API PUT cập nhật khách hàng
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Thêm khách hàng" : "Sửa thông tin khách hàng"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Tên khách hàng */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tên khách hàng</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.tenKhachHang}
                            onChange={(e) => setFormData({ ...formData, tenKhachHang: e.target.value })}
                            placeholder="Nhập tên khách hàng"
                            required
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Nhập email"
                            required
                        />
                    </Form.Group>

                    {/* Số điện thoại */}
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.soDienThoai}
                            onChange={(e) => setFormData({ ...formData, soDienThoai: e.target.value })}
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </Form.Group>

                    {/* Nếu là chế độ edit thì hiển thị thêm trạng thái để ví dụ */}
                    {mode === "edit" && (
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select aria-label="Chọn trạng thái">
                                <option>Chọn trạng thái</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Ngừng hoạt động</option>
                            </Form.Select>
                        </Form.Group>
                    )}

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
