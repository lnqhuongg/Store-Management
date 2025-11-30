export const CART_KEY = "pos_cart_v1";
export const CUSTOMER_KEY = "pos_customer_v1";

export const loadCart = () => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
};

export const saveCart = (cart: any) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const loadCustomer = () => {
    try { return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "null"); }
    catch { return null; }
};

export const saveCustomer = (customer: any) => {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
};
