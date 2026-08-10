import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { GenericPaginationComponent } from '@/app/shared/components/generic-pagination/generic-pagination.component';

interface Review {
    id: string;
    customer: string;
    avatar: string;
    product: string;
    productImage: string;
    date: string;
    rating: number;
    text: string;
    addressed: boolean;
    reported: boolean;
    selected?: boolean;
    showReplyBox?: boolean;
    replyText?: string;
}

@Component({
    selector: 'app-customer-reviews',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon, GenericPaginationComponent],
    templateUrl: './customer-reviews.component.html',
    styleUrls: ['./customer-reviews.component.scss']
})
export class CustomerReviewsComponent {
    searchQuery = '';
    selectedRating = 'All';
    selectedProduct = 'All';
    startDate = '';
    endDate = '';

    ratings = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];
    products = ['All', 'Nordic Minimalist Desk Lamp', 'AeroPeak Wireless Headphones', 'EcoVentura Recycled Backpack', 'Tactile Pro Mechanical Keyboard', 'SmartConnect Hub v3'];

    reviews: Review[] = [
        {
            id: 'REV-001',
            customer: 'Sarah Johnson',
            avatar: 'https://placehold.co/60x60/png?text=SJ',
            product: 'Nordic Minimalist Desk Lamp',
            productImage: 'https://placehold.co/80x80/png?text=Lamp',
            date: 'Oct 25, 2023',
            rating: 5,
            text: '"Absolutely love this desk lamp! The adjustable brightness levels are perfect for late-night working sessions. The design is sleek and fits my home office perfectly."',
            addressed: true,
            reported: false
        },
        {
            id: 'REV-002',
            customer: 'Michael Chen',
            avatar: 'https://placehold.co/60x60/png?text=MC',
            product: 'AeroPeak Wireless Headphones',
            productImage: 'https://placehold.co/80x80/png?text=HP',
            date: 'Oct 24, 2023',
            rating: 4,
            text: '"The headphones arrived with a scratch on the side. Sound quality is decent but for this price, I expected better condition out of the box."',
            addressed: false,
            reported: true
        },
        {
            id: 'REV-003',
            customer: 'Elena Rodriguez',
            avatar: 'https://placehold.co/60x60/png?text=ER',
            product: 'EcoVentura Recycled Backpack',
            productImage: 'https://placehold.co/80x80/png?text=BP',
            date: 'Oct 21, 2023',
            rating: 5,
            text: '"Sturdy, safely backpack, a lot of compartments. Only wish the laptop sleeve was slightly more padded. Great for daily commute and short trips."',
            addressed: true,
            reported: false
        },
        {
            id: 'REV-004',
            customer: 'David Smith',
            avatar: 'https://placehold.co/60x60/png?text=DS',
            product: 'Tactile Pro Mechanical Keyboard',
            productImage: 'https://placehold.co/80x80/png?text=KB',
            date: 'Oct 18, 2023',
            rating: 5,
            text: '"The best mechanical keyboard I\'ve ever owned. The blue switches are crisp and responsive. Shipping was fast too!"',
            addressed: false,
            reported: false
        },
        {
            id: 'REV-005',
            customer: 'Jessica Lee',
            avatar: 'https://placehold.co/60x60/png?text=JL',
            product: 'SmartConnect Hub v3',
            productImage: 'https://placehold.co/80x80/png?text=Hub',
            date: 'Oct 15, 2023',
            rating: 1,
            text: '"The hub didn\'t work at all when it arrived. I\'ve been trying to contact support for two days with no response. Very disappointed."',
            addressed: false,
            reported: true
        }
    ];

    filteredReviews: Review[] = [];
    currentPage = 1;
    itemsPerPage = 5;
    totalPages = 1;
    totalReviews = 1240;
    selectAll = false;

    constructor() {
        this.filterReviews();
    }

    filterReviews() {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredReviews = this.reviews.filter(review => {
            const matchesSearch = !query ||
                review.customer.toLowerCase().includes(query) ||
                review.text.toLowerCase().includes(query) ||
                review.product.toLowerCase().includes(query);

            let matchesRating = true;
            if (this.selectedRating !== 'All') {
                const stars = parseInt(this.selectedRating.split(' ')[0], 10);
                matchesRating = review.rating === stars;
            }

            const matchesProduct = this.selectedProduct === 'All' || review.product === this.selectedProduct;

            let matchesDate = true;
            if (this.startDate) {
                const reviewDate = new Date(review.date);
                const start = new Date(this.startDate);
                matchesDate = reviewDate >= start;
            }
            if (this.endDate && matchesDate) {
                const reviewDate = new Date(review.date);
                const end = new Date(this.endDate);
                matchesDate = reviewDate <= end;
            }

            return matchesSearch && matchesRating && matchesProduct && matchesDate;
        });

        this.totalReviews = this.filteredReviews.length;
        this.currentPage = 1;
        this.totalPages = Math.max(1, Math.ceil(this.totalReviews / this.itemsPerPage));
    }

    getPaginatedReviews(): Review[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredReviews.slice(start, end);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    get showingText(): string {
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPage * this.itemsPerPage, this.totalReviews);
        if (this.totalReviews === 0) return 'No reviews found';
        return `Showing ${start} to ${end} of ${this.totalReviews} results`;
    }

    toggleSelectAll() {
        const paginated = this.getPaginatedReviews();
        paginated.forEach(r => r.selected = this.selectAll);
    }

    markAddressed(review: Review) {
        review.addressed = !review.addressed;
        this.filterReviews();
    }

    replyReview(review: Review) {
        review.showReplyBox = !review.showReplyBox;
        if (review.showReplyBox) {
            review.replyText = '';
        }
    }

    sendReply(review: Review) {
        if (!review.replyText?.trim()) {
            return;
        }
        console.log('Reply sent to', review.customer, review.replyText);
        review.addressed = true;
        review.showReplyBox = false;
        review.replyText = '';
        alert('Reply sent!');
    }

    cancelReply(review: Review) {
        review.showReplyBox = false;
        review.replyText = '';
    }

    exportReviews() {
        console.log('Export reviews');
        alert('Reviews exported!');
    }

    viewPublicShop() {
        console.log('View public shop');
        alert('Opening public shop...');
    }

    selectRange() {
        const start = prompt('Start Date (YYYY-MM-DD):');
        const end = prompt('End Date (YYYY-MM-DD):');
        if (start) this.startDate = start;
        if (end) this.endDate = end;
        this.filterReviews();
    }

    clearAll() {
        this.searchQuery = '';
        this.selectedRating = 'All';
        this.selectedProduct = 'All';
        this.startDate = '';
        this.endDate = '';
        this.filterReviews();
    }

    getStarsArray(rating: number): number[] {
        return Array(rating).fill(0);
    }
}
