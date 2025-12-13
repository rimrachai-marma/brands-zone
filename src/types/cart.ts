export type attributes = {
    size: string;
    color: string;
}

export interface CartItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    variant_id: number;
    price: number;
    attributes: attributes;
    stock: number;
    quantity: number;
    subtotal: number;
}
