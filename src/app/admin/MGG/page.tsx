"use client";
import { useEffect, useState } from "react";
import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import MaGiamGiaModal from "@/app/components/MUI/Modal/MaGiamGiaModal";
import {
    getAll,
    create,
    update,
    deleteItem,
    IMaGiamGia,
} from "@/app/controllers/MaGiamGia/MaGiamGiaController";

export default function MaGiamGia() {
    const columns = [
        "Mã giảm giá",
        "Mô tả",
        "Giá trị (%)",
        "Ngày bắt đầu",
        "Ngày kết thúc",
        "Trạng thái",
    ];
    // use keys that match the API DTO returned by MaGiamGiaController
    const dataKeys = ["promoCode", "description", "discountValue", "startDate", "endDate", "status"];

    const [data, setData] = useState<IMaGiamGia[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(5);

    const [keyword, setKeyword] = useState("");
    // discountType is sent to the controller (it will append to query string).
    // restore setter so UI can change it.
    const [discountType, setDiscountType] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"add" | "edit">("add");
    const [selectedItem, setSelectedItem] = useState<IMaGiamGia | null>(null);

    const loadData = async (page = 1) => {
        try {
            const resp = await getAll(page, pageSize, keyword, discountType);
            console.log('getAll response', resp);
            const formattedData = resp.data.map((item: any) => ({
                ...item,
                status: item.status === 'active'
                    ? '<span class="badge bg-success">Hoạt động</span>'
                    : item.status === 'inactive'
                        ? '<span class="badge bg-danger">Hết hạn</span>'
                        : '<span class="badge bg-secondary">Không xác định</span>'
            }));
            setData(formattedData);
            setCurrentPage(resp.pagination?.currentPage || page);
            setTotalPages(resp.pagination?.totalPages || 1);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu mã giảm giá:", err);
            alert("Không thể tải dữ liệu. Kiểm tra console.");
        }
    };

    useEffect(() => {
        loadData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, discountType]);

    useEffect(() => {
        loadData(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleAdd = () => {
        setMode("add");
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleEdit = (item: IMaGiamGia) => {
        setMode("edit");
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleDelete = async (item: IMaGiamGia) => {
        if (!item || !item.promoId) return;
        if (!confirm(`Bạn có chắc muốn xóa mã ${item.promoId}?`)) return;
        try {
            await deleteItem(item.promoId);
            // reload current page
            loadData(currentPage);
        } catch (err) {
            console.error(err);
            alert("Xóa thất bại");
        }
    };

    const handleSearch = (value: string) => {
        console.log('handleSearch called with', value);
        setKeyword(value);
        setCurrentPage(1);
    };

    const handleSave = async (payload: IMaGiamGia) => {
        try {
            if (mode === "add") {
                await create(payload);
            } else if (mode === "edit" && payload.promoId) {
                await update(payload.promoId, payload);
            }
            setShowModal(false);
            loadData(1);
        } catch (err) {
            console.error(err);
            alert("Lưu thất bại. Kiểm tra console.");
        }
    };

    return (
        <section>
            <h4>Quản lý Mã giảm giá</h4>
            <div className="magiamgia py-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                    <div>
                        <ButtonAdd onClick={handleAdd} />
                    </div>

                    <div>
                        <select
                            className="form-select"
                            style={{ minWidth: 180 }}
                            value={discountType}
                            onChange={(e) => {
                                setDiscountType(e.target.value);
                                setCurrentPage(1);
                            }}
                            aria-label="Lọc loại giảm"
                        >
                            <option value="">Tất cả mã giảm</option>
                            <option value="percent">Phần trăm</option>
                            <option value="fixed">Tiền</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <SearchInput onSearch={handleSearch} />
                </div>

                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={data}
                        onEdit={(item) => handleEdit(item)}
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

            <MaGiamGiaModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                mode={mode}
                MaGiamGiaData={selectedItem}
                onSave={handleSave}
            />
        </section>
    );
}