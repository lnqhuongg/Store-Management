'use client';

import { useEffect, useState } from "react";
import { GlobalStore } from "../LogicCart/globalStore";
import InvoicePreview from "@/app/components/InvoicePreview/InvoicePreview";

export default function POSLayout({ children }: { children: React.ReactNode }) {

    const [cart, setCart] = useState(GlobalStore.cart);
    const [customer, setCustomer] = useState(GlobalStore.customer);

    // Đồng bộ real time
    useEffect(() => {
        const syncCart = () => setCart([...GlobalStore.cart]);
        const syncCus = () => setCustomer(GlobalStore.customer);

        window.addEventListener("cart-updated", syncCart);
        window.addEventListener("customer-updated", syncCus);

        return () => {
            window.removeEventListener("cart-updated", syncCart);
            window.removeEventListener("customer-updated", syncCus);
        };
    }, []);

    // Nhận sản phẩm từ page
    useEffect(() => {
        const handler = (e: any) => {
            const p = e.detail;
            const prev = GlobalStore.cart;

            const found = prev.find(it => it.product.productID === p.productID);

            let newCart = [];

            if (found) {
                newCart = prev.map(it =>
                    it.product.productID === p.productID
                        ? { ...it, quantity: it.quantity + 1, subtotal: it.price * (it.quantity + 1) }
                        : it
                );
            } else {
                newCart = [
                    ...prev,
                    {
                        product: p,
                        quantity: 1,
                        price: p.price,
                        subtotal: p.price
                    }
                ];
            }

            GlobalStore.setCart(newCart);
        };

        window.addEventListener("add-product", handler);
        return () => window.removeEventListener("add-product", handler);
    }, []);

    return (
        <section className="row">
            <div className="col-8">{children}</div>

            <div className="col-4 bg-light rounded">
                <InvoicePreview
                    items={cart}
                    customer={customer}
                    onIncrease={id => {
                        const newCart = GlobalStore.cart.map(it =>
                            it.product.productID === id
                                ? { ...it, quantity: it.quantity + 1, subtotal: it.price * (it.quantity + 1) }
                                : it
                        );
                        GlobalStore.setCart(newCart);
                    }}
                    onDecrease={id => {
                        const newCart = GlobalStore.cart.map(it =>
                            it.product.productID === id
                                ? { ...it, quantity: Math.max(1, it.quantity - 1), subtotal: it.price * (it.quantity - 1) }
                                : it
                        );
                        GlobalStore.setCart(newCart);
                    }}
                    onRemove={id => {
                        const newCart = GlobalStore.cart.filter(it => it.product.productID !== id);
                        GlobalStore.setCart(newCart);
                    }}
                    onClear={() => GlobalStore.clearAll()}
                />
            </div>
        </section>
    );
}
