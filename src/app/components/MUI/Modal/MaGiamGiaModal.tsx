'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IMaGiamGia } from '@/app/controllers/MaGiamGia/MaGiamGiaController';

interface MaGiamGiaModalProps {
  show: boolean;
  handleClose: () => void;
  mode: 'add' | 'edit';
  MaGiamGiaData?: IMaGiamGia | null;
  onSave?: (payload: IMaGiamGia) => Promise<void> | void;
}

export default function MaGiamGiaModal({
  show,
  handleClose,
  mode,
  MaGiamGiaData,
  onSave,
}: MaGiamGiaModalProps) {
  const [form, setForm] = useState<IMaGiamGia>({
    promoCode: '',
    description: '',
    discountValue: 0,
    discountType: '',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  // 🔄 Khi mở modal → load dữ liệu (nếu edit)
  useEffect(() => {
    if (!show) return;

    if (mode === 'edit' && MaGiamGiaData) {
      setForm({
        promoId: MaGiamGiaData.promoId,
        promoCode: MaGiamGiaData.promoCode ?? '',
        description: MaGiamGiaData.description ?? '',
        discountValue: MaGiamGiaData.discountValue ?? 0,
        discountType: MaGiamGiaData.discountType ?? '',
        startDate: MaGiamGiaData.startDate
          ? MaGiamGiaData.startDate.split('T')[0]
          : '',
        endDate: MaGiamGiaData.endDate
          ? MaGiamGiaData.endDate.split('T')[0]
          : '',
        status: MaGiamGiaData.status ?? 'active',
      });
    } else {
      // Reset form khi thêm mới
      setForm({
        promoCode: '',
        description: '',
        discountValue: 0,
        discountType: '',
        startDate: '',
        endDate: '',
        status: 'active',
      });
    }
  }, [show, mode, MaGiamGiaData]);

  // 🔁 Handle change input
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'discountValue' ? Number(value) : value,
    }));
  };

  // 💾 Gửi form
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (onSave) await onSave(form);
    handleClose();
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === 'add' ? 'Thêm mã giảm giá' : 'Sửa mã giảm giá'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Mã giảm giá */}
          <Form.Group className="mb-3">
            <Form.Label>Mã giảm giá</Form.Label>
            <Form.Control
              name="promoCode"
              value={form.promoCode}
              onChange={handleChange}
              type="text"
              placeholder="Nhập mã giảm giá"
              required
            />
          </Form.Group>

          {/* Mô tả */}
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              name="description"
              value={form.description ?? ''}
              onChange={handleChange}
              as="textarea"
              rows={3}
              placeholder="Nhập mô tả"
            />
          </Form.Group>

          {/* Giá trị giảm */}
          <Form.Group className="mb-3">
            <Form.Label>Giá trị giảm</Form.Label>
            <Form.Control
              name="discountValue"
              value={form.discountValue ?? 0}
              onChange={handleChange}
              type="number"
              min={0}
              placeholder="Nhập giá trị giảm"
            />
          </Form.Group>

          {/* Loại giảm */}
          <Form.Group className="mb-3">
            <Form.Label>Loại giảm</Form.Label>
            <Form.Select
              name="discountType"
              value={form.discountType ?? ''}
              onChange={handleChange}
            >
              <option value="">Chọn loại giảm</option>
              <option value="percent">Phần trăm</option>
              <option value="fixed">Tiền</option>
            </Form.Select>
          </Form.Group>

          {/* Ngày bắt đầu */}
          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              name="startDate"
              value={form.startDate ?? ''}
              onChange={handleChange}
              type="date"
            />
          </Form.Group>

          {/* Ngày kết thúc */}
          <Form.Group className="mb-3">
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control
              name="endDate"
              value={form.endDate ?? ''}
              onChange={handleChange}
              type="date"
            />
          </Form.Group>

          {/* Trạng thái */}
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={form.status ?? 'active'}
              onChange={handleChange}
            >
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {mode === 'add' ? 'Thêm' : 'Cập nhật'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
