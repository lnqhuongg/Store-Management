'use client';
import { useEffect, useState } from 'react';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import LoaiSPModal from "@/app/components/MUI/Modal/LoaiSPModal";
import { getAll, getById, create, update, deleteItem } from '@/app/controllers/LoaiSanPham/LoaiSanPhamController';

export default function LoaiSanPham() {
    // header cho table Loai san pham (thay doi header neu la muc quan ly khac)
    const columns = ['Mã loại', 'Tên loại sản phẩm'];

    const dataKeys = ['categoryId', 'categoryName'];

    // khởi tạo data để mỗi khi qua phân trang khác, 5 bản ghi khác lại được lấy lên từ databasee 
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
    // '<>' là type, kiểu dữ liệu của state - hinh nhu là union type 
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
    // kieu du lieu la any - la kieu du lieu gi cung dc, int hay object gi cung duoc, mot' thay = id
    const handleEdit = async (item: any) => {
        try {
            const detail = await getById(item.categoryId); // GỌI GET BY ID
            setMode('edit');
            setSelectedItem(detail);
            setShowModal(true);
        } catch (err: any) {
            alert(err.message || 'Không tải được thông tin!');
        }
    };

    // lưu dữ liệu (dữ liệu đc gửi từ modal thêm / sửa)
    const handleSave = async (formData: any) => {
        try {
            if (mode === 'add') {
                await create(formData);
                alert("Thêm loại sản phẩm thành công!");
            } else {
                if (!selectedItem?.categoryId) {
                    throw new Error("Không tìm thấy ID loại sản phẩm");
                }
                await update(
                    selectedItem.categoryId,
                    {
                        categoryId: selectedItem.categoryId,
                        categoryName: formData.categoryName.trim()
                    }
                );
                alert("Cập nhật loại sản phẩm thành công!");
            }
            await loadData(); // RELOAD BẢNG
            if (currentPage > 1 && data.length <= 1) {
                setCurrentPage(prev => Math.max(1, prev - 1)); // Quay lại trang trước nếu xóa hết
            }
        } catch (err: any) {
            alert(err.message || 'Lỗi khi thêm/sửa loại sản phẩm!');
        }
    };

    // KHI BAM NUT XOA a
    const handleDelete = async (item: any) => {
        if (!confirm(`Xóa loại sản phẩm "${item.categoryName}"?`)) return;
        try {
            await deleteItem(item.categoryId);
            alert('Xóa loại sản phẩm thành công!');
            await loadData(); // reload bảng
        } catch (err: any) {
            alert(err.message || 'Không thể xóa loại sản phẩm!');
        }
    }

    return (
        <section>
            <h4>Quản lý Loại sản phẩm</h4>
            <div className="loaisanpham py-4">
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
                        onEdit={(item) => handleEdit(item)} // truyền vào item/đối tượng item, mốt truyền vào id
                        onDelete={(item) => handleDelete(item)}
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
            <LoaiSPModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                LoaiSPData={selectedItem}
                onSave={handleSave}
            />
        </section>

    );
}