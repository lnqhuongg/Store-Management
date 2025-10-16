'use client';

import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'detail';     // chế độ: thêm hay sửa
    PhieuNhapData?: any;           // dữ liệu cũ khi sửa
}

export default function PhieuNhapModal({show, handleClose, mode, PhieuNhapData} : ModalFormProps) {
    const [formData, setFormData] = useState({
        import_id: '',
        inport_date: '',
        supplier_id: '',
        total_amount: ''
    });

    

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
        <Modal show={show} onHide={handleClose} centered size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Thêm phiếu nhập" : "Chi tiết phiếu nhập"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className='d-flex flex-column'>
                    
                    {/* --- Phần thông tin sản phẩm --- */}
                    <Row className="mb-4">
                        <Col md={4} className="border-end">
                        <div className="d-flex flex-column align-items-center gap-3">
                            <img
                            src="/img/sanpham/1.jpg"
                            alt="Sản phẩm"
                            className="rounded shadow-sm"
                            style={{ width: '100%', maxWidth: 200, height: 'auto' }}
                            />
                            <div className="w-100 d-flex flex-column gap-2">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text w-50">Tên sản phẩm</span>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="input-group input-group-sm">
                                <span className="input-group-text w-50">Loại</span>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="input-group input-group-sm">
                                <span className="input-group-text w-50">Tồn kho</span>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="input-group input-group-sm">
                                <span className="input-group-text w-50">Giá bán</span>
                                <input type="text" className="form-control" />
                            </div>
                            </div>
                            <div className="">
                                <button className="btn btn-primary btn-sm">Xác nhận thêm danh sách</button>
                            </div>
                        </div>
                        </Col>

                        {/* --- Phần chi tiết phiếu nhập --- */}
                        <Col md={8}>
                        <div className="d-flex flex-column gap-3">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text w-25">Sản phẩm</span>
                                <select className="form-select" aria-label="Default select example">
                                    <option>Chọn sản phẩm</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="input-group input-group-sm">
                            <span className="input-group-text w-25">Ngày nhập</span>
                            <input type="datetime-local" className="form-control" />
                            </div>
                            <div className="input-group input-group-sm">
                            <span className="input-group-text w-25">Nhà cung cấp</span>
                            <select className="form-select" aria-label="Default select example">
                                <option>Chọn nhà cung cấp</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            </div>
                            {/* <div className="input-group input-group-sm">
                            <span className="input-group-text w-25">Tổng tiền</span>
                            <input type="number" className="form-control" />
                            </div> */}
                            
                            <div className="mt-3 table-wrapper"
                                style={{
                                    maxHeight: '250px',   // hoặc 400px tùy chiều cao modal
                                    overflowY: 'auto',
                                    border: '1px solid #dee2e6',
                                    borderRadius: '6px'
                            }}>
                            
                            <table className="table table-bordered table-sm text-center">
                                <thead className="table-light sticky-top">
                                <tr>
                                    <th>#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Áo thun SGU</td>
                                        <td>10</td>
                                        <td>120.000</td>
                                        <td>1.200.000</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Áo đồng phục CNTT</td>
                                        <td>9</td>
                                        <td>150.000</td>
                                        <td>1.350.000</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Quần thể dục SGU</td>
                                        <td>6</td>
                                        <td>100.000</td>
                                        <td>600.000</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Quần jean nhà Whose</td>
                                        <td>3</td>
                                        <td>283.000</td>
                                        <td>849.000</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Áo khoác hiphop never die</td>
                                        <td>4</td>
                                        <td>156.000</td>
                                        <td>624.000</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Áo dài truyền thống Việt Nam</td>
                                        <td>11</td>
                                        <td>420.000</td>
                                        <td>4.620.000</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Quần kaki basic</td>
                                        <td>9</td>
                                        <td>143.000</td>
                                        <td>1.287.000</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

                            </div>
                            
                        </div>
                        <div className="sticky-bottom p-1">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text" id="inputGroup-sizing-lg">Tổng tiền</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                            </div>
                        </div>
                        </Col>
                    </Row>

                    {/* --- Nút hành động --- */}
                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                        Hủy
                        </Button>
                        {mode === "add" && (
                        <Button variant="success" type="submit">
                            Thêm mới
                        </Button>
                        )}
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    ); 

}