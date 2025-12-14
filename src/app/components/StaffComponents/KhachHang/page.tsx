// app/staff/KhachHang/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import KhachHangModal from "@/app/components/MUI/Modal/KhachHangModal";

import { getAll, create } from '@/app/controllers/KhachHang/KhachHangController';

export default function KhachHang({ onSelect }: { onSelect?: (c: any) => void }) {
  const columns = ['Choose', 'Tên khách hàng', 'Số điện thoại', 'Địa chỉ', 'Điểm tích lũy'];
  const dataKeys = ['choose', 'name', 'phone', 'address', 'rewardPoints'];

  const [data, setData] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    try {
      const res = await getAll(currentPage, 5, keyword);
      setData(res.data);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (e: any) {
      alert(e.message || 'Lỗi tải danh sách khách hàng');
    }
  };

  useEffect(() => {
    loadData();
  }, [currentPage, keyword]);

  const handleAdd = () => setShowModal(true);

  const handleSave = async (formData: any) => {
    try {
      const newCust = await create({
        ...formData,
        rewardPoints: formData.rewardPoints ?? 0,
        address: formData.address?.trim() || ''
      });
      alert('Thêm khách hàng thành công!');
      await loadData();
      setSelectedId(newCust.customerId);
      setShowModal(false);
    } catch (e: any) {
      alert(e.message || 'Lỗi khi thêm khách hàng');
    }
  };

  // ĐẢM BẢO DỮ LIỆU ĐÚNG TRƯỚC KHI ĐƯA VÀO BẢNG
  const mappedData = [
    {
      customerId: 0,
      choose: `
      <div class="text-center">
        <input
          type="radio"
          name="selectCustomer"
          value="0"
          ${selectedId === 0 ? "checked" : ""}
          data-id="0"
          class="radio-choose"
        />
      </div>
    `,
      name: "Khách vãng lai",
      phone: "—",
      address: "—",
      rewardPoints: 0
    },
    ...data.map(item => ({
      ...item,
      choose: `
      <div class="text-center">
        <input
          type="radio"
          name="selectCustomer"
          value="${item.customerId}"
          ${selectedId === item.customerId ? "checked" : ""}
          data-id="${item.customerId}"
          class="radio-choose"
        />
      </div>
    `,
      name: item.name || '—',
      phone: item.phone || '—',
      address: item.address || '—',
      rewardPoints: item.rewardPoints ?? 0,
    }))
  ];


  useEffect(() => {
    const radios = document.querySelectorAll(".radio-choose");

    const handler = (e: any) => {
      const id = Number(e.target.getAttribute("data-id"));
      setSelectedId(id);
      onSelect?.(data.find(x => x.customerId === id));
    };

    radios.forEach(r => r.addEventListener("change", handler));

    return () => radios.forEach(r => r.removeEventListener("change", handler));
  }, [mappedData]);

  return (
    <section className='bg-light p-3 rounded' style={{ height: '698px' }}>
      <h4 className='border-bottom pb-1 text-primary-emphasis mb-0'>
        Danh sách Khách hàng
      </h4>

      <div className='d-flex justify-content-around border-bottom py-3 align-items-center'>
        <ButtonAdd onClick={handleAdd} />
        <div style={{ width: '400px' }}>
          <SearchInput onSearch={(v) => { setKeyword(v); setCurrentPage(1); }} />
        </div>
      </div>

      <div className="overflow-auto" style={{ maxHeight: '480px' }}>
        {data.length === 0 ? (
          <div className="text-center py-4 text-muted">
            {keyword ? 'Không tìm thấy khách hàng nào' : 'Chưa có dữ liệu'}
          </div>
        ) : (
          <TableComponent
            columns={columns}
            dataKeys={dataKeys}
            data={mappedData}
            showActions={false} // ← đã bỏ cột Tùy chỉnh
          />
        )}
      </div>

      <div className="mt-3 d-flex justify-content-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <KhachHangModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        mode="add"
        KhachHangData={null}
        onSave={handleSave}
      />
    </section>
  );
}