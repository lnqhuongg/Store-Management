'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface NhanVienModalProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit'; // chế độ: thêm hay sửa
    nhanVienData?: {
        id: number;
        tenNhanVien: string;
        email: string;
        chucVu: string;
        trangThai: string;
    }; // dữ liệu cũ khi sửa
    onSubmit: (formData: any) => void; // Hàm xử lý khi submit
}

export default function NhanVienModal({ show, handleClose, mode, nhanVienData, onSubmit }: NhanVienModalProps) {
    const [formData, setFormData] = useState({
        id: 0,
        tenNhanVien: '',
        email: '',
        chucVu: 'Nhân viên',
        trangThai: 'Đang làm việc', // Mặc định trạng thái khi thêm mới
    });

    const [errors, setErrors] = useState({
        tenNhanVien: false,
        email: false,
        chucVu: false,
    });

    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (mode === 'edit' && nhanVienData) {
            setFormData(nhanVienData); // Nạp dữ liệu từ nhanVienData
        } else {
            setFormData({
                id: Math.floor(Math.random() * 1000), // Tạo ID ngẫu nhiên khi thêm mới
                tenNhanVien: '',
                email: '',
                chucVu: 'Nhân viên',
                trangThai: 'Đang làm việc',
            });
        }
    }, [mode, nhanVienData]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {
            tenNhanVien: formData.tenNhanVien.trim() === '',
            email: formData.email.trim() === '',
            chucVu: formData.chucVu.trim() === '',
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        onSubmit(formData); // Gọi hàm xử lý submit từ props
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'add' ? 'Thêm mới Nhân viên' : 'Chỉnh sửa Nhân viên'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ID Nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.id}
                            name="id"
                            readOnly // Không cho sửa ID
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên Nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.tenNhanVien}
                            name="tenNhanVien"
                            onChange={handleChange}
                            placeholder="Nhập tên nhân viên"
                            isInvalid={errors.tenNhanVien}
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập tên nhân viên.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Nhập email"
                            isInvalid={errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Chức vụ</Form.Label>
                        <Form.Select
                            value={formData.chucVu}
                            name="chucVu"
                            onChange={handleChange}
                            isInvalid={errors.chucVu}
                        >
                            <option value="Quản lý">Quản lý</option>
                            <option value="Nhân viên">Nhân viên</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Vui lòng chọn chức vụ.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {mode === 'edit' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                value={formData.trangThai} // Hiển thị trạng thái hiện tại
                                name="trangThai"
                                onChange={handleChange}
                            >
                                <option value="Đang làm việc">Đang làm việc</option>
                                <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                            </Form.Select>
                        </Form.Group>
                    )}
                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Hủy
                        </Button>
                        <Button variant="success" type="submit">
                            {mode === 'add' ? 'Thêm mới' : 'Cập nhật'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}