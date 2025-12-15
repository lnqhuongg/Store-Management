'use client';
const API_URL = 'http://localhost:5224/api/products';
export async function getListProducts() {
    try {
        const response = await fetch(`${API_URL}/list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
export async function getAllProducts(page: number, pageSize: number, keyword: string, order: string, categoryID: string, supplierID: string) {
    try {
        const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&order=${order}&category_id=${categoryID}&supplier_id=${supplierID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getAllSP() {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getProductById(id: string) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }   
}
export async function getStockByProductId(id: string) {
    try {
        const response = await fetch(`${API_URL}/getStock/${id}`);
        if(response.status === 404) {
            return { dataDTO: { quantity: 0 } }; // Trả về stock = 0 nếu không tìm thấy sản phẩm
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error(`Error fetching stock for product with id ${id}:`, error);
        throw error;
    }
}
export async function createProductRequest(product: FormData) {
    try {
        const response = await fetch('${API_URL}', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: product,
        });
        if (!response.ok) {
            // Lấy thông tin lỗi chi tiết từ backend
            const errorData = await response.json();
            console.error('Backend error:', errorData);
            if (errorData.errors) {
                Object.keys(errorData.errors).forEach(key => {
                    console.error(`Field: ${key}, Errors:`, errorData.errors[key]);
                });
            }
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}
export async function updateProductRequest(id: string, product: FormData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' },
            body: product,
        });
        if (!response.ok) {
            // Lấy thông tin lỗi chi tiết từ backend
            const errorData = await response.json();
            console.error('Backend error:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
}
export async function deleteProduct(id: string) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        }); 
        if (!response.ok) {
            throw new Error(`Error deleting product with id ${id}`);
        }
        return true;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
}
export async function searchByCategoryIDAndSortOrderAndKeyword(category_id: string, sortOrder: string, keyword: string) {
    try {
        const response = await fetch(`${API_URL}/search?category_id=${category_id}&order=${sortOrder}&keyword=${keyword}`, {
            method: 'GET',
        }); 
        if(response.status === 204) {
            return { dataDTO: [] }; // Trả về mảng rỗng nếu không tìm thấy sản phẩm
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error searching with keyword ${keyword}:`, error);
        throw error;
    }
}

export async function filterByCategory(categoryID: string) {
    try {
        const response = await fetch(`${API_URL}/category/${categoryID}`, {
            method: 'GET',
        }); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error filtering by categoryID ${categoryID}:`, error);
        throw error;
    }
}
export async function filterBySupplier(supplierID: string) {
    try {
        const response = await fetch(`${API_URL}/supplier/${supplierID}`, {
            method: 'GET',
        }); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error filtering by supplierID ${supplierID}:`, error);
        throw error;
    }
}
