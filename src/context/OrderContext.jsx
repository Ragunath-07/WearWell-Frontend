import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    // Load orders for logged-in user
    const loadOrders = (userId) => {
        if (!userId) {
            setOrders([]);
            return;
        }

        const storedOrders =
            JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
        setOrders(storedOrders);
    };

    // Add new order for user
    const addOrder = (userId, order) => {
        const existingOrders =
            JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];

        const updatedOrders = [...existingOrders, order];

        localStorage.setItem(
            `orders_${userId}`,
            JSON.stringify(updatedOrders)
        );

        setOrders(updatedOrders);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, loadOrders }}>
            {children}
        </OrderContext.Provider>
    );
}

