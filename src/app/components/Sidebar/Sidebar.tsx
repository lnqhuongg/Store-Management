'use client';

import Link from 'next/link';
import { adminRoutes, staffRoutes } from '@/app/routes/Routes';
import { usePathname } from "next/navigation";
import './Sidebar.css'; // Import file CSS vừa tạo

export default function Sidebar() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isStaffPage = pathname.startsWith("/staff");

  const currentRoutes = isAdminPage
    ? adminRoutes
    : isStaffPage
      ? staffRoutes
      : [];

  const handleLogout = () => {
    // Xóa hết data liên quan phiên làm việc
    const keysToRemove = [
      "user", "pos_cart_v1", "pos_customer_v1", 
      "pos_selected_promo_v1", "pos_use_points_v1", "pos_payment_method_v1"
    ];
    keysToRemove.forEach(k => localStorage.removeItem(k));
    
    window.location.href = "/auth/login"; 
  };

  return (
    // Thêm class 'd-flex flex-column' của Bootstrap hoặc dùng CSS thuần đã viết
    <aside className="asideStyle">
      
      {/* Header Sidebar */}
      <h5 className="sidebar-title mt-2">
        {isAdminPage ? "Quản Trị Viên" : "Nhân Viên"}
      </h5>

      {/* Danh sách Menu */}
      <ul className="sidebar-list">
        {currentRoutes.map((item) => {
          // Logic kiểm tra link active
          const isActive = pathname === item.path;
          
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`text-decoration-none linkStyle ${isActive ? 'active' : ''}`}
              >
                {/* Nếu bạn có icon trong object routes thì render ở đây: <span>{item.icon}</span> */}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer Sidebar (Logout) */}
      <div className="logout-btn">
        <button
          onClick={handleLogout}
          className="btn border-0 w-100 linkStyle logout-link"
        >
          {/* Icon Logout đơn giản (SVG) */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{marginRight: 8}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}