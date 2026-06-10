import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MenuItemType} from '@/app/types/layout';
import {CommonModule} from '@angular/common';
import {NgIcon} from '@ng-icons/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {mallAdminMenuItems, shopAdminMenuItems} from '@layouts/components/data';
import {filter} from 'rxjs';
import {AuthService} from '@/app/services/auth.service';

@Component({
    selector: 'app-menu-navbar',
    imports: [
        CommonModule,
        NgIcon,
        NgbDropdown,
        NgbDropdownToggle,
        RouterLink,
        NgbDropdownMenu
    ],
    templateUrl: './app-menu.component.html'
})
export class AppMenuComponent {

    constructor(
        public router: Router,
        private authService: AuthService
    ) {
        this.loadMenuItems();
    }

    @ViewChild('MenuItemWithChildren', {static: true})
    menuItemWithChildren!: TemplateRef<{ item: MenuItemType, wrapperClass?: string, togglerClass?: string }>;

    @ViewChild('MenuItem', {static: true})
    menuItem!: TemplateRef<{ item: MenuItemType, linkClass?: string }>;

    menuItems: MenuItemType[] = [];

    loadMenuItems() {
        const menuType = this.authService.getMenuType();
        
        switch (menuType) {
            case 'malladmin':
                this.menuItems = mallAdminMenuItems;
                break;
            case 'shopadmin':
                this.menuItems = shopAdminMenuItems;
                break;
            default:
                this.menuItems = mallAdminMenuItems;
        }
    }

    hasSubMenu(item: MenuItemType): boolean {
        return !!item.children;
    }

    isChildActive(item: MenuItemType): boolean {
        if (item.url && this.router.url === item.url) return true;
        if (!item.children) return false;
        return item.children.some((child: any) => this.isChildActive(child));
    }

    isActive(item: MenuItemType): boolean {
        return item.url === this.router.url;
    }
}
