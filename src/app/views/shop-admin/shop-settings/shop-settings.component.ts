import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

interface OperatingHour {
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
}

@Component({
    selector: 'app-shop-settings',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon],
    templateUrl: './shop-settings.component.html',
    styleUrls: ['./shop-settings.component.scss']
})
export class ShopSettingsComponent {
    shopName = 'Luxe Apparels Official';
    shopDescription = 'Premium destination for sustainable high-fashion and luxury accessories. Curated collections for the modern aesthetic.';
    contactNumber = '+1 (555) 123-4567';
    mallLocation = 'Level 2, North Wing, Unit 24A';
    supportEmail = 'hello@luxeapparels.com';
    cityState = 'Manhattan, New York';
    bannerPreview: string | null = null;
    logoPreview: string | null = null;

    operatingHours: OperatingHour[] = [
        { day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
        { day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
        { day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
        { day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
        { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
        { day: 'Saturday', isOpen: true, openTime: '09:00', closeTime: '21:00' },
        { day: 'Sunday', isOpen: false, openTime: '09:00', closeTime: '21:00' }
    ];

    isDarkMode = false;
    publicStatus = true;

    saveChanges() {
        console.log('Saving shop settings...', {
            shopName: this.shopName,
            shopDescription: this.shopDescription,
            contactNumber: this.contactNumber,
            mallLocation: this.mallLocation,
            supportEmail: this.supportEmail,
            cityState: this.cityState,
            operatingHours: this.operatingHours,
            isDarkMode: this.isDarkMode,
            publicStatus: this.publicStatus
        });
        alert('Shop settings saved successfully!');
    }

    discardChanges() {
        console.log('Discarding changes...');
    }

    uploadBanner() {
        console.log('Upload banner clicked');
    }

    uploadLogo() {
        console.log('Upload logo clicked');
    }
}
