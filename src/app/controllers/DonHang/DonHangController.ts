import { apiFetch } from "@/app/lib/api";

// 1. Định nghĩa Interface (DTO)
export interface IChiTietDonHang {
    customerID: number;
    productName?: string;
    quantity: number;
    price: number;
    subtotal?: number;
}

export interface IDonHang {
    orderId?: number;
    customerId?: number;
    customerName?: string;
    orderDate?: string;
    totalAmount?: number;
    items?: IChiTietDonHang[]; // Danh sách sản phẩm mua
}

// === GET ALL (Có phân trang & tìm kiếm) ===
export async function getAll(page: number = 1, pageSize: number = 5, keyword: string = "") {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    // Backend lọc theo keyword (Mã đơn hoặc Tên khách)
    if (keyword) params.append('keyword', keyword);

    // URL: /orders (khớp với Backend DonHangController)
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

// === CREATE ===
export async function create(dto: IDonHang): Promise<IDonHang> {
    const res = await apiFetch<any>('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Quan trọng để Backend nhận [FromBody]
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}

// === KHÔNG CÓ UPDATE / DELETE (Theo yêu cầu nghiệp vụ đơn hàng thường không sửa xóa lung tung) ===

// === HELPERS: Lấy dữ liệu cho Dropdown trong Modal ===
export async function getCustomersForDropdown() {
    // Lấy 100 khách hàng để chọn
    const res = await apiFetch<any>(`/customers?page=1&pageSize=100`);
    return res.dataDTO?.data || [];
}

export async function getProductsForDropdown() {
    // Lấy 100 sản phẩm để chọn
    const res = await apiFetch<any>(`/products?page=1&pageSize=100`);
    return res.dataDTO?.data || [];
}