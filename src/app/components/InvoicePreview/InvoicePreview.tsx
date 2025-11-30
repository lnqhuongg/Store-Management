// InvoicePreview.tsx (client)
'use client';
import { useMemo } from "react";
import { CartItem } from "@/app/staff/interfaces/interfaces";
import { useState, useEffect } from "react";
import { getAllActive } from "@/app/controllers/MaGiamGia/MaGiamGiaController";
import { ICreateOrder, createOrder } from "@/app/controllers/DonHang/DonHangController";
import { PromoCode } from "@/app/staff/interfaces/interfaces";
import { GlobalStore } from "../../staff/LogicCart/globalStore";

type Props = {
    items: CartItem[];
    customer?: any | null;
    onIncrease?: (productID: number) => void;
    onDecrease?: (productID: number) => void;
    onRemove?: (productID: number) => void;
    onClear?: () => void;
};

export default function InvoicePreview({ items, customer, onIncrease, onDecrease, onRemove, onClear }: Props) {
    const subtotal = useMemo(
        () => items.reduce((s, it) => s + (it.price * it.quantity), 0),
        [items]
    );

    const [usePoints, setUsePoints] = useState(false);

    const [promoInput, setPromoInput] = useState("");
    const [promoList, setPromoList] = useState<PromoCode[]>([]);
    const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // Load promo từ API
    useEffect(() => {
        getAllActive().then(res => {
            setPromoList(res.dataDTO || []);
        });
    }, []);

    const maxPointUse = customer ? customer.rewardPoints : 0;

    const pointDiscount = useMemo(() => {
        if (!usePoints || !customer) return 0;

        if (customer.rewardPoints < 10000) return 0;           // ≤ 10k không được dùng
        const usable = Math.min(customer.rewardPoints, 50000); // tối đa 50k
        return Math.min(usable, subtotal);                      // không vượt quá số tiền
    }, [usePoints, customer, subtotal]);

    const promoDiscount = useMemo(() => {
        if (!selectedPromo) return 0;

        if (subtotal < selectedPromo.minOrderAmount) return 0;

        let discount = 0;

        if (selectedPromo.discountType === "percent") {
            discount = Math.floor((subtotal * selectedPromo.discountValue) / 100);
        } else if (selectedPromo.discountType === "fixed") {
            discount = selectedPromo.discountValue;
        }

        // Không được giảm vượt quá tạm tính
        return Math.min(discount, subtotal);
    }, [selectedPromo, subtotal]);

    const resetPromo = () => {
        setPromoInput("");
        setSelectedPromo(null);
        setShowDropdown(false);
    };

    const total = subtotal - pointDiscount - promoDiscount;

    const filteredPromo = promoInput
        ? promoList.filter(x =>
            x.promoCode.toLowerCase().includes(promoInput.toLowerCase())
        )
        : [];

    useEffect(() => {
        setSelectedPromo(GlobalStore.selectedPromo);
        setUsePoints(GlobalStore.usePoints);
    }, []);

    const [paymentMethod, setPaymentMethod] = useState(GlobalStore.paymentMethod);

    const [hasCart, setHasCart] = useState(false);

    useEffect(() => {
        const cart = localStorage.getItem("pos_cart_v1");
        setHasCart(!!cart && JSON.parse(cart).length > 0);
    }, [items]);

    // tạo đơn hàng mới
    const handlePayment = () => {
        // lấy dữ liệu từ localStorage
        const cart = JSON.parse(localStorage.getItem("pos_cart_v1") || "[]");
        const customer = JSON.parse(localStorage.getItem("pos_customer_v1") || "null");
        const usePoints = JSON.parse(localStorage.getItem("pos_use_points_v1") || "false");
        const promo = JSON.parse(localStorage.getItem("pos_selected_promo_v1") || "null");
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const paymentMethod = JSON.parse(localStorage.getItem("pos_payment_method_v1") || "null");

        const payload: ICreateOrder = {
            userId: user?.userId ?? null,

            customerId: customer?.customerId ?? null,

            promoId: promo?.promoId ?? null,

            totalAmount: total ?? 0,                // tổng thanh toán cuối cùng
            discountAmount: subtotal - total,       // tổng tiền đã giảm (promo + points)

            items: cart.map((it: any) => ({
                productId: it.product.productID,    // đúng case productId
                quantity: it.quantity,
                price: it.price,
                subtotal: it.subtotal              // cần có vì backend yêu cầu
            })),

            payments: [
                {
                    amount: total,                 // số tiền thực tế thanh toán
                    paymentMethod: paymentMethod   // "cash", "card", "bank_transfer", "e-wallet"
                }
            ]
        };

        console.log("PAYLOAD GỬI LÊN:", payload);

        createOrder(payload)
            .then(() => {
                // XÓA localStorage
                localStorage.removeItem("pos_cart_v1");
                localStorage.removeItem("pos_customer_v1");
                localStorage.removeItem("pos_use_points_v1");
                localStorage.removeItem("pos_selected_promo_v1");
                localStorage.removeItem("pos_payment_method_v1");

                onClear?.();
            })
            .catch(err => console.error(err));
    };


    return (
        <section className="py-3 px-2" style={{ height: "698px", overflow: 'hidden' }}>
            <form style={{ fontSize: "14px" }}>
                <h4 className="border-bottom pb-1 text-primary-emphasis">Thông tin thanh toán</h4>

                <div className="mb-2">
                    {customer ? (
                        <>
                            <strong>Khách hàng: </strong> {customer.name}
                            <div className="d-flex align-items-center justify-content-between">
                                <div style={{ fontSize: 13 }}>
                                    Điểm thưởng: <strong>{customer.rewardPoints}</strong>
                                </div>

                                <div style={{ fontSize: 13, width: 200 }} className="form-check mt-1 d-flex align-items-center justify-content-end ps-0">

                                    <input
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        id="usePoints"
                                        checked={usePoints}
                                        onChange={() => {
                                            setUsePoints(prev => {
                                                GlobalStore.setUsePoints(!prev);
                                                return !prev;
                                            });
                                        }}
                                        disabled={customer.rewardPoints < 10000}
                                    />

                                    <label className="form-check-label" htmlFor="usePoints">
                                        Sử dụng điểm thưởng
                                        {customer.rewardPoints < 10000 && " (≥10,000)"}
                                    </label>
                                </div>
                            </div>
                        </>
                    ) : (
                        <strong>Khách vãng lai</strong>
                    )}
                </div>

                <div className="product-list-invoice pt-3 pb-2 border-bottom border-top my-2 overflow-auto" style={{ maxHeight: "290px" }}>
                    {items.length === 0 && <p className="text-center text-muted">Chưa có sản phẩm</p>}

                    {items.map((it) => (
                        <div key={it.product.productID} className="item-card d-flex align-items-center justify-content-between mb-2">
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                {it.product.imageUrl ? (
                                    <img src={it.product.imageUrl} alt={it.product.productName} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 6 }} />
                                ) : (
                                    <div style={{ width: 72, height: 72, background: '#f0f0f0' }} />
                                )}
                                <div style={{ minWidth: 100 }}>
                                    <strong
                                        style={{
                                            width: '95px',
                                            display: 'block',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {it.product.productName}
                                    </strong>

                                    <div style={{ fontSize: 13 }}>{it.price.toLocaleString()} ₫</div>
                                    <div style={{ fontSize: 12, color: '#666' }}>Tồn kho: {it.product.stock ?? '-'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <div className="input-group" >
                                    <button type="button" className="btn btn-outline-secondary px-2" onClick={() => onDecrease?.(it.product.productID)}>-</button>
                                    <input value={it.quantity} min={1} readOnly className="form-control text-center" style={{ width: 35 }} />
                                    <button type="button" className="btn btn-outline-secondary px-2" onClick={() => onIncrease?.(it.product.productID)}>+</button>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onRemove?.(it.product.productID)}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between mb-1">
                    <strong>Tạm tính: </strong>
                    <span>{subtotal.toLocaleString()} ₫</span>
                </div>
                {pointDiscount > 0 && (
                    <div className="d-flex justify-content-between mb-1 text-success">
                        <strong>Giảm từ điểm thưởng:</strong>
                        <strong>- {pointDiscount.toLocaleString()} ₫</strong>
                    </div>
                )}

                <div className="mb-2 position-relative">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mã giảm giá"
                        value={promoInput}
                        onChange={(e) => {
                            setPromoInput(e.target.value);
                            setSelectedPromo(null);
                            setShowDropdown(true);
                        }}
                    />

                    {showDropdown && promoInput && filteredPromo.length > 0 && (
                        <div className="border bg-white position-absolute w-100 mt-1 rounded shadow-sm"
                            style={{ zIndex: 50, maxHeight: 150, overflowY: "auto" }}>
                            {filteredPromo.map(p => (
                                <div
                                    key={p.promoId}
                                    className="p-2 promo-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setSelectedPromo(p);
                                        GlobalStore.setPromo(p);
                                        setPromoInput(p.promoCode);
                                        setShowDropdown(false);
                                    }}
                                >
                                    <strong>{p.promoCode}</strong> — {p.description}
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedPromo && (
                        <div className="mt-1 text-success" style={{ fontSize: 13 }}>
                            ✔ Áp dụng: {selectedPromo.promoCode} — {selectedPromo.description}
                        </div>
                    )}
                </div>

                {/* Payment method example */}
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong style={{ width: '100px' }}>PTTT:</strong>
                    <div className="btn-group" role="group" style={{ width: '100%' }}>
                        <button
                            type="button" style={{ fontSize: 13 }}
                            className={`btn btn-outline-secondary ${paymentMethod === "cash" ? "active" : ""}`}
                            onClick={() => {
                                setPaymentMethod("cash");
                                GlobalStore.setPaymentMethod("cash");
                            }}
                        >
                            Cash
                        </button>

                        <button
                            type="button" style={{ fontSize: 13 }}
                            className={`btn btn-outline-secondary ${paymentMethod === "card" ? "active" : ""}`}
                            onClick={() => {
                                setPaymentMethod("card");
                                GlobalStore.setPaymentMethod("card");
                            }}
                        >
                            Card
                        </button>

                        <button
                            type="button" style={{ fontSize: 13 }}
                            className={`btn btn-outline-secondary ${paymentMethod === "bank_transfer" ? "active" : ""}`}
                            onClick={() => {
                                setPaymentMethod("bank_transfer");
                                GlobalStore.setPaymentMethod("bank_transfer");
                            }}
                        >
                            Banking
                        </button>

                        <button
                            type="button" style={{ fontSize: 13 }}
                            className={`btn btn-outline-secondary ${paymentMethod === "e-wallet" ? "active" : ""}`}
                            onClick={() => {
                                setPaymentMethod("e-wallet");
                                GlobalStore.setPaymentMethod("e-wallet");
                            }}
                        >
                            E-Wallet
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2" style={{ fontSize: "16px" }}>
                    <strong>Tổng thanh toán:</strong>
                    <strong className="text-danger">{total.toLocaleString()} ₫</strong>
                </div>

                <div className="d-flex gap-2 mt-2">
                    <button type="button" className="btn btn-outline-success w-100" disabled={!hasCart} onClick={handlePayment}>
                        Thanh toán
                    </button>
                    <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                            resetPromo();
                            onClear?.();
                        }} >
                        Hủy
                    </button>
                </div>
            </form>
        </section>
    );
}
