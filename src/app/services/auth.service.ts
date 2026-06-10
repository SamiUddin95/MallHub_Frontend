import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUser: { email: string; role: string } | null = null;

    constructor() {
        // Load user from sessionStorage if exists
        const savedUser = sessionStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    login(email: string, password: string): boolean {
        // Check for malladmin credentials
        if (email === 'malladmin' && password === '123') {
            this.currentUser = { email, role: 'malladmin' };
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        }
        
        // Add more roles here in future
        if (email === 'shopadmin' && password === '123') {
            this.currentUser = { email, role: 'shopadmin' };
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        }
        
        return false;
    }

    logout() {
        console.log('AuthService: Logging out user', this.currentUser);
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
        console.log('AuthService: Session cleared, currentUser:', this.currentUser);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserRole(): string | null {
        return this.currentUser?.role || null;
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    getDashboardRoute(): string {
        const role = this.getUserRole();
        
        switch (role) {
            case 'malladmin':
                return '/admin/mall-admin/dashboard';
            case 'shopadmin':
                return '/admin/shop-dashboard';
            case 'superadmin':
                return '/admin/super-admin/dashboard';
            default:
                return '/admin/mall-admin/dashboard'; // Default fallback
        }
    }

    getMenuType(): 'malladmin' | 'shopadmin' | 'default' {
        const role = this.getUserRole();
        
        switch (role) {
            case 'malladmin':
                return 'malladmin';
            case 'shopadmin':
                return 'shopadmin';
            default:
                return 'default';
        }
    }
}
