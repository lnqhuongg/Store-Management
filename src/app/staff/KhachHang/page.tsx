'use client';

import KhachHang from "@/app/components/StaffComponents/KhachHang/page";

export default function KhachHangPage() {
    const handleSelect = (item: any) => {
        const event = new CustomEvent("select-customer", {
            detail: item
        });

        window.dispatchEvent(event);
    };

    return <KhachHang onSelect={handleSelect} />;
}
