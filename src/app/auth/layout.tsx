import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
          {children}
        </main>
      </body>
    </html>
  );
}
