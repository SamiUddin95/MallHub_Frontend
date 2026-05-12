export interface Product {
    id: string;
    shopId: string;
    shopName?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    images: string[];
    thumbnail: string;
    inStock: boolean;
    stockQuantity?: number;
    rating?: number;
    reviewCount?: number;
    isOnSale: boolean;
    isFeatured: boolean;
    specifications?: Record<string, any>;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedVariant?: any;
}
