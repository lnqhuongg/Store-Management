'use client';
import Image from "next/image";

import btnPriceLowtoHigh from "../../../../../public/icons/priceLowtoHigh.png";
import btnPriceHighToLow from "../../../../../public/icons/priceHightoLow.png";
import styleSP from "./SanPham.module.css"
import { useEffect, useState } from "react";
import { getListProducts, getStockByProductId, searchByCategoryIDAndSortOrderAndKeyword } from "@/app/controllers/SanPham/SanPhamControllers";
import { getAll } from "@/app/controllers/LoaiSanPham/LoaiSanPhamController";
import { set } from "lodash";
import searchIcon from "../../../../../public/icons/loupe.png";
import styleBtn from "@/app/components/MUI/styleMaterials.module.css";
import { ProductSimple } from "@/app/staff/interfaces/interfaces";

type Props = {
    onSelectProduct?: (product: ProductSimple, qty?: number) => void
};

export default function DSSanPham({ onSelectProduct }: Props) {
    const [products, setProducts] = useState<Array<any>>([]); // Mảng sản phẩm
    const [categories, setCategories] = useState<Array<any>>([]); // Mảng loại sản phẩm
    const [keyword, setKeyword] = useState<string>(""); // Từ khóa tìm kiếm
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // Thứ tự sắp xếp
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Loại sản phẩm được chọn

    const fetchProducts = async () => {
        try {

            const res = await getListProducts();

            const products = res.dataDTO || [];

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
                        // console.error(`Error fetching stock for product ${product.productID}:`, error);
                        return {
                            ...product,
                            stock: 0
                        };
                    }
                })
            );
            setProducts(productsWithStock);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await getAll();
            setCategories(res.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const formatPrice = (price: number | string, currency: string = 'VND'): string => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(numPrice);
    };

    const handleSearch = (value: string) => {
        console.log("Từ khóa tìm kiếm:", value);
    }

    const handleToggleIcon = () => {
        setSortOrder(e => e === 'asc' ? 'desc' : 'asc');
    };

    const searchProducts = async () => {
        try {
            const category_id = selectedCategory || "";
            const order = sortOrder || "";
            const kw = keyword || "";
            const res = await searchByCategoryIDAndSortOrderAndKeyword(category_id, order, kw);
            const products = res.dataDTO || [];
            const productsWithStock = await Promise.all(
                products.map(async (product: any) => {
                    try {
                        const stockResponse = await getStockByProductId(product.productID);
                        return {
                            ...product,
                            stock: stockResponse.dataDTO?.quantity || 0
                        };
                    } catch (error) {
                        // console.error(`Error fetching stock for product ${product.productID}:`, error);
                        return {
                            ...product,
                            stock: 0
                        };
                    }
                })
            );
            setProducts(productsWithStock);
        } catch (error) {
            console.error("Error searching products:", error);
        }
    }

    const resetBtn = () => {
        setKeyword("");
        setSelectedCategory("-1");
        setSortOrder("asc");
        fetchProducts();
    }

    return (
        <section className='bg-light p-3 rounded' style={{ height: "698px" }}>
            <h4 className='border-bottom pb-1 text-primary-emphasis mb-0'>Danh sách Sản phẩm</h4>
            <div className='d-flex justify-content-around border-bottom py-3 gap-1'>
                <select className="form-select w-25" onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory || -1}>
                    <option defaultValue={-1}>Loại sản phẩm</option>
                    {categories.map((category) => (
                        <option value={category.categoryId} key={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <div className="d-flex gap-2 align-items-center">
                    <button type="button"
                        className="d-flex align-items-center btn border p-2 mx-1"
                        title="Lọc giá từ Thấp đến Cao"
                        onClick={handleToggleIcon}
                    >
                        <Image
                            src={sortOrder === 'asc' ? btnPriceLowtoHigh : btnPriceHighToLow}
                            alt={sortOrder === 'asc' ? "Sắp xếp giá tăng dần" : "Sắp xếp giá giảm dần"}
                            className={`${styleSP.iconFilterPrice}`}
                        />
                    </button>
                </div>
                <input value={keyword} type="text" className="bg-white p-1 rounded w-40" style={{ width: 350 }} placeholder="Nhập từ khóa tìm kiếm..." onChange={e => setKeyword(e.target.value)} name="" id="" />
                <button className="btn btn-dark" type="submit" id=""
                    onClick={() => searchProducts()}
                >
                    <Image
                        src={searchIcon}
                        alt="Thêm mới"
                        className={`${styleBtn.iconLoupe}`}
                    />
                </button>
                {sortOrder || selectedCategory || keyword ? (
                    <button
                        className="btn hover-btn btn-outline-secondary"
                        onClick={() => {
                            resetBtn()
                        }}
                    >
                        Refresh
                    </button>
                ) : null}
            </div>
            {/* danh sách sản phẩm  */}
            <div className="" style={{ maxHeight: "566px" }}>
                {
                    products.length === 0 ? (
                        <p className="text-center mt-4">Không tìm thấy sản phẩm nào.</p>
                    ) : (
                        <div className="product-list row row-cols-4 overflow-auto mt-3" style={{ maxHeight: "566px" }}>
                            {products.map((product) => (
                                <div key={product.productID} className="col mb-3">
                                    <div
                                        className="card h-100 border rounded d-flex flex-column justify-content-between"
                                        style={{ fontSize: "13px", height: "320px" }}
                                    >
                                        <div className="d-flex justify-content-center my-2">
                                            <img
                                                src={product.imageUrl || "/icons/box.png"}
                                                alt={product.productName}
                                                className="img-fluid rounded"
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100%",
                                                    height: "150px",
                                                }}
                                            />
                                        </div>

                                        <div className="card-body p-2 d-flex flex-column justify-content-between">
                                            <p className="text-center fw-semibold mb-2 text-truncate">{product.productName}</p>
                                            <div className="text-center">
                                                <p className="mb-0" style={{ fontSize: "15px" }}>
                                                    {formatPrice(product.price)}
                                                </p>
                                                <p className="mb-0">Còn lại {product.stock} {product.unit}</p>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    className="btn btn-outline-success mt-2"
                                                    style={{ fontSize: "12px" }}
                                                    type="button"
                                                    onClick={() => onSelectProduct?.({
                                                        productID: product.productID,
                                                        productName: product.productName,
                                                        imageUrl: product.imageUrl,
                                                        price: product.price,
                                                        unit: product.unit,
                                                        stock: product.stock
                                                    })}
                                                >
                                                    Chọn sản phẩm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }

            </div>

        </section>
    );
}