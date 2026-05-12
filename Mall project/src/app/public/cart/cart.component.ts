import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    shopName: string;
    mallName: string;
    shopId: number;
}

interface SavedItem {
    id: number;
    name: string;
    price: number;
    image: string;
    shopName: string;
    mallName: string;
}

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIcon, FormsModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    savedItems: SavedItem[] = [];
    deliveryFee = 250;
    promoCode = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.loadCartData();
    }

    loadCartData(): void {
        this.cartItems = [
            {
                id: 1,
                name: 'Silk Embroidered Kurta',
                price: 12500,
                quantity: 1,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxr9X3xi6GstHyvpZuXkVUhrXTzUq4o_jLGg&s',
                shopName: 'Khaadi',
                mallName: 'Dolmen Mall, Clifton',
                shopId: 1
            },
            {
                id: 2,
                name: 'Wireless Noise Cancelling Headphones',
                price: 45000,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                shopName: 'Sony Center',
                mallName: 'Lucky One Mall',
                shopId: 2
            },
            {
                id: 3,
                name: 'Leather Executive Briefcase',
                price: 37800,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                shopName: 'Hub Leather',
                mallName: 'Dolmen Mall, Clifton',
                shopId: 3
            }
        ];

        this.savedItems = [
            {
                id: 4,
                name: 'Classic White Sneakers',
                price: 8500,
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
                shopName: 'Bata Signature',
                mallName: 'Emporium Mall'
            }
        ];
    }

    get subtotal(): number {
        return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get totalAmount(): number {
        return this.subtotal + this.deliveryFee;
    }

    get itemCount(): number {
        return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateQuantity(item: CartItem, change: number): void {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0 && newQuantity <= 10) {
            item.quantity = newQuantity;
        }
    }

    removeItem(itemId: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    }

    saveForLater(item: CartItem): void {
        const savedItem: SavedItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            shopName: item.shopName,
            mallName: item.mallName
        };
        this.savedItems.push(savedItem);
        this.removeItem(item.id);
    }

    moveToCart(savedItem: SavedItem): void {
        const cartItem: CartItem = {
            ...savedItem,
            quantity: 1,
            shopId: 1
        };
        this.cartItems.push(cartItem);
        this.savedItems = this.savedItems.filter(item => item.id !== savedItem.id);
    }

    applyPromoCode(): void {
        if (this.promoCode.trim()) {
            console.log('Applying promo code:', this.promoCode);
        }
    }

    proceedToCheckout(): void {
        if (this.cartItems.length > 0) {
            this.router.navigate(['/checkout']);
        }
    }
}
