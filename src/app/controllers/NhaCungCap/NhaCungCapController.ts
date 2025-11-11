// controllers/NhaCungCapController.ts
import { apiFetch } from "@/app/lib/api";

// Kiểu dữ liệu nhà cung cấp
export interface INhaCungCap {
  supplierId: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: number; // 0/1
}

// === GET ALL ===
// chỉnh pageSize lên 10
export async function getAll(page: number = 1, pageSize: number = 10, keyword: string = "") {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  if (keyword) params.append("keyword", keyword);

  const res = await apiFetch<any>(`/suppliers?${params.toString()}`);

  return {
    // nhận data là danh sách DTO mình truyền từ controller
    data: res.dataDTO?.data || [],
    // ? -> nếu DataDTO null thì ko có phân trang
    pagination: {
      currentPage: res.dataDTO?.page ?? 1,
      totalPages: res.dataDTO?.totalPages ?? 1,
    },
  };
}

// === GET BY ID ===
export async function getById(id: number): Promise<INhaCungCap> {
  const res = await apiFetch<any>(`/suppliers/${id}`);
  return res.dataDTO;
}

// === CREATE ===
export async function create(dto: INhaCungCap): Promise<INhaCungCap> {
  const res = await apiFetch<any>("/suppliers", {
    method: "POST",
    body: JSON.stringify(dto),
  });
  return res.dataDTO;
}

// === UPDATE ===
export async function update(id: number, dto: INhaCungCap): Promise<INhaCungCap> {
  const res = await apiFetch<any>(`/suppliers/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  return res.dataDTO;
}

// === DELETE ===
export async function deleteItem(id: number): Promise<void> {
  await apiFetch(`/suppliers/${id}`, { method: "DELETE" });
}

export async function getAllSuppliers() {
    try {
        const response = await fetch('https://localhost:7107/api/suppliers/getAllNCC');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
}