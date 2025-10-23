'use client';
import Image from "next/image";

import btnPriceLowtoHigh from "../../../../public/icons/priceLowtoHigh.png";
import btnPriceHighToLow from "../../../../public/icons/priceHightoLow.png";
import SearchInput from "@/app/components/MUI/Input/SearchInput";
import SPImage from "../../../../public/sanpham/1.jpg";
import styleSP from "./SanPham.module.css"

export default function DSSanPham() {
    return (
        <section className='bg-light p-3 rounded' style={{height: "698px"}}>
            <h4 className='border-bottom pb-1 text-primary-emphasis mb-0'>Danh sách Sản phẩm</h4>
            <form className='d-flex justify-content-around border-bottom py-3'>
                <select className="form-select w-25">
                    <option selected value={-1}>Loại sản phẩm</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>
                <div className="d-flex">
                    <button type="button" 
                            className="d-flex align-items-center btn border p-2 mx-1"
                            title="Lọc giá từ Thấp đến Cao"
                    >
                        <Image
                            src={btnPriceLowtoHigh}
                            alt="Lọc giá từ Thấp đến Cao"
                            className={`${styleSP.iconFilterPrice}`}
                        />
                    </button>
                    <button type="button" 
                            className="d-flex align-items-center btn border p-2 mx-1"
                            title="Lọc giá từ Cao đến Thấp"
                    >
                        <Image
                            src={btnPriceHighToLow}
                            alt="Lọc giá từ Cao đến Thấp"
                            className={`${styleSP.iconFilterPrice}`}
                        />
                    </button>
                </div>
                <div className="d-flex align-items-center" style={{height: "37px", width: "400px"}}>
                    <SearchInput />
                </div>
            </form>
            {/* danh sách sản phẩm  */}
            <div className="product-list row row-cols-4 overflow-auto" style={{maxHeight: "566px"}}>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
                <div className={`${styleSP.productCard} col my-2`} style={{fontSize: "13px"}}>
                    <div className="p-2 border rounded">
                        <div className="d-flex justify-content-center my-1">
                            <Image
                                src={SPImage}
                                alt="Hình ảnh Sản phẩm"
                                className={` ${styleSP.productImg}`}
                            />
                        </div>
                        <strong className={` ${styleSP.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                        <p style={{fontSize: "15px"}} className="mb-0 text-center">100.000VND</p>
                        <p className="mb-0 text-center">Còn lại 16 cái</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-success mt-1 mb-1" style={{fontSize: "12px"}} type="button">Chọn sản phẩm</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}