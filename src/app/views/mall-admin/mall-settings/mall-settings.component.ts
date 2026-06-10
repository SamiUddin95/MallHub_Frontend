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
    selector: 'app-mall-settings',
    imports: [CommonModule, FormsModule, NgIcon],
    templateUrl: './mall-settings.component.html',
    styles: `
        .settings-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .settings-sidebar {
            position: sticky;
            top: 100px;
        }

        .settings-nav-item {
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.5rem;
            border: none;
            background: transparent;
            width: 100%;
            text-align: left;
        }

        .settings-nav-item:hover {
            background: #f8f9fa;
        }

        .settings-nav-item.active {
            background: linear-gradient(90deg, #4169E1, #1E90FF);
            color: white;
        }

        .settings-section {
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .settings-section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e9ecef;
        }

        .settings-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #4169E1, #1E90FF);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
        }

        .upload-area {
            border: 2px dashed #dee2e6;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .upload-area:hover {
            border-color: #4169E1;
            background: #f8f9ff;
        }

        .operating-hours-table {
            width: 100%;
        }

        .operating-hours-table th {
            font-weight: 600;
            color: #6c757d;
            font-size: 0.875rem;
            text-transform: uppercase;
            padding: 0.75rem;
            border-bottom: 2px solid #e9ecef;
        }

        .operating-hours-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #f1f3f5;
        }

        .time-input {
            border: 1px solid #dee2e6;
            border-radius: 6px;
            padding: 0.5rem;
            width: 100px;
        }

        .map-container {
            height: 300px;
            background: #f8f9fa;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #dee2e6;
        }
    `
})
export class MallSettingsComponent {
    activeSection = 'general';

    // General Information
    mallName = 'Dolmen Mall Clifton';
    mallCategory = 'Luxury Retail & Entertainment';
    publicDescription = 'Pakistan\'s premier shopping destination...';
    supportEmail = 'support@dolmenmall.com';
    officeWebsite = 'www.dolmenmall.com';
    officePhone = '+92 (21) 111 222';

    // Operating Hours
    operatingHours: OperatingHour[] = [
        { day: 'Monday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Tuesday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Wednesday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Thursday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Friday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Saturday', isOpen: true, openTime: '10:00', closeTime: '22:00' },
        { day: 'Sunday', isOpen: true, openTime: '10:00', closeTime: '22:00' }
    ];

    // Location
    physicalAddress = 'HC 3, Block 4, Marine Drive, Clifton, Karachi';
    city = 'Karachi';
    stateProvince = 'Sindh';
    postalCode = '75600';

    setActiveSection(section: string) {
        this.activeSection = section;
    }

    saveChanges() {
        console.log('Saving mall settings...');
        alert('Mall settings saved successfully!');
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
