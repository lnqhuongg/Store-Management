'use client';
import { useEffect, useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import KhachHangModal from "@/app/components/MUI/Modal/KhachHangModal";
import { getAll, getById, create, update } from '@/app/controllers/KhachHang/KhachHangController';

export default function KhachHang() {
    // header cho table Khách hàng (thay đổi header nếu là mục quản lý khác)
    const columns = ['Mã khách hàng', 'Tên khách hàng', 'Số điện thoại', 'Email', 'Địa chỉ', 'Điểm tích lũy'];

    const dataKeys = ['customerId', 'name', 'phone', 'email', 'address', 'rewardPoints'];

    // khởi tạo data để mỗi khi qua phân trang khác, 5 bản ghi khác lại được lấy lên từ database
    const [data, setData] = useState<any[]>([]);
    // tìm kiếm theo keyword
    const [keyword, setKeyword] = useState<string>("");

    // khởi tạo usestate cho currentpage & totalpages 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // hàm để load data lên bảng 
    const loadData = async () => {
        try {
            const result = await getAll(currentPage, 5, keyword);
            setData(result.data);
            setTotalPages(result.pagination.totalPages || 1);
        } catch (err: any) {
            alert(err.message || 'Lỗi tải dữ liệu');
        }
    };

    // gọi hàm, thay đổi mỗi khi đổi phân trang 
    useEffect(() => {
        loadData();
    }, [currentPage, keyword]);

    // ----------------------------------------
    const [showModal, setShowModal] = useState(false);

    // typescript - state này chỉ có giá trị là 'add' hoặc 'edit' không có giá trị khác 
    // '<>' là type, kiểu dữ liệu của state - hình như là union type 
    // khởi tạo mode = 'add'
    const [mode, setMode] = useState<'add' | 'edit'>('add');

    // này để xác định mình bấm edit của thằng nào trong mấy dòng của table
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Khi bấm nút thêm
    // này chỉ là mở modal thêm
    const handleAdd = () => {
        setMode('add');
        setSelectedItem(null);
        setShowModal(true);
    };

    // Khi bấm nút sửa -- này chỉ là mở modal sửa
    // kiểu dữ liệu là any - là kiểu dữ liệu gì cũng được, int hay object gì cũng được
    const handleEdit = async (item: any) => {
        try {
            const detail = await getById(item.customerId); // GỌI GET BY ID
            setMode('edit');
            setSelectedItem(detail);
            setShowModal(true);
        } catch (err: any) {
            alert(err.message || 'Không tải được thông tin!');
        }
    };

    // lưu dữ liệu (dữ liệu được gửi từ modal thêm / sửa)
    const handleSave = async (formData: any) => {
        try {
            if (mode === 'add') {
                await create(formData);
                alert("Thêm khách hàng thành công!");
            } else {
                if (!selectedItem?.customerId) {
                    throw new Error("Không tìm thấy ID khách hàng");
                }
                await update(
                    selectedItem.customerId,
                    {
                        customerId: selectedItem.customerId,
                        name: formData.name.trim(),
                        phone: selectedItem.phone,        // không cho sửa SĐT
                        email: selectedItem.email,        // không cho sửa Email
                        address: formData.address?.trim(),
                        rewardPoints: selectedItem.rewardPoints, // không cho sửa điểm
                        createdAt: selectedItem.createdAt ?? new Date().toISOString() // required by IKhachHang
                    }
                );
                alert("Cập nhật khách hàng thành công!");
            }
            await loadData(); // RELOAD BẢNG
            if (currentPage > 1 && data.length <= 1) {
                setCurrentPage(prev => Math.max(1, prev - 1)); // Quay lại trang trước nếu xóa hết
            }
        } catch (err: any) {
            alert(err.message || 'Lỗi khi thêm/sửa khách hàng!');
        }
    };

    return (
        <section>
            <h4>Quản lý Thông tin khách hàng</h4>
            <div className="khachhang py-4">
                <div>
                    {/* gửi hành showmodal(true) cho button -- mở modal  */}
                    <ButtonAdd onClick={handleAdd} />
                </div>
                <div>
                    <SearchInput
                        onSearch={(value) => {
                            setKeyword(value);
                            setCurrentPage(1); // QUAN TRỌNG: reset về trang 1 khi tìm
                        }}
                    />
                </div>
                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={data}
                        onEdit={(item) => handleEdit(item)} // truyền vào item/đối tượng item
                        // không có onDelete vì bạn không cho xóa khách hàng
                    />
                </div>
                <div>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
            <KhachHangModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                KhachHangData={selectedItem}
                onSave={handleSave}
            />
        </section>
    );
}