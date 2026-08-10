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
    category: string;
    price: number;
    stock: number;
    status: 'Active' | 'Out of stock';
}

@Component({
    selector: 'app-my-products',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon, GenericPaginationComponent],
    templateUrl: './my-products.component.html',
    styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent {
    searchQuery = '';
    selectedCategory = 'All Categories';
    selectedStatus = 'Any Status';
    viewMode: 'table' | 'grid' = 'table';

    categories = ['All Categories', 'Electronics', 'Home Decor', 'Fashion', 'Kitchenware', 'Outdoors'];
    statuses = ['Any Status', 'Active', 'Out of stock'];

    products: Product[] = [
        {
            id: 'PRD-001',
            image: 'https://placehold.co/400x300/png?text=Product',
            name: 'AeroPeak Wireless Headphones',
            productCode: 'PRD-001',
            category: 'Electronics',
            price: 129.99,
            stock: 45,
            status: 'Active'
        },
        {
            id: 'PRD-002',
            image: 'https://placehold.co/400x300/png?text=Product',
            name: 'Nordic Minimalist Desk Lamp',
            productCode: 'PRD-002',
            category: 'Home Decor',
            price: 89.00,
            stock: 0,
            status: 'Out of stock'
        },
        {
            id: 'PRD-003',
            image: 'https://placehold.co/400x300/png?text=Product',
            name: 'EcoVentura Recycled Backpack',
            productCode: 'PRD-003',
            category: 'Fashion',
            price: 75.50,
            stock: 12,
            status: 'Active'
        },
        {
            id: 'PRD-004',
            image: 'https://placehold.co/400x300/png?text=Product',
            name: 'Zenith Smart Watch Series X',
            productCode: 'PRD-004',
            category: 'Electronics',
            price: 249.00,
            stock: 28,
            status: 'Active'
        },
        {
            id: 'PRD-005',
            image: 'https://placehold.co/400x300/png?text=Product',
            name: 'Artisan Ceramic Pour-Over Kit',
            productCode: 'PRD-005',
            category: 'Kitchenware',
            price: 45.00,
            stock: 3,
            status: 'Active'
        },
        {
            id: 'PRD-006',
            image: 'https://placehold.co/400x300/png?text=Product',
            name: 'HydroFlow Titanium Bottle',
            productCode: 'PRD-006',
            category: 'Outdoors',
            price: 38.00,
            stock: 0,
            status: 'Out of stock'
        }
    ];

    filteredProducts: Product[] = [];
    currentPage = 1;
    itemsPerPage = 6;
    totalPages = 22;
    totalProducts = 128;

    // Modal
    showModal = false;
    isEditMode = false;
    editingProductId: string | null = null;
    productName = '';
    productCode = '';
    productCategory = 'Electronics';
    productPrice: number | null = null;
    productStock: number | null = null;
    productDescription = '';
    productTags = '';
    productDiscount: number | null = null;
    productActive = true;
    liveOnMarketplace = false;
    featuredItem = false;
    productImageFile: File | null = null;
    productImages: string[] = [];

    productCategories = ['Electronics', 'Home Decor', 'Fashion', 'Kitchenware', 'Outdoors'];

    constructor() {
        this.filterProducts();
    }

    filterProducts() {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = !query ||
                product.name.toLowerCase().includes(query) ||
                product.productCode.toLowerCase().includes(query);
            const matchesCategory = this.selectedCategory === 'All Categories' || product.category === this.selectedCategory;
            const matchesStatus = this.selectedStatus === 'Any Status' ||
                (this.selectedStatus === 'Active' && product.status === 'Active') ||
                (this.selectedStatus === 'Out of stock' && product.status === 'Out of stock');
            return matchesSearch && matchesCategory && matchesStatus;
        });
        this.currentPage = 1;
        this.calculatePagination();
    }

    calculatePagination() {
        this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
    }

    getPaginatedProducts(): Product[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredProducts.slice(start, end);
    }

    get showingText(): string {
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPage * this.itemsPerPage, this.totalProducts);
        return `Showing ${end - start + 1} of ${this.totalProducts} products`;
    }

    get finalPrice(): number {
        const price = this.productPrice || 0;
        const discount = this.productDiscount || 0;
        return price - (price * discount) / 100;
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    openModal(product?: Product) {
        this.showModal = true;
        if (product) {
            this.isEditMode = true;
            this.editingProductId = product.id;
            this.productName = product.name;
            this.productCode = product.productCode;
            this.productCategory = product.category;
            this.productPrice = product.price;
            this.productStock = product.stock;
            this.productActive = product.status === 'Active';
            this.productImages = product.image ? [product.image] : [];
        } else {
            this.isEditMode = false;
            this.editingProductId = null;
            this.resetForm();
        }
    }

    closeModal() {
        this.showModal = false;
        this.resetForm();
    }

    resetForm() {
        this.productName = '';
        this.productCode = `PRD-00${this.products.length + 1}`;
        this.productCategory = this.productCategories[0];
        this.productPrice = null;
        this.productStock = null;
        this.productDescription = '';
        this.productTags = '';
        this.productDiscount = null;
        this.productActive = true;
        this.liveOnMarketplace = false;
        this.featuredItem = false;
        this.productImageFile = null;
        this.productImages = [];
    }

    saveProduct() {
        if (!this.productName || !this.productCode || this.productPrice === null || this.productStock === null) {
            alert('Please fill all required fields');
            return;
        }

        const product: Product = {
            id: this.productCode,
            image: this.productImages[0] || 'https://placehold.co/400x300/png?text=Product',
            name: this.productName,
            productCode: this.productCode,
            category: this.productCategory,
            price: this.productPrice as number,
            stock: this.productStock as number,
            status: this.productActive ? 'Active' : 'Out of stock'
        };

        if (this.isEditMode && this.editingProductId) {
            const index = this.products.findIndex(p => p.id === this.editingProductId);
            if (index !== -1) {
                this.products[index] = product;
            }
        } else {
            this.products.unshift(product);
            this.totalProducts++;
        }

        this.filterProducts();
        this.closeModal();
    }

    editProduct(product: Product) {
        this.openModal(product);
    }

    deleteProduct(product: Product) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id !== product.id);
            this.totalProducts = Math.max(0, this.totalProducts - 1);
            this.filterProducts();
        }
    }

    onFileSelect(event: any) {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            this.productImageFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.productImages.push(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    triggerFileInput() {
        const fileInput = document.getElementById('productImageUpload') as HTMLInputElement;
        fileInput?.click();
    }
}
