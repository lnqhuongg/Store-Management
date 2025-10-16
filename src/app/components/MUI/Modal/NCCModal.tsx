'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';     // chế độ: thêm hay sửa
    NCCData?: any;           // dữ liệu cũ khi sửa
}

interface NCCFormData {
  id?: number;
  tenNcc: string;
  sdt: string;
  email: string;
  adress: string; 
}

export default function ModalForm({ show, handleClose, mode, NCCData }: ModalFormProps) {
    const [formData, setFormData] = useState<NCCFormData>({
    tenNcc: '',
    sdt: '',
    email: '',
    adress: '',
  });

    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (!show) return; // chỉ sync khi modal mở
        if (mode === 'edit' && NCCData) {
        setFormData({
            id: NCCData.id ?? '',
            tenNcc: NCCData.tenNcc ?? '',
            sdt: NCCData.sdt ?? '',
            email: NCCData.email ?? '',
            adress: NCCData.adress ?? '',
        });
    }   else  {
        setFormData({ tenNcc: '', sdt: '', email: '', adress: '' });
    }
    },  [mode, NCCData, show]);  // thêm show để khi mở lại modal vẫn sync dữ liệu mới

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
                    {mode === "add" ? "Thêm Nhà cung cấp" : "Sửa Nhà cung cấp"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <Form.Group>
                        <div className="mb-3">
                        <Form.Label>Tên Nhà cung cấp</Form.Label>
                       <Form.Control
                            type="text"
                            name="tenNcc"
                            value={formData.tenNcc}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, tenNcc: e.target.value }))
                            }
                            placeholder="Nhập tên nhà cung cấp"
                        />
                        </div>
                        <div className="mb-3">
                        <Form.Label>SĐT</Form.Label>
                        <Form.Control
                            type="text"
                            name="sdt"
                            value={formData.sdt}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, sdt: e.target.value }))
                            }
                            //   value={formData.name}
                            //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder='Nhập SĐT'

                        />
                        </div>
                        <div className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, email: e.target.value }))
                            }
                            //   value={formData.name}
                            //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder='Nhập email'

                        />
                        </div>
                        <div className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="adress"
                            value={formData.adress}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, adress: e.target.value }))
                            }
                            //   value={formData.name}
                            //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder='Nhập địa chỉ'

                        />
                        </div>
                        </Form.Group>
                    </div>

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
