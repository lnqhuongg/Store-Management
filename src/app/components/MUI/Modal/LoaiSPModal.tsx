'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';     // chế độ: thêm hay sửa
    LoaiSPData?: any;           // dữ liệu cũ khi sửa
}

export default function ModalForm({ show, handleClose, mode, LoaiSPData }: ModalFormProps) {
    const [formData, setFormData] = useState({ tenLoaiSP: '' });
    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (mode === "edit" && LoaiSPData) {
            setFormData(LoaiSPData);
        } else {
            setFormData({ tenLoaiSP: "" });
        }
    }, [mode, LoaiSPData]);

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
                            //   value={formData.name}
                            //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder='Nhập tên loại sản phẩm'

                        />
                    </Form.Group>

                    {/* tui lấy trường này ví dụ cho mng làm cái nút edit chứ thật chất ko có  */}

                    {mode === "edit" && (
                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
