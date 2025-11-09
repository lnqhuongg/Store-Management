'use client';

import { useEffect, useState } from 'react';
import SearchInput from '@/app/components/MUI/Input/SearchInput';
import TableComponent from '@/app/components/MUI/Table/Table';
import PaginationComponent from '@/app/components/Pagination/Pagination';
import { getAll as getAllOrders } from '@/app/controllers/DonHang/DonHangController';

export default function DonHangPage() {
  const columns = ['Mã đơn', 'Khách hàng', 'Nhân viên', 'Giảm giá', 'Tổng tiền', 'Ngày mua'];
  const dataKeys = ['orderId', 'customerName', 'employeeName', 'discountAmount', 'totalAmount', 'orderDate'];

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // filters
  const [keyword, setKeyword]   = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo]     = useState('');
  const [minTotal, setMinTotal] = useState<string>('');
  const [maxTotal, setMaxTotal] = useState<string>('');

  const pageSize = 5;

  const loadData = async () => {
    const result = await getAllOrders(
      currentPage,
      pageSize,
      {
        keyword,
        dateFrom,
        dateTo,
        minTotal: minTotal ? Number(minTotal) : undefined,
        maxTotal: maxTotal ? Number(maxTotal) : undefined,
      }
    );
    setData(result.data);
    setTotalPages(result.pagination.totalPages || 1);
  };

  useEffect(() => { loadData(); }, [currentPage]); // đổi trang -> load

  const applyFilters = () => {
    setCurrentPage(1);
    loadData();
  };

  const clearFilters = () => {
    setKeyword('');
    setDateFrom('');
    setDateTo('');
    setMinTotal('');
    setMaxTotal('');
    setCurrentPage(1);
    loadData();
  };

  return (
    <section>
      <h4>Quản lý Đơn hàng</h4>

      <div className="py-4 space-y-3">
        <SearchInput
          onSearch={(value) => {
            setKeyword(value);
            setCurrentPage(1);
            applyFilters();
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end bg-gray-50 p-3 rounded">
          <div>
            <label className="block text-sm mb-1">Từ ngày</label>
            <input type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)}
                   className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1">Đến ngày</label>
            <input type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)}
                   className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1">Tổng tiền từ</label>
            <input type="number" min={0} value={minTotal} onChange={(e)=>setMinTotal(e.target.value)}
                   className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1">Tổng tiền đến</label>
            <input type="number" min={0} value={maxTotal} onChange={(e)=>setMaxTotal(e.target.value)}
                   className="border rounded px-3 py-2 w-full" />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <button onClick={applyFilters} className="px-4 py-2 rounded bg-black text-white">Lọc</button>
            <button onClick={clearFilters} className="px-4 py-2 rounded border">Xoá lọc</button>
          </div>
        </div>

        <TableComponent
          columns={columns}
          dataKeys={dataKeys}
          data={data}
          onEdit={undefined}
          onDelete={undefined}
        />

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </section>
  );
}
