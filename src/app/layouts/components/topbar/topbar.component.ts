import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {CommonModule} from '@angular/common';
import {LayoutStoreService} from '@core/services/layout-store.service';
import {LucideAngularModule, Search} from 'lucide-angular';
import {AuthService} from '@/app/services/auth.service';

import {ThemeTogglerComponent} from '@layouts/components/topbar/components/theme-toggler/theme-toggler.component';
import {
    CustomizerTogglerComponent
} from '@layouts/components/topbar/components/customizer-toggler/customizer-toggler.component';
import {UserProfileComponent} from '@layouts/components/topbar/components/user-profile/user-profile.component';

@Component({
    selector: 'app-topbar',
    imports: [
        CommonModule,
        NgIcon,
        RouterLink,
        LucideAngularModule,
        CustomizerTogglerComponent,
        ThemeTogglerComponent,
        UserProfileComponent,
    ],
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {
    dashboardRoute: string = '/admin/mall-admin/dashboard';

    constructor(
        public layout: LayoutStoreService,
        private authService: AuthService
    ) {
        this.dashboardRoute = this.authService.getDashboardRoute();
    }

    toggleSidebar() {

        const html = document.documentElement;
        const currentSize = html.getAttribute('data-sidenav-size');
        const savedSize = this.layout.sidenavSize;

        if (currentSize === 'offcanvas') {
            html.classList.toggle('sidebar-enable')
            this.layout.showBackdrop()
        } else if (savedSize === 'compact') {
            this.layout.setSidenavSize(currentSize === 'compact' ? 'condensed' : 'compact', false);
        } else {
            this.layout.setSidenavSize(currentSize === 'condensed' ? 'default' : 'condensed');
        }
    }

    isMallAdmin(): boolean {
        return this.authService.getUserRole() === 'malladmin';
    }

    getRoleDisplayName(): string {
        const role = this.authService.getUserRole();
        
        switch (role) {
            case 'malladmin':
                return 'Mall Admin';
            case 'shopadmin':
                return 'Shop Admin';
            case 'superadmin':
                return 'Super Admin';
            default:
                return 'Admin';
        }
    }

    Search = Search;
}
