import { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";

export default function OrderHistory() {
    const { orders, loadOrders } = useContext(OrderContext);
    console.log(orders)
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            loadOrders(user.id || user.email);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <h1 className="text-xl font-semibold">Please login to view your orders!</h1>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <h1 className="text-xl font-semibold">No orders found!</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mx-5 mt-10">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            <div className="space-y-6 md:w-[80%]">
                {orders.map((order,index) => (
                    <div key={index} className="border p-4 rounded">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                        </div>

                        <p className="text-green-600 font-semibold">Status: {order.status}</p>

                        <div className="mt-2">
                            {order.items.map((item) => (
                                <div key={item.size} className="flex gap-5">
                                    <div className="w-24">
                                        <img src={item.img} alt="" className="w-full" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h1>{item.name}</h1>
                                        <span>Size: {item.size}</span>
                                        <span>Qty: {item.qty}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-3 pt-2">
                            <p className="font-semibold">Total: ₹{order.total}</p>
                            <p className="text-sm text-gray-600">
                                Deliver to: {order.address.fullName}, {order.address.city}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

