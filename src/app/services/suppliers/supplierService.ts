'use client';
export async function getAllSuppliers() {
    try {
        const response = await fetch('https://localhost:7107/api/suppliers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
    }
}