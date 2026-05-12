import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

interface CheckoutItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    shopName: string;
}

interface ShippingAddress {
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    saveAddress: boolean;
}

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIcon, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    currentStep = 1;
    
    checkoutItems: CheckoutItem[] = [];
    
    shippingAddress: ShippingAddress = {
        fullName: 'Ahmed Khan',
        phoneNumber: '+92 300 1234567',
        streetAddress: 'D-123, Block 4, Clifton',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75600',
        saveAddress: true
    };

    deliveryFee = 250;
    gstRate = 0.05;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.loadCheckoutData();
    }

    loadCheckoutData(): void {
        // Load items from cart (in real app, this would come from a service)
        this.checkoutItems = [
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
            },
            {
                id: 3,
                name: 'Silk Embroidered Kurta',
                price: 5000,
                quantity: 1,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxr9X3xi6GstHyvpZuXkVUhrXTzUq4o_jLGg&s',
                shopName: 'J. Junaid Jamshed'
            }

        ];
    }

    get subtotal(): number {
        return this.checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get gstAmount(): number {
        return this.subtotal * this.gstRate;
    }

    get totalAmount(): number {
        return this.subtotal + this.deliveryFee + this.gstAmount;
    }

    get itemCount(): number {
        return this.checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    continueToPayment(): void {
        if (this.validateShippingAddress()) {
            // Navigate to payment page
            this.router.navigate(['/payment']);
        }
    }

    validateShippingAddress(): boolean {
        return !!(
            this.shippingAddress.fullName &&
            this.shippingAddress.phoneNumber &&
            this.shippingAddress.streetAddress &&
            this.shippingAddress.city &&
            this.shippingAddress.province &&
            this.shippingAddress.postalCode
        );
    }

    setStep(step: number): void {
        this.currentStep = step;
    }
}
