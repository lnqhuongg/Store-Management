'use client';
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from "@/app/components/Sidebar/Sidebar"
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/auth/login";

  return (
    <html lang="en">
      <body>
        <main className="sticky-section">

          {!isLoginPage && <Sidebar />}

          <div className={isLoginPage ? "login-page" : "children"}>
            {children}
          </div>

        </main>
      </body>
    </html>
  );
}