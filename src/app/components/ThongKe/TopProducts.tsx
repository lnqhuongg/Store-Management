export default function TopProducts({ data }: { data: any[] }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title mb-3">Top 5 sản phẩm bán chạy</h5>
        <div className="d-flex flex-column gap-2">
          {data.map((item, index) => (
            <div key={item.productId} className="d-flex align-items-center justify-content-between px-3 py-2 top-product-item border-bottom">
              <div>
                <div className="fw-semibold">{index + 1}. {item.productName}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>ID: {item.productId}</div>
              </div>
              <div className="text-end">
                <div className="fw-bold">{item.soldQty} sp</div>
                <div className="text-muted" style={{ fontSize: 12 }}>{item.revenue.toLocaleString('vi-VN')} ₫</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}