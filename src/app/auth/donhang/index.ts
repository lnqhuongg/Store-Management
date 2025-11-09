export interface ApiResponse<T> {
  success: boolean;
  message: string;
  dataDTO: T;
}

export interface PagedResult<T> {
  Data: T[];        // PascalCase giống BE
  Total: number;
  Page: number;
  PageSize: number;
  TotalPages: number;
}

export interface ChiTietDonHangDTO {
  orderItemId: number;
  orderId?: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface ThanhToanDTO {
  paymentId: number;
  orderId?: number;
  method: string;
  amount: number;
  paymentDate: string; // ISO
}

export interface DonHangDTO {
  orderId: number;
  orderDate: string;    // ISO
  customerName?: string;
  employeeName?: string;
  discountAmount: number;
  totalAmount?: number;
  items: ChiTietDonHangDTO[];
  payments: ThanhToanDTO[];
}
