import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { GenericPaginationComponent } from '@/app/shared/components/generic-pagination/generic-pagination.component';

interface Campaign {
    id: number;
    title: string;
    promotionType: string;
    featuredShop: string;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Scheduled' | 'Expired';
    bannerUrl?: string;
}

@Component({
    selector: 'app-mall-campaigns',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon, GenericPaginationComponent],
    templateUrl: './mall-campaigns.component.html',
    styleUrls: ['./mall-campaigns.component.scss']
})
export class MallCampaignsComponent {
    showModal = false;
    isEditMode = false;
    
    // Form fields
    campaignTitle = '';
    promotionType = 'Homepage Hero Banner';
    primaryFeaturedShop = '';
    startDate = '';
    endDate = '';
    bannerFile: File | null = null;
    bannerPreview: string | null = null;

    // Campaigns list
    campaigns: Campaign[] = [
        {
            id: 1,
            title: 'Year End Mega Sale',
            promotionType: 'Homepage Hero Banner',
            featuredShop: 'Luxe Scents',
            startDate: '2024-12-20',
            endDate: '2024-12-31',
            status: 'Active'
        },
        {
            id: 2,
            title: 'Winter Fashion Week',
            promotionType: 'Featured Shop',
            featuredShop: 'The Clothier',
            startDate: '2024-12-15',
            endDate: '2024-12-25',
            status: 'Active'
        },
        {
            id: 3,
            title: 'Electronics Bonanza',
            promotionType: 'Homepage Hero Banner',
            featuredShop: 'Tech Hub',
            startDate: '2025-01-01',
            endDate: '2025-01-15',
            status: 'Scheduled'
        }
    ];

    filteredCampaigns: Campaign[] = [];
    currentPage = 1;
    itemsPerPage = 10;
    totalPages = 1;

    promotionTypes = [
        'Homepage Hero Banner',
        'Featured Shop',
        'Category Promotion',
        'Flash Sale'
    ];

    shops = [
        'Luxe Scents',
        'The Clothier',
        'Tech Hub',
        'Home & Heart',
        'Timeless Jewels'
    ];

    constructor() {
        this.filteredCampaigns = [...this.campaigns];
        this.calculatePagination();
    }

    openModal() {
        this.showModal = true;
        this.isEditMode = false;
        this.resetForm();
    }

    closeModal() {
        this.showModal = false;
        this.resetForm();
    }

    resetForm() {
        this.campaignTitle = '';
        this.promotionType = 'Homepage Hero Banner';
        this.primaryFeaturedShop = '';
        this.startDate = '';
        this.endDate = '';
        this.bannerFile = null;
        this.bannerPreview = null;
    }

    onFileSelect(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.bannerFile = file;
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.bannerPreview = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    triggerFileInput() {
        const fileInput = document.getElementById('bannerUpload') as HTMLInputElement;
        fileInput?.click();
    }

    saveCampaign() {
        if (!this.campaignTitle || !this.startDate || !this.endDate) {
            alert('Please fill all required fields');
            return;
        }

        const newCampaign: Campaign = {
            id: this.campaigns.length + 1,
            title: this.campaignTitle,
            promotionType: this.promotionType,
            featuredShop: this.primaryFeaturedShop,
            startDate: this.startDate,
            endDate: this.endDate,
            status: new Date(this.startDate) > new Date() ? 'Scheduled' : 'Active'
        };

        this.campaigns.unshift(newCampaign);
        this.filteredCampaigns = [...this.campaigns];
        this.calculatePagination();
        this.closeModal();
    }

    editCampaign(campaign: Campaign) {
        this.isEditMode = true;
        this.showModal = true;
        this.campaignTitle = campaign.title;
        this.promotionType = campaign.promotionType;
        this.primaryFeaturedShop = campaign.featuredShop;
        this.startDate = campaign.startDate;
        this.endDate = campaign.endDate;
    }

    deleteCampaign(id: number) {
        if (confirm('Are you sure you want to delete this campaign?')) {
            this.campaigns = this.campaigns.filter(c => c.id !== id);
            this.filteredCampaigns = [...this.campaigns];
            this.calculatePagination();
        }
    }

    calculatePagination() {
        this.totalPages = Math.ceil(this.filteredCampaigns.length / this.itemsPerPage);
    }

    getPaginatedCampaigns(): Campaign[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredCampaigns.slice(start, end);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Active':
                return 'badge bg-success';
            case 'Scheduled':
                return 'badge bg-primary';
            case 'Expired':
                return 'badge bg-secondary';
            default:
                return 'badge bg-secondary';
        }
    }
}
