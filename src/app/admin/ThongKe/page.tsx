'use client';

import { useEffect, useState } from 'react';
import './ThongKe.css';

// Import các component con
import KPIStats from '@/app/components/ThongKe/KPIStats';
import RevenueChart from '@/app/components/ThongKe/RevenueChart';
import TopProducts from '@/app/components/ThongKe/TopProducts';
import PaymentPieChart from '@/app/components/ThongKe/PaymentPieChart';

// Import Controller API
import { getTotalRevenue, getTotalPaidOrders, getTop5Products, getPaymentStats, getLowStockProducts  } from '@/app/controllers/ThongKe/ThongKeController';

export default function ThongKe() {
  // 1. Khai báo State để chứa dữ liệu thật
  const [kpiData, setKpiData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Gọi API khi trang vừa tải (Mount)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Gọi song song 3 API để tiết kiệm thời gian (Promise.all)
        const [revenueRes, ordersRes, lowStockRes, topProdRes, payRes] = await Promise.all([
          getTotalRevenue(),  
          getTotalPaidOrders(),  
          getLowStockProducts(),
          getTop5Products(),
          getPaymentStats()   
        ]);

        // Tính toán AOV (Giá trị trung bình đơn hàng)
        const revenue = revenueRes || 0;
        const orders = ordersRes || 0;
        const aov = orders > 0 ? Math.round(revenue / orders) : 0;
        const lowStock = 

        // Cập nhật State cho KPI
        setKpiData([
          { 
            title: 'Doanh thu (đã thu)', 
            value: revenue.toLocaleString('vi-VN') + ' ₫' 
          },
          { 
            title: 'Số đơn (paid)', 
            value: orders.toLocaleString('vi-VN') 
          },
          { 
            title: 'Số tiền trung bình mỗi đơn', 
            value: aov.toLocaleString('vi-VN') + ' ₫' 
          },
          { 
            title: 'SP sắp hết hàng', 
            value: lowStockRes // Cái này chưa có API nên tạm fix cứng hoặc gọi API kho
          },
        ]);

        // Cập nhật State cho Top sản phẩm
        // Đảm bảo dữ liệu mapping đúng với props của component TopProducts
        setTopProducts(topProdRes || []);
        setPaymentData(payRes || []);

      } catch (error) {
        console.error("Lỗi tải dữ liệu thống kê:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-5 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <section className="container-fluid py-3 thongke-container">
      {/* 1. KPI Cards (Dữ liệu thật) */}
      <KPIStats data={kpiData} />

      {/* 2. Biểu đồ doanh thu (Tự quản lý API bên trong nó) */}
      <RevenueChart />

      {/* 3. Top Products (Dữ liệu thật) */}
      <div className="row mt-3 g-3">
        <div className="col-12 col-lg-6">
          {/* Truyền mảng topProducts vào component */}
          <TopProducts data={topProducts} />
        </div>
        
        {/* Biểu đồ tròn (Tạm thời để trống hoặc làm tương tự) */}
        <div className="col-12 col-lg-6">
           <div className="card shadow-sm h-100 d-flex align-items-center justify-content-center">
              <PaymentPieChart data={paymentData} />
           </div>
        </div>
      </div>
    </section>
  );
}