import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Product } from '@/app/shared/models';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIcon],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    selectedImage: string = '';
    quantity: number = 1;
    relatedProducts: Product[] = [];
    
    // Color and size options
    colors = [
        { id: 'raven-black', name: 'Raven Black', value: '#000000' },
        { id: 'deep-navy', name: 'Deep Navy', value: '#1a1a3e' },
        { id: 'cognac-brown', name: 'Cognac Brown', value: '#8B4513' }
    ];
    sizes = ['Standard', 'Medium', 'Large'];
    selectedColor: string = 'raven-black';
    selectedSize: string = 'Medium';
    
    // Tab state
    activeTab: string = 'description';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.loadProductDetails(productId);
            this.loadRelatedProducts(productId);
        }
    }

    loadProductDetails(productId: string): void {
        // Mock data
        this.product = {
            id: productId,
            shopId: '1',
            shopName: 'Luxury Fashion House',
            name: 'Designer Handbag Collection',
            description: 'Experience luxury with this limited edition leather handbag. Crafted from the finest Italian leather, this piece combines timeless elegance with modern functionality. Features include multiple compartments, adjustable straps, and signature hardware.',
            category: 'accessories',
            price: 1299,
            originalPrice: 1899,
            discount: 32,
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8kD_i54PosqiBlSxjjbDGOGx1YBeOu1FjiPl9KcmXA&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6dS9g4HHQ5ImWOJFD_NLKMSPqvB21DXc3DzghA52Gg&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfdu1urMrIyvorTHsyVzx5MuNFJVB6wB_03irtUnjsyw&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcToy2UXPhu8kglQUxRiTeaZv7Rj-IVhlEpvzSylaPxw&s'
            ],
            thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEA8QDxAPEBEQDxAPEA8OEhAQEBAVFhkXFxURFRUYHCghGBslHRgVITEhJSkrLi8uFx8zODMwNyguLjcBCgoKDg0OGxAQGi0lICUtLy0tLy8tKystLS4vLS0uKy0tLS0tNy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLf/AABEIAM4A9QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAECBQYHAwj/xABJEAACAQIDBgEIBAoHCQEAAAABAgADEQQSIQUGEzFBUWEHFCIyUnGBkRZCVGIXU5OhorHB0dLTIzNVgpKU8ENzo7LCw+Hj8UT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJhEBAQACAQQCAgEFAAAAAAAAAAECEQMSEyExQVEEIgUUFVKBkf/aAAwDAQACEQMRAD8A4hERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARKqLkAakmwA1J8Jmqe62Iyqz8KirDMGq1EGn3st8p8GsZFsntMxt9RhImf+ilQ2C4jCOWvlAqMt/AF1A/PMNi8K9JilVGRh9Vhb4juPERLL6TcbPbxiIkqkRJey9mVsVU4WHpmo1ix1VVUDUs7sQqDxJAgRIm5bP3QokXetXxJGjDZ6UuAD7IxNd1Vzz9RWHjMwu5OAIGc7Qw7NyzPQxAHSzBKYA76sNCO15S8mMWmFrmsTc9r+T+ol2wdeni1F709KWIBFyQFuVqGw5IxY2Po6TTqiFSVYFWUlWVgQVI0IIPIy0svpFlntbERJQRKqpJAAJJNgBqSe02LZu5eLrBWdVwyNbK2JzqzD2hTUFyv3rZfGEWye2uRN/reT+jZUTGO1QZjVqcEtRQaAAopLrzHpG/uEw21NxcZQptWyJWpKMzPSY5gO5puFf36aWPaTqomeN+WsxESFiIiAiIgIiICIiAiIgJVVuQBqSbASklbMoh6q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',
            inStock: true,
            stockQuantity: 15,
            rating: 4.8,
            reviewCount: 156,
            isOnSale: true,
            isFeatured: true,
            specifications: {
                'Material': 'Italian Leather',
                'Dimensions': '30cm x 25cm x 12cm',
                'Weight': '0.8 kg',
                'Color': 'Black',
                'Hardware': 'Gold-plated',
                'Closure': 'Magnetic snap',
                'Strap': 'Adjustable leather strap',
                'Interior': 'Fabric lining with pockets'
            },
            tags: ['luxury', 'designer', 'leather', 'handbag', 'italian']
        };
        this.selectedImage = this.product.thumbnail;
    }

    loadRelatedProducts(productId: string): void {
        // Mock related products
        this.relatedProducts = [
            {
                id: '2',
                shopId: '1',
                name: 'Premium Leather Wallet',
                description: 'Handcrafted Italian leather wallet',
                category: 'accessories',
                price: 299,
                originalPrice: 449,
                discount: 33,
                images: ['data:image/jpeg;base64,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'],
                thumbnail: 'data:image/jpeg;base64,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',
                inStock: true,
                isOnSale: true,
                isFeatured: true,
                rating: 4.9,
                reviewCount: 234
            },
            {
                id: '4',
                shopId: '1',
                name: 'Classic Sunglasses',
                description: 'UV protection designer sunglasses',
                category: 'accessories',
                price: 399,
                images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg00CK9QPQGQ-LHVtGwK_HDBk5PQk_iE5aHA&s'],
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg00CK9QPQGQ-LHVtGwK_HDBk5PQk_iE5aHA&s',
                inStock: true,
                isOnSale: false,
                isFeatured: true,
                rating: 4.7,
                reviewCount: 178
            },
            {
                id: '5',
                shopId: '1',
                name: 'Designer Belt',
                description: 'Premium leather belt with signature buckle',
                category: 'accessories',
                price: 249,
                images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvw9Syxehfyo0gddjubBFcJoXB-wqda3OGVA&s'],
                thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvw9Syxehfyo0gddjubBFcJoXB-wqda3OGVA&s',
                inStock: true,
                isOnSale: false,
                isFeatured: false,
                rating: 4.6,
                reviewCount: 92
            }
        ];
    }

    selectImage(image: string): void {
        this.selectedImage = image;
    }

    increaseQuantity(): void {
        if (this.product && this.product.stockQuantity && this.quantity < this.product.stockQuantity) {
            this.quantity++;
        }
    }

    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToCart(): void {
        if (this.product) {
            console.log('Adding to cart:', {
                product: this.product,
                quantity: this.quantity
            });
            // Implement cart service
            alert(`Added ${this.quantity} item(s) to cart!`);
        }
    }

    buyNow(): void {
        if (this.product) {
            console.log('Buy now:', {
                product: this.product,
                quantity: this.quantity
            });
            // Implement checkout
            alert('Proceeding to checkout...');
        }
    }

    selectColor(colorId: string): void {
        this.selectedColor = colorId;
    }

    selectSize(size: string): void {
        this.selectedSize = size;
    }

    setActiveTab(tab: string): void {
        this.activeTab = tab;
    }

    get selectedColorName(): string {
        return this.colors.find(c => c.id === this.selectedColor)?.name || '';
    }
}
