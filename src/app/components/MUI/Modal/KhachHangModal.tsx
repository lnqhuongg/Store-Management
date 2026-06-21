'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface KhachHangModalProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';       // chế độ: thêm hay sửa
    KhachHangData?: any;        // dữ liệu cũ khi sửa
    onSave: (data: any) => Promise<void>; // xử lý lưu -- hàm kiểu void 
}

export default function KhachHangModal({ 
    show, 
    handleClose, 
    mode, 
    KhachHangData, 
    onSave 
}: KhachHangModalProps) {
    // khởi tạo biến formData với các field khách hàng
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        rewardPoints: 0
    });

    // dùng message này để xuất ra thông báo khi validate
    const [errorMessage, setErrorMessage] = useState('');

    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (show) { // MỖI KHI MODAL MỞ
            if (mode === 'edit' && KhachHangData) {
                setFormData({
                    name: KhachHangData.name || '',
                    phone: KhachHangData.phone || '',
                    email: KhachHangData.email || '',
                    address: KhachHangData.address || '',
                    rewardPoints: KhachHangData.rewardPoints || 0
                });
            } else {
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    rewardPoints: 0
                });
            }
            setErrorMessage(''); // RESET LỖI MỖI LẦN MỞ
        }
    }, [show, mode, KhachHangData]);

    // handle submit xác định nút đó là add hay sửa
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ko reload lại trang mỗi khi bấm nút thêm / cập nhật trên modal
        setErrorMessage('');

        // Validate bắt buộc
        if (!formData.name.trim()) {
            setErrorMessage("Vui lòng nhập tên khách hàng");
            return;
        }
        if (!formData.phone.trim()) {
            setErrorMessage("Vui lòng nhập số điện thoại");
            return;
        }

        // Gửi dữ liệu về page.tsx qua onSave 
        try {
            await onSave({
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                address: formData.address.trim(),
                rewardPoints: formData.rewardPoints
            });
            handleClose();
        } catch (err: any) {
            setErrorMessage(err.message || 'Lỗi khi lưu');
        }
    };

    // show = true -> mở modal 
    if (!show) return null;

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
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder='Nhập tên khách hàng'
                        />
                    </Form.Group>

                    {/* Số điện thoại  */}
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder='Nhập số điện thoại'
                            disabled={mode === 'edit'} // KHÔNG CHO SỬA KHI EDIT
                        />
                    </Form.Group>

                    {/* Email  */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder='Nhập email '
                            disabled={mode === 'edit'} // KHÔNG CHO SỬA KHI EDIT
                        />
                    </Form.Group>

                    {/* Địa chỉ */}
                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder='Nhập địa chỉ'
                        />
                    </Form.Group>

                    {/* Điểm tích lũy */}
                    <Form.Group className="mb-3">
                        <Form.Label>Điểm tích lũy</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.rewardPoints}
                            disabled
                        />
                    </Form.Group>

                    {/* Hiển thị lỗi */}
                    {errorMessage && <div className="text-danger mt-1 ms-1 text-xs">{errorMessage}</div>}

                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Hủy
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
                            onClick={handleSubmit}>
                            {mode === "add" ? "Thêm mới" : "Cập nhật"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}