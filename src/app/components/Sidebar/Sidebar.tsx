'use client';

import Link from 'next/link';
import {adminRoutes, staffRoutes} from '@/app/routes/Routes';
import { usePathname } from "next/navigation";


export default function Sidebar() {

  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isStaffPage = pathname.startsWith("/staff");

  const currentRoutes = isAdminPage
    ? adminRoutes
    : isStaffPage
    ? staffRoutes
    : [];

  return (
    <aside className={`text-white p-4 asideStyle`}>
      <h5 className="mb-4">{isAdminPage ? "Trang Quản trị viên" : "Trang Nhân viên"}</h5>
      <ul className="list-styled">
        {currentRoutes.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              href={item.path}
              className={`text-white text-decoration-none d-block py-2 px-2 rounded linkStyle`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
