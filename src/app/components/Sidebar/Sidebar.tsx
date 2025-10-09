'use client';

import Link from 'next/link';
import {adminRoutes} from '@/app/routes/Routes';
import sidebar from "./Sidebar.module.css";


export default function Sidebar() {

  return (
    <aside className={`text-white p-4 asideStyle`}>
      <h5 className="mb-4">Trang Quản trị viên</h5>
      <ul className="list-styled">
        {adminRoutes.map((item) => (
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
