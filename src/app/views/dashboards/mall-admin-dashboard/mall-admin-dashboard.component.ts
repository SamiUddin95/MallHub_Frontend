import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexStroke, ApexGrid, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';
import { NgIcon } from '@ng-icons/core';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    grid: ApexGrid;
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
    colors: string[];
};

interface Activity {
    initials: string;
    title: string;
    description: string;
    time: string;
    color: string;
    action?: string;
}

interface Shop {
    name: string;
    revenue: string;
    percentage: number;
    color: string;
}

@Component({
    selector: 'app-mall-admin-dashboard',
    imports: [CommonModule, NgApexchartsModule, NgIcon],
    templateUrl: './mall-admin-dashboard.component.html',
    styles: `
        .dashboard-container {
            padding: 1rem;
        }

        .dashboard-title {
            color: #1a1a1a;
            font-size: 1.75rem;
        }

        .stat-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border-radius: 12px;
            overflow: hidden;
        }

        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
        }

        .stat-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .stat-number {
            font-size: 1.75rem;
            color: #1a1a1a;
        }

        .legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
        }

        .activity-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .activity-item {
            padding-bottom: 1rem;
            border-bottom: 1px solid #f0f0f0;
        }

        .activity-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .quick-action-icon {
            width: 56px;
            height: 56px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .card {
            border-radius: 12px;
        }

        .progress {
            border-radius: 10px;
            overflow: hidden;
        }

        .progress-bar {
            border-radius: 10px;
        }
    `
})
export class MallAdminDashboardComponent {
    @ViewChild("chart") chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    recentActivities: Activity[] = [
        {
            initials: 'NS',
            title: 'New Shop: Urban Thread',
            description: 'Boutique clothing store submitted application for approval.',
            time: '1 HOUR AGO',
            color: '#4169E1',
            action: 'Review'
        },
        {
            initials: 'LO',
            title: 'Large Order: #ROHO-9921',
            description: 'Bulk order of 15 items ($1,240.00) confirmed for Tech Haven.',
            time: '3 HOURS AGO',
            color: '#f97316',
            action: 'View Order Details'
        },
        {
            initials: 'PS',
            title: 'Payment Settlement Comp.',
            description: 'Weekly settlement of $42,500.00 disbursed to active shops.',
            time: 'YESTERDAY',
            color: '#10b981'
        },
        {
            initials: 'AA',
            title: 'Application Approved: Spa',
            description: 'Interior design shop is now live on the mall marketplace.',
            time: 'YESTERDAY',
            color: '#8b5cf6',
            action: 'Approve'
        }
    ];

    topShops: Shop[] = [
        {
            name: 'Luxe Attire',
            revenue: '$45,230',
            percentage: 85,
            color: 'linear-gradient(90deg, #ec4899, #f97316)'
        },
        {
            name: 'Tech Haven',
            revenue: '$38,450',
            percentage: 70,
            color: 'linear-gradient(90deg, #ec4899, #f97316)'
        },
        {
            name: 'Home Bliss',
            revenue: '$32,180',
            percentage: 55,
            color: 'linear-gradient(90deg, #ec4899, #f97316)'
        },
        {
            name: 'Active Wear',
            revenue: '$28,920',
            percentage: 45,
            color: 'linear-gradient(90deg, #ec4899, #f97316)'
        }
    ];

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Revenue",
                    type: "line",
                    data: [5000, 5500, 5000, 6500, 6000, 7500, 8500]
                },
                {
                    name: "Orders",
                    type: "column",
                    data: [130, 150, 130, 165, 150, 195, 260]
                }
            ],
            chart: {
                height: 300,
                type: "line",
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                },
                fontFamily: 'inherit'
            },
            stroke: {
                width: [3, 0],
                curve: "smooth"
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                    borderRadius: 4
                }
            },
            colors: ["#4169E1", "#f97316"],
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            grid: {
                borderColor: "#f1f1f1",
                strokeDashArray: 3,
                padding: {
                    left: 10,
                    right: 10
                }
            },
            xaxis: {
                categories: ["Oct 01", "Oct 05", "Oct 10", "Oct 15", "Oct 20", "Oct 25", "Oct 30"],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#9ca3af',
                        fontSize: '12px'
                    }
                }
            },
            yaxis: [
                {
                    title: {
                        text: ""
                    },
                    labels: {
                        formatter: function(val) {
                            return "$" + val.toFixed(0);
                        },
                        style: {
                            colors: '#9ca3af',
                            fontSize: '12px'
                        }
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: ""
                    },
                    labels: {
                        formatter: function(val) {
                            return val.toFixed(0);
                        },
                        style: {
                            colors: '#9ca3af',
                            fontSize: '12px'
                        }
                    }
                }
            ]
        };
    }
}
