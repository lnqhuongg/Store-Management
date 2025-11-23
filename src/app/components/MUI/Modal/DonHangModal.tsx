'use client';
import { Modal, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getCustomersForDropdown, getProductsForDropdown, IDonHang, IChiTietDonHang } from '@/app/controllers/DonHang/DonHangController';

interface ModalFormProps {
    show: boolean;
    handleClose: () => void;
    mode: 'add' | 'view';       // add: thêm, view: xem chi tiết
    DonHangData?: any;          // dữ liệu cũ khi xem
    onSave: (data: any) => Promise<void>; 
}

export default function DonHangModal({ show, handleClose, mode, DonHangData, onSave }: ModalFormProps) {
    // 1. STATE FORM CHÍNH
    const [customerId, setCustomerId] = useState<number | string>('');
    const [orderDate, setOrderDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [cartItems, setCartItems] = useState<IChiTietDonHang[]>([]);

    // 2. STATE PHỤ TRỢ (Dropdown & Input tạm)
    const [listKhach, setListKhach] = useState<any[]>([]);
    const [listSanPham, setListSanPham] = useState<any[]>([]);
    
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState('');

    // Load dữ liệu Dropdown khi mở Modal
    useEffect(() => {
        if (show) {
            const fetchDropdowns = async () => {
                try {
                    const khach = await getCustomersForDropdown();
                    const sp = await getProductsForDropdown();
                    setListKhach(khach);
                    setListSanPham(sp);
                } catch (e) { console.error(e); }
            };
            fetchDropdowns();
        }
    }, [show]);

    // Fill dữ liệu khi mở (Reset hoặc Load Detail)
    useEffect(() => {
        if (show) {
            const fetchData = async () => {
                try {
                    const resSP = await getProductsForDropdown();
                    
                    // 👇 CHÈN ĐOẠN LOG NÀY VÀO 👇
                    if (resSP && resSP.data && resSP.data.length > 0) {
                        const sanPhamMau = resSP.data[0]; // Lấy thằng đầu tiên ra soi
                        
                        console.group("🔍 SOI DỮ LIỆU SẢN PHẨM");
                        console.log("1. Dữ liệu thô:", sanPhamMau);
                        console.log("2. TÊN CÁC TRƯỜNG (KEYS):", Object.keys(sanPhamMau)); 
                        // 👆 Dòng này quan trọng nhất: Nó sẽ in ra ['productID', 'tenSp', ...]
                        console.groupEnd();
                    }
                    // 👆 HẾT ĐOẠN LOG 👆

                    if (resSP && resSP.data) setListSanPham(resSP.data);
                    // ... (code khách hàng giữ nguyên)
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [show]);

    // Xử lý thêm sản phẩm vào danh sách tạm
    const handleAddItem = () => {
        // 1. Kiểm tra xem đã chọn sản phẩm chưa
        if (!selectedProductId) {
            alert("Vui lòng chọn sản phẩm trước!");
            return;
        }

        // 2. Log kiểm tra xem đang tìm ID nào (F12 để xem)
        console.log("Đang tìm sản phẩm có ID:", selectedProductId);

        // 3. Tìm sản phẩm (So sánh lỏng '==' để bỏ qua khác biệt chuỗi/số)
        const sp = listSanPham.find(x => {
            // Lấy ID thực tế (thử cả 3 trường hợp phổ biến)
            const realId = x.productID || x.productId || x.id; 
            return realId == selectedProductId; // Dùng 2 dấu bằng (==) để so sánh chuỗi với số đều được
        });

        if (!sp) {
            console.error("❌ LỖI: Không tìm thấy sản phẩm trong danh sách!", listSanPham);
            alert("Có lỗi xảy ra: Không tìm thấy dữ liệu sản phẩm.");
            return;
        }

        // 4. Logic thêm vào giỏ hàng (Giữ nguyên logic cũ của bạn nhưng sửa tên biến)
        // Lấy ID chuẩn để dùng
        const finalId = sp.productID || sp.productId || sp.id; 
        const existIndex = cartItems.findIndex(x => (x.productID || x.productId) == finalId);

        if (existIndex > -1) {
            const newCart = [...cartItems];
            newCart[existIndex].quantity += Number(quantity);
            newCart[existIndex].subtotal = (newCart[existIndex].price || 0) * newCart[existIndex].quantity;
            setCartItems(newCart);
        } else {
            const newItem: IChiTietDonHang = {
                // Chỉ giữ lại productID (chữ D hoa) cho đúng với Interface
                productId: finalId, 
                

                productName: sp.productName || sp.tenSanPham || sp.ProductName, 
                price: sp.price || sp.donGia || sp.Price || 0,
                quantity: Number(quantity),
                subtotal: (sp.price || sp.donGia || sp.Price || 0) * Number(quantity)
            };
            setCartItems([...cartItems, newItem]);
        }
        
        // Reset ô nhập
        setQuantity(1);
        setSelectedProductId(''); 
    };

    // Xử lý xóa sản phẩm khỏi danh sách tạm
    const handleRemoveItem = (index: number) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
    };

    // Tính tổng tiền
    const calculateTotal = () => cartItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);

    // HANDLE SUBMIT
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🛑 CUSTOMER ID STATE:", customerId);

        // 1. Validate dữ liệu
        if (!customerId) {
            alert("Vui lòng chọn khách hàng!");
            return;
        }
        if (cartItems.length === 0) {
            alert("Vui lòng thêm ít nhất 1 sản phẩm!");
            return;
        }

        // 2. Chuẩn bị Payload đúng chuẩn DTO Backend yêu cầu
        const payload: IDonHang = {
            // Backend: public int? CustomerId
            customerId: Number(customerId), 
            
            // Backend: public DateTime? OrderDate
            orderDate: new Date(orderDate).toISOString(), 
            
            // Backend: public decimal? TotalAmount
            totalAmount: calculateTotal(),
            
            // Backend: public List<ChiTietDonHangDTO>? Items
            items: cartItems.map(item => {
                // Xử lý ID sản phẩm: Frontend có thể là productID (hoa) hoặc productId (thường)
                // Nhưng DTO ChiTietDonHangDTO yêu cầu: ProductId
                // => JSON gửi đi nên là: productId (chữ d thường)
                const finalPrdId = item.productID || item.productId;

                return {
                    productId: Number(finalPrdId), // Ép kiểu số cho chắc
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                    subtotal: Number(item.subtotal)
                    // Không cần gửi ProductName vì Backend chỉ cần ID để lưu
                };
            })
        };

        console.log("🚀 PAYLOAD GỬI ĐI:", payload); // Check log này xem productId có số chưa

        // 3. Gửi đi
        onSave(payload);
        // handleClose(); // Tạm đóng để debug
    };

    if (!show) return null;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "add" ? "Tạo Đơn Hàng Mới" : "Chi Tiết Đơn Hàng"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* HÀNG 1: KHÁCH HÀNG & NGÀY */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Khách hàng <span className="text-danger">*</span></Form.Label>
                                <Form.Select 
                                    value={customerId}
                                    onChange={e => setCustomerId(e.target.value)}
                                    disabled={mode === 'view'}
                                >
                                    <option value="">-- Chọn khách hàng --</option>
                                    {listKhach.map(c => (
                                        <option key={c.customerId} value={c.customerId}>{c.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Ngày lập</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={orderDate}
                                    onChange={e => setOrderDate(e.target.value)}
                                    disabled={mode === 'view'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* KHU VỰC CHỌN SẢN PHẨM (Chỉ hiện khi Add) */}
                    {mode === 'add' && (
                        <div className="p-3 mb-3 bg-light border rounded">
                            <Row className="align-items-end">
                                <Col md={6}>
                                    <Form.Label>Sản phẩm</Form.Label>
                                    <Form.Select 
    value={selectedProductId}
    onChange={e => setSelectedProductId(e.target.value)}
>
    <option value="">-- Chọn sản phẩm --</option>
    
    {listSanPham.map((sp, index) => {
        // Lấy ID chuẩn từ dữ liệu API (nhìn log thấy là productID)
        const realId = sp.productID || sp.productId || sp.id;
        
        return (
            <option 
                key={realId || index} 
                // 👇 QUAN TRỌNG NHẤT: Phải gán value là ID
                value={realId} 
            >
                {/* Phần hiển thị giữ nguyên */}
                {sp.productName || sp.tenSanPham} - {(sp.price || sp.donGia)?.toLocaleString()} đ
            </option>
        );
    })}
</Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control 
                                        type="number" min="1"
                                        value={quantity}
                                        onChange={e => setQuantity(Number(e.target.value))}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Button variant="primary" className="w-100" onClick={handleAddItem}>
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* BẢNG CHI TIẾT */}
                    <Table bordered hover size="sm">
                        <thead className="table-secondary">
                            <tr>
                                <th>Sản phẩm</th>
                                <th className="text-center">Đơn giá</th>
                                <th className="text-center">SL</th>
                                <th className="text-end">Thành tiền</th>
                                {mode === 'add' && <th>Xóa</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.productName}</td>
                                    <td className="text-center">{item.price?.toLocaleString()}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-end">{item.subtotal?.toLocaleString()}</td>
                                    {mode === 'add' && (
                                        <td className="text-center">
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveItem(idx)}>X</Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="text-end fw-bold">TỔNG CỘNG:</td>
                                <td className="text-end fw-bold text-danger fs-5">
                                    {calculateTotal().toLocaleString()} đ
                                </td>
                                {mode === 'add' && <td></td>}
                            </tr>
                        </tfoot>
                    </Table>

                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Đóng
                        </Button>
                        {mode === "add" && (
                            <Button variant="success" type="submit" onClick={handleSubmit}>
                                Lưu đơn hàng
                            </Button>
                        )}
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}