// Chart configuration and rendering for Patrimonium Dashboard
class DashboardCharts {
    constructor(data) {
        this.data = data;
        this.chartDefaults = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Open Sans',
                            size: 12
                        },
                        color: '#333333'
                    }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#333333',
                    bodyColor: '#333333',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    cornerRadius: 4,
                    titleFont: {
                        family: 'Open Sans',
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Open Sans'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        font: {
                            family: 'Open Sans',
                            size: 11
                        },
                        color: '#666666'
                    }
                },
                y: {
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        font: {
                            family: 'Open Sans',
                            size: 11
                        },
                        color: '#666666'
                    }
                }
            }
        };
    }

    // NAV Evolution Chart with Historical Data
    renderNavChart() {
        const ctx = document.getElementById('navChart');
        if (!ctx) {
            console.warn('navChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.historical || !this.data.historical.nav) {
            console.warn('NAV data not available');
            return;
        }
        
        const navData = this.data.historical.nav;
        
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: navData.map(item => item.date),
                datasets: [{
                    label: 'NAV (M€)',
                    data: navData.map(item => item.value),
                    borderColor: '#0053a3',
                    backgroundColor: 'rgba(0, 83, 163, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0053a3',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                ...this.chartDefaults,
                scales: {
                    ...this.chartDefaults.scales,
                    y: {
                        ...this.chartDefaults.scales.y,
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'NAV (M€)',
                            font: {
                                family: 'Open Sans',
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    ...this.chartDefaults.plugins,
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `NAV: ${context.parsed.y} M€`;
                            }
                        }
                    }
                }
            }
        });
    }

    // TVPI & RVPI Trends Chart with Historical Data
    renderTvpiChart() {
        const ctx = document.getElementById('tvpiChart');
        if (!ctx) {
            console.warn('tvpiChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.historical || !this.data.historical.tvpi) {
            console.warn('TVPI data not available');
            return;
        }
        
        const tvpiData = this.data.historical.tvpi;
        
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: tvpiData.map(item => item.date),
                datasets: [
                    {
                        label: 'TVPI',
                        data: tvpiData.map(item => item.tvpi),
                        borderColor: '#0053a3',
                        backgroundColor: '#0053a3',
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#0053a3',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    },
                    {
                        label: 'RVPI',
                        data: tvpiData.map(item => item.rvpi),
                        borderColor: '#4a90e2',
                        backgroundColor: '#4a90e2',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#4a90e2',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }
                ]
            },
            options: {
                ...this.chartDefaults,
                scales: {
                    ...this.chartDefaults.scales,
                    y: {
                        ...this.chartDefaults.scales.y,
                        min: 0.8,
                        max: 1.3,
                        title: {
                            display: true,
                            text: 'Multiple (×)',
                            font: {
                                family: 'Open Sans',
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            ...this.chartDefaults.scales.y.ticks,
                            callback: function(value) {
                                return value.toFixed(2) + '×';
                            }
                        }
                    }
                },
                plugins: {
                    ...this.chartDefaults.plugins,
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}×`;
                            }
                        }
                    }
                }
            }
        });
    }

    // IRR Trend Chart with Historical Data
    renderIrrChart() {
        const ctx = document.getElementById('irrChart');
        if (!ctx) {
            console.warn('irrChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.historical || !this.data.historical.irr) {
            console.warn('IRR data not available');
            return;
        }
        
        const irrData = this.data.historical.irr;
        
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: irrData.map(item => item.date),
                datasets: [{
                    label: 'IRR Net (%)',
                    data: irrData.map(item => item.value),
                    borderColor: '#008000',
                    backgroundColor: 'rgba(0, 128, 0, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#008000',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                ...this.chartDefaults,
                scales: {
                    ...this.chartDefaults.scales,
                    y: {
                        ...this.chartDefaults.scales.y,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'IRR (%)',
                            font: {
                                family: 'Open Sans',
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    ...this.chartDefaults.plugins,
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `IRR: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // NEW: Cumulative Capital Flows Chart
    renderCumulativeFlowsChart() {
        const ctx = document.getElementById('cumulativeFlowsChart');
        if (!ctx) {
            console.warn('cumulativeFlowsChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.historical || !this.data.historical.cumulativeFlows) {
            console.warn('Cumulative flows data not available');
            return;
        }
        
        const flowsData = this.data.historical.cumulativeFlows;
        
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: flowsData.map(item => item.date),
                datasets: [
                    {
                        label: 'Contributions Cumulées',
                        data: flowsData.map(item => item.contributions),
                        borderColor: '#0053a3',
                        backgroundColor: 'rgba(0, 83, 163, 0.2)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#0053a3',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    },
                    {
                        label: 'Distributions Cumulées',
                        data: flowsData.map(item => item.distributions),
                        borderColor: '#008000',
                        backgroundColor: 'rgba(0, 128, 0, 0.2)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#008000',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }
                ]
            },
            options: {
                ...this.chartDefaults,
                scales: {
                    ...this.chartDefaults.scales,
                    y: {
                        ...this.chartDefaults.scales.y,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Montant (M€)',
                            font: {
                                family: 'Open Sans',
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    ...this.chartDefaults.plugins,
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y} M€`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Geographical Breakdown Chart - FIXED: Added null check (related to empty cards)
    renderGeoChart() {
        const ctx = document.getElementById('geoChart');
        if (!ctx) {
            console.warn('geoChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data
        if (!this.data || !this.data.diversification || !this.data.diversification.geographical) {
            console.warn('Geographical data not available');
            return;
        }
        
        const geoData = this.data.diversification.geographical;
        
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: geoData.map(item => item.region),
                datasets: [{
                    data: geoData.map(item => item.percentage),
                    backgroundColor: geoData.map(item => item.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                ...this.chartDefaults,
                cutout: '60%',
                plugins: {
                    ...this.chartDefaults.plugins,
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Sectoral Breakdown Chart - FIXED: Added null check (related to empty cards)
    renderSectorChart() {
        const ctx = document.getElementById('sectorChart');
        if (!ctx) {
            console.warn('sectorChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data
        if (!this.data || !this.data.diversification || !this.data.diversification.sectoral) {
            console.warn('Sectoral data not available');
            return;
        }
        
        const sectorData = this.data.diversification.sectoral;
        
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: sectorData.map(item => item.sector),
                datasets: [{
                    data: sectorData.map(item => item.percentage),
                    backgroundColor: sectorData.map(item => item.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                ...this.chartDefaults,
                cutout: '50%',
                plugins: {
                    ...this.chartDefaults.plugins,
                    legend: {
                        ...this.chartDefaults.plugins.legend,
                        position: 'bottom',
                        labels: {
                            ...this.chartDefaults.plugins.legend.labels,
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Cash Flow Chart - FIXED: Added null check (related to empty cards)
    renderCashFlowChart() {
        const ctx = document.getElementById('cashFlowChart');
        if (!ctx) {
            console.warn('cashFlowChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data
        if (!this.data || !this.data.cashFlow || !this.data.cashFlow.data) {
            console.warn('Cash flow data not available');
            return;
        }
        
        const cashFlowData = this.data.cashFlow.data;
        
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: cashFlowData
.map(item => item.label),
                datasets: [{
                    label: 'Cash Flow (M€)',
                    data: cashFlowData.map(item => item.value),
                    backgroundColor: cashFlowData.map(item => 
                        item.type === 'inflow' ? '#0053a3' : '#4a90e2'
                    ),
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                ...this.chartDefaults,
                scales: {
                    ...this.chartDefaults.scales,
                    y: {
                        ...this.chartDefaults.scales.y,
                        title: {
                            display: true,
                            text: 'Amount (M€)',
                            font: {
                                family: 'Open Sans',
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            ...this.chartDefaults.scales.y.ticks,
                            callback: function(value) {
                                return value + ' M€';
                            }
                        }
                    }
                },
                plugins: {
                    ...this.chartDefaults.plugins,
                    legend: {
                        display: false
                    },
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                const type = value > 0 ? 'Inflow' : 'Outflow';
                                return `${type}: ${Math.abs(value)} M€`;
                            }
                        }
                    }
                }
            }
        });
    }

    // NEW: AI Exposure Chart for Portfolio Tab - FIXED: Added null check (related to empty cards/AI tab)
    renderAiExposureChart() {
        const ctx = document.getElementById('aiExposureChart');
        if (!ctx) {
            console.warn('aiExposureChart canvas element not found');
            return;
        }
        
        // FIXED: Add null check for data
        if (!this.data || !this.data.aiExposureBreakdown) {
            console.warn('AI exposure data not available');
            return;
        }
        
        const aiExposureData = this.data.aiExposureBreakdown;
        
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: aiExposureData.map(item => item.level),
                datasets: [{
                    data: aiExposureData.map(item => item.count),
                    backgroundColor: aiExposureData.map(item => item.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                ...this.chartDefaults,
                cutout: '50%',
                plugins: {
                    ...this.chartDefaults.plugins,
                    legend: {
                        ...this.chartDefaults.plugins.legend,
                        position: 'bottom',
                        labels: {
                            ...this.chartDefaults.plugins.legend.labels,
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        ...this.chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed} sociétés`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Render all charts for Performance tab - FIXED: Added null checks for all chart functions (related to empty cards)
    renderAllCharts() {
        this.renderNavChart();
        this.renderTvpiChart();
        this.renderIrrChart();
        this.renderCumulativeFlowsChart();
        this.renderGeoChart();
        this.renderSectorChart();
        this.renderCashFlowChart();
    }
}
