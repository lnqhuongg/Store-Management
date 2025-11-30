export const GlobalStore = {
    cart: [],
    customer: null,
    selectedPromo: null,
    usePoints: false,
    paymentMethod: null as "cash" | "card" | "bank_transfer" | "e-wallet" | null,

    setCart(newCart) {
        this.cart = newCart;
        localStorage.setItem("pos_cart_v1", JSON.stringify(newCart));
        window.dispatchEvent(new CustomEvent("cart-updated"));
    },

    setCustomer(cus) {
        this.customer = cus;
        localStorage.setItem("pos_customer_v1", JSON.stringify(cus));
        window.dispatchEvent(new CustomEvent("customer-updated"));
    },

    setPromo(promo) {
        this.selectedPromo = promo;
        localStorage.setItem("pos_selected_promo_v1", JSON.stringify(promo));
        window.dispatchEvent(new CustomEvent("promo-updated"));
    },

    setUsePoints(value) {
        this.usePoints = value;
        localStorage.setItem("pos_use_points_v1", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent("usepoints-updated"));
    },

    load() {
        try {
            this.cart = JSON.parse(localStorage.getItem("pos_cart_v1") || "[]");
            this.customer = JSON.parse(localStorage.getItem("pos_customer_v1") || "null");

        } catch { }
    },

    setPaymentMethod(method) {
        this.paymentMethod =
            localStorage.getItem("pos_payment_method_v1") as
            | "cash"
            | "card"
            | "bank_transfer"
            | "e-wallet"
            | null;
        localStorage.setItem("pos_payment_method_v1", JSON.stringify(method));
        window.dispatchEvent(new CustomEvent("payment-updated"));
    },

    clearAll() {
        this.cart = [];
        this.customer = null;
        this.selectedPromo = null;
        this.usePoints = false;

        localStorage.removeItem("pos_cart_v1");
        localStorage.removeItem("pos_customer_v1");
        localStorage.removeItem("pos_selected_promo_v1");
        localStorage.removeItem("pos_use_points_v1");
        localStorage.removeItem("pos_payment_method_v1");

        // bắn event để UI sync lại
        window.dispatchEvent(new CustomEvent("cart-updated"));
        window.dispatchEvent(new CustomEvent("customer-updated"));
        window.dispatchEvent(new CustomEvent("promo-updated"));
        window.dispatchEvent(new CustomEvent("usepoints-updated"));
        window.dispatchEvent(new CustomEvent("payment-updated"));
    }
};

if (typeof window !== "undefined") {
    GlobalStore.load();
}
