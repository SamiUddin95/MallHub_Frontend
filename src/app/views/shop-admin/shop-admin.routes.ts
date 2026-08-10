import { Routes } from '@angular/router';
import { ShopAdminDashboardComponent } from '@/app/views/dashboards/shop-admin-dashboard/shop-admin-dashboard.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ShopSettingsComponent } from './shop-settings/shop-settings.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';

export const SHOP_ADMIN_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: ShopAdminDashboardComponent,
        data: { title: 'Shop Admin Dashboard' }
    },
    {
        path: 'my-products',
        component: MyProductsComponent,
        data: { title: 'My Products' }
    },
    {
        path: 'shop-settings',
        component: ShopSettingsComponent,
        data: { title: 'Shop Settings' }
    },
    {
        path: 'orders',
        component: OrdersComponent,
        data: { title: 'Orders' }
    },
    {
        path: 'customer-reviews',
        component: CustomerReviewsComponent,
        data: { title: 'Customer Reviews' }
    }
];
