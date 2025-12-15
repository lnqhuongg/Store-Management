'use client';

import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
// Import API Controller
import { getRevenueByMonth, getRevenueByYear } from '@/app/controllers/ThongKe/ThongKeController';

type ViewMode = 'month' | 'year';

interface ChartDataPoint {
  label: string;
  doanhThu: number;
  tooltipTitle: string;
}

export default function RevenueChart() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // State chứa dữ liệu biểu đồ
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Danh sách năm (VD: 5 năm gần đây)
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // useEffect: Chạy mỗi khi filter (viewMode, month, year) thay đổi
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data: ChartDataPoint[] = [];
        if (viewMode === 'month') {
          // 1. Gọi API lấy doanh thu tháng
          const res = await getRevenueByMonth(selectedMonth, selectedYear);

          // console.log("Data Month:", res); // Check: [2800000, 2619000, ...]

          // 2. Xử lý dữ liệu mảng số nguyên
          if (Array.isArray(res)) {
            // item: doanh thu (VD: 2800000)
            // index: vị trí (0, 1, 2...) tương ứng ngày 1, 2, 3...
            data = res.map((revenueValue: number, index: number) => {
              const day = index + 1;
              // Format ngày cho đẹp: 1 -> "01", 2 -> "02"
              const dayStr = day < 10 ? `0${day}` : `${day}`;
              const monthStr = selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`;

              return {
                label: `${dayStr}/${monthStr}`, // Trục X: 01/12
                doanhThu: revenueValue,         // Trục Y: Giá trị từ mảng
                tooltipTitle: `Ngày ${dayStr}/${monthStr}/${selectedYear}`
              };
            });
          }

        } else {
          // === Xử lý cho Năm (Nếu API năm cũng trả về mảng số tương tự) ===
          const res = await getRevenueByYear(selectedYear);

          if (Array.isArray(res)) {
            // Giả sử API năm trả về [DoanhThuThang1, DoanhThuThang2...]
            // Nếu API năm trả về object { month, revenue } thì giữ code cũ
            // Dưới đây là code nếu API năm cũng trả về mảng số:
            data = res.map((revenueValue: number, index: number) => ({
              label: `T${index + 1}`,
              doanhThu: revenueValue,
              tooltipTitle: `Tháng ${index + 1}/${selectedYear}`
            }));
          }
        }

        setChartData(data);
      } catch (error) {
        console.error("Lỗi tải biểu đồ:", error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewMode, selectedMonth, selectedYear]);

  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body">
        {/* Header: Tiêu đề + Filter */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
          <h5 className="card-title m-0">Biểu đồ doanh thu</h5>

          <div className="d-flex align-items-center gap-2">
            {/* Dropdown Tháng */}
            {viewMode === 'month' && (
              <select
                className="form-select form-select-sm" style={{ width: 150 }}
                value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                ))}
              </select>
            )}

            {/* Dropdown Năm */}
            <select
              className="form-select form-select-sm" style={{ width: 150 }}
              value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map(y => (
                <option key={y} value={y}>Năm {y}</option>
              ))}
            </select>

            {/* Nút chuyển chế độ */}
            <div className="btn-group ms-2">
              <button
                className={`btn btn-sm ${viewMode === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('month')}
              >
                Theo Tháng
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('year')}
              >
                Theo Năm
              </button>
            </div>
          </div>
        </div>

        {/* Vẽ biểu đồ */}
        <div className="chart-wrapper" style={{ height: 350, position: 'relative' }}>
          {loading && (
            <div className="position-absolute top-50 start-50 translate-middle z-3">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                interval={viewMode === 'month' ? 2 : 0}
              />
              <YAxis
                tickFormatter={(v) => (v >= 1000000 ? (v / 1000000).toFixed(1) + 'tr' : v)}
                tick={{ fontSize: 12 }}
                width={45}
              />
              <Tooltip
                labelFormatter={(_, payload) => payload?.[0]?.payload?.tooltipTitle || ''}
                formatter={(value: number) => [value.toLocaleString('vi-VN') + ' ₫', 'Doanh thu']}
              />
              <Line
                type="monotone"
                dataKey="doanhThu"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}