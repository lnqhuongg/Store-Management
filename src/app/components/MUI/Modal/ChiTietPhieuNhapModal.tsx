'use client';
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getAllSuppliers } from "@/app/services/suppliers/supplierService";

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    PhieuNhapData?: any;
}

export default function ChiTietPhieuNhapModal({ show, handleClose, PhieuNhapData }: ModalFormProps) {
    console.log("PhieuNhapData in modal: ", PhieuNhapData);

    const [formData, setFormData] = useState({
        import_id: PhieuNhapData?.importId || '',
        import_date: PhieuNhapData?.importDate || '',
        supplierName: PhieuNhapData?.supplierName || '',
        staffName: PhieuNhapData?.staffName || '',
        totalAmount: PhieuNhapData?.totalAmount || 0,
    });

    const [productList, setProductList] = useState(PhieuNhapData?.importDetails || []);
    const [selectedProduct, setSelectedProduct] = useState<any>(productList.length > 0 ? productList[0].product : null);

    const [supplierList, setSupplierList] = useState<any[]>([]);

    console.log("selectedProduct: ", selectedProduct);
    console.log("supplierList: ", supplierList);

    // Khi PhieuNhapData thay đổi (VD: mở modal mới)
    useEffect(() => {
        if (PhieuNhapData) {
            setFormData({
                import_id: PhieuNhapData.importId || '',
                import_date: PhieuNhapData.importDate || '',
                supplierName: PhieuNhapData.supplierName || '',
                staffName: PhieuNhapData.staffName || '',
                totalAmount: PhieuNhapData.totalAmount || 0,
            });
            setProductList(PhieuNhapData.importDetails || []);
        }
    }, [PhieuNhapData]);

    useEffect(() => {
        async function fetchSuppliers() {
            const res = await getAllSuppliers(); // giả sử đây là API trả về array
            console.log("Suppliers fetched: ", res.dataDTO);
            setSupplierList(res.dataDTO || []);
        }
        fetchSuppliers();
    }, []);

    return (
        <Modal show={show} onHide={handleClose} centered size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>
                    Chi tiết phiếu nhập
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); }}>
                    <Row className="mb-4">
                        {/* --- Phần thông tin sản phẩm bên trái --- */}
                        <Col md={4} className="border-end">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <img
                                    src="/sanpham/1.jpg"
                                    alt="Sản phẩm"
                                    className="rounded shadow-sm"
                                    style={{ width: '100%', maxWidth: 200, height: 'auto' }}
                                />
                                <div className="w-100 d-flex flex-column gap-2">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text w-50">Tên sản phẩm</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={selectedProduct?.productName || ""}
                                            disabled
                                            onChange={() => { }}
                                        />
                                    </div>
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text w-50">Loại</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={selectedProduct?.categoryID || ""}
                                            disabled
                                            onChange={() => { }}
                                        />
                                    </div>
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text w-50">Giá bán</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={selectedProduct?.price?.toLocaleString('vi-VN') + "đ" || ""}
                                            disabled
                                            onChange={() => { }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </Col>

                        {/* --- Phần chi tiết phiếu nhập bên phải --- */}
                        <Col md={8}>
                            <div className="d-flex flex-column gap-3">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text w-25">Ngày nhập</span>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={formData.import_date || ""}
                                        disabled
                                        onChange={(e) =>
                                            setFormData({ ...formData, import_date: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text w-25">Nhà cung cấp</span>
                                    <select
                                        className="form-select"
                                        disabled
                                        value={formData.supplierName || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, supplierName: e.target.value })
                                        }
                                    >
                                        {supplierList.length > 0 && supplierList.map((supplier: any) => (
                                            <option key={supplier.supplierId} value={supplier.name}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-3 table-wrapper"
                                    style={{
                                        maxHeight: '250px',
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
                                            {productList.map((item: any, index: number) => (
                                                <tr
                                                    key={index}
                                                    onClick={() => {
                                                        console.log("Chọn sản phẩm:", item);
                                                        setSelectedProduct(item.product);
                                                    }}
                                                    className={selectedProduct?.productID === item.product.productID ? "selected-row" : ""}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{item.product.productName}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price?.toLocaleString('vi-VN')}</td>
                                                    <td>{item.subtotal}đ</td>
                                                </tr>
                                            ))}
                                            {productList.length === 0 && (
                                                <tr><td colSpan={5}>Chưa có sản phẩm nào</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="sticky-bottom p-1">
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">Tổng tiền</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.totalAmount?.toLocaleString('vi-VN') + "đ" || "0"}
                                        disabled
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* --- Nút hành động --- */}
                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Đóng
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
