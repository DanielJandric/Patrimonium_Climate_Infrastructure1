// Main dashboard functionality and interactions - iPhone 16 Optimized
class PatrimoniumDashboard {
    constructor() {
        // FIXED: Add null check for dashboardData (Crucial for preventing errors when data is missing, addressing empty cards)
        if (typeof dashboardData === 'undefined') {
            console.error('dashboardData is not defined. Make sure data.js is loaded before dashboard.js');
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
        
        // iPhone 16 specific optimizations
        this._isMobile = this.detectMobile();
        this._touchStartY = 0;
        this._touchEndY = 0;
        
        this.init();
    }

    // Detect mobile device for enhanced touch interactions
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 430; // iPhone 16 Pro Max width
    }

    init() {
        this.setupTabNavigation();
        this.setupKpiInteractions();
        this.setupTouchEnhancements(); // NEW: Enhanced touch support
        this.setupMobileOptimizations(); // NEW: Mobile-specific optimizations
        // Initial render for the default active tab (performance)
        this.switchTab(this.currentTab);
        this.addAnimations();
    }

    // NEW: Enhanced touch support for iPhone 16
    setupTouchEnhancements() {
        if (!this._isMobile) return;

        // Prevent double-tap zoom on specific elements
        const preventZoomElements = document.querySelectorAll('.kpi-card, .tab-button, .ai-summary-card, .highlight-card');
        preventZoomElements.forEach(element => {
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                // Trigger click after preventing default
                setTimeout(() => {
                    element.click();
                }, 10);
            }, { passive: false });
        });

        // Enhanced scroll behavior for portfolio table
        const portfolioContainer = document.querySelector('.portfolio-table-container');
        if (portfolioContainer) {
            portfolioContainer.style.overflowX = 'auto';
            portfolioContainer.style.webkitOverflowScrolling = 'touch';
        }

        // Prevent zoom on input focus
        const filterInput = document.getElementById('portfolioFilterInput');
        if (filterInput) {
            filterInput.addEventListener('touchstart', () => {
                // Temporarily set font-size to 16px to prevent zoom
                filterInput.style.fontSize = '16px';
            });
        }
    }

    // NEW: Mobile-specific optimizations for iPhone 16
    setupMobileOptimizations() {
        if (!this._isMobile) return;

        // Optimize chart rendering for mobile
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.devicePixelRatio = window.devicePixelRatio || 1;

        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.kpi-card, .highlight-card, .ai-summary-card, .bonvin-card');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }, { passive: true });
        });

        // Optimize viewport for iPhone 16
        this.optimizeViewport();
    }

    // NEW: Viewport optimization for iPhone 16
    optimizeViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
            );
        }

        // Handle safe area insets for iPhone 16
        if (CSS.supports('padding: env(safe-area-inset-top)')) {
            document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
            document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
            document.documentElement.style.setProperty('--safe-area-left', 'env(safe-area-inset-left)');
            document.documentElement.style.setProperty('--safe-area-right', 'env(safe-area-inset-right)');
        }
    }

    // Tab Navigation System - Enhanced for iPhone 16
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');

        tabButtons.forEach(button => {
            // Mouse/desktop events
            button.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.tab;
                this.switchTab(targetTab);
            });

            // Enhanced touch events for iPhone 16
            if (this._isMobile) {
                button.addEventListener('touchstart', (e) => {
                    this._touchStartY = e.touches[0].clientY;
                    button.style.backgroundColor = 'rgba(0, 83, 163, 0.1)';
                }, { passive: true });

                button.addEventListener('touchmove', (e) => {
                    this._touchEndY = e.touches[0].clientY;
                    // Cancel touch if significant vertical movement (scrolling)
                    if (Math.abs(this._touchStartY - this._touchEndY) > 10) {
                        button.style.backgroundColor = '';
                    }
                }, { passive: true });

                button.addEventListener('touchend', (e) => {
                    button.style.backgroundColor = '';
                    // Only trigger if minimal vertical movement
                    if (Math.abs(this._touchStartY - this._touchEndY) <= 10) {
                        e.preventDefault();
                        const targetTab = e.currentTarget.dataset.tab;
                        this.switchTab(targetTab);
                    }
                }, { passive: false });
            }
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
        // Use a longer timeout for mobile to ensure smooth transitions
        const timeout = this._isMobile ? 200 : 100;
        setTimeout(() => {
            if (targetTab === 'performance') {
                this.renderKpis(); // Render KPIs for performance tab (related to empty cards)
                this.renderStephaneBonvinSection(); // NEW: Render Stéphane Bonvin section (related to empty cards)
                this.renderQualitativeHighlights(); // Render highlights for performance tab (related to empty cards)
                this.charts.renderAllCharts(); // Render all performance charts (related to empty cards)
            } else if (targetTab === 'portfolio') {
                this.renderPortfolioTable(); // Render portfolio table (related to non-functional AI tab)
                this.charts.renderAiExposureChart(); // Render AI chart (related to non-functional AI tab)
                this.setupPortfolioTableSorting(); // Set up sorting functionality
                this.setupPortfolioTableFiltering(); // Set up filtering functionality
            }
        }, timeout);
    }

    // Setup KPI card interactions with enhanced tooltips - iPhone 16 Optimized
    setupKpiInteractions() {
        // Delegate event listener to a parent container for efficiency
        const kpiContainer = document.getElementById('kpiContainer');
        if (!kpiContainer) return;

        if (this._isMobile) {
            // Mobile touch interactions
            kpiContainer.addEventListener('touchstart', (e) => {
                const card = e.target.closest('.kpi-card');
                if (card) {
                    this.handleKpiTouch(card);
                }
            }, { passive: true });

            kpiContainer.addEventListener('touchend', (e) => {
                const card = e.target.closest('.kpi-card');
                if (card) {
                    setTimeout(() => this.handleKpiTouchEnd(card), 300);
                }
            }, { passive: true });
        } else {
            // Desktop interactions
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
    }

    // NEW: Handle KPI touch interactions for iPhone 16
    handleKpiTouch(card) {
        const kpiType = card.dataset.kpi;
        
        // Add visual feedback
        card.style.transform = 'scale(0.98)';
        card.style.backgroundColor = 'rgba(0, 83, 163, 0.02)';

        // Show tooltip for mobile
        this.showKpiTooltip(card, kpiType);
    }

    // NEW: Handle KPI touch end for iPhone 16
    handleKpiTouchEnd(card) {
        card.style.transform = '';
        card.style.backgroundColor = '';
        
        // Hide tooltip after delay on mobile
        setTimeout(() => {
            this.hideKpiTooltip();
        }, 2000);
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

        // Position tooltip - Enhanced for mobile
        const rect = card.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        
        if (this._isMobile) {
            // Center tooltip on mobile
            tooltip.style.top = `${rect.top - 10}px`;
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
            tooltip.style.maxWidth = '90vw';
        } else {
            // Desktop positioning
            tooltip.style.top = `${rect.top}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        }
        
        tooltip.style.zIndex = '1000';

        document.body.appendChild(tooltip);
    }

    hideKpiTooltip() {
        const tooltip = document.getElementById('activeTooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Render KPI cards for Performance Tab - FIXED: Proper unit handling (related to empty cards)
    renderKpis() {
        const container = document.getElementById('kpiContainer');
        if (!container) return;

        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.kpis) {
            console.warn('KPI data not available');
            return;
        }

        const kpis = this.data.kpis;
        let html = '';

        // Render Fund Net KPIs
        html += `<div class="kpi-group mb-6">
                    <h3 class="text-md font-semibold text-gray-700 mb-4">Fonds Net</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="fundNetKpis">`;
        for (const key in kpis.fundNet) {
            const kpi = kpis.fundNet[key];
            // Check if kpi.value is a number to determine positive class
            const isPositive = typeof kpi.value === 'number' && (key === 'irrNet' || key === 'tvpiNet' || key === 'rvpiNet') && kpi.value > 0;
            // FIXED: Proper unit formatting - handle undefined units gracefully
            const formattedValue = `${kpi.value}${kpi.unit || ''}`;
            html += `
                <div class="kpi-card" data-kpi="${key}">
                    <div class="kpi-label">${key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</div>
                    <div class="kpi-value ${isPositive ? 'positive' : ''}">${formattedValue}</div>
                    <div class="kpi-context">${kpi.context}</div>
                </div>`;
        }
        html += `   </div>
                </div>`;

        // Render Individual KPIs (Stéphane Bonvin section)
         if (kpis.individual) {
             html += `<div class="kpi-group mb-6">
                         <h3 class="text-md font-semibold text-gray-700 mb-4">Performance Individuelle (Stéphane Bonvin)</h3>
                         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="individualKpis">`;
             for (const key in kpis.individual) {
                 const kpi = kpis.individual[key];
                 // Check if kpi.value is a number to determine positive class
                 const isPositive = typeof kpi.value === 'number' && (key === 'tvpi' || key === 'rvpi') && kpi.value > 1;
                 // FIXED: Proper unit formatting - handle undefined units gracefully
                 const formattedValue = `${kpi.value}${kpi.unit || ''}`;
                 html += `
                     <div class="kpi-card" data-kpi="${key}">
                         <div class="kpi-label">${key.toUpperCase()}</div>
                         <div class="kpi-value ${isPositive ? 'positive' : ''}">${formattedValue}</div>
                         <div class="kpi-context">${kpi.context}</div>
                     </div>`;
             }
             html += `   </div>
                     </div>`;
         }

        container.innerHTML = html;
        // Re-attach hover listeners after rendering
        this.setupKpiInteractions();
    }

    // NEW: Render Stéphane Bonvin Individual Section (related to empty cards)
    renderStephaneBonvinSection() {
        const container = document.getElementById('stephaneBovinSection');
        if (!container) return;

        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.stephaneBovin) {
            console.warn('Stéphane Bonvin data not available');
            return;
        }

        const bonvinData = this.data.stephaneBovin;

        // FIXED: Template literal syntax error - properly closed all template literals
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
                        <div class="transaction-cell">Description</div>
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

    // Render qualitative highlights (related to empty cards)
    renderQualitativeHighlights() {
        const container = document.getElementById('qualitativeHighlights');
        if (!container) {
            console.warn('qualitativeHighlights container not found');
            return;
        }

        // FIXED: Add null check for data (related to empty cards)
        if (!this.data || !this.data.highlights) {
            console.warn('Highlights data not available');
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

    // Render Portfolio Companies Table with AI Analysis (related to non-functional AI tab)
    renderPortfolioTable(companies = null) {
        const container = document.getElementById('portfolioTableBody');
        if (!container) {
            console.warn('portfolioTableBody container not found');
            return;
        }

        // Use provided companies or filtered companies or original data
        const companiesToRender = companies || this._filteredCompanies || this.data.portfolioCompanies;

        // FIXED: Add null check for data (related to non-functional AI tab)
        if (!companiesToRender || companiesToRender.length === 0) {
            container.innerHTML = '<div class="p-4 text-center text-gray-500">Aucune société trouvée.</div>';
            console.warn('Portfolio companies data not available or empty');
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

    // Setup Portfolio Table Sorting functionality - Enhanced for iPhone 16
    setupPortfolioTableSorting() {
        const headers = document.querySelectorAll('.portfolio-table-header .portfolio-header-cell');
        
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            
            // Desktop click events
            header.addEventListener('click', () => {
                const column = this.getColumnFromHeader(header);
                if (column) {
                    this.sortPortfolioTable(column);
                    this.updateSortIndicators(header);
                }
            });

            // Enhanced touch events for iPhone 16
            if (this._isMobile) {
                header.addEventListener('touchstart', (e) => {
                    this._touchStartY = e.touches[0].clientY;
                    header.style.backgroundColor = 'rgba(0, 83, 163, 0.1)';
                }, { passive: true });

                header.addEventListener('touchend', (e) => {
                    header.style.backgroundColor = '';
                    // Only trigger if minimal vertical movement
                    if (Math.abs(this._touchStartY - (e.changedTouches[0]?.clientY || this._touchStartY)) <= 10) {
                        e.preventDefault();
                        const column = this.getColumnFromHeader(header);
                        if (column) {
                            this.sortPortfolioTable(column);
                            this.updateSortIndicators(header);
                        }
                    }
                }, { passive: false });
            }
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
                return direction === 'asc' ? 1 
: -1;
            }
            return 0;
        });

        // Re-render with sorted data
        this.renderPortfolioTable(sortedCompanies);
    }

    // Setup Portfolio Table Filtering functionality - Enhanced for iPhone 16
    setupPortfolioTableFiltering() {
        const filterInput = document.getElementById('portfolioFilterInput');
        if (filterInput) {
            // Standard input event
            filterInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.filterPortfolioTable(searchTerm);
            });

            // Enhanced mobile support
            if (this._isMobile) {
                // Prevent zoom on focus
                filterInput.addEventListener('focus', () => {
                    filterInput.style.fontSize = '16px';
                });

                // Restore original font size on blur
                filterInput.addEventListener('blur', () => {
                    filterInput.style.fontSize = '';
                });
            }
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

    // Add entrance animations - Enhanced for iPhone 16
    addAnimations() {
        // Progress bars animation with mobile optimization
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                // Store the target width before resetting
                const targetWidth = bar.style.width;
                bar.style.width = '0%'; // Reset width for animation
                // Use requestAnimationFrame for better visual performance
                requestAnimationFrame(() => {
                     setTimeout(() => {
                         bar.style.transition = this._isMobile ? 'width 0.8s ease-in-out' : 'width 1s ease-in-out';
                         bar.style.width = targetWidth; // Animate to target width
                     }, 50); // Small delay after reflow
                });
            });
        }, this._isMobile ? 800 : 1000);

        // Add staggered animation for cards on mobile
        if (this._isMobile) {
            const cards = document.querySelectorAll('.kpi-card, .highlight-card, .ai-summary-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }

    // NEW: Utility function for currency formatting
    formatCurrency(value) {
        if (typeof value !== 'number') return value;
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    // NEW: Handle orientation changes for iPhone 16
    handleOrientationChange() {
        if (!this._isMobile) return;
        
        setTimeout(() => {
            // Recalculate chart dimensions after orientation change
            if (this.charts) {
                this.charts.renderAllCharts();
            }
            
            // Adjust tooltip positioning
            this.hideKpiTooltip();
            
            // Refresh current tab content
            this.switchTab(this.currentTab);
        }, 300);
    }

    // NEW: Performance optimization for iPhone 16
    optimizePerformance() {
        if (!this._isMobile) return;

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Hide tooltips on scroll
                this.hideKpiTooltip();
            }, 100);
        }, { passive: true });

        // Optimize image loading if any
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });

        // Add will-change property to animated elements
        const animatedElements = document.querySelectorAll('.kpi-card, .highlight-card, .chart-wrapper canvas');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
        });
    }
}

// Initialize dashboard when DOM is loaded - Enhanced for iPhone 16
document.addEventListener('DOMContentLoaded', function() {
    // FIXED: Add error handling for dashboard initialization (Ensure data.js loads first)
    try {
        const dashboard = new PatrimoniumDashboard();
        // Make dashboard globally accessible for debugging
        window.patrimoniumDashboard = dashboard;

        // Handle orientation changes for iPhone 16
        window.addEventListener('orientationchange', () => {
            dashboard.handleOrientationChange();
        });

        // Initialize performance optimizations
        dashboard.optimizePerformance();

        // Handle resize events for responsive behavior
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                dashboard.handleOrientationChange();
            }, 250);
        });

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
