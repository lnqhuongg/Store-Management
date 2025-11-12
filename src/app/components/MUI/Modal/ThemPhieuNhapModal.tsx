'use client';
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getAllSuppliers } from "@/app/controllers/NhaCungCap/NhaCungCapController";
import { getAllSP, filterBySupplier } from "@/app/controllers/SanPham/SanPhamControllers";
import { create as createPhieuNhap } from "@/app/controllers/PhieuNhap/PhieuNhapController";

// getAllProducts
interface ModalAddFormProps {
    show: boolean;
    handleClose: () => void;
}

export default function ThemPhieuNhapModal({ show, handleClose }: ModalAddFormProps) {


    const [supplierList, setSupplierList] = useState<any[]>([]);

    const [selectedSupplier, setSelectedSupplier] = useState<any>(supplierList.length > 0 ? supplierList[0] : null);

    const [formData, setFormData] = useState({
        supplierName: selectedSupplier?.name || '',
        quantity: 1,
        price: 1,
        totalAmount: 1,
    });

    const [productList, setProductList] = useState<any[]>([]); // danh sach san pham cua nha cung cap chon
    const [selectedProduct, setSelectedProduct] = useState<any>(productList.length > 0 ? productList[0] : null);

    const [listSelectProducts, setListSelectProducts] = useState<any[]>([]); // danh sach san pham da chon de them vao chi tiet phieu nhap
    useEffect(() => {
        if (!show) {
            // Khi modal đóng -> reset dữ liệu
            setListSelectProducts([]);
            setSelectedProduct(null);
            setFormData({
                supplierName: '',
                quantity: 1,
                price: 1,
                totalAmount: 0,
            });
        }
    }, [show]);


    useEffect(() => {
        async function fetchSuppliers() {
            const res = await getAllSuppliers();
            setSupplierList(res.dataDTO || []);
        }
        fetchSuppliers();
        async function fetchProducts() {
            const res = await getAllSP();
            setProductList(res.dataDTO || []);
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        if (show && productList.length > 0) {
            setSelectedProduct(productList[0]);
        }
    }, [show, productList]);


    useEffect(() => {
        if (supplierList.length > 0 && !selectedSupplier) {
            setSelectedSupplier(supplierList[0]);
        }
    }, [supplierList]);


    useEffect(() => {
        async function fetchProductsBySupplier() {
            if (formData.supplierName) {
                const selectedSupplier = supplierList.find(s => s.name === formData.supplierName);
                if (selectedSupplier) {
                    const res = await filterBySupplier(selectedSupplier.supplierId);
                    console.log("Products by supplier fetched: ", res.dataDTO);
                    setProductList(res.dataDTO || []);
                }
            }
        }
        fetchProductsBySupplier();
    }, [formData.supplierName]);

    const handleRemoveProduct = (index: number) => {
        const newList = [...listSelectProducts];
        newList.splice(index, 1); // xóa sản phẩm tại vị trí index
        setListSelectProducts(newList);
    };


    const handleAddProductToImportDetails = () => {
        if (!selectedProduct) return;

        // Kiểm tra sản phẩm đã tồn tại chưa
        const existingIndex = listSelectProducts.findIndex(
            (item) => item.product.productID === selectedProduct.productID
        );

        if (existingIndex >= 0) {
            // Nếu đã có, tăng số lượng
            const updatedList = [...listSelectProducts];
            updatedList[existingIndex].quantity += formData.quantity; // cộng thêm số lượng mới
            setListSelectProducts(updatedList);
        } else {
            // Nếu chưa có, thêm mới
            setListSelectProducts([
                ...listSelectProducts,
                {
                    product: selectedProduct,
                    quantity: formData.quantity,
                    price: formData.price
                }
            ]);
        }

        // Reset form số lượng, giá
        setFormData({ ...formData, quantity: 1, price: 1 });
    };


    const handleCreateImport = async () => {
        try {
            // neu chua co san pham nao thi bao loi
            if (listSelectProducts.length === 0) {
                alert("Vui lòng thêm sản phẩm vào phiếu nhập trước khi tạo.");
                return;
            }
            console.log("Selected supplier: ", selectedSupplier);
            // Chuẩn bị DTO gửi lên backend
            const dto = {
                supplierId: selectedSupplier?.supplierId,
                userId: 1, // giả sử userId là 1, thay bằng userId thực tế khi có hệ thống đăng nhập
                importDetails: listSelectProducts.map(item => ({
                    productId: item.product.productID,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            console.log("Sending create import request: ", dto);

            // Gọi API (ví dụ)
            var response = await createPhieuNhap(dto);
            if (response.success === false) {
                throw new Error(response.message || "Tạo phiếu nhập thất bại!");
            }
            alert("Tạo phiếu nhập thành công!");
            handleClose();
        } catch (error) {
            console.error(error);
            alert("Tạo phiếu nhập thất bại!");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm phiếu nhập
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
                                        <span className="input-group-text w-50">Chọn sản phẩm</span>
                                        <select
                                            className="form-select"
                                            value={selectedProduct?.productID || ""}
                                            onChange={(e) => {
                                                const prod = productList.find(p => p.productID == e.target.value);
                                                console.log("selected product 1111111111: ", prod);
                                                setSelectedProduct(prod);
                                            }}
                                        >
                                            {productList.length > 0 && productList.map((product: any) => (
                                                <option key={product.productID} value={product.productID}>
                                                    {product.productName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text w-50">Số lượng</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.quantity || 1}
                                            min={1}
                                            onChange={(e) =>
                                                setFormData({ ...formData, quantity: Number(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text w-50">Giá bán</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.price || 1}
                                            min={1}
                                            onChange={(e) =>
                                                setFormData({ ...formData, price: Number(e.target.value) })
                                            }
                                        />
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                        // Handle adding product to the import details
                                        handleAddProductToImportDetails();
                                    }}
                                >
                                    Thêm sản phẩm
                                </button>
                            </div>
                        </Col>

                        {/* --- Phần chi tiết phiếu nhập bên phải --- */}
                        <Col md={8}>
                            <div className="d-flex flex-column gap-3">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text w-25">Nhà cung cấp</span>
                                    <select
                                        className="form-select"

                                        value={formData.supplierName || ""}
                                        onChange={(e) => {
                                            const sp = supplierList.find(s => s.name === e.target.value);
                                            setFormData({ ...formData, supplierName: e.target.value });
                                            setSelectedSupplier(sp);
                                        }}
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
                                            {listSelectProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5}>Chưa có sản phẩm nào được thêm.</td>
                                                </tr>
                                            ) : (
                                                listSelectProducts.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.product?.productName}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price.toLocaleString('vi-VN')}đ</td>
                                                        <td>{(item.quantity * item.price).toLocaleString('vi-VN')}đ</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleRemoveProduct(index)}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
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
                                        value={listSelectProducts.reduce((sum, item) => sum + item.quantity * item.price, 0).toLocaleString('vi-VN') + "đ"}
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
                        <Button variant="success" onClick={handleCreateImport}>
                            Thêm phiếu nhập
                        </Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    );
}
