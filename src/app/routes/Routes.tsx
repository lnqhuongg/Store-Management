export interface RouteItem {
    name: string;
    path: string;
}

export const adminRoutes: RouteItem[] = [
    { name: 'Quản lý Sản phẩm', path: '/admin/SanPham' },
    { name: 'Quản lý Loại sản phẩm', path: '/admin/LoaiSanPham' },
    { name: 'Quản lý Nhà cung cấp', path: '/admin/NCC' },
    { name: 'Quản lý Tài khoản nhân viên', path: '/admin/NhanVien' },
    { name: 'Quản lý Thông tin khách hàng', path: '/admin/KhachHang' },
    { name: 'Quản lý Mã giảm giá', path: '/admin/MGG' },
    { name: 'Quản lý Đơn hàng', path: '/admin/DonHang' },
    { name: 'Quản lý Phiếu nhập', path: '/admin/PhieuNhap' },
    { name: 'Thông kê doanh thu', path: '/admin/ThongKe' },
];

export const staffRoutes: RouteItem[] = [
    { name: 'Quét mã vạch', path: '/staff/Barcode' },
    { name: 'Danh sách Sản phẩm', path: '/staff/SanPham' },
    { name: 'Danh sách Khách hàng', path: '/staff/KhachHang' },
];