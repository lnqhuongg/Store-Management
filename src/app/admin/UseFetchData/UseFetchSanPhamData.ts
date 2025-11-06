'use client';

import { getAllCategories } from "@/app/services/categories/categoryService";
import { advancedSearchProducts, createProductRequest, filterByCategory, filterBySupplier, fiterBySortOrder, getAllProducts, searchByKeyword, updateProductRequest } from "@/app/services/products/productsService";
import { getAllSuppliers } from "@/app/services/suppliers/supplierService";
import { get } from "http";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function UseFetchSanPhamData() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [announce, setAnnounce] = useState<null | { type: string; message: string }>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await getAllProducts();
            setData(res.dataDTO ?? res);
        } catch (error) {
            console.error("Error fetching products:", error);
            setAnnounce({ type: "danger", message: "Lỗi kết nối đến server!" });
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await getAllCategories();
            setCategories(res.dataDTO ?? res);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setAnnounce({ type: "danger", message: "Lỗi kết nối đến server!" });
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const res = await getAllSuppliers();
            setSuppliers(res.dataDTO ?? res);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            setAnnounce({ type: "danger", message: "Lỗi kết nối đến server!" });
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    }

    const handleSearchByKeyword = async (keyword: string) => {
        try {
            if(keyword.trim() === "") {
                fetchProducts();
                return;
            }
            setLoading(true);
            const res = await searchByKeyword(keyword);
            setData(res.dataDTO);
        } catch (error) {
            // console.error("Error searching:", error);
            setAnnounce({ type: "danger", message: "Không tìm thấy sản phẩm!" });
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (product: any) => {
        try {
            setLoading(true);
            await createProductRequest(product);
            setAnnounce({ type: "success", message: "Đã thêm sản phẩm thành công!" });
            fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi thêm sản phẩm!" });
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id: string, product: any) => {
        try {
            setLoading(true);
            await updateProductRequest(id, product);
            setAnnounce({ type: "success", message: "Đã cập nhật sản phẩm thành công!" });
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi cập nhật sản phẩm!" });
        } finally {
            setLoading(false);
        }
    };

    const getByCategory = async (categoryID: string) => {
        try {
            setLoading(true);
            const res = await filterByCategory(categoryID);
            setData(res.dataDTO);
        } catch (error) {
            console.error("Error filtering by category:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi lọc sản phẩm!" });
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const getBySupplier = async (supplierID: string) => {
        try {
            setLoading(true);
            const res = await filterBySupplier(supplierID);
            setData(res.dataDTO);
        } catch (error) {
            console.error("Error filtering by supplier:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi lọc sản phẩm!" });
            setData([]);
        } finally {
            setLoading(false);
        }
    }

    const getBySortOrder = async (order: string) => {
        try {
            setLoading(true);
            const res = await fiterBySortOrder(order);
            setData(res.dataDTO);
        } catch (error) {
            console.error("Error filtering by supplier:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi lọc sản phẩm!" });
            setData([]);
        } finally {
            setLoading(false);
        }
    }

    const handleAdvancedSearchProducts = useCallback(
        debounce(async (categoryID: string, supplierID: string, sortOrder: string, keyword: string) => {
            try {
                setLoading(true);
                const res = await advancedSearchProducts(
                    categoryID,
                    supplierID, 
                    sortOrder,
                    keyword
                );
                setData(res.dataDTO ?? []);
            } catch (error) {
                console.error("Error in advanced search:", error);
                setAnnounce({ type: "danger", message: "Lỗi khi tìm kiếm!" });
                setData([]);
            } finally {
                setLoading(false);
            }
        }, 500), // Debounce 300ms
        []
    );

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (announce) {
            const timer = setTimeout(() => setAnnounce(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [announce]);

    return (
        {
            data,
            setData,
            loading,
            setLoading,
            announce,
            setAnnounce,
            handleSearchByKeyword,
            createProduct,
            updateProduct,
            categories,
            suppliers,
            getByCategory,
            getBySupplier,
            getBySortOrder,
            handleAdvancedSearchProducts
        }
    );
}