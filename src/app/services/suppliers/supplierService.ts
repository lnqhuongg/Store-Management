'use client';
export async function getAllSuppliers() {
    try {
        const response = await fetch('http://localhost:5224/api/suppliers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
}