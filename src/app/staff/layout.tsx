'use client';
import InvoicePreview from "@/app/components/InvoicePreview/InvoicePreview"

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="row">
      <div className="">
        {children}
      </div>
    </section>
  );
}