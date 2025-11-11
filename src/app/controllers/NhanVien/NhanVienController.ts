import { apiFetch } from "@/app/lib/api";

// Kiểu dữ liệu nhân viên
export interface INhanVien {
    userId: number;
    username: string;
    fullName: string;
    role: 'admin' | 'staff';
    status: number;
    createdAt: string;
}

export interface NhanVienFilter {
    keyword?: string;
    role?: 'admin' | 'staff' | '';
}

// === GET ALL + PAGINATION + SEARCH + FILTER ===
export async function getAll(
    page: number = 1,
    pageSize: number = 5,
    filter: NhanVienFilter = {}
) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (filter.keyword) params.append('keyword', filter.keyword);
    if (filter.role) params.append('role', filter.role);

    const res = await apiFetch<any>(`/users?${params.toString()}`);

    return {
        data: res.dataDTO?.data || [],
        pagination: {
            currentPage: res.dataDTO?.page ?? 1,
            totalPages: res.dataDTO?.totalPages ?? 1
        }
    };
}

// === GET BY ID ===
export async function getById(id: number): Promise<INhanVien> {
    const res = await apiFetch<any>(`/users/${id}`);
    return res.dataDTO;
}

// === CREATE ===
export async function create(dto: Omit<INhanVien, 'userId' | 'createdAt'>): Promise<INhanVien> {
    const res = await apiFetch<any>('/users', {
        method: 'POST',
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}

// === UPDATE ===
export async function update(id: number, dto: Omit<INhanVien, 'userId' | 'createdAt'>): Promise<INhanVien> {
    const res = await apiFetch<any>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}