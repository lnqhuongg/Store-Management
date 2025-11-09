import { Modal, Row, Col, Table } from "react-bootstrap";

interface SanPham {
    tenSanPham: string;
    soLuong: number;
    donGia: number;
    thanhTien: number;
}

interface ModalDetailDonHangProps {
    show: boolean;
    handleClose: () => void;
    DonHangData?: any;
}

export default function ModalDetailDonHang({
    show,
    handleClose,
    DonHangData,
}: ModalDetailDonHangProps) {
    if (!DonHangData) return null;

    const sanPhamMau: SanPham[] = [
        {
            tenSanPham: "Áo thun nam cổ tròn",
            soLuong: 2,
            donGia: 150000,
            thanhTien: 300000,
        },
        {
            tenSanPham: "Quần jean nữ",
            soLuong: 1,
            donGia: 350000,
            thanhTien: 350000,
        },
        {
            tenSanPham: "Giày thể thao Adidas",
            soLuong: 1,
            donGia: 1200000,
            thanhTien: 1200000,
        },
        {
            tenSanPham: "Mũ lưỡi trai Nike",
            soLuong: 3,
            donGia: 200000,
            thanhTien: 600000,
        },
    ];


    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl" // rộng hơn bình thường
        >
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng #{DonHangData.id}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    {/* --- Cột trái: Thông tin đơn hàng --- */}
                    <Col md={5} style={{ borderRight: "1px solid #ddd" }}>
                        <h5 className="mb-3">Thông tin đơn hàng</h5>

                        <p><strong>Khách hàng:</strong> {DonHangData.customer}</p>
                        <p><strong>Nhân viên:</strong> {DonHangData.staff}</p>
                        <p><strong>Mã giảm giá:</strong> {DonHangData.coupon}</p>
                        <p><strong>Giảm giá:</strong> {DonHangData.discount}</p>
                        <p><strong>Ngày mua:</strong> {DonHangData.date}</p>
                        <p><strong>Tổng tiền:</strong> {DonHangData?.total?.toLocaleString()} đ</p>
                    </Col>

                    {/* --- Cột phải: Danh sách sản phẩm --- */}
                    <Col md={7}>
                        <h5 className="mb-3">Danh sách sản phẩm</h5>
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sanPhamMau.map((sp, index) => (
                                    <tr key={index}>
                                        <td>{sp.tenSanPham}</td>
                                        <td>{sp.soLuong}</td>
                                        <td>{sp.donGia.toLocaleString()} đ</td>
                                        <td>{sp.thanhTien.toLocaleString()} VND</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}