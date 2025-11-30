'use client';

import DSSanPham from "@/app/components/StaffComponents/SanPham/page";
import { ProductSimple } from "@/app/staff/interfaces/interfaces";

export default function POSPage() {
    return (
        <DSSanPham
            onSelectProduct={(p: ProductSimple) => {
                // layout sẽ lo xử lý cart
                const event = new CustomEvent("add-product", { detail: p });
                window.dispatchEvent(event);
            }}
        />
    );
}
