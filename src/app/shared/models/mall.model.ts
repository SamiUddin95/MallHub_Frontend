export interface Mall {
    id: string;
    name: string;
    countryId: string;
    countryName?: string;
    city: string;
    address: string;
    description: string;
    image: string;
    shopCount: number;
    brandCount: number;
    rating?: number;
    isActive: boolean;
    isFeatured: boolean;
    openingHours?: string;
    contactInfo?: {
        phone?: string;
        email?: string;
        website?: string;
    };
    location?: {
        latitude: number;
        longitude: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
