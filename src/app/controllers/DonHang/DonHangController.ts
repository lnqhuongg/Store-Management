import { apiFetch } from "@/app/lib/api";

export type OrderFilters = {
  keyword?: string;
  dateFrom?: string; // yyyy-MM-dd
  dateTo?: string;   // yyyy-MM-dd
  minTotal?: number;
  maxTotal?: number;
};

// ===== HÀM LỌC RIÊNG -> build query =====
function buildFilterQuery(page: number, pageSize: number, f: OrderFilters) {
  const p = new URLSearchParams();
  p.append("page", String(page));
  p.append("pageSize", String(pageSize));
  if (f.keyword)  p.append("keyword", f.keyword.trim());
  if (f.dateFrom) p.append("dateFrom", f.dateFrom);
  if (f.dateTo)   p.append("dateTo",   f.dateTo);
  if (typeof f.minTotal === "number") p.append("minTotal", String(f.minTotal));
  if (typeof f.maxTotal === "number") p.append("maxTotal", String(f.maxTotal));
  return p.toString();
}

// ===== GETALL GỌI HÀM LỌC =====
export async function getAll(page=1, pageSize=5, filters: {
  keyword?: string; dateFrom?: string; dateTo?: string; minTotal?: number; maxTotal?: number;
}) {
  const qs = buildFilterQuery(page, pageSize, filters);
  const res = await apiFetch<any>(`/orders?${qs}`);
  return {
    data: res.dataDTO?.data || [],
    pagination: {
      currentPage: res.dataDTO?.page ?? 1,
      totalPages:  res.dataDTO?.totalPages ?? 1,
    },
  };
}

export async function getById(id: number) {
  const res = await apiFetch<any>(`/orders/${id}`);
  return res.dataDTO;
}
