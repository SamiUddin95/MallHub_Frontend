import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

interface ShopRequest {
    id: number;
    shopName: string;
    ownerName: string;
    category: string;
    submittedDate: string;
    documentsCount: number;
    status: 'Pending Review' | 'Fast-track Priority' | 'High-Volume Retail';
    avatar?: string;
}

@Component({
    selector: 'app-shop-approvals',
    standalone: true,
    imports: [CommonModule, NgIcon],
    templateUrl: './shop-approvals.component.html',
    styleUrls: ['./shop-approvals.component.scss']
})
export class ShopApprovalsComponent {
    pendingCount = 4;
    approvedToday = 14;
    
    activeFilter = 'all';
    
    shopRequests: ShopRequest[] = [
        {
            id: 1,
            shopName: 'Aura Home Decor',
            ownerName: 'Sarah Jenkins',
            category: 'Interior & Lifestyle',
            submittedDate: '2024-10-12',
            documentsCount: 3,
            status: 'Pending Review'
        },
        {
            id: 2,
            shopName: 'Pixel Perfect Electronics',
            ownerName: 'Mohammed Ahmed',
            category: 'Gadgets & Tech',
            submittedDate: '2024-10-14',
            documentsCount: 2,
            status: 'Pending Review'
        },
        {
            id: 3,
            shopName: 'Urban Sole Footwear',
            ownerName: 'David Chen',
            category: 'Fashion & Footwear',
            submittedDate: '2024-10-15',
            documentsCount: 2,
            status: 'Pending Review'
        },
        {
            id: 4,
            shopName: 'The Green Pantry',
            ownerName: 'Elena Rodriguez',
            category: 'Food & Beverage',
            submittedDate: '2024-10-15',
            documentsCount: 2,
            status: 'Pending Review'
        }
    ];

    filteredRequests: ShopRequest[] = [];

    constructor() {
        this.filteredRequests = [...this.shopRequests];
    }

    setFilter(filter: string) {
        this.activeFilter = filter;
        
        if (filter === 'all') {
            this.filteredRequests = [...this.shopRequests];
        } else {
            this.filteredRequests = this.shopRequests.filter(req => 
                req.status.toLowerCase().includes(filter.toLowerCase())
            );
        }
    }

    approveShop(shop: ShopRequest) {
        if (confirm(`Approve ${shop.shopName}?`)) {
            this.shopRequests = this.shopRequests.filter(s => s.id !== shop.id);
            this.filteredRequests = this.filteredRequests.filter(s => s.id !== shop.id);
            this.pendingCount--;
            this.approvedToday++;
            alert(`${shop.shopName} has been approved!`);
        }
    }

    rejectShop(shop: ShopRequest) {
        if (confirm(`Reject ${shop.shopName}? This action cannot be undone.`)) {
            this.shopRequests = this.shopRequests.filter(s => s.id !== shop.id);
            this.filteredRequests = this.filteredRequests.filter(s => s.id !== shop.id);
            this.pendingCount--;
            alert(`${shop.shopName} has been rejected.`);
        }
    }

    viewDetails(shop: ShopRequest) {
        console.log('View details for:', shop);
        // Navigate to details page or open modal
    }

    getInitials(name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}
