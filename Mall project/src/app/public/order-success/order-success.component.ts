import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    shopName: string;
}

interface RecommendedProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    badge?: string;
}

@Component({
    selector: 'app-order-success',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIcon],
    templateUrl: './order-success.component.html',
    styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
    orderNumber = 'ROM-99283';
    orderDate = new Date();
    estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    
    orderItems: OrderItem[] = [];
    recommendedProducts: RecommendedProduct[] = [];
    
    deliveryFee = 0; // FREE
    gstAmount = 745;
    totalPaid = 15895;

    ngOnInit(): void {
        this.loadOrderData();
        this.loadRecommendations();
    }

    loadOrderData(): void {
        this.orderItems = [
            {
                id: 1,
                name: 'Midnight Velvet Perfume',
                price: 8500,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
                shopName: 'Scents & Stories'
            },
            {
                id: 2,
                name: 'Premium Leather Wallet',
                price: 3200,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
                shopName: 'J. Junaid Jamshed'
            }
        ];
    }

    loadRecommendations(): void {
        this.recommendedProducts = [
            {
                id: 1,
                name: 'Classic Leather Weekend Bag',
                price: 12999,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                category: 'THE LEATHER CO.',
                badge: 'TRENDING'
            },
            {
                id: 2,
                name: 'Minimalist Ceramic Coffee Set',
                price: 4500,
                image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
                category: 'ARTISAN LIVING'
            },
            {
                id: 3,
                name: 'Premium Wireless Headphones',
                price: 29900,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                category: 'ELECTRONICS',
                badge: 'NEW'
            },
            {
                id: 4,
                name: 'Organic Silk Eye Mask',
                price: 2450,
                image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
                category: 'SILK & SOFT'
            }
        ];
    }

    get itemCount(): number {
        return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    get subtotal(): number {
        return this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    printOrder(): void {
        window.print();
    }

    trackOrder(): void {
        console.log('Tracking order:', this.orderNumber);
    }
}
