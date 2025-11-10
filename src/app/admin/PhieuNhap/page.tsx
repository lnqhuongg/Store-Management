"use client";

import { useState, useEffect } from "react";
import { getAll, PhieuNhapFilter, IPhieuNhap } from "@/app/controllers/PhieuNhap/PhieuNhapController";
import TableComponent from "@/app/components/MUI/Table/TablePhieuNhap";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import { Alert } from "react-bootstrap";
import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import ChiTietPhieuNhapModal from "@/app/components/MUI/Modal/ChiTietPhieuNhapModal";
import ThemPhieuNhapModal from "@/app/components/MUI/Modal/ThemPhieuNhapModal";

export default function PhieuNhapPage() {
    const columns = ['Mã phiếu nhập', 'Thời gian nhập', 'Nhà cung cấp', 'Nhân viên', 'Tổng tiền'];
    const dataKeys = ['importId', 'importDate', 'supplierName', 'staffName', 'totalAmount'];

    // --- State ---
    const [data, setData] = useState<IPhieuNhap[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [minPrice, setMinPrice] = useState<string | "">("");
    const [maxPrice, setMaxPrice] = useState<string | "">("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [filter, setFilter] = useState<PhieuNhapFilter>({});

    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<IPhieuNhap | null>(null);
    const [mode, setMode] = useState<'add' | 'detail'>('add');

    const [announce, setAnnounce] = useState<null | { type: string; message: string }>(null);

    // === Load dữ liệu ===
    const loadData = async () => {
        try {
            const filterWithKeyword: PhieuNhapFilter = {
                keyword,
                minPrice: minPrice === "" ? undefined : Number(minPrice),
                maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
                startDate: startDate || undefined,
                endDate: endDate || undefined,
            };
            const result = await getAll(filterWithKeyword, currentPage, 10);
            setData(result.data);
            setTotalPages(result.pagination.totalPages || 1);
        } catch (err: any) {
            alert(err.message || "Lỗi tải dữ liệu");
        }
    };

    // === useEffect khi currentPage hoặc filter thay đổi ===
    useEffect(() => {
        loadData();
    }, [currentPage]);


    // === Xử lý submit filter form ===
    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice)) {
            alert("Giá từ không được lớn hơn giá đến");
            return;
        }
        if (startDate !== "" && endDate !== "" && startDate > endDate) {
            alert("Ngày từ không được lớn hơn ngày đến");
            return;
        }

        const newFilter: PhieuNhapFilter = {
            keyword,
            minPrice: minPrice === "" ? undefined : Number(minPrice),
            maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        };
        setFilter(newFilter);
        setCurrentPage(1); // reset page về 1
        loadData(); // gọi API với filter mới
    };

    // === Xử lý modal ===
    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(null);
        setShowModal(true);
    };

    const handleDetail = (pn: IPhieuNhap) => {
        setMode('detail');
        setSelectedIndex(pn);
        setShowModal(true);
    };

    const handleDelete = (pn: IPhieuNhap) => {
        setAnnounce({ type: "success", message: "Đã xóa phiếu nhập thành công!" });
    };

    return (
        <section>
            <h4>Quản lý Phiếu nhập</h4>

            {announce && (
                <div className="my-3">
                    <Alert variant={announce.type} dismissible onClose={() => setAnnounce(null)}>
                        <strong>{announce.message}</strong>
                    </Alert>
                </div>
            )}

            <div className="mb-3">
                <ButtonAdd onClick={handleAdd} />
            </div>

            {/* --- Form lọc + tìm kiếm --- */}
            <form
                className="bg-white shadow-sm rounded-lg p-4 flex flex-col md:flex-row md:items-end gap-4"
                onSubmit={handleFilterSubmit}
            >
                {/* Keyword search */}
                <input
                    type="text"
                    placeholder="Nhập từ khóa..."
                    className="border rounded px-3 py-2 flex-1"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                {/* --- Lọc theo giá --- */}
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-800">Lọc theo giá</label>
                        <input type="number" placeholder="Từ" className="w-[80px] border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-800 invisible md:visible">.</label>
                        <input type="number" placeholder="Đến" className="w-[80px] border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                </div> {/* --- Lọc theo ngày --- */}
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-800">Lọc theo ngày</label>
                        <input type="date" className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 invisible md:visible">.</label>
                        <input type="date" className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                    Lọc
                </button>
            </form>

            {/* --- Bảng dữ liệu --- */}
            <TableComponent
                columns={columns}
                dataKeys={dataKeys}
                data={data.map(item => ({
                    ...item,
                    supplierName: item.supplier?.name,
                    staffName: item.staff?.fullName,
                    importDate: item.importDate.replace("T", " "),
                }))}
                onDelete={handleDelete}
                onDetail={handleDetail}
            />

            {/* --- Phân trang --- */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

            {/* --- Modal --- */}
            {mode === 'detail' && (
                <ChiTietPhieuNhapModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    PhieuNhapData={selectedIndex}
                />)
            }
            {mode === 'add' && (
                <ThemPhieuNhapModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                />
            )}

        </section>
    );
}
