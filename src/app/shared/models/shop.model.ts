export interface Shop {
    id: string;
    name: string;
    mallId: string;
    mallName?: string;
    brandName: string;
    category: string;
    description: string;
    logo: string;
    coverImage: string;
    rating?: number;
    reviewCount?: number;
    isActive: boolean;
    isFeatured: boolean;
    floor?: string;
    unit?: string;
    contactInfo?: {
        phone?: string;
        email?: string;
        website?: string;
    };
    openingHours?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
