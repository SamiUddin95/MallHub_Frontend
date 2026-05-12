import {Routes} from '@angular/router';
import {MainLayoutComponent} from '@layouts/main-layout/main-layout.component';

export const routes: Routes = [
    // Public Routes (Homepage, Malls, Shops, Products)
    {
        path: '',
        loadChildren: () => import('./public/public.routes').then((mod) => mod.PUBLIC_ROUTES)
    },
    // Admin Portal Routes
    {
        path: 'admin',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('./views/views.route').then((mod) => mod.VIEWS_ROUTES)
            }
        ]
    },
    // Auth Routes (Sign-in for Admin)
    {
        path: '',
        loadChildren: () => import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES)
    },
];
