import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { GenericPaginationComponent } from '@/app/shared/components/generic-pagination/generic-pagination.component';
import { Router } from '@angular/router';

interface Shop {
    id: string;
    name: string;
    category: string;
    owner: string;
    rating: number;
    status: 'Active' | 'Suspended' | 'Pending';
    avatar?: string;
}

@Component({
    selector: 'app-shops-management',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon, GenericPaginationComponent],
    templateUrl: './shops-management.component.html',
    styleUrls: ['./shops-management.component.scss']
})
export class ShopsManagementComponent {
    showModal = false;
    isEditMode = false;
    editingShopId = '';
    
    // Form fields
    shopName = '';
    shopCategory = '';
    ownerName = '';
    ownerEmail = '';
    ownerPhone = '';
    shopLocation = '';
    shopSize = '';
    shopStatus: 'Active' | 'Pending' | 'Suspended' = 'Pending';
    leaseStartDate = '';
    leaseEndDate = '';
    monthlyRent = '';
    securityDeposit = '';
    businessLicense = '';
    taxId = '';
    
    // Stats
    totalTenants = 142;
    tenantsGrowth = '+4 this month';
    activeShops = 128;
    activePercentage = '92% of total';
    pendingApprovals = 8;
    pendingStatus = 'Needs attention';
    suspended = 6;
    suspendedAlert = '-2 from last week';

    // Search and filters
    searchQuery = '';
    selectedCategory = 'all';
    selectedStatus = 'all';

    categories = [
        'All Categories',
        'Fashion & Apparel',
        'Electronics',
        'Food & Beverage',
        'Beauty & Health',
        'Home & Decor',
        'Toys & Games'
    ];

    statuses = [
        'All Status',
        'Active',
        'Suspended',
        'Pending'
    ];

    // Shops data
    shops: Shop[] = [
        {
            id: 'SHP-001',
            name: 'Urban Threads',
            category: 'Fashion & Apparel',
            owner: 'Sarah Jenkins',
            rating: 4.8,
            status: 'Active'
        },
        {
            id: 'SHP-002',
            name: 'Tech Nexus',
            category: 'Electronics',
            owner: 'Marcus Chen',
            rating: 4.5,
            status: 'Active'
        },
        {
            id: 'SHP-003',
            name: 'Gourmet Garden',
            category: 'Food & Beverage',
            owner: 'Elena Rodriguez',
            rating: 4.2,
            status: 'Suspended'
        },
        {
            id: 'SHP-004',
            name: 'Luxe Beauty',
            category: 'Beauty & Health',
            owner: 'Amara Okoro',
            rating: 4.9,
            status: 'Active'
        },
        {
            id: 'SHP-005',
            name: 'Home Haven',
            category: 'Home & Decor',
            owner: 'David Miller',
            rating: 3.8,
            status: 'Active'
        },
        {
            id: 'SHP-006',
            name: 'Kidz Corner',
            category: 'Toys & Games',
            owner: 'Sophie Watson',
            rating: 4.6,
            status: 'Active'
        }
    ];

    filteredShops: Shop[] = [];
    currentPage = 1;
    itemsPerPage = 10;
    totalPages = 1;

    constructor(private router: Router) {
        this.filteredShops = [...this.shops];
        this.calculatePagination();
    }

    searchShops() {
        const query = this.searchQuery.toLowerCase().trim();
        
        this.filteredShops = this.shops.filter(shop => {
            const matchesSearch = !query || 
                shop.name.toLowerCase().includes(query) ||
                shop.owner.toLowerCase().includes(query) ||
                shop.id.toLowerCase().includes(query);
            
            const matchesCategory = this.selectedCategory === 'all' || 
                shop.category === this.selectedCategory;
            
            const matchesStatus = this.selectedStatus === 'all' || 
                shop.status === this.selectedStatus;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        this.currentPage = 1;
        this.calculatePagination();
    }

    calculatePagination() {
        this.totalPages = Math.ceil(this.filteredShops.length / this.itemsPerPage);
    }

    getPaginatedShops(): Shop[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredShops.slice(start, end);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    getStars(rating: number): number[] {
        return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Active':
                return 'badge bg-success';
            case 'Suspended':
                return 'badge bg-danger-subtle text-danger';
            case 'Pending':
                return 'badge bg-warning-subtle text-warning';
            default:
                return 'badge bg-secondary';
        }
    }

    viewShopApprovals() {
        this.router.navigate(['/admin/mall-admin/shop-approvals']);
    }

    registerNewShop() {
        this.isEditMode = false;
        this.showModal = true;
        this.resetForm();
    }

    closeModal() {
        this.showModal = false;
        this.resetForm();
    }

    resetForm() {
        this.shopName = '';
        this.shopCategory = '';
        this.ownerName = '';
        this.ownerEmail = '';
        this.ownerPhone = '';
        this.shopLocation = '';
        this.shopSize = '';
        this.shopStatus = 'Pending';
        this.leaseStartDate = '';
        this.leaseEndDate = '';
        this.monthlyRent = '';
        this.securityDeposit = '';
        this.businessLicense = '';
        this.taxId = '';
        this.editingShopId = '';
    }

    saveShop() {
        if (!this.shopName || !this.ownerName || !this.shopCategory) {
            alert('Please fill all required fields');
            return;
        }

        if (this.isEditMode) {
            // Update existing shop
            const shopIndex = this.shops.findIndex(s => s.id === this.editingShopId);
            if (shopIndex !== -1) {
                this.shops[shopIndex] = {
                    ...this.shops[shopIndex],
                    name: this.shopName,
                    category: this.shopCategory,
                    owner: this.ownerName,
                    status: this.shopStatus
                };
                this.filteredShops = [...this.shops];
                this.calculatePagination();
                this.closeModal();
                alert(`${this.shopName} has been updated successfully!`);
            }
        } else {
            // Create new shop
            const newShop: Shop = {
                id: `SHP-${String(this.shops.length + 1).padStart(3, '0')}`,
                name: this.shopName,
                category: this.shopCategory,
                owner: this.ownerName,
                rating: 0,
                status: this.shopStatus
            };

            this.shops.unshift(newShop);
            this.filteredShops = [...this.shops];
            this.totalTenants++;
            if (this.shopStatus === 'Pending') {
                this.pendingApprovals++;
            } else if (this.shopStatus === 'Active') {
                this.activeShops++;
            } else if (this.shopStatus === 'Suspended') {
                this.suspended++;
            }
            this.calculatePagination();
            this.closeModal();
            alert(`${this.shopName} has been registered successfully!`);
        }
    }

    exportList() {
        alert('Export list functionality - Coming soon!');
    }

    viewShopDetails(shop: Shop) {
        console.log('View details for:', shop);
    }

    editShop(shop: Shop) {
        this.isEditMode = true;
        this.editingShopId = shop.id;
        this.showModal = true;
        
        // Populate form with shop data
        this.shopName = shop.name;
        this.shopCategory = shop.category;
        this.ownerName = shop.owner;
        this.shopStatus = shop.status;
        
        // Optional fields (would be populated if data exists)
        this.ownerEmail = '';
        this.ownerPhone = '';
        this.shopLocation = '';
        this.shopSize = '';
        this.leaseStartDate = '';
        this.leaseEndDate = '';
        this.monthlyRent = '';
        this.securityDeposit = '';
        this.businessLicense = '';
        this.taxId = '';
    }

    deleteShop(shop: Shop) {
        if (confirm(`Are you sure you want to delete ${shop.name}? This action cannot be undone.`)) {
            this.shops = this.shops.filter(s => s.id !== shop.id);
            this.filteredShops = this.filteredShops.filter(s => s.id !== shop.id);
            this.totalTenants--;
            this.calculatePagination();
            alert(`${shop.name} has been deleted successfully.`);
        }
    }
}
