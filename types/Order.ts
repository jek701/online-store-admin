export interface Order {
    _id: string
    user_name: string
    user_number: string
    status: string
    order_date: string
    total_price: string,
    delivery_type: string
    delivery_address: string
    delivery_date: string
    payment_type: string
    order_items: OrderItem[]
    created_at: string
    updated_at: string
}

export interface OrderItem {
    name: string
    product_id: string
    quantity: {low: number, high: number}
    price: {low: number, high: number}
    created_at: string
}