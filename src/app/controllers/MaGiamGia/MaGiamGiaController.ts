import { apiFetch } from "@/app/lib/api";

// DTO / interface đơn giản cho frontend
export interface IMaGiamGia {
  promoId?: number;
  promoCode?: string;
  description?: string;
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  discountType?: string;
}

// GET ALL (page, pageSize, keyword, discountType)
export async function getAll(
  page = 1,
  pageSize = 5,
  keyword = "",
  discountType = ""
) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("pageSize", String(pageSize));
  if (keyword) params.append("keyword", keyword);
  if (discountType) params.append("discountType", discountType);

  const res = await apiFetch<any>(`/promocodes?${params.toString()}`);
  
  // ✅ Đọc đúng casing của backend (dataDTO, không phải DataDTO)
  const wrapper = res?.dataDTO ?? res?.DataDTO ?? res;

  return {
    data: wrapper?.data ?? wrapper?.Items ?? wrapper?.items ?? [],
    pagination: {
      currentPage: wrapper?.page ?? wrapper?.Page ?? page,
      totalPages: wrapper?.totalPages ?? wrapper?.TotalPages ?? 1,
      totalRecords: wrapper?.total ?? wrapper?.TotalRecords ?? 0,
    },
  };
}

// GET BY ID
export async function getById(id: number): Promise<IMaGiamGia | null> {
  const res = await apiFetch<any>(`/promocodes/${id}`);
  return res?.dataDTO ?? res?.DataDTO ?? res ?? null;
}

// CREATE
export async function create(dto: IMaGiamGia) {
  const res = await apiFetch<any>("/promocodes", {
    method: "POST",
    body: JSON.stringify(dto),
  });
  return res;
}

// UPDATE
export async function update(id: number, dto: IMaGiamGia) {
  const res = await apiFetch<any>(`/promocodes/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  return res;
}

// DELETE
export async function deleteItem(id: number) {
  return apiFetch<any>(`/promocodes/${id}`, { method: "DELETE" });
}

// SEARCH (nếu có endpoint riêng, vẫn có thể dùng)
export async function searchByKeyword(keyword: string) {
  const res = await apiFetch<any>(
    `/promocodes/search?keyword=${encodeURIComponent(keyword)}`
  );
  return res?.dataDTO ?? res?.DataDTO ?? res;
}
