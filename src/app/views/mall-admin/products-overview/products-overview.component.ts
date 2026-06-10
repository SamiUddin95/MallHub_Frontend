import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { GenericPaginationComponent } from '@/app/shared/components/generic-pagination/generic-pagination.component';

interface Product {
    id: string;
    image: string;
    name: string;
    productCode: string;
    shopName: string;
    shopLink: string;
    category: string;
    price: number;
    stockLevel: number;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    isVisible: boolean;
    status: 'Active' | 'Hidden';
}

@Component({
    selector: 'app-products-overview',
    imports: [CommonModule, FormsModule, NgIcon, GenericPaginationComponent],
    templateUrl: './products-overview.component.html',
    styles: `
        .products-container {
            padding: 1.5rem;
        }

        .stats-card {
            border-radius: 12px;
            padding: 0.75rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s;
        }

        .stats-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .stats-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }

        .search-bar {
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .search-input {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 0.75rem 1rem;
            padding-left: 2.5rem;
            width: 100%;
        }

        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #6c757d;
        }


        .product-image {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            object-fit: cover;
        }

        .shop-link {
            color: #4169E1;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }


        .visibility-toggle {
            width: 44px;
            height: 24px;
        }
    `
})
export class ProductsOverviewComponent {
    searchQuery = '';
    
    // Stats
    totalProducts = 1284;
    lowStockAlerts = 18;
    outOfStock = 5;
    activeListings = 1262;

    // Products Data
    products: Product[] = [
        {
            id: 'PRD-001',
            image: 'assets/images/products/perfume.jpg',
            name: 'Midnight Velvet Perfume',
            productCode: 'PRD-001',
            shopName: 'Luxe Scents',
            shopLink: '#',
            category: 'Beauty',
            price: 89.99,
            stockLevel: 124,
            stockStatus: 'In Stock',
            isVisible: true,
            status: 'Active'
        },
        {
            id: 'PRD-002',
            image: 'assets/images/products/sweater.jpg',
            name: 'Nordic Knit Sweater',
            productCode: 'PRD-002',
            shopName: 'The Clothier',
            shopLink: '#',
            category: 'Fashion',
            price: 120.00,
            stockLevel: 8,
            stockStatus: 'Low Stock',
            isVisible: true,
            status: 'Active'
        },
        {
            id: 'PRD-003',
            image: 'assets/images/products/watch.jpg',
            name: 'Precision Chronograph Watch',
            productCode: 'PRD-003',
            shopName: 'Timeless Jewels',
            shopLink: '#',
            category: 'Accessories',
            price: 450.00,
            stockLevel: 0,
            stockStatus: 'Out of Stock',
            isVisible: false,
            status: 'Hidden'
        },
        {
            id: 'PRD-004',
            image: 'assets/images/products/vase.jpg',
            name: 'Artisan Ceramic Vase',
            productCode: 'PRD-004',
            shopName: 'Home & Heart',
            shopLink: '#',
            category: 'Home Decor',
            price: 45.50,
            stockLevel: 42,
            stockStatus: 'In Stock',
            isVisible: true,
            status: 'Active'
        },
        {
            id: 'PRD-005',
            image: 'assets/images/products/headphones.jpg',
            name: 'Wireless Noise-Canceling Headphones',
            productCode: 'PRD-005',
            shopName: 'Tech Hub',
            shopLink: '#',
            category: 'Electronics',
            price: 299.00,
            stockLevel: 15,
            stockStatus: 'In Stock',
            isVisible: true,
            status: 'Active'
        },
        {
            id: 'PRD-006',
            image: 'assets/images/products/scarf.jpg',
            name: 'Organic Silk Scarf',
            productCode: 'PRD-006',
            shopName: 'The Clothier',
            shopLink: '#',
            category: 'Fashion',
            price: 65.00,
            stockLevel: 3,
            stockStatus: 'Low Stock',
            isVisible: true,
            status: 'Active'
        }
    ];

    filteredProducts: Product[] = [];
    currentPage = 1;
    itemsPerPage = 10;
    totalPages = 1;
    Math = Math;

    constructor() {
        this.filteredProducts = [...this.products];
        this.calculatePagination();
    }

    searchProducts() {
        const query = this.searchQuery.toLowerCase().trim();
        
        if (!query) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.shopName.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.productCode.toLowerCase().includes(query)
            );
        }
        
        this.currentPage = 1;
        this.calculatePagination();
    }

    toggleVisibility(product: Product) {
        product.isVisible = !product.isVisible;
        product.status = product.isVisible ? 'Active' : 'Hidden';
        console.log(`Product ${product.name} visibility changed to: ${product.status}`);
    }

    calculatePagination() {
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }

    getPaginatedProducts(): Product[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredProducts.slice(start, end);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
}
