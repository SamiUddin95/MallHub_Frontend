import {Routes} from '@angular/router';
import {MallAdminDashboardComponent} from '@/app/views/dashboards/mall-admin-dashboard/mall-admin-dashboard.component';

export const DASHBOARDS_ROUTES: Routes = [
    {
        path: 'dashboard',
        component: MallAdminDashboardComponent,
        data: {title: "Mall Admin Dashboard"},
    },

];
