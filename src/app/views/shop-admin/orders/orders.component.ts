import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { GenericPaginationComponent } from '@/app/shared/components/generic-pagination/generic-pagination.component';

interface Order {
    id: string;
    customer: string;
    avatar: string;
    initials: string;
    date: string;
    items: number;
    total: number;
    payment: 'Paid' | 'Pending' | 'Failed';
    delivery: 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
    status: 'pending' | 'dispatched' | 'completed' | 'cancelled';
}

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon, GenericPaginationComponent],
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
    searchQuery = '';
    selectedTab: 'all' | 'pending' | 'dispatched' | 'completed' | 'cancelled' = 'all';

    tabs = [
        { key: 'all', label: 'All Orders' },
        { key: 'pending', label: 'Pending' },
        { key: 'dispatched', label: 'Dispatched' },
        { key: 'completed', label: 'Completed' },
        { key: 'cancelled', label: 'Cancelled' }
    ];

    stats = [
        { label: 'Total Orders', value: '1,284', change: '+12.5%', isPositive: true, icon: 'tablerShoppingCart', color: '#4169E1' },
        { label: 'Pending Approval', value: '43', change: '-2.4%', isPositive: false, icon: 'tablerClock', color: '#ff6b6b' },
        { label: 'Shipped Today', value: '156', change: '+8.1%', isPositive: true, icon: 'tablerTruck', color: '#51cf66' },
        { label: 'Completed', value: '1,085', change: '+15.2%', isPositive: true, icon: 'tablerCircleCheck', color: '#495057' }
    ];

    orders: Order[] = [
        {
            id: 'ORD-9921',
            customer: 'Sophia Martinez',
            avatar: 'https://placehold.co/40x40/png?text=SM',
            initials: 'SM',
            date: 'Oct 24, 2023',
            items: 3,
            total: 245.00,
            payment: 'Paid',
            delivery: 'Processing',
            status: 'pending'
        },
        {
            id: 'ORD-9920',
            customer: 'James Wilson',
            avatar: 'https://placehold.co/40x40/png?text=JW',
            initials: 'JW',
            date: 'Oct 24, 2023',
            items: 1,
            total: 89.99,
            payment: 'Paid',
            delivery: 'Delivered',
            status: 'completed'
        },
        {
            id: 'ORD-9919',
            customer: 'Emma Thompson',
            avatar: 'https://placehold.co/40x40/png?text=ET',
            initials: 'ET',
            date: 'Oct 23, 2023',
            items: 5,
            total: 1120.50,
            payment: 'Pending',
            delivery: 'In Transit',
            status: 'dispatched'
        },
        {
            id: 'ORD-9918',
            customer: "Liam O'Connor",
            avatar: 'https://placehold.co/40x40/png?text=LO',
            initials: 'LO',
            date: 'Oct 23, 2023',
            items: 2,
            total: 156.00,
            payment: 'Failed',
            delivery: 'Cancelled',
            status: 'cancelled'
        },
        {
            id: 'ORD-9917',
            customer: 'Olivia Davis',
            avatar: 'https://placehold.co/40x40/png?text=OD',
            initials: 'OD',
            date: 'Oct 22, 2023',
            items: 1,
            total: 45.00,
            payment: 'Paid',
            delivery: 'Delivered',
            status: 'completed'
        },
        {
            id: 'ORD-9916',
            customer: 'Noah Brown',
            avatar: 'https://placehold.co/40x40/png?text=NB',
            initials: 'NB',
            date: 'Oct 22, 2023',
            items: 4,
            total: 320.00,
            payment: 'Paid',
            delivery: 'Delivered',
            status: 'completed'
        },
        {
            id: 'ORD-9915',
            customer: 'Ava Wilson',
            avatar: 'https://placehold.co/40x40/png?text=AW',
            initials: 'AW',
            date: 'Oct 21, 2023',
            items: 2,
            total: 178.50,
            payment: 'Paid',
            delivery: 'Processing',
            status: 'pending'
        }
    ];

    filteredOrders: Order[] = [];
    currentPage = 1;
    itemsPerPage = 5;
    totalPages = 1;

    showDetailsModal = false;
    selectedOrder: Order | null = null;
    activeMenuOrder: Order | null = null;

    showRangeModal = false;
    startDate = '';
    endDate = '';

    orderItems = [
        { name: 'UltraVision 4K Pro Monitor', sku: 'UV-4K-27-B', price: 899.00, quantity: 1, image: 'https://placehold.co/60x60/png?text=Monitor' },
        { name: 'Mechanical Wireless Keyboard', sku: 'MWK-RGB-65', price: 175.00, quantity: 2, image: 'https://placehold.co/60x60/png?text=Keyboard' }
    ];

    customerEmail = 'b.harrison@techcloud.com';
    customerPhone = '+1 (555) 234-5678';
    internalNote = 'Customer requested specific packaging for fragile items. Ensure double boxing before dispatch.';

    statusOptions = [
        { key: 'pending', label: 'Pending' },
        { key: 'dispatched', label: 'Dispatched' },
        { key: 'completed', label: 'Completed' },
        { key: 'cancelled', label: 'Cancelled' }
    ];

    constructor() {
        this.filterOrders();
    }

    filterOrders() {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredOrders = this.orders.filter(order => {
            const matchesSearch = !query ||
                order.id.toLowerCase().includes(query) ||
                order.customer.toLowerCase().includes(query);
            const matchesTab = this.selectedTab === 'all' || order.status === this.selectedTab;
            return matchesSearch && matchesTab;
        });
        this.currentPage = 1;
        this.calculatePagination();
    }

    selectTab(tab: string) {
        this.selectedTab = tab as any;
        this.filterOrders();
    }

    calculatePagination() {
        this.totalPages = Math.max(1, Math.ceil(this.filteredOrders.length / this.itemsPerPage));
    }

    getPaginatedOrders(): Order[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredOrders.slice(start, end);
    }

    get showingText(): string {
        const total = this.filteredOrders.length;
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPage * this.itemsPerPage, total);
        return `Showing ${start}-${end} of ${total} results`;
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    getPaymentClass(payment: string): string {
        return payment === 'Paid' ? 'badge-paid' : payment === 'Pending' ? 'badge-pending' : 'badge-failed';
    }

    getDeliveryClass(delivery: string): string {
        return delivery === 'Delivered' ? 'badge-delivered' : delivery === 'In Transit' ? 'badge-in-transit' : delivery === 'Processing' ? 'badge-processing' : 'badge-cancelled';
    }

    viewDetails(order: Order) {
        this.selectedOrder = order;
        this.showDetailsModal = true;
    }

    closeDetailsModal() {
        this.showDetailsModal = false;
        this.selectedOrder = null;
    }

    toggleMenu(order: Order, event: Event) {
        event.stopPropagation();
        this.activeMenuOrder = this.activeMenuOrder === order ? null : order;
    }

    closeMenu() {
        this.activeMenuOrder = null;
    }

    changeStatus(order: Order, status: string, event: Event) {
        event.stopPropagation();
        order.status = status as any;

        if (status === 'completed') {
            order.delivery = 'Delivered';
            order.payment = 'Paid';
        } else if (status === 'cancelled') {
            order.delivery = 'Cancelled';
            order.payment = 'Failed';
        } else if (status === 'dispatched') {
            order.delivery = 'In Transit';
            order.payment = 'Paid';
        } else if (status === 'pending') {
            order.delivery = 'Processing';
            order.payment = 'Paid';
        }

        this.activeMenuOrder = null;
        this.filterOrders();
    }

    exportCSV() {
        console.log('Export CSV');
        alert('CSV export started!');
    }

    selectRange() {
        this.showRangeModal = true;
    }

    closeRangeModal() {
        this.showRangeModal = false;
    }

    applyRange() {
        console.log('Range selected:', this.startDate, this.endDate);
        if (this.startDate && this.endDate) {
            alert(`Range applied: ${this.startDate} to ${this.endDate}`);
        }
        this.closeRangeModal();
    }

    menuAction(order: Order) {
        console.log('Menu action for', order);
    }

    saveNote() {
        console.log('Note saved', this.internalNote);
        alert('Note saved!');
    }
}
