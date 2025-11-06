import { Modal, Row, Col, Table, Badge } from "react-bootstrap";
import { FaUser, FaTags, FaCalendarAlt, FaMoneyBillWave, FaGift, FaPercent } from "react-icons/fa";

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
        { tenSanPham: "Áo thun nam cổ tròn", soLuong: 2, donGia: 150000, thanhTien: 300000 },
        { tenSanPham: "Quần jean nữ", soLuong: 1, donGia: 350000, thanhTien: 350000 },
        { tenSanPham: "Giày thể thao Adidas", soLuong: 1, donGia: 1200000, thanhTien: 1200000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
        { tenSanPham: "Mũ lưỡi trai Nike", soLuong: 3, donGia: 200000, thanhTien: 600000 },
    ];

    const tongTien = sanPhamMau.reduce((sum, sp) => sum + sp.thanhTien, 0);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            centered
            contentClassName="border-0 shadow-lg rounded-4"
        >
            <Modal.Header closeButton className="bg-[#212529] text-white rounded-top-4">
                <Modal.Title>
                    <strong>Chi tiết đơn hàng #{DonHangData.id}</strong>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
                <Row>

                    {/* --- Cột trái: Thông tin đơn hàng --- */}
                    <Col md={4} className="border-r border-gray-200">
                        <h5 className="mb-4 font-semibold text-lg flex items-center gap-2 text-gray-800">
                            <FaTags className="text-blue-600" />
                            Thông tin đơn hàng
                        </h5>

                        <div className="space-y-3 text-gray-700 text-sm">
                            <p className="flex items-center gap-2">
                                <FaUser className="text-gray-500" />
                                <span className="font-medium w-32">Khách hàng:</span> {DonHangData.customer}
                            </p>

                            <p className="flex items-center gap-2">
                                <FaUser className="text-gray-500" />
                                <span className="font-medium w-32">Nhân viên:</span> {DonHangData.staff}
                            </p>

                            <p className="flex items-center gap-2">
                                <FaGift className="text-pink-500" />
                                <span className="font-medium w-32">Mã giảm giá:</span> {DonHangData.coupon || "Không có"}
                            </p>

                            <p className="flex items-center gap-2">
                                <FaPercent className="text-orange-500" />
                                <span className="font-medium w-32">Giảm giá:</span> {DonHangData.discount || 0}
                            </p>

                            {/* 🔹 Số tiền được giảm */}
                            <p className="flex items-center gap-2 text-blue-600">
                                <FaMoneyBillWave />
                                <span className="font-medium w-32">Số tiền được giảm:</span>
                                {((DonHangData.total * (DonHangData.discount || 0)) / 100).toLocaleString()} đ
                            </p>

                            <p className="flex items-center gap-2">
                                <FaCalendarAlt className="text-gray-500" />
                                <span className="font-medium w-32">Ngày mua:</span> {DonHangData.date}
                            </p>

                            <hr className="border-gray-300 my-2" />

                            {/* 🔹 Tổng tiền sau giảm */}
                            <p className="flex items-center gap-2 text-red-600 font-semibold text-base">
                                <FaMoneyBillWave />
                                <span className="font-medium w-32">Tổng tiền sau giảm:</span>
                                {(
                                    DonHangData.total - (DonHangData.total * (DonHangData.discount || 0)) / 100
                                ).toLocaleString()} đ
                            </p>
                        </div>
                    </Col>


                    {/* --- Cột phải: Danh sách sản phẩm --- */}
                    <Col md={8} className="ps-4">
                        <h5 className="mb-4 font-semibold text-lg text-blue-600">Danh sách sản phẩm</h5>

                        {/* 🔹 Vùng chứa bảng có giới hạn chiều cao */}
                        <div className="max-h-[350px] overflow-y-auto rounded-xl border border-gray-200 shadow-sm">
                            <table className="min-w-full text-sm text-gray-700">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                    <tr>
                                        <th className="py-3 px-4 text-left font-semibold w-[40%]">Tên sản phẩm</th>
                                        <th className="py-3 px-4 text-center font-semibold w-[20%]">Số lượng</th>
                                        <th className="py-3 px-4 text-right font-semibold w-[20%]">Đơn giá</th>
                                        <th className="py-3 px-4 text-right font-semibold w-[20%]">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {sanPhamMau.map((sp, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition">
                                            <td className="py-2 px-4">{sp.tenSanPham}</td>
                                            <td className="py-2 px-4 text-center">{sp.soLuong}</td>
                                            <td className="py-2 px-4 text-left">{sp.donGia.toLocaleString()} đ</td>
                                            <td className="py-2 px-4 text-left font-medium text-green-600">
                                                {sp.thanhTien.toLocaleString()} đ
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tổng cộng nằm ngoài bảng, không cuộn */}
                        <div className="mt-3 text-right">
                            <p className="font-semibold text-red-600">
                                Tổng cộng: {tongTien.toLocaleString()} đ
                            </p>
                        </div>
                    </Col>

                </Row>
            </Modal.Body>
        </Modal>
    );
}
