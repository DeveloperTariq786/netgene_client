export interface OrderItem {
    id: number;
    productId: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    unit: string;
}

export interface Order {
    id: string;
    date: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
    items: OrderItem[];
    paymentMethod: string;
    shippingAddress: string;
}
