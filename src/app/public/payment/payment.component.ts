import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  selectedPaymentMethod: string = 'card';
  
  paymentForm = {
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  };

  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];

  orderDetails = {
    items: [
      {
        name: 'Premium Leather Jacket',
        shopName: 'Fashion Hub',
        quantity: 1,
        price: 45000
      },
      {
        name: 'Designer Sunglasses',
        shopName: 'Fashion Hub',
        quantity: 1,
        price: 12000
      }
    ],
    subtotal: 57000,
    deliveryFee: 500,
    platformFee: 200,
    totalAmount: 57700
  };

  constructor(private router: Router) {}

  processPayment() {
    // Simulate payment processing
    setTimeout(() => {
      this.router.navigate(['/order-success']);
    }, 2000);
  }

  cancelPayment() {
    this.router.navigate(['/checkout']);
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    
    // Only allow numbers
    value = value.replace(/[^0-9]/g, '');
    
    // Limit to 16 digits
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    
    // Format with spaces every 4 digits
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    
    // Update the model without triggering the input event again
    this.paymentForm.cardNumber = formattedValue;
    
    // Update the input field value directly
    event.target.value = formattedValue;
  }

  getCardType(): string {
    const number = this.paymentForm.cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'default';
  }
}
