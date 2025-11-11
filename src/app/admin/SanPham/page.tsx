'use client';

import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import TableComponent from "@/app/components/MUI/Table/Table";
import PaginationComponent from "@/app/components/Pagination/PaginationSanPham";
import SanPhamModalForm from "@/app/components/MUI/Modal/SanPhamModal";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import btnPriceLowtoHigh from "../../../../public/icons/priceLowtoHigh.png";
import btnPriceHighToLow from "../../../../public/icons/priceHightoLow.png";
import styleBtn from "../../components/MUI/styleMaterials.module.css"
import searchIcon from "../../../../public/icons/loupe.png";

// import styleSP from "./SanPham.module.css"
import styleSP from "../../staff/SanPham/SanPham.module.css";

import Image from "next/image";
import SearchInputProducts from "@/app/components/MUI/Input/SearchInputProducts";
import { createProductRequest, getAllProducts, getStockByProductId, updateProductRequest } from "@/app/controllers/SanPham/SanPhamControllers";
import { getAll } from "@/app/controllers/LoaiSanPham/LoaiSanPhamController";
import { getAllSuppliers } from "@/app/controllers/NhaCungCap/NhaCungCapController";


export default function SanPham() {
    const columns = ['Mã sản phẩm', 'Tên sản phẩm', 'Tồn kho', 'Loại', 'Nhà cung cấp', 'Đơn giá'];
    const dataKeys = ['productID', 'productName', 'stock', 'category.categoryName', 'supplier.name', 'price'];

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedSupplier, setSelectedSupplier] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 
    const [totalPages, setTotalPages] = useState(1);
    const [listProducts, setListProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [keyword, setKeyword] = useState<string>('');
    const [isIncrease, setIsIncrease] = useState<string>('asc');
    const [loading, setLoading] = useState<boolean>(false);
    const [announce, setAnnounce] = useState<null | { type: string; message: string }>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const res = await getAllProducts(currentPage, 5, keyword, isIncrease, selectedCategory, selectedSupplier);
            
            const products = res.dataDTO.items || res.dataDTO.data || [];
            
            // Fetch stock cho từng sản phẩm
            const productsWithStock = await Promise.all(
                products.map(async (product: any) => {
                    try {
                        const stockResponse = await getStockByProductId(product.productID);
                        return {
                            ...product,
                            stock: stockResponse.dataDTO?.quantity || 0
                        };
                    } catch (error) {
                        console.error(`Error fetching stock for product ${product.productID}:`, error);
                        return {
                            ...product,
                            stock: 0
                        };
                    }
                })
            );
            setListProducts(productsWithStock);
            setTotalPages(res.dataDTO.totalPages || 1);
      
            
        } catch (error) {
            console.error("Error fetching products:", error);
            setAnnounce({ type: "danger", message: "Lỗi kết nối đến server!" });
            setListProducts([]);
            setTotalPages(1);
        }
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await getAll();
            setCategories(res.data || []);
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
    
    useEffect(() => {
        fetchCategories();
        fetchSuppliers();
        fetchProducts(); 
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);


    const createProduct = async (product: any) => {
        try {
            await createProductRequest(product);
            setAnnounce({ type: "success", message: "Đã thêm sản phẩm thành công!" });
            fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi thêm sản phẩm!" });
        } 
    };

    const updateProduct = async (id: string, product: any) => {
        try {
            await updateProductRequest(id, product);
            setAnnounce({ type: "success", message: "Đã cập nhật sản phẩm thành công!" });
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
            setAnnounce({ type: "danger", message: "Lỗi khi cập nhật sản phẩm!" });
        } 
    };
    

    const handleAdd = () => {
        setMode('add');
        setSelectedIndex(null);
        setShowModal(true);
    };

    const handleEdit = (LoaiSP: any) => {
        setMode('edit');
        setSelectedIndex(LoaiSP);
        setShowModal(true);
    };

    const handleDelete = (LoaiSP: any) => {
        setSelectedIndex(LoaiSP);
        setAnnounce({ type: "success", message: "Đã xóa sản phẩm thành công!" });
    }

    const handleToggleIcon = () => {
        setIsIncrease(e => e === 'asc' ? 'desc' : 'asc');
    };

    const handleResetFilter = () => {
        setSelectedCategory('');
        setSelectedSupplier('');
        setIsIncrease('asc');
        setKeyword('');
    };

    const handleManualSearch = () => {
        setCurrentPage(1);
        fetchProducts();
    };

    
    return (
        <section>
            <h4>Quản lý Sản phẩm</h4>
            {announce && (
                <div className="my-3">
                <Alert
                    variant={announce.type}
                    dismissible
                    onClose={() => setAnnounce(null)}
                >
                    <strong>{announce.message}</strong>
                </Alert>
                </div>
            )}
            <div className="loaisanpham py-4">
                <div className="d-flex justify-content-start gap-3">
                    {/* gửi hành showmodal(true) cho button -- mở modal  */}
                    <ButtonAdd onClick={handleAdd} />
                    <div className="w-40">
                        <select 
                            className="form-select" 
                            aria-label="Lọc theo loại sản phẩm"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                        >
                            <option value="">Lọc theo loại</option>
                            {categories.map((category: any) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-40">
                        <select 
                            className="form-select" 
                            aria-label="Lọc theo nhà cung cấp"
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            value={selectedSupplier}
                        >
                            <option value="">Lọc theo nhà cung cấp</option>
                            {suppliers.map((supplier: any) => (
                                <option key={supplier.supplierId} value={supplier.supplierId}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-white p-1 rounded" onClick={handleToggleIcon}>
                        {/* <img src={isIncrease ? "/icons/increase.png" : "/icons/decrease.png"} alt="" className="h-8 w-8" /> */}
                        <Image
                            src={isIncrease === 'asc' ? btnPriceLowtoHigh : btnPriceHighToLow}
                            alt={isIncrease === 'asc' ? "Sắp xếp giá tăng dần" : "Sắp xếp giá giảm dần"}
                            className={`${styleSP.iconFilterPrice}`}
                        />
                    </button>
                    {(selectedCategory || selectedSupplier || keyword) && (
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                handleResetFilter();
                            }}
                        >
                            Reset
                        </button>
                    )}
                    {/* <SearchInputProducts keyword={keyword} setKeyword={setKeyword} handleSearchByKeyword={handleSearchByKeyword} /> */}
                    <input type="text" className="bg-white p-1 rounded w-40" style={{width: 350}}  placeholder="Nhập từ khóa tìm kiếm..." onChange={e => setKeyword(e.target.value)} name="" id="" />
                    <button className="btn btn-dark" type="submit" id=""
                        onClick={() => handleManualSearch()}
                    >
                        <Image
                            src={searchIcon}
                            alt="Thêm mới"
                            className={`${styleBtn.iconLoupe}`}
                        />
                    </button>
                </div>
                <div>
                    {/* <SearchInputProducts keyword={keyword} setKeyword={setKeyword} handleSearchByKeyword={handleSearchByKeyword} /> */}
                </div>
                
                <div>
                    <TableComponent
                        columns={columns}
                        dataKeys={dataKeys}
                        data={listProducts}
                        onEdit={(item) => handleEdit(item)} // truyền vào item/đối tượng item, mốt truyền vào id
                        onDelete={(item) => handleDelete(item)}
                    />
                </div>
                <div>
                    
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
            <SanPhamModalForm
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                mode={mode}
                createProduct={createProduct}
                updateProduct={updateProduct}
                SanPhamData={selectedIndex}
            />

        </section>
    );
}