'use client';
export async function getAllCategories() {
    try {
        const response = await fetch('https://localhost:7107/api/categories');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}