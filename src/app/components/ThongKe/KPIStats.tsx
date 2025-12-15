
interface KPIData {
  title: string;
  value: string | number;
}

// Icon SVG đơn giản (Doanh thu, Đơn hàng, AOV, Cảnh báo)
const icons = [
  // Icon Tiền (Dollar)
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Icon Giỏ hàng (Cart)
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  // Icon Biểu đồ (Chart)
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  // Icon Cảnh báo (Alert)
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
];

const bgs = ['bg-primary-subtle', 'bg-success-subtle', 'bg-warning-subtle', 'bg-danger-subtle'];
const textColors = ['text-primary', 'text-success', 'text-warning', 'text-danger'];

export default function KPIStats({ data }: { data: KPIData[] }) {
  return (
    <div className="row g-3 mt-2">
      {data.map((kpi, idx) => (
        <div className="col-12 col-sm-6 col-lg-3" key={idx}>
          <div className="card border-0 shadow-sm h-100 kpi-card-soft">
            <div className="card-body position-relative overflow-hidden">
              
              {/* Nội dung chính */}
              <div className="position-relative z-1">
                <div className="text-muted small text-uppercase fw-semibold mb-1">{kpi.title}</div>
                <h3 className="fw-bold mb-0 text-dark">{kpi.value}</h3>
              </div>

              {/* Icon nền mờ */}
              <div className={`icon-bg-wrapper ${textColors[idx % 4]}`}>
                 {icons[idx % icons.length]}
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}