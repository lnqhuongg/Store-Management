import { apiFetch } from "@/app/lib/api";

// 1. DTO Chi tiết đơn hàng (Mapping đúng tên biến API trả về)
export interface IChiTietDonHang {
    orderItemId?: number;
    orderId?: number;
    productId?: number;
    quantity: number;
    price: number;
    subtotal?: number;

    product?: {
        productID: number;
        supplierID?: number;
        categoryID?: number;
        productName: string;
        barcode: string;
        price: number;
        unit: string;
        imageUrl?: string;
        category?: {
            categoryId: number;
            categoryName: string;
        };
    };
}

// 2. DTO Đơn Hàng
export interface IDonHang {
    orderId?: number;
    customerId?: number;
    customerName?: string;
    userId?: number;
    userName?: string;

    orderDate?: string;
    status?: string;

    totalAmount?: number;
    discountAmount?: number;

    promoId?: number | null;
    promotion?: IPromotion | null;

    items?: IChiTietDonHang[];
    payments?: IPayments[];
}

// 3. Interface Bộ lọc (Chỉ dùng cho Đơn hàng)
export interface IOrderFilter {
    keyword?: string;
    dateFrom?: string;
    dateTo?: string;
    minTotal?: number;
    maxTotal?: number;
}

export interface IPayments {
    paymentId?: number;
    orderId?: number;
    amount?: number;
    paymentMethod?: string;
    paymentDate?: string;
}

export interface IPromotion {
    promoId: number;
    promoCode: string;
    description?: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    startDate: string;
    endDate: string;
    minOrderAmount?: number;
    usageLimit?: number;
    usedCount?: number;
}

export interface ICreateOrder {
    customerId: number | null;
    userId: number | null;
    promoId: number | null;
    totalAmount: number | null;
    discountAmount: number;
    items: {
        productId: number;
        quantity: number;
        price: number;
        subtotal: number;
    }[];
    payments: {
        amount: number;
        paymentMethod: string;
    }[];
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

export async function createOrder(dto: ICreateOrder) {
    const res = await apiFetch<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(dto),
    });

    return res.dataDTO;
}