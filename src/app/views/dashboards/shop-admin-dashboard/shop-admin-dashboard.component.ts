import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-shop-admin-dashboard',
    standalone: true,
    imports: [CommonModule, NgIcon],
    templateUrl: './shop-admin-dashboard.component.html',
    styleUrls: ['./shop-admin-dashboard.component.scss']
})
export class ShopAdminDashboardComponent {
    // Shop Stats
    todaySales = 15420;
    salesGrowth = '+12.5%';
    totalOrders = 89;
    ordersGrowth = '+8.2%';
    pendingOrders = 12;
    lowStockItems = 5;

    // Recent Orders
    recentOrders = [
        {
            id: 'ORD-001',
            customer: 'John Doe',
            items: 3,
            amount: 1250,
            status: 'Pending',
            time: '10 mins ago'
        },
        {
            id: 'ORD-002',
            customer: 'Sarah Smith',
            items: 2,
            amount: 890,
            status: 'Processing',
            time: '25 mins ago'
        },
        {
            id: 'ORD-003',
            customer: 'Mike Johnson',
            items: 5,
            amount: 2100,
            status: 'Completed',
            time: '1 hour ago'
        },
        {
            id: 'ORD-004',
            customer: 'Emma Wilson',
            items: 1,
            amount: 450,
            status: 'Completed',
            time: '2 hours ago'
        }
    ];

    // Top Products
    topProducts = [
        {
            name: 'Premium Headphones',
            sold: 45,
            revenue: 22500,
            stock: 15
        },
        {
            name: 'Wireless Mouse',
            sold: 38,
            revenue: 11400,
            stock: 8
        },
        {
            name: 'USB-C Cable',
            sold: 62,
            revenue: 9300,
            stock: 25
        },
        {
            name: 'Phone Case',
            sold: 51,
            revenue: 7650,
            stock: 3
        }
    ];

    getStatusClass(status: string): string {
        switch (status) {
            case 'Completed':
                return 'badge bg-success';
            case 'Processing':
                return 'badge bg-primary';
            case 'Pending':
                return 'badge bg-warning';
            case 'Cancelled':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    }

    getStockClass(stock: number): string {
        if (stock <= 5) return 'text-danger fw-bold';
        if (stock <= 10) return 'text-warning fw-bold';
        return 'text-success';
    }
}
