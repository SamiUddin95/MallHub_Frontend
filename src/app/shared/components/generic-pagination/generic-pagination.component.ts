import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-generic-pagination',
    standalone: true,
    imports: [CommonModule, NgIcon],
    templateUrl: './generic-pagination.component.html',
    styleUrls: ['./generic-pagination.component.scss']
})
export class GenericPaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Input() totalItems: number = 0;
    @Input() itemsPerPage: number = 10;
    @Input() showItemsInfo: boolean = true;
    
    @Output() pageChange = new EventEmitter<number>();

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.pageChange.emit(page);
        }
    }

    getPageNumbers(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        
        if (this.totalPages <= maxVisible) {
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (this.currentPage > 3) pages.push(-1); // ellipsis
            
            const start = Math.max(2, this.currentPage - 1);
            const end = Math.min(this.totalPages - 1, this.currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (this.currentPage < this.totalPages - 2) pages.push(-1); // ellipsis
            pages.push(this.totalPages);
        }
        
        return pages;
    }

    getStartItem(): number {
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }

    getEndItem(): number {
        return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    }
}
