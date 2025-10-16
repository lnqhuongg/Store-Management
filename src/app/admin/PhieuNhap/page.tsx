'use client';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import PhieuNhapModal from "@/app/components/MUI/Modal/PhieuNhapModal";
import TableComponent from "@/app/components/MUI/Table/Table";
import TablePhieuNhapComponent from "@/app/components/MUI/Table/TablePhieuNhap";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function PhieuNhap() {
    const columns = ['Mã phiếu nhập','Thời gian nhập', 'Nhà cung cấp', 'Tổng tiền'];
    const dataKeys = ['import_id', 'import_date', 'supplier_id', 'total_amount'];
    const data = [
    {
        import_id: 1,
        import_date: "2025-01-10 09:30:00",
        supplier_id: 1,
        total_amount: 1250000.00
    },
    {
        import_id: 2,
        import_date: "2025-01-15 14:20:00",
        supplier_id: 2,
        total_amount: 2150000.00
    },
    {
        import_id: 3,
        import_date: "2025-02-05 10:00:00",
        supplier_id: 3,
        total_amount: 980000.00
    },
    {
        import_id: 4,
        import_date: "2025-02-20 16:45:00",
        supplier_id: 1,
        total_amount: 3500000.00
    },
    {
        import_id: 5,
        import_date: "2025-03-01 11:15:00",
        supplier_id: 2,
        total_amount: 1785000.00
    }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mode, setMode] = useState<'add' | 'detail' >('add');

    const [isIncrease, setIsIncrease] = useState(true);

    const [announce, setAnnounce] = useState<null | { type: string; message: string }>(null);

    useEffect(() => {
        if (announce) {
        const timer = setTimeout(() => setAnnounce(null), 5000);
        return () => clearTimeout(timer);
        }
    }, [announce]);

    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(null);
        setShowModal(true);
    };

    // const handleEdit = (LoaiSP: any) => {
    //     setMode('edit');
    //     setSelectedIndex(LoaiSP);
    //     setShowModal(true);
    // };

    const handleDelete = (LoaiSP: any) => {
        setSelectedIndex(LoaiSP);
        // alert('da bam vo button edit');
        setAnnounce({ type: "success", message: "Đã xóa phiếu nhập thành công!" });
    }

    const handleDetail = (pn: any) => {
        setMode('detail');
        setSelectedIndex(pn);
        setShowModal(true);
    }

    const handleToggleIcon = () => {
        setIsIncrease(prev => !prev);
    };
    return (
        <section>
            <h4>Quản lý phiếu nhập</h4>
            {announce && (
                <div className="my-3">
                <Alert
                    variant={announce.type}
                    dismissible
                    onClose={() => setAnnounce(null)}
                >
                    <strong>{announce.message}</strong>
                </Alert>
                </div>
            )}
            <div className="phieunhap py-4">
                <div className="d-flex justify-content-start gap-5">
                    {/* gửi hành showmodal(true) cho button -- mở modal  */}
                    <ButtonAdd onClick={handleAdd} />
                    <div className="w-50">
                        <select className="form-select" aria-label="Default select example">
                            <option >Lọc theo nhà cung cấp</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <button className="bg-white p-1 rounded" onClick={handleToggleIcon}>
                        <img src={isIncrease ? "/icons/increase.png" : "/icons/decrease.png"} alt="" className="h-8 w-8" />
                    </button>
                </div>
                <div>
                    <SearchInput />
                </div>
                
                <div>
                    <TablePhieuNhapComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={data}
                        editLink="/admin/san-pham/edit"
                        // onEdit={(item) => handleEdit(item)} // truyền vào item/đối tượng item, mốt truyền vào id
                        onDelete={(item) => handleDelete(item)}
                        onDetail={(item) => handleDetail(item)}
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
            <PhieuNhapModal
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                mode={mode}
                PhieuNhapData={selectedIndex}
            />
        </section>
    );
}