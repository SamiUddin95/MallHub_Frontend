export interface Country {
    id: string;
    name: string;
    code: string;
    flag: string;
    description?: string;
    mallCount: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
