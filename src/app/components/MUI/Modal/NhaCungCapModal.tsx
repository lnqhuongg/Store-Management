'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  mode: 'add' | 'edit';
  NhaCungCapData?: any;                 // <-- khớp với page của bạn
  onSave: (data: any) => Promise<void>; // gửi data về page để create/update
}

export default function NhaCungCapModal({show, handleClose, mode, NhaCungCapData, onSave}: ModalFormProps) {
  // form state đủ 5 field
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 0 as 0 | 1 // 1=Hoạt động, 0=Tạm ngưng
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Nạp dữ liệu khi mở modal
  useEffect(() => {
    if (show) {
      if (mode === 'edit' && NhaCungCapData) {
        setFormData({
          name: NhaCungCapData.name || '',
          email: NhaCungCapData.email || '',
          phone: NhaCungCapData.phone || '',
          address: NhaCungCapData.address || '',
          status: (NhaCungCapData.status ?? 0) as 0 | 1,
        });
      } else {
        setFormData({ name: '', email: '', phone: '', address: '', status: 0 });
      }
      setErrorMessage('');
    }
  }, [show, mode, NhaCungCapData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Vui lòng nhập tên nhà cung cấp');
      return;
    }

    try {
      await onSave({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        status: formData.status,
      });
      handleClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu');
    }
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Thêm Nhà cung cấp' : 'Sửa Nhà cung cấp'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên Nhà cung cấp </Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên nhà cung cấp"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@domain.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ví dụ: 09xxxxxxxx"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) as 0 | 1 })}
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Tạm ngưng</option>
            </Form.Select>
          </Form.Group>

          {errorMessage && <div className="text-danger mt-1 ms-1 text-xs">{errorMessage}</div>}

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Hủy
            </Button>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              {mode === 'add' ? 'Thêm mới' : 'Cập nhật'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
