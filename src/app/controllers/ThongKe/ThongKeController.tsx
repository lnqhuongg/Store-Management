// ThongKeController.tsx
import { apiFetch } from '@/app/lib/api';

// Hàm lấy dữ liệu thống kê doanh thu từ API
export async function getTotalRevenue() {
    try {
        const res = await apiFetch<any>(`/stats/total-revenue`);
        console.log("response in thongke controller: ", res.dataDTO);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getTotalPaidOrders() {
    try {
        const res = await apiFetch<any>(`/stats/total-paid-orders`);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getTop5Products() {
    try {
        const res = await apiFetch<any>(`/stats/top-5-products`);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }   
}

export async function getRevenueByMonth(month: number, year: number) {
    try {
        const res = await apiFetch<any>(`/stats/revenue-by-month?month=${month}&year=${year}`);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }   
}

export async function getRevenueByYear(year: number) {
    try {
        const res = await apiFetch<any>(`/stats/revenue-by-year?year=${year}`);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }   
}

export async function getPaymentStats() {
    try {
        const res = await apiFetch<any>(`/stats/payment-methods`);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }       
}

export async function getLowStockProducts() {
    try {
        const res = await apiFetch<any>(`/stats/low-stock`);
        const data = await res.dataDTO;
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }   
}