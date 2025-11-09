'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';     // chế độ: thêm hay sửa
    LoaiSPData?: any;           // dữ liệu cũ khi sửa
    onSave: (data: any) => Promise<void>; // xử lý lưu -- hàm kiểu void
}

export default function ModalForm({ show, handleClose, mode, LoaiSPData, onSave }: ModalFormProps) {
    // khởi tạo biến formData trong đó tên loại sp = ''
    const [formData, setFormData] = useState({ categoryName: '' });

    // dùng message này để xuất ra thông báo khi validate
    const [errorMessage, setErrorMessage] = useState('');




    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
    if (show) { // MỖI KHI MODAL MỞ
        if (mode === 'edit' && LoaiSPData) {
            setFormData({ categoryName: LoaiSPData.categoryName || '' });
        } else {
            setFormData({ categoryName: '' });
        }
        setErrorMessage(''); // RESET LỖI MỖI LẦN MỞ
    }
    }, [show, mode, LoaiSPData]);




    // handle submit xác định nút đó là add hay sửa
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ko reload lại trang mỗi khi bấm nút thêm / cập nhật trên modal
        setErrorMessage('');

        if (!formData.categoryName.trim()) {
            setErrorMessage("Vui lòng nhập tên sản phẩm");
            return;
        }
        // lưu dữ liệu -- cái onsave này nó gửi đến handlesave ở bên giao diện LoaiSanPham
        try {
            await onSave({
                categoryName: formData.categoryName.trim()
            });
            handleClose();
        } catch (err: any) {
            setErrorMessage(err.message || 'Lỗi khi lưu');
        }
    };

    

    // show = true -> mo modal 
    if (!show) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Thêm Loại sản phẩm" : "Sửa Loại sản phẩm"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên Loại sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.categoryName}
                            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                            placeholder='Nhập tên loại sản phẩm'

                        />
                        {errorMessage && <div className="text-danger mt-1 ms-1 text-xs">{errorMessage}</div>}
                    </Form.Group>
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
