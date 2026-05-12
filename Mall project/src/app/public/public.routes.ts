import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout.component';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
                data: { title: 'Home' }
            },
            {
                path: 'malls/:id',
                loadComponent: () => import('./mall-detail/mall-detail.component').then(m => m.MallDetailComponent),
                data: { title: 'Mall Details' }
            },
            {
                path: 'shops/:id',
                loadComponent: () => import('./shop-detail/shop-detail.component').then(m => m.ShopDetailComponent),
                data: { title: 'Shop Details' }
            },
            {
                path: 'products/:id',
                loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent),
                data: { title: 'Product Details' }
            },
            {
                path: 'cart',
                loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
                data: { title: 'Shopping Cart' }
            },
            {
                path: 'checkout',
                loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
                data: { title: 'Checkout' }
            },
            {
                path: 'payment',
                loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent),
                data: { title: 'Payment' }
            },
            {
                path: 'order-success',
                loadComponent: () => import('./order-success/order-success.component').then(m => m.OrderSuccessComponent),
                data: { title: 'Order Confirmed' }
            }
        ]
    }
];
