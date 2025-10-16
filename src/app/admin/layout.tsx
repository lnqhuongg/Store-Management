import "../globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from "@/app/components/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="sticky-section">
          <Sidebar />
          <div className="children">{children}</div>
        </main>
      </body>
    </html>
  );
}
