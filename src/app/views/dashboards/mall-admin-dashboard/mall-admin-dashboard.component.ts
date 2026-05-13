import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexStroke, ApexGrid, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';

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

@Component({
    selector: 'app-mall-admin-dashboard',
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './mall-admin-dashboard.component.html',
    styles: `
        .avatar-sm {
            width: 48px;
            height: 48px;
        }
        .avatar-md {
            width: 64px;
            height: 64px;
        }
    `
})
export class MallAdminDashboardComponent {
    @ViewChild("chart") chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

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
                }
            },
            stroke: {
                width: [3, 0],
                curve: "smooth"
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%"
                }
            },
            colors: ["#3b82f6", "#f97316"],
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            grid: {
                borderColor: "#f1f1f1",
                strokeDashArray: 3
            },
            xaxis: {
                categories: ["Oct 01", "Oct 05", "Oct 10", "Oct 15", "Oct 20", "Oct 25", "Oct 30"],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
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
                        }
                    }
                }
            ]
        };
    }
}
