'use client';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface NhanVienModalProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';
    nhanVienData?: any;
    onSave: (data: any) => Promise<void>;
}

export default function NhanVienModal({
    show,
    handleClose,
    mode,
    nhanVienData,
    onSave
}: NhanVienModalProps) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        role: 'staff' as 'admin' | 'staff',
        status: 1
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset form khi mở modal hoặc đổi mode
    useEffect(() => {
        if (mode === 'edit' && nhanVienData) {
            setFormData({
                username: nhanVienData.username || '',
                password: '',
                fullName: nhanVienData.fullName || '',
                role: nhanVienData.role || 'staff',
                status: nhanVienData.status ?? 1
            });
        } else {
            setFormData({
                username: '',
                password: '',
                fullName: '',
                role: 'staff',
                status: 1
            });
        }
        setErrors({});
    }, [mode, nhanVienData, show]);

    // Validate form
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Tên đăng nhập không được để trống';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
        }

        if (mode === 'add' && !formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc khi thêm mới';
        } else if (mode === 'add' && formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ tên không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await onSave(formData);
            handleClose();
        } catch (err: any) {
            // Nếu backend trả lỗi (ví dụ: username tồn tại)
            alert(err.message || 'Lỗi khi lưu nhân viên');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                    {mode === 'add' ? 'Thêm nhân viên mới' : 'Cập nhật thông tin nhân viên'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        {/* Cột trái: Thông tin cơ bản */}
                        <Col md={7}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-medium">
                                    Tên đăng nhập <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên đăng nhập"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    isInvalid={!!errors.username}
                                    disabled={mode === 'edit'} // Không cho sửa username khi edit
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {mode === 'add' && (
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">
                                        Mật khẩu <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-medium">
                                    Họ và tên <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* Cột phải: Vai trò & Trạng thái */}
                        <Col md={5}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-medium">Vai trò</Form.Label>
                                <Form.Select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'staff' })}
                                >
                                    <option value="staff">Nhân viên</option>
                                    <option value="admin">Quản trị viên</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-medium">Trạng thái</Form.Label>
                                <Form.Select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                                >
                                    <option value={1}>Hoạt động</option>
                                    <option value={0}>Ngừng hoạt động</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Hiển thị ngày tạo (chỉ khi edit) */}
                            {mode === 'edit' && nhanVienData?.createdAt && (
                                <div className="text-muted small mt-3">
                                    <strong>Ngày tạo:</strong>{' '}
                                    {new Date(nhanVienData.createdAt).toLocaleDateString('vi-VN')}
                                </div>
                            )}
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            {mode === 'add' ? 'Thêm mới' : 'Cập nhật'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}