import { apiFetch } from "@/app/lib/api";

// Kiểu dữ liệu phiếu nhập
export interface IPhieuNhap {
    importId: number;
    importDate: object;
    supplier: object;
    staff: string;
    totalAmount: number;
}

export interface PhieuNhapFilter {
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string; // yyyy-MM-dd
    endDate?: string;   // yyyy-MM-dd
}

// === GET ALL with filter ===
export async function getAll(
    filter: PhieuNhapFilter = {},
    pageNumber: number = 1,
    pageSize: number = 10
) {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', pageSize.toString());

    // Append filter fields if exist
    if (filter.keyword) params.append('keyword', filter.keyword);
    if (filter.minPrice !== undefined) params.append('minPrice', filter.minPrice.toString());
    if (filter.maxPrice !== undefined) params.append('maxPrice', filter.maxPrice.toString());
    if (filter.startDate) params.append('startDate', filter.startDate);
    if (filter.endDate) params.append('endDate', filter.endDate);

    console.log("end points params: ", params.toString());
    const res = await apiFetch<any>(`/imports?${params.toString()}`);
    console.log("response in phieunhap controller: ", res);

    return {
        data: res?.dataDTO?.data || [],
        pagination: {
            currentPage: res?.dataDTO?.page ?? 1,
            totalPages: res?.dataDTO?.totalPages ?? 1,
            totalItems: res?.dataDTO?.total ?? 0,
            pageSize: res?.dataDTO?.pageSize ?? pageSize
        }
    };
}

// === GET BY ID ===
export async function getById(id: number): Promise<IPhieuNhap> {
    const res = await apiFetch<any>(`/imports/${id}`);
    return res.dataDTO;
}

// === CREATE ===
export async function create(dto: any): Promise<any> {
    const res = await apiFetch<any>('/imports/with-details', {
        method: 'POST',
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}

// === UPDATE ===
export async function update(id: number, dto: IPhieuNhap): Promise<IPhieuNhap> {
    const res = await apiFetch<any>(`/imports/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}
