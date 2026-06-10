import { Routes } from '@angular/router';
import { MallAdminDashboardComponent } from '@/app/views/dashboards/mall-admin-dashboard/mall-admin-dashboard.component';
import { MallSettingsComponent } from './mall-settings/mall-settings.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { MallCampaignsComponent } from './mall-campaigns/mall-campaigns.component';
import { ShopApprovalsComponent } from './shop-approvals/shop-approvals.component';
import { ShopsManagementComponent } from './shops-management/shops-management.component';

export const MALL_ADMIN_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: MallAdminDashboardComponent,
        data: { title: 'Mall Admin Dashboard' }
    },
    {
        path: 'settings',
        component: MallSettingsComponent,
        data: { title: 'Mall Settings' }
    },
    {
        path: 'products',
        component: ProductsOverviewComponent,
        data: { title: 'Products Overview' }
    },
    {
        path: 'campaigns',
        component: MallCampaignsComponent,
        data: { title: 'Mall Campaigns' }
    },
    {
        path: 'shop-approvals',
        component: ShopApprovalsComponent,
        data: { title: 'Shop Approvals' }
    },
    {
        path: 'shops',
        component: ShopsManagementComponent,
        data: { title: 'Shops Management' }
    }
];
