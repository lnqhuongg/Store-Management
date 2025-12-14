export interface ProductSimple {
    productID: number;
    productName: string;
    imageUrl?: string | null;
    price: number;
    unit?: string;
    stock?: number;
}

export interface CartItem {
    product: ProductSimple;
    quantity: number;
    price: number;
    subtotal?: number;
}

export interface Customer {
    customerId: number;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    rewardPoints: number;
    createdAt?: string;
}

export interface PromoCode {
    promoId: number;
    promoCode: string;
    description: string;
    discountType: "percent" | "fixed";
    discountValue: number;
    minOrderAmount: number;
    startDate: string;
    endDate: string;
    usageLimit: number;
    usedCount: number;
    status: string;
}
