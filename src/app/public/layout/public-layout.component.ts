import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgIcon, FormsModule],
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent {
    isMenuOpen = false;
    searchQuery = '';

    constructor(private router: Router) {}

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }

    onSearch(): void {
        if (this.searchQuery.trim()) {
            // Navigate to search results page or filter current page
            console.log('Searching for:', this.searchQuery);
            // You can implement navigation to a search results page here
            // this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
        }
    }
}
