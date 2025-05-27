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

    // FIXED: NAV Evolution Chart with comprehensive error handling (addresses empty charts)
    renderNavChart() {
        const ctx = document.getElementById('navChart');
        if (!ctx) {
            console.warn('navChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.historical || !this.data.historical.nav || !Array.isArray(this.data.historical.nav)) {
            console.error('NAV data not available or invalid format');
            this.showChartError(ctx, 'Données NAV non disponibles');
            return;
        }

        const navData = this.data.historical.nav;

        if (navData.length === 0) {
            console.error('NAV data array is empty');
            this.showChartError(ctx, 'Aucune donnée NAV disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering NAV chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique NAV');
        }
    }

    // FIXED: TVPI & RVPI Trends Chart with comprehensive error handling (addresses empty charts)
    
renderTvpiChart() {
        const ctx = document.getElementById('tvpiChart');
        if (!ctx) {
            console.warn('tvpiChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.historical || !this.data.historical.tvpi || !Array.isArray(this.data.historical.tvpi)) {
            console.error('TVPI data not available or invalid format');
            this.showChartError(ctx, 'Données TVPI non disponibles');
            return;
        }

        const tvpiData = this.data.historical.tvpi;

        if (tvpiData.length === 0) {
            console.error('TVPI data array is empty');
            this.showChartError(ctx, 'Aucune donnée TVPI disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering TVPI chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique TVPI');
        }
    }

    // FIXED: IRR Trend Chart with comprehensive error handling (addresses empty charts)
    renderIrrChart() {
        const ctx = document.getElementById('irrChart');
        if (!ctx) {
            console.warn('irrChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.historical || !this.data.historical.irr || !Array.isArray(this.data.historical.irr)) {
            console.error('IRR data not available or invalid format');
            this.showChartError(ctx, 'Données IRR non disponibles');
            return;
        }

        const irrData = this.data.historical.irr;

        if (irrData.length === 0) {
            console.error('IRR data array is empty');
            this.showChartError(ctx, 'Aucune donnée IRR disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering IRR chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique IRR');
        }
    }

    // FIXED: Cumulative Capital Flows Chart with comprehensive error handling (addresses empty charts)
    renderCumulativeFlowsChart() {
        const ctx = document.getElementById('cumulativeFlowsChart');
        if (!ctx) {
            console.warn('cumulativeFlowsChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.historical || !this.data.historical.cumulativeFlows || !Array.isArray(this.data.historical.cumulativeFlows)) {
            console.error('Cumulative flows data not available or invalid format');
            this.showChartError(ctx, 'Données flux cumulés non disponibles');
            return;
        }

        const flowsData = this.data.historical.cumulativeFlows;

        if (flowsData.length === 0) {
            console.error('Cumulative flows data array is empty');
            this.showChartError(ctx, 'Aucune donnée de flux cumulés disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering cumulative flows chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique des flux cumulés');
        }
    }

    // FIXED: Geographical Breakdown Chart with comprehensive error handling (addresses empty charts)
    renderGeoChart() {
        const ctx = document.getElementById('geoChart');
        if (!ctx) {
            console.warn('geoChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.diversification || !this.data.diversification.geographical || !Array.isArray(this.data.diversification.geographical)) {
            console.error('Geographical data not available or invalid format');
            this.showChartError(ctx, 'Données géographiques non disponibles');
            return;
        }

        const geoData = this.data.diversification.geographical;

        if (geoData.length === 0) {
            console.error('Geographical data array is empty');
            this.showChartError(ctx, 'Aucune donnée géographique disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering geographical chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique géographique');
        }
    }

    // FIXED: Sectoral Breakdown Chart with comprehensive error handling (addresses empty charts)
    renderSectorChart() {
        const ctx = document.getElementById('sectorChart');
        if (!ctx) {
            console.warn('sectorChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.diversification || !this.data.diversification.sectoral || !Array.isArray(this.data.diversification.sectoral)) {
            console.error('Sectoral data not available or invalid format');
            this.showChartError(ctx, 'Données sectorielles non disponibles');
            return;
        }

        const sectorData = this.data.diversification.sectoral;

        if (sectorData.length === 0) {
            console.error('Sectoral data array is empty');
            this.showChartError(ctx, 'Aucune donnée sectorielle disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering sectoral chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique sectoriel');
        }
    }

    // FIXED: Cash Flow Chart with comprehensive error handling (addresses empty charts)
    renderCashFlowChart() {
        const ctx = document.getElementById('cashFlowChart');
        if (!ctx) {
            console.warn('cashFlowChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses empty charts)
        if (!this.data || !this.data.cashFlow || !this.data.cashFlow.data || !Array.isArray(this.data.cashFlow.data)) {
            console.error('Cash flow data not available or invalid format');
            this.showChartError(ctx, 'Données de flux de trésorerie non disponibles');
            return;
        }

        const cashFlowData = this.data.cashFlow.data;

        if (cashFlowData.length === 0) {
            console.error('Cash flow data array is empty');
            this.showChartError(ctx, 'Aucune donnée de flux de trésorerie disponible');
            return;
        }

        try {
            new Chart(ctx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: cashFlowData.map(item => item.label),
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
                        y
: {
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
        } catch (error) {
            console.error('Error rendering cash flow chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique des flux de trésorerie');
        }
    }

    // FIXED: AI Exposure Chart for Portfolio Tab with comprehensive error handling (addresses non-functional AI tab)
    renderAiExposureChart() {
        const ctx = document.getElementById('aiExposureChart');
        if (!ctx) {
            console.warn('aiExposureChart canvas element not found');
            return;
        }

        // FIXED: Comprehensive data validation (addresses non-functional AI tab)
        if (!this.data || !this.data.aiExposureBreakdown || !Array.isArray(this.data.aiExposureBreakdown)) {
            console.error('AI exposure data not available or invalid format');
            this.showChartError(ctx, 'Données d\'exposition IA non disponibles');
            return;
        }

        const aiExposureData = this.data.aiExposureBreakdown;

        if (aiExposureData.length === 0) {
            console.error('AI exposure data array is empty');
            this.showChartError(ctx, 'Aucune donnée d\'exposition IA disponible');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Error rendering AI exposure chart:', error);
            this.showChartError(ctx, 'Erreur lors du rendu du graphique d\'exposition IA');
        }
    }

    // NEW: Error display function for charts
    showChartError(ctx, message) {
        const canvas = ctx;
        const canvasContext = canvas.getContext('2d');
        
        // Clear canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set error styling
        canvasContext.fillStyle = '#f8d7da';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        
        canvasContext.fillStyle = '#721c24';
        canvasContext.font = '14px Open Sans';
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        
        // Display error message
        canvasContext.fillText(message, canvas.width / 2, canvas.height / 2);
    }

    // FIXED: Render all charts for Performance tab with comprehensive error handling (addresses empty cards/charts)
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
