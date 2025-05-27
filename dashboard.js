// Main dashboard functionality and interactions
class PatrimoniumDashboard {
    constructor() {
        // FIXED: Add comprehensive error handling and data validation (Crucial for preventing empty cards)
        if (typeof dashboardData === 'undefined') {
            console.error('dashboardData is not defined. Make sure data.js is loaded before dashboard.js');
            this.showErrorMessage('Erreur de chargement des données. Veuillez actualiser la page.');
            return;
        }

        this.data = dashboardData;
        this.charts = new DashboardCharts(this.data);
        this.currentTab = 'performance';

        // Initialize sorting state
        this._currentSortColumn = null;
        this._currentSortDirection = 'asc';
        this._originalPortfolioCompanies = [...this.data.portfolioCompanies]; // Store original data
        this._filteredCompanies = [...this.data.portfolioCompanies]; // Store filtered data

        this.init();
    }

    // NEW: Error message display function
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="padding: 20px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px; color: #721c24;">
                <strong>Erreur</strong><br>
                ${message}
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    init() {
        this.setupTabNavigation();
        this.setupKpiInteractions();
        // Initial render for the default active tab (performance)
        this.switchTab(this.currentTab);
        this.addAnimations();
    }

    // Tab Navigation System
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.tab;
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(targetTab) {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to target button and content
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetContent = document.getElementById(`tab-content-${targetTab}`);

        if (targetButton) targetButton.classList.add('active');
        if (targetContent) targetContent.classList.add('active');

        this.currentTab = targetTab;

        // Render charts and specific content for the active tab
        // Use a small timeout to ensure the tab content is visible and has calculated dimensions
        setTimeout(() => {
            if (targetTab === 'performance') {
                this.renderKpis(); // FIXED: Render KPIs for performance tab (addresses empty cards)
                this.renderStephaneBonvinSection(); // FIXED: Render Stéphane Bonvin section (addresses empty cards)
                this.renderQualitativeHighlights(); // FIXED: Render highlights for performance tab (addresses empty cards)
                this.charts.renderAllCharts(); // FIXED: Render all performance charts (addresses empty cards)
            } else if (targetTab === 'portfolio') {
                this.renderPortfolioTable(); // FIXED: Render portfolio table (addresses non-functional AI tab)
                this.charts.renderAiExposureChart(); // FIXED: Render AI chart (addresses non-functional AI tab)
                this.setupPortfolioTableSorting(); // Set up sorting functionality
                this.setupPortfolioTableFiltering(); // Set up filtering functionality
            }
        }, 100);
    }

    // Setup KPI card interactions with enhanced tooltips
    setupKpiInteractions() {
        // Delegate event listener to a parent container for efficiency
        const kpiContainer = document.getElementById('kpiContainer');
        if (!kpiContainer) return;

        kpiContainer.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.kpi-card');
            if (card) {
                this.handleKpiHover(card);
            }
        });

        kpiContainer.addEventListener('mouseout', (e) => {
             const card = e.target.closest('.kpi-card');
            // Check if mouse is moving out of the card or just within its children
            if (card && !card.contains(e.relatedTarget)) {
                 this.handleKpiLeave(card);
            }
        });
    }

    handleKpiHover(card) {
        const kpiType = card.dataset.kpi;

        // Add subtle animation
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 12px 24px rgba(0, 83, 163, 0.15)';

        // Enhanced tooltip with contextual information
        this.showKpiTooltip(card, kpiType);
    }

    handleKpiLeave(card) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        this.hideKpiTooltip();
    }

    showKpiTooltip(card, kpiType) {
        // Avoid multiple tooltips
        this.hideKpiTooltip();

        // Create tooltip with additional context
        const tooltip = document.createElement('div');
        tooltip.className = 'kpi-tooltip';
        tooltip.id = 'activeTooltip';

        let tooltipContent = '';

        switch(kpiType) {
            case 'irrNet':
                tooltipContent = 'Taux de rendement interne net après frais de gestion';
                break;
            case 'tvpiNet':
                tooltipContent = 'Total Value to Paid-in Capital - Mesure la performance globale';
                break;
            case 'dpiNet':
                tooltipContent = 'Distributions to Paid-in Capital - Capital distribué';
                break;
            case 'rvpiNet':
                tooltipContent = 'Residual Value to Paid-in Capital - Valeur résiduelle';
                break;
            case 'nav':
                tooltipContent = 'Net Asset Value - Valeur nette d\'actif du fonds';
                break;
            case 'tvpi':
                tooltipContent = 'Performance TVPI individuelle de l\'investisseur';
                break;
            case 'dpi':
                tooltipContent = 'Distributions reçues par l\'investisseur individuel';
                break;
            case 'rvpi':
                tooltipContent = 'Valeur résiduelle de l\'investissement individuel';
                break;
            default:
                tooltipContent = 'Indicateur de performance du fonds';
        }

        tooltip.innerHTML = `<div class="tooltip-content">${tooltipContent}</div>`;

        // Position tooltip - Relative to the card
        const rect = card.getBoundingClientRect();
        tooltip.style.position = 'fixed'; // Use fixed to position relative to viewport
        tooltip.style.top = `${rect.top}px`;
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        tooltip.style.zIndex = '1000'; // Ensure it's on top

        document.body.appendChild(tooltip);
    }

    hideKpiTooltip() {
        const tooltip = document.getElementById('activeTooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // FIXED: Render KPI cards for Performance Tab - Complete implementation (addresses empty cards)
    renderKpis() {
        const container = document.getElementById('kpiContainer');
        if (!container) {
            console.error('KPI container not found');
            return;
        }

        // FIXED: Add comprehensive data validation (addresses empty cards)
        if (!this.data || !this.data.kpis) {
            console.error('KPI data not available');
            container.innerHTML = '<div class="error-message">Données KPI non disponibles</div>';
            return;
        }

        const kpis = this.data.kpis;
        let html = '';

        // FIXED: Render Fund Net KPIs with proper error handling
        if (kpis.fundNet) {
            html += `<div class="kpi-group mb-6">
                        <h3 class="text-md font-semibold text-gray-700 mb-4">Fonds Net</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="fundNetKpis">`;
            
            for (const key in kpis.fundNet) {
                const kpi = kpis.fundNet[key];
                if (kpi && typeof kpi.value !== 'undefined') {
                    // Check if kpi.value is a number to determine positive class
                    const isPositive = typeof kpi.value === 'number' && (key === 'irrNet' || key === 'tvpiNet' || key === 'rvpiNet') && kpi.value > 0;
                    // FIXED: Proper unit formatting - handle undefined units gracefully
                    const formattedValue = `${kpi.value}${kpi.unit || ''}`;
                    html += `
                        <div class="kpi-card" data-kpi="${key}">
                            <div class="kpi-label">${key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</div>
                            <div class="kpi-value ${isPositive ? 'positive' : ''}">${formattedValue}</div>
                            <div class="kpi-context">${kpi.context || ''}</div>
                        </div>`;
                }
            }
            html += `</div>
                    </div>`;
        }

        // FIXED: Render Individual KPIs (Stéphane Bonvin section) with proper error handling
        if (kpis.individual) {
            html += `<div class="kpi-group mb-6">
                        <h3 class="text-md font-semibold text-gray-700 mb-4">Performance Individuelle (Stéphane Bonvin)</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="individualKpis">`;
            
            for (const key in kpis.individual) {
                const kpi = kpis.individual[key];
                if (kpi && typeof kpi.value !== 'undefined') {
                    // Check if kpi.value is a number to determine positive class
                    const isPositive = typeof kpi.value === 'number' && (key === 'tvpi' || key === 'rvpi') && kpi.value > 1;
                    // FIXED: Proper unit formatting - handle undefined units gracefully
                    const formattedValue = `${kpi.value}${kpi.unit || ''}`;
                    html += `
                        <div class="kpi-card" data-kpi="${key}">
                            <div class="kpi-label">${key.toUpperCase()}</div>
                            <div class="kpi-value ${isPositive ? 'positive' : ''}">${formattedValue}</div>
                            <div class="kpi-context">${kpi.context || ''}</div>
                        </div>`;
                }
            }
            html += `</div>
                    </div>`;
        }

        container.innerHTML = html;
        // Re-attach hover listeners after rendering
        this.setupKpiInteractions();
    }

    // FIXED: Render Stéphane Bonvin Individual Section - Complete implementation (addresses empty cards)
    renderStephaneBonvinSection() {
        const container = document.getElementById('stephaneBovinSection');
        if (!container) {
            console.error('Stéphane Bonvin section container not found');
            return;
        }

        // FIXED: Add comprehensive data validation (addresses empty cards)
        if (!this.data || !this.data.stephaneBovin) {
            console.error('Stéphane Bonvin data not available');
            container.innerHTML = '<div class="error-message">Données Stéphane Bonvin non disponibles</div>';
            return;
        }

        const bonvinData = this.data.stephaneBovin;

        // FIXED: Complete HTML template with proper data binding
        let html = `
            <div class="bonvin-overview grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div class="bonvin-card">
                    <div class="bonvin-label">${bonvinData.engagement.label}</div>
                    <div class="bonvin-value">${this.formatCurrency(bonvinData.engagement.value)}</div>
                </div>
                <div class="bonvin-card">
                    <div class="bonvin-label">${bonvinData.capitalAppele.label}</div>
                    <div class="bonvin-value">${this.formatCurrency(bonvinData.capitalAppele.value)}</div>
                </div>
                <div class="bonvin-card">
                    <div class="bonvin-label">${bonvinData.capitalNonAppele.label}</div>
                    <div class="bonvin-value">${this.formatCurrency(bonvinData.capitalNonAppele.value)}</div>
                </div>
                <div class="bonvin-card">
                    <div class="bonvin-label">${bonvinData.distributionsTotales.label}</div>
                    <div class="bonvin-value">${this.formatCurrency(bonvinData.distributionsTotales.value)}</div>
                </div>
                <div class="bonvin-card">
                    <div class="bonvin-label">${bonvinData.capitalVerse.label}</div>
                    <div class="bonvin-value">${this.formatCurrency(bonvinData.capitalVerse.value)}</div>
                </div>
                <div class="bonvin-card highlight">
                    <div class="bonvin-label">${bonvinData.navActuelle.label}</div>
                    <div class="bonvin-value positive">${this.formatCurrency(bonvinData.navActuelle.value)}</div>
                </div>
            </div>
            
            <div class="bonvin-transactions">
                <h4 class="text-sm font-semibold text-gray-700 mb-4">Historique des Transactions</h4>
                <div class="transactions-table">
                    <div class="transaction-header">
                        <div class="transaction-cell">Date</div>
                        <div class="transaction-cell">Type</div>
                        <div class="
transaction-cell">Description</div>
                        <div class="transaction-cell">Montant</div>
                    </div>`;

        bonvinData.transactions.forEach(transaction => {
            const isDistribution = transaction.type === 'Distribution';
            const amountClass = isDistribution ? 'positive' : '';
            html += `
                <div class="transaction-row">
                    <div class="transaction-cell">${transaction.date}</div>
                    <div class="transaction-cell">
                        <span class="transaction-type ${transaction.type.toLowerCase()}">${transaction.type}</span>
                    </div>
                    <div class="transaction-cell">${transaction.description}</div>
                    <div class="transaction-cell ${amountClass}">${this.formatCurrency(Math.abs(transaction.montant))}</div>
                </div>`;
        });

        html += `
                </div>
            </div>`;

        container.innerHTML = html;
    }

    // FIXED: Render qualitative highlights - Complete implementation (addresses empty cards)
    renderQualitativeHighlights() {
        const container = document.getElementById('qualitativeHighlights');
        if (!container) {
            console.error('qualitativeHighlights container not found');
            return;
        }

        // FIXED: Add comprehensive data validation (addresses empty cards)
        if (!this.data || !this.data.highlights) {
            console.error('Highlights data not available');
            container.innerHTML = '<div class="error-message">Faits marquants non disponibles</div>';
            return;
        }

        const highlights = this.data.highlights;

        container.innerHTML = '';
        highlights.forEach(highlight => {
            const highlightCard = document.createElement('div');
            highlightCard.className = 'highlight-card';

            highlightCard.innerHTML = `
                <div class="highlight-title">${highlight.title}</div>
                <div class="highlight-description">${highlight.description}</div>
            `;

            container.appendChild(highlightCard);
        });
    }

    // FIXED: Render Portfolio Companies Table with AI Analysis - Complete implementation (addresses non-functional AI tab)
    renderPortfolioTable(companies = null) {
        const container = document.getElementById('portfolioTableBody');
        if (!container) {
            console.error('portfolioTableBody container not found');
            return;
        }

        // Use provided companies or filtered companies or original data
        const companiesToRender = companies || this._filteredCompanies || this.data.portfolioCompanies;

        // FIXED: Add comprehensive data validation (addresses non-functional AI tab)
        if (!companiesToRender || companiesToRender.length === 0) {
            container.innerHTML = '<div class="p-4 text-center text-gray-500">Aucune société trouvée.</div>';
            console.error('Portfolio companies data not available or empty');
            return;
        }

        container.innerHTML = '';
        companiesToRender.forEach(company => {
            const row = document.createElement('div');
            row.className = 'portfolio-table-row';
            // Add data attributes for sorting/filtering criteria
            row.setAttribute('data-name', company.name);
            row.setAttribute('data-type', company.type);
            row.setAttribute('data-ai-level', company.aiLevel);

            const aiLevelClass = this.getAiLevelClass(company.aiLevel);
            const aiLevelText = this.getAiLevelText(company.aiLevel);

            row.innerHTML = `
                <div class="portfolio-cell company-column">
                    <div class="company-name">${company.name}</div>
                    <div class="company-type">${company.type}</div>
                </div>
                <div class="portfolio-cell ai-level-column">
                    <span class="ai-level-badge ${aiLevelClass}">${aiLevelText}</span>
                </div>
                <div class="portfolio-cell ai-analysis-column">
                    <div class="ai-analysis-text">${company.aiAnalysis}</div>
                    ${company.aiSources ? `<div class="ai-sources">Sources: ${company.aiSources}</div>` : ''}
                </div>
            `;

            container.appendChild(row);
        });
    }

    // Setup Portfolio Table Sorting functionality
    setupPortfolioTableSorting() {
        const headers = document.querySelectorAll('.portfolio-table-header .portfolio-header-cell');

        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const column = this.getColumnFromHeader(header);
                if (column) {
                    this.sortPortfolioTable(column);
                    this.updateSortIndicators(header);
                }
            });
        });
    }

    // Get column name from header element
    getColumnFromHeader(header) {
        if (header.classList.contains('company-column')) return 'name';
        if (header.classList.contains('ai-level-column')) return 'aiLevel';
        if (header.classList.contains('ai-analysis-column')) return 'aiAnalysis';
        return null;
    }

    // Update sort indicators in table headers
    updateSortIndicators(activeHeader) {
        // Remove sort direction from all headers
        document.querySelectorAll('.portfolio-header-cell').forEach(header => {
            header.removeAttribute('data-sort-direction');
        });

        // Add sort direction to active header
        activeHeader.setAttribute('data-sort-direction', this._currentSortDirection);
    }

    // Sort Portfolio Table by column
    sortPortfolioTable(column) {
        // Determine sort direction
        let direction = 'asc';
        if (this._currentSortColumn === column && this._currentSortDirection === 'asc') {
            direction = 'desc';
        }

        this._currentSortColumn = column;
        this._currentSortDirection = direction;

        // Sort the filtered companies
        const sortedCompanies = [...this._filteredCompanies].sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            // Handle different data types
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        // Re-render with sorted data
        this.renderPortfolioTable(sortedCompanies);
    }

    // Setup Portfolio Table Filtering functionality
    setupPortfolioTableFiltering() {
        const filterInput = document.getElementById('portfolioFilterInput');
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.filterPortfolioTable(searchTerm);
            });
        } else {
            console.warn('Filter input element with id "portfolioFilterInput" not found.');
        }
    }

    // Filter Portfolio Table by search term
    filterPortfolioTable(searchTerm) {
        const companies = this._originalPortfolioCompanies;

        if (!searchTerm.trim()) {
            // If search is empty, show all companies
            this._filteredCompanies = [...companies];
        } else {
            // Filter companies based on search term
            this._filteredCompanies = companies.filter(company => {
                return company.name.toLowerCase().includes(searchTerm) ||
                       company.type.toLowerCase().includes(searchTerm) ||
                       company.aiAnalysis.toLowerCase().includes(searchTerm) ||
                       (company.aiSources && company.aiSources.toLowerCase().includes(searchTerm));
            });
        }

        // Apply current sort if any
        if (this._currentSortColumn) {
            this.sortPortfolioTable(this._currentSortColumn);
        } else {
            // Just re-render with filtered data
            this.renderPortfolioTable(this._filteredCompanies);
        }
    }

    getAiLevelClass(level) {
        switch(level) {
            case 'high': return 'ai-high';
            case 'medium': return 'ai-medium';
            case 'low': return 'ai-low';
            default: return 'ai-none';
        }
    }

    getAiLevelText(level) {
        switch(level) {
            case 'high': return 'Élevée';
            case 'medium': return 'Modérée';
            case 'low': return 'Limitée';
            default: return 'Aucune';
        }
    }

    // Add entrance animations
    addAnimations() {
        // Progress bars animation
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                // Store the target width before resetting
                const targetWidth = bar.style.width;
                bar.style.width = '0%'; // Reset width for animation
                // Use requestAnimationFrame for better visual performance
                requestAnimationFrame(() => {
                     setTimeout(() => {
                         bar.style.transition = 'width 1s ease-in-out';
                         bar.style.width = targetWidth; // Animate to target width
                     }, 50); // Small delay after reflow
                });
            });
        }, 1000);
    }

    // FIXED: Utility function for currency formatting
    formatCurrency(value) {
        if (typeof value !== 'number') return value;
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // FIXED: Add comprehensive error handling for dashboard initialization
    try {
        const dashboard = new PatrimoniumDashboard();
        // Make dashboard globally accessible for debugging
        window.patrimoniumDashboard = dashboard;
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        // Display error message to user
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="padding: 20px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px; color: #721c24;">
                <strong>Erreur de chargement du tableau de bord</strong><br>
                Veuillez actualiser la page. Si le problème persiste, contactez l'administrateur.
            </div>
        `;
        document.body.appendChild(errorDiv);
    }
});
