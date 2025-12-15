// lib/api.ts
const API_URL = 'http://localhost:5224/api'; // địa chỉ backend của mình  

// tạo 1 hàm để fetch kiểu dữ liệu truyền vào là T (kiểu gì cũng được)
export async function apiFetch<T>(
    endpoint: string, // endpoint là đường dẫn api ví dụ /loaisanpham
    options: RequestInit = {} // này là truyền vô phương thức, GET / PUT / POST / DELETE + body api nếu có 
): Promise<T> { // trả về dữ liệu kiểu T ở trên
    const res = await fetch(`${API_URL}${endpoint}`, { // bắt đàu gọi api
        ...options,
        headers: {
            'Content-Type': 'application/json', // dữ liệu biết gửi lên là dữ liệu json 
            ...options.headers,
        },
    });

    if (res.status === 204) {
        return {} as T; // trả về object rỗng
    }

    // đọc nội dung json được gửi lên từ controller - backend
    let data: any;
    try {
        data = await res.json();
    } catch (err) {
        // Nếu không parse được JSON → trả về text hoặc rỗng
        const text = await res.text();
        console.error('Lỗi parse JSON:', text);
        throw new Error(text || 'Lỗi server');
    }

    // trả lỗi khác ngoài Ok (200) (tựa bên backend)
    // if (!res.ok) {
    //     throw new Error(data.message || data.error || 'Lỗi server');
    // }

    return data as T;
}