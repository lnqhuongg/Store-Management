import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface MaGiamGiaModalProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';
    MaGiamGiaData: any;
}

export default function MaGiamGiaModal({ show, handleClose, mode, MaGiamGiaData }: MaGiamGiaModalProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý logic thêm/sửa ở đây
        console.log('Submit', mode, MaGiamGiaData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === 'add' ? 'Thêm mã giảm giá' : 'Sửa mã giảm giá'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Mã giảm giá</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nhập mã giảm giá"
                            defaultValue={mode === 'edit' ? MaGiamGiaData?.code : ''}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            placeholder="Nhập mô tả"
                            defaultValue={mode === 'edit' ? MaGiamGiaData?.description : ''}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Giá trị giảm (%)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Nhập giá trị giảm"
                            defaultValue={mode === 'edit' ? MaGiamGiaData?.discount : ''}
                            min="0"
                            max="100"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày bắt đầu</Form.Label>
                        <Form.Control 
                            type="date"
                            defaultValue={mode === 'edit' ? MaGiamGiaData?.startDate : ''}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control 
                            type="date"
                            defaultValue={mode === 'edit' ? MaGiamGiaData?.endDate : ''}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Select defaultValue={mode === 'edit' ? MaGiamGiaData?.status : 'Đang hoạt động'}>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Hết hạn">Hết hạn</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {mode === 'add' ? 'Thêm' : 'Cập nhật'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}