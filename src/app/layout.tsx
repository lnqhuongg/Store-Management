import "./globals.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from "@/app/components/Sidebar/Sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="sticky-section">
          <Sidebar />
          <div className="children">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
