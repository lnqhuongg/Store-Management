'use client';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'edit';     // chế độ: thêm hay sửa
    SanPhamData?: any;           // dữ liệu cũ khi sửa
}

export default function SanPhamModalForm({ show, handleClose, mode, SanPhamData }: ModalFormProps) {
    const [formData, setFormData] = useState({ id: '', tenSP: '', loaiSP: '', ncc: '', tonKho: '', gia: '', barcode: ''});
    // Nếu là edit thì khi mở modal, nạp sẵn dữ liệu vào form
    useEffect(() => {
        if (mode === "edit" && SanPhamData) {
            setFormData(SanPhamData);
        } else {
            setFormData({ id: '', tenSP: '', loaiSP: '', ncc: '', tonKho: '', gia: '', barcode: ''});
        }
    }, [mode, SanPhamData]);

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
        <Modal show={show} onHide={handleClose} centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className='d-flex flex-column'>
                    <div className='d-flex justify-content-between gap-3 mb-3'>
                        <div className=''>
                            {mode == 'edit' ? (
                                <img src="/img/sanpham/1.jpg" alt="" />
                            ) : (
                                <img src="..." alt="Chưa có ảnh" />
                            )}
                            
                            <Form.Group>
                                <div className="input-group mt-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" />
                                    <label className="input-group-text">Upload</label>
                                </div>
                            </Form.Group>
                        </div>
                        <div className='w-50'>
                            {mode == 'edit' ? (
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    {/* <Form.Control
                                        type="text"
                                        value={formData.tenSP}
                                        onChange={(e) => setFormData({ ...formData, tenSP: e.target.value })}
                                    /> */}
                                    <div className="input-group">
                                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
                                        <span className="input-group-text">{SanPhamData.unit}</span>
                                    </div>
                                </Form.Group>
                            ): (
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Nhập tên sản phẩm'
                                    />
                                </Form.Group>
                            )}
                            
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Tồn kho</Form.Label>
                                <Form.Control
                                    type="number"
                                />
                            </Form.Group> */}
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Form.Select value={formData.loaiSP} onChange={(e) => setFormData({ ...formData, loaiSP: e.target.value })}> 
                                        <option value="Áo thun">Áo thun</option>
                                        <option value="Quần jean">Quần jean</option>
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Form.Select> 
                                        <option value="Áo thun">Áo thun</option>
                                        <option value="Quần jean">Quần jean</option>
                                    </Form.Select>
                                </Form.Group>
                            )}
                            
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nhà cung cấp</Form.Label>
                                    <Form.Select value={formData.ncc} onChange={(e) => setFormData({ ...formData, ncc: e.target.value })}>
                                        <option value="Vinamilk">Vinamilk</option>
                                        <option value="TH true milk">TH true milk</option>
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Nhà cung cấp</Form.Label>
                                    <Form.Select>
                                        <option value="">Vinamilk</option>
                                        <option value="">TH true milk</option>
                                    </Form.Select>
                                </Form.Group>
                            )}
                            
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Đơn giá</Form.Label>
                                    <Form.Control type='text' value={formData.gia} onChange={(e) => setFormData({ ...formData, gia: e.target.value })}/>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Đơn giá</Form.Label>
                                    <Form.Control type='text'/>
                                </Form.Group>
                            )}
                            
                            {mode == 'edit' ? (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Barcode</Form.Label>
                                    <Form.Control type='text' value={formData.barcode} onChange={(e) => setFormData({ ...formData,barcode: e.target.value })}/>
                                </Form.Group>
                            ) : (
                                <Form.Group className='mb-3'>
                                    <Form.Label>Barcode</Form.Label>
                                    <Form.Control type='text'/>
                                </Form.Group>
                            )}
                            

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

                            
                        </div>
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
