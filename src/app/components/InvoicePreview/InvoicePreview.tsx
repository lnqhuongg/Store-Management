'use client';
import Image from "next/image";
import "../../globals.css";
import styleInvoice from "./InvoicePreview.module.css";
import SPImage from "../../../../public/sanpham/1.jpg";

export default function InvoicePreview() {
    return (
        <section className="py-3 px-1" style={{height: "698px"}}>
            <form style={{fontSize: "14px"}} className={` ${styleInvoice.InvoicePreview}`}>
                <h4 className="border-bottom pb-1 text-primary-emphasis">Thông tin thanh toán</h4>
                <div className="d-flex justify-content-between">
                    <strong>Tên khách hàng:</strong>
                    <span>Lê Ngọc Quỳnh Hương</span>
                </div>
                <div className="product-list-invoice pt-3 pb-2 border-bottom border-top my-2 overflow-auto" 
                     style={{maxHeight: "350px"}}
                     >
                    <div className="item-card d-flex align-items-center justify-content-between mb-2">
                        <Image
                            src={SPImage}
                            alt="Hình ảnh Sản phẩm"
                            className={` ${styleInvoice.productImg}`}
                        />
                        <div className="item-info" style={{width: "120px"}}>
                            <strong className={` ${styleInvoice.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                            <p className="mb-0">100.000 VND</p>
                            <p className="mb-0">Tồn kho: <span>16</span></p>
                        </div>
                        <div className="input-group " style={{ height: "35px", width: "130px" }}>
                            <button className="btn btn-outline-secondary" type="button">-</button>
                            <input type="text" style={{fontSize: "14px"}} className="form-control text-center" min={1} value={1}/>
                            <button className="btn btn-outline-secondary" type="button">+</button>
                        </div>
                    </div>
                    <div className="item-card d-flex align-items-center justify-content-between mb-2">
                        <Image
                            src={SPImage}
                            alt="Hình ảnh Sản phẩm"
                            className={` ${styleInvoice.productImg}`}
                        />
                        <div className="item-info" style={{width: "120px"}}>
                            <strong className={` ${styleInvoice.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                            <p className="mb-0">100.000 VND</p>
                            <p className="mb-0">Tồn kho: <span>16</span></p>
                        </div>
                        <div className="input-group " style={{ height: "35px", width: "130px" }}>
                            <button className="btn btn-outline-secondary" type="button">-</button>
                            <input type="text" style={{fontSize: "14px"}} className="form-control text-center" min={1} value={1}/>
                            <button className="btn btn-outline-secondary" type="button">+</button>
                        </div>
                    </div>
                    <div className="item-card d-flex align-items-center justify-content-between mb-2">
                        <Image
                            src={SPImage}
                            alt="Hình ảnh Sản phẩm"
                            className={` ${styleInvoice.productImg}`}
                        />
                        <div className="item-info" style={{width: "120px"}}>
                            <strong className={` ${styleInvoice.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                            <p className="mb-0">100.000 VND</p>
                            <p className="mb-0">Tồn kho: <span>16</span></p>
                        </div>
                        <div className="input-group " style={{ height: "35px", width: "130px" }}>
                            <button className="btn btn-outline-secondary" type="button">-</button>
                            <input type="text" style={{fontSize: "14px"}} className="form-control text-center" min={1} value={1}/>
                            <button className="btn btn-outline-secondary" type="button">+</button>
                        </div>
                    </div>
                    <div className="item-card d-flex align-items-center justify-content-between mb-2">
                        <Image
                            src={SPImage}
                            alt="Hình ảnh Sản phẩm"
                            className={` ${styleInvoice.productImg}`}
                        />
                        <div className="item-info" style={{width: "120px"}}>
                            <strong className={` ${styleInvoice.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                            <p className="mb-0">100.000 VND</p>
                            <p className="mb-0">Tồn kho: <span>16</span></p>
                        </div>
                        <div className="input-group " style={{ height: "35px", width: "130px" }}>
                            <button className="btn btn-outline-secondary" type="button">-</button>
                            <input type="text" style={{fontSize: "14px"}} className="form-control text-center" min={1} value={1}/>
                            <button className="btn btn-outline-secondary" type="button">+</button>
                        </div>
                    </div>
                    <div className="item-card d-flex align-items-center justify-content-between mb-2">
                        <Image
                            src={SPImage}
                            alt="Hình ảnh Sản phẩm"
                            className={` ${styleInvoice.productImg}`}
                        />
                        <div className="item-info" style={{width: "120px"}}>
                            <strong className={` ${styleInvoice.productTitle}`}>Áo thun siu rẻ mua ngay mua ngay</strong>
                            <p className="mb-0">100.000 VND</p>
                            <p className="mb-0">Tồn kho: <span>16</span></p>
                        </div>
                        <div className="input-group " style={{ height: "35px", width: "130px" }}>
                            <button className="btn btn-outline-secondary" type="button">-</button>
                            <input type="text" style={{fontSize: "14px"}} className="form-control text-center" min={1} value={1}/>
                            <button className="btn btn-outline-secondary" type="button">+</button>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="d-flex justify-content-between mb-1">
                    <strong>Tạm tính: </strong>
                    <span>100.000 VND</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>Điểm thưởng khách hàng: </strong>
                    <span>10.000 
                        <button className="btn btn-outline-success ms-2 py-1" style={{fontSize: "13px"}}>Áp dụng</button>
                        <button className="btn btn-outline-danger ms-2 py-1" style={{fontSize: "13px" , display: "none"}}>Chưa đủ điểm</button>
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>Mã giảm giá:</strong>
                    <span>
                        <strong>STKD5</strong><span> - Giảm 5%</span>
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong style={{width: "100px"}}>PTTT:</strong>
                    <div className="btn-group" role="group" style={{width: "250px", fontSize: "13px", height: "30px"}}>
                        <button type="button" className="btn btn-outline-secondary active" style={{fontSize: "13px"}}>Cash</button>
                        <button type="button" className="btn btn-outline-secondary" style={{fontSize: "13px"}}>Card</button>
                        <button type="button" className="btn btn-outline-secondary" style={{fontSize: "13px"}}>Banking</button>
                        <button type="button" className="btn btn-outline-secondary" style={{fontSize: "13px"}}>E-Wallet</button>
                    </div>
                </div>
                <p style={{fontSize: "13px"}} className="text-body-secondary mb-0">Điểm thưởng được cộng vào khách hàng <span>Lê Ngọc Quỳnh Hương</span> sau khi thanh toán là <span>12</span> điểm.</p>
                <div className="d-flex justify-content-between align-items-center mt-0" style={{fontSize: "16px"}}>
                    <strong>Tổng thanh toán:</strong>
                    <strong className="text-danger">
                        85.500 VND
                    </strong>
                </div>
                <button className="btn btn-outline-success w-100 mt-2" type="submit">Thanh toán</button>
            </form>
        </section>
    );
}