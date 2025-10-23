'use client';

import SearchInput from "@/app/components/MUI/Input/SearchInput";
import Image from "next/image";
import btnPriceLowtoHigh from "../../../../public/icons/priceLowtoHigh.png";
import btnPriceHighToLow from "../../../../public/icons/priceHightoLow.png";
import SPImage from "../../../../public/sanpham/1.jpg";
import styleSP from "../../staff/SanPham/SanPham.module.css"
import { Tab, Table } from "react-bootstrap";
import ButtonAdd from "@/app/components/MUI/Button/ButtonAdd";
import { useState } from "react";
import KhachHangModal from "@/app/components/MUI/Modal/KhachHangModal";

export default function KhachHangPage() {
    const [modal, setModal] = useState(false);
    const handleAdd = () => {
        setModal(true);
    }
  return (
    <section className='bg-light p-3 rounded' style={{height: "698px"}}>
            <h4 className='border-bottom pb-1 text-primary-emphasis mb-0'>Danh sách Sản phẩm</h4>
            <form className='d-flex justify-content-around border-bottom py-3'>
                <div className="d-flex align-items-center">
                    <ButtonAdd onClick={handleAdd}/>
                </div>
                <div className="d-flex align-items-center" style={{height: "37px", width: "400px"}}>
                    <SearchInput />
                </div>
            </form>
            {/* danh sách sản phẩm  */}
            <div className="product-list row row-cols-4 overflow-auto" style={{maxHeight: "566px"}}>
                <table className="table table-striped table-hover w-100">
                    <thead className="text-center gap-2 h-10 align-middle">
                        <th>Choose</th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </thead>
                    <tbody className="text-center gap-2">
                        <tr>
                            <td><input type="radio" name="idKH" id="" /></td>
                            <td>Lữ Thị Cẩm Tri</td>
                            <td>tititi123@gmail.com</td>
                            <td>0123456789</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="idKH" id="" /></td>
                            <td>Nguyễn Văn A</td>
                            <td>nguyenvana@gmail.com</td>
                            <td>0987654321</td>
                        </tr>
                            
                    </tbody>
                </table>
            </div>
            <KhachHangModal show={modal} handleClose={() => setModal(false)} mode={'add'} KhachHangData={null} />
        </section>
  );
}