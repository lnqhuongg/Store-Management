'use client';

import { useMemo, useState } from 'react';
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/Pagination";
import './ThongKe.css';

/**
 * GIAO DIỆN THỐNG KÊ – UI ONLY
 * - Phân trang CHỈ cho bảng "Doanh thu theo ngày"
 * - Tái sử dụng SearchInput, TableComponent, PaginationComponent sẵn có của dự án
 * - Dữ liệu DEMO (cứng) để hiển thị giao diện
 */
export default function ThongKe() {
  // ====== Bộ lọc ngày (UI) ======
  const [from, setFrom] = useState<string>(() => {
    const d = new Date(); d.setDate(d.getDate() - 13); return d.toISOString().slice(0,10);
  });
  const [to, setTo] = useState<string>(() => new Date().toISOString().slice(0,10));

  // ====== Bảng 1: Doanh thu theo ngày ======
  const columnsDaily = ['Ngày', 'Số đơn (paid)', 'Doanh thu (đã thu)', 'AOV'];
  const dataKeysDaily = ['ngay', 'soDon', 'doanhThu', 'aov'];

  // Demo 14 ngày để thấy phân trang
  const dailyDataFull = useMemo(() => (Array.from({length:14}).map((_,i)=>{
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const day = d.toISOString().slice(0,10);
    const soDon = 10 + ((i*3)%15);
    const revenue = 180000 * soDon + (i%4)*50000;
    const aov = Math.round(revenue / Math.max(1, soDon));
    return { ngay: day, soDon, doanhThu: revenue, aov };
  })), []);

  // ------- Phân trang cho bảng Doanh thu theo ngày -------
  const dailyPageSize = 7;
  const [dailyPage, setDailyPage] = useState(1);
  const dailyTotalPages = Math.max(1, Math.ceil(dailyDataFull.length / dailyPageSize));
  const dailySliceStart = (dailyPage - 1) * dailyPageSize;
  const dailyPaged = dailyDataFull.slice(dailySliceStart, dailySliceStart + dailyPageSize);

  // ====== Bảng 2: Top sản phẩm bán chạy (không đổi – vẫn UI demo, có thể giữ/loại phân trang tùy ý) ======
  const columnsTop = ['Mã SP', 'Tên sản phẩm', 'SL bán', 'Doanh thu'];
  const dataKeysTop = ['ma', 'ten', 'qty', 'sum'];
  const topProducts = [
    { ma: 'SP001', ten: 'Mì gói Hảo Hảo tôm chua cay', qty: 140, sum: 980000 },
    { ma: 'SP132', ten: 'Sữa tươi TH 1L', qty: 75, sum: 1575000 },
    { ma: 'SP088', ten: 'Nước suối Lavie 500ml', qty: 210, sum: 630000 },
    { ma: 'SP022', ten: 'Đường Biên Hòa 1kg', qty: 60, sum: 720000 },
    { ma: 'SP066', ten: 'Gạo ST25 5kg', qty: 35, sum: 1225000 },
  ];

  // ====== Bảng 3: Cơ cấu phương thức thanh toán (không phân trang theo yêu cầu) ======
  const columnsPay = ['Phương thức', 'Số tiền'];
  const dataKeysPay = ['method', 'amount'];
  const paymentAgg = [
    { method: 'Tiền mặt', amount: 5200000 },
    { method: 'Chuyển khoản', amount: 3100000 },
    { method: 'Thẻ', amount: 1450000 },
    { method: 'Ví điện tử', amount: 900000 },
  ];

  // Phân trang Top (đã có sẵn trong bản UI-only trước đó) – có thể bỏ nếu không cần
  const [topPage, setTopPage] = useState(1);
  const topPageSize = 5;
  const topTotalPages = Math.max(1, Math.ceil(topProducts.length / topPageSize));
  const topPaged = topProducts.slice((topPage-1)*topPageSize, (topPage-1)*topPageSize + topPageSize);

  return (
    <section className="container-fluid py-3 thongke-container">
      {/* Thanh tiêu đề + thao tác giữ NGUYÊN PHONG CÁCH như LoaiSanPham */}
      <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-2">
        <div className="flex-grow-1">
          {/* SearchInput dùng chung */}
          <SearchInput />
        </div>
        {/* Nhóm ô lọc ngày theo kiểu bootstrap sẵn có */}
        <div className="d-flex align-items-end gap-2">
          <div className="text-end">
            <label className="form-label mb-1">Từ ngày</label>
            <input type="date" className="form-control" value={from} onChange={e=>setFrom(e.target.value)} />
          </div>
          <div className="text-end">
            <label className="form-label mb-1">Đến ngày</label>
            <input type="date" className="form-control" value={to} onChange={e=>setTo(e.target.value)} />
          </div>
          <button type="button" className="btn btn-dark">Lọc</button>
        </div>
      </div>

      {/* Hàng KPI */}
      <div className="row g-3 mt-2">
        {([
          { title: 'Doanh thu (đã thu)', value:  { fmt: (12450000).toLocaleString('vi-VN') } },
          { title: 'Số đơn (paid)', value: { fmt: '124' } },
          { title: 'AOV (đ/tb đơn)', value: { fmt: (215000).toLocaleString('vi-VN') } },
          { title: 'SP sắp hết hàng', value: { fmt: '12' } },
        ] as const).map((kpi, idx) => (
          <div className="col-12 col-sm-6 col-lg-3" key={idx}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted" style={{fontSize:12}}>{kpi.title}</div>
                <div className="fw-bold" style={{fontSize:28}}>{kpi.value.fmt}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bảng Doanh thu theo ngày (CÓ PHÂN TRANG) */}
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Doanh thu theo ngày</h5>
          <TableComponent
            columns={columnsDaily}
            dataKeys={dataKeysDaily}
            data={dailyPaged}
            showActions={false}
          />
          <div className="d-flex justify-content-center">
            <PaginationComponent
              currentPage={dailyPage}
              totalPages={dailyTotalPages}
              onPageChange={(p)=>setDailyPage(p)}
            />
          </div>
        </div>
      </div>

      {/* Bảng Top sản phẩm bán chạy (giữ như trước, có phân trang 5/sp) */}
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Top sản phẩm bán chạy</h5>
          <TableComponent
            columns={columnsTop}
            dataKeys={dataKeysTop}
            data={topPaged}
            showActions={false}
          />
          <div className="d-flex justify-content-center">
            <PaginationComponent
              currentPage={topPage}
              totalPages={topTotalPages}
              onPageChange={(p)=>setTopPage(p)}
            />
          </div>
        </div>
      </div>

      {/* Bảng Cơ cấu phương thức thanh toán (KHÔNG phân trang theo yêu cầu) */}
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title mb-3">Cơ cấu phương thức thanh toán</h5>
          <TableComponent
            columns={columnsPay}
            dataKeys={dataKeysPay}
            data={paymentAgg}
            showActions={false}
          />
        </div>
      </div>
    </section>
  );
}
