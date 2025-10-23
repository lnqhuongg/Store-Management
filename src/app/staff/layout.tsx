'use client';
import InvoicePreview from "@/app/components/InvoicePreview/InvoicePreview"

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="row">
      <div className="col-8">
        {children}
      </div>
      <div className="col-4 bg-light rounded">
        <InvoicePreview />
      </div>
    </section>
  );
}