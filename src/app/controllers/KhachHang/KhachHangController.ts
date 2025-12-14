// controllers/KhachHangController.ts
import { apiFetch } from "@/app/lib/api";

// Kiểu dữ liệu khách hàng
export interface IKhachHang {
    customerId: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    rewardPoints: number;
    createdAt: string;
}

// === GET ALL ===
// tui hiện tại làm chỉ hiển thị 5 bản ghi trên 1 trang thôi, mng muốn bao nhiêu thì cứ chỉnh ngay pageSize
export async function getAll(page: number = 1, pageSize: number = 5, keyword: string = "") {
    // gọi hàm apiFetch từ /lib/api.ts sau đó truyền vô url của module mình làm 
    // TẠO URL bên api 
    const params = new URLSearchParams();
    // /khachhang + 2 tham số là page: đang ở trang số mấy và pagesize là số bản ghi hiển thị trên 1 phân trang đó 
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    // nếu có tìm kiếm (có keyword)
    if (keyword) params.append('keyword', keyword);

    const res = await apiFetch<any>(`/customers?${params.toString()}`);

    return {
        // nhận data là danh sách DTO mình truyền từ controller 
        data: res.dataDTO?.data || [],
        // ? -> nếu DataDTO null thì ko có phân trang 
        pagination: {
            currentPage: res.dataDTO?.page ?? 1,
            totalPages: res.dataDTO?.totalPages ?? 1
        }
    };
}

// === GET BY ID ===
export async function getById(id: number): Promise<IKhachHang> {
    const res = await apiFetch<any>(`/customers/${id}`);
    return res.dataDTO;
}

// === CREATE ===
export async function create(dto: IKhachHang): Promise<IKhachHang> {
    const res = await apiFetch<any>('/customers', {
        method: 'POST',
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}

// === UPDATE ===
export async function update(id: number, dto: IKhachHang): Promise<IKhachHang> {
    const res = await apiFetch<any>(`/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dto),
    });
    return res.dataDTO;
}
