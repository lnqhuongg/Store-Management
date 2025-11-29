import { apiFetch } from "@/app/lib/api";

// 1. DTO Chi tiết đơn hàng (Mapping đúng tên biến API trả về)
export interface IChiTietDonHang {
    productID: number;      // ID sản phẩm (Chữ D hoa khớp API)
    productName?: string;   // Tên sản phẩm
    quantity: number;
    price: number;
    subtotal?: number;
}

// 2. DTO Đơn Hàng
export interface IDonHang {
    orderId?: number;
    customerId?: number;
    customerName?: string;
    orderDate?: string;
    totalAmount?: number;
    discountAmount?: number;
    paymentStatus?: string;
    items?: IChiTietDonHang[];
}

// 3. Interface Bộ lọc (Chỉ dùng cho Đơn hàng)
export interface IOrderFilter {
    keyword?: string;
    dateFrom?: string;
    dateTo?: string;
    minTotal?: number;
    maxTotal?: number;
}

// === GET ALL ===
export async function getAll(page: number = 1, pageSize: number = 5, filter: IOrderFilter = {}) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    // Logic lọc nâng cao của Đơn hàng
    if (filter.keyword) params.append('keyword', filter.keyword);
    if (filter.dateFrom) params.append('dateFrom', filter.dateFrom);
    if (filter.dateTo) params.append('dateTo', filter.dateTo);
    if (filter.minTotal) params.append('minTotal', filter.minTotal.toString());
    if (filter.maxTotal) params.append('maxTotal', filter.maxTotal.toString());

    const res = await apiFetch<any>(`/orders?${params.toString()}`);
    
    return {
        data: res.dataDTO?.data || [],
        pagination: {
            currentPage: res.dataDTO?.page ?? 1,
            totalPages: res.dataDTO?.totalPages ?? 1
        }
    };
}

// === GET BY ID ===
export async function getById(id: number): Promise<IDonHang> {
    const res = await apiFetch<any>(`/orders/${id}`);
    return res.dataDTO;
}