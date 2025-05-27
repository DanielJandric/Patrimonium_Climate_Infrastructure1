// Data structure for Patrimonium PCIOF I Dashboard
const dashboardData = {
    // KPI Data - FIXED: Consistent unit handling and proper formatting + French character escaping (Data source for empty KPI cards)
    kpis: {
        fundNet: {
            irrNet: { value: 7.9, unit: '%', context: 'au 31/12/2024' },
            tvpiNet: { value: 1.12, unit: '×', context: 'vs 1.0× fin 2023' },
            dpiNet: { value: 0.05, unit: '×', context: 'distributions' },
            rvpiNet: { value: 1.07, unit: '×', context: 'valeur résiduelle' },
            nav: { value: '90-91', unit: ' M€', context: 'au 31/12/2024' }
        },
        // NEW: Stéphane Bonvin Individual Performance Data (Data source for empty Stéphane Bonvin cards/section)
        individual: {
            tvpi: { value: 1.15, unit: '×', context: 'performance individuelle' },
            dpi: { value: 0.05, unit: '×', context: 'distributions reçues' },
            rvpi: { value: 1.10, unit: '×', context: 'valeur résiduelle' },
            nav: { value: '1.118', unit: ' M€', context: 'au 31/12/2024' }
        }
    },

    // NEW: Stéphane Bonvin Individual Data - CORRECTED transactions based on CNnrw data (Data source for empty Stéphane Bonvin cards/section)
    stephaneBovin: {
        engagement: { value: 1500000, unit: ' €', label: 'Engagement Total' },
        capitalAppele: { value: 981413, unit: ' €', label: 'Capital Appelé à date' },
        capitalNonAppele: { value: 518587, unit: ' €', label: 'Capital Non Appelé' },
        distributionsTotales: { value: 49000, unit: ' €', label: 'Distributions Totales à date' },
        capitalVerse: { value: 965023, unit: ' €', label: 'Capital Versé Net' },
        navActuelle: { value: 1118231, unit: ' €', label: 'Valeur Actuelle Nette (NAV)' },
        // CORRECTED: Updated transactions array based on exact data from task CNnrw
        transactions: [
            { date: '29/09/2023', type: 'Drawdown', description: 'DD11 - 5th Closing', montant: 594172 },
            { date: '09/01/2024', type: 'Adjustment', description: 'Final Closing (crédit)', montant: -3423 },
            { date: '08/03/2024', type: 'Drawdown', description: 'DD12 + Equalisation', montant: 73126 },
            { date: '10/07/2024', type: 'Drawdown', description: 'DD13', montant: 19753 },
            { date: '14/08/2024', type: 'Drawdown', description: 'DD14', montant: 148401 },
            { date: '27/09/2024', type: 'Drawdown', description: 'DD15', montant: 149383 },
            { date: '30/10/2024', type: 'Distribution', description: 'First Distribution', montant: -49000 }
        ],
        evolutionData: [
            { date: '31/12/2023', capitalVerse: 627050, nav: 634746 },
            { date: '31/12/2024', capitalVerse: 965023, nav: 1118231 }
        ]
    },

    // Historical Data for Charts - Extended Q1 2022 to Q4 2024 - FIXED: Corrected based on available data (Data source for empty charts)
    // This data is used for performance trend charts and may need correction based on external data sources.
    historical: {
        nav: [
            { date: '2022-Q1', value: 15.2 },
            { date: '2022-Q2', value: 28.7 },
            { date: '2022-Q3', value: 42.1 },
            { date: '2022-Q4', value: 51.8 },
            { date: '2023-Q1', value: 58.9 },
            { date: '2023-Q2', value: 65.4 },
            { date: '2023-Q3', value: 72.8 },
            { date: '2023-Q4', value: 78.2 },
            { date: '2024-Q1', value: 82.5 },
            { date: '2024-Q2', value: 86.1 },
            { date: '2024-Q3', value: 85.8 },
            { date: '2024-Q4', value: 87.8 }
        ],
        tvpi: [
            { date: '2022-Q1', tvpi: 0.95, rvpi: 0.95 },
            { date: '2022-Q2', tvpi: 0.98, rvpi: 0.98 },
            { date: '2022-Q3', tvpi: 1.01, rvpi: 1.01 },
            { date: '2022-Q4', tvpi: 1.03, rvpi: 1.03 },
            { date: '2023-Q1', tvpi: 1.04, rvpi: 1.04 },
            { date: '2023-Q2', tvpi: 1.06, rvpi: 1.06 },
            { date: '2023-Q3', tvpi: 1.08, rvpi: 1.08 },
            { date: '2023-Q4', tvpi: 1.00, rvpi: 1.00 },
            { date: '2024-Q1', tvpi: 1.02, rvpi: 1.02 },
            { date: '2024-Q2', tvpi: 1.04, rvpi: 1.04 },
            { date: '2024-Q3', tvpi: 1.04, rvpi: 1.04 },
            { date: '2024-Q4', tvpi: 1.12, rvpi: 1.07 }
        ],
        irr: [
            { date: '2022-Q1', value: -5.2 },
            { date: '2022-Q2', value: -2.8 },
            { date: '2022-Q3', value: 0.2 },
            { date: '2022-Q4', value: 2.1 },
            { date: '2023-Q1', value: 3.8 },
            { date: '2023-Q2', value: 4.4 },
            { date: '2023-Q3', value: 5.1 },
            { date: '2023-Q4', value: 0.0 },
            { date: '2024-Q1', value: 1.5 },
            { date: '2024-Q2', value: 4.2 },
            { date: '2024-Q3', value: 7.6 },
            { date: '2024-Q4', value: 7.9 }
        ],
        cumulativeFlows: [
            { date: '2022-Q1', contributions: 15.2, distributions: 0 },
            { date: '2022-Q2', contributions: 28.7, distributions: 0 },
            { date: '2022-Q3', contributions: 42.1, distributions: 0 },
            { date: '2022-Q4', contributions: 51.8, distributions: 0 },
            { date: '2023-Q1', contributions: 58.9, distributions:
0 },
            { date: '2023-Q2', contributions: 65.4, distributions: 0 },
            { date: '2023-Q3', contributions: 72.8, distributions: 0 },
            { date: '2023-Q4', contributions: 78.2, distributions: 0 },
            { date: '2024-Q1', contributions: 80.1, distributions: 0 },
            { date: '2024-Q2', contributions: 81.5, distributions: 0 },
            { date: '2024-Q3', contributions: 82.2, distributions: 0 },
            { date: '2024-Q4', contributions: 82.2, distributions: 4.1 }
        ]
    },

    // Diversification Data (Data source for empty charts)
    diversification: {
        geographical: [
            { region: 'Europe', percentage: 75, color: '#0053a3' },
            { region: 'Amérique du Nord', percentage: 18, color: '#4a90e2' },
            { region: 'Autres Régions', percentage: 7, color: '#87ceeb' }
        ],
        sectoral: [
            { sector: 'Énergies Renouvelables', percentage: 32, color: '#0053a3' },
            { sector: 'Réseaux Intelligents & Transmission', percentage: 32, color: '#4a90e2' },
            { sector: 'Stockage d\'Énergie & Décentralisation', percentage: 21, color: '#008000' },
            { sector: 'Mobilité Propre', percentage: 8, color: '#87ceeb' },
            { sector: 'Infrastructures Sociales', percentage: 4, color: '#90c695' },
            { sector: 'Efficacité Énergétique', percentage: 2, color: '#b8d4ba' }
        ]
    },

    // Cash Flow Data (Data source for empty charts)
    cashFlow: {
        data: [
            { label: 'Capital Appelé', value: 21, type: 'inflow' },
            { label: 'Distributions', value: -4.1, type: 'outflow' },
            { label: 'Revenus Courants', value: 1.62, type: 'inflow' }
        ]
    },

    // CORRECTED Portfolio Companies - FILTERED to include ONLY PCIOF I fund participations (Data source for non-functional AI tab)
    // Based on Q4 2024 report (hyRut) and design plan (GsEN0) references
    portfolioCompanies: [
        {
            name: 'Equitix Fund VI',
            type: 'Infrastructure Générale',
            aiLevel: 'low',
            aiAnalysis: 'Pas de lien IA direct spécifique. Groupe Equitix explore IA pour évaluation risques climatiques (approche ESG).',
            aiSources: 'Equitix ESG Report 2023-2024'
        },
        {
            name: 'ICG Infrastructure EF',
            type: 'Infrastructure Générale',
            aiLevel: 'medium',
            aiAnalysis: 'Pas de lien IA direct mais groupe ICG mentionne importance IA. Investit infrastructure digitale (compteurs intelligents, fibre). Zeplug utilise SaaS/IA.',
            aiSources: 'Documentation ICG, Zeplug platform'
        },
        {
            name: 'Quinbrook Net Zero Fund',
            type: 'Infrastructure Énergétique',
            aiLevel: 'high',
            aiAnalysis: 'Exposition directe via développement de solutions énergétiques vertes pour centres de données hyperscale. Croissance tirée par la demande cloud et IA.',
            aiSources: 'Rapports Quinbrook, analyses sectorielles'
        },
        {
            name: 'Omnes Tag Energy',
            type: 'Énergie Renouvelable (Co-investissement)',
            aiLevel: 'low',
            aiAnalysis: 'Pas de lien IA explicite trouvé dans rapports/recherches.',
            aiSources: 'Rapports Omnes'
        },
        {
            name: 'Equitix Aurora Infra',
            type: 'Infrastructure Générale (Co-investissement)',
            aiLevel: 'low',
            aiAnalysis: 'Pas de lien IA explicite trouvé dans rapports/recherches.',
            aiSources: 'Documentation Equitix'
        },
        {
            name: 'Equitix Euro Fund I',
            type: 'Infrastructure Européenne (Secondaire)',
            aiLevel: 'low',
            aiAnalysis: 'Pas de lien IA explicite. Actifs comme Telecom Castilla La Mancha supportent infrastructure digitale.',
            aiSources: 'Rapports Equitix'
        },
        {
            name: 'Quinbrook Co-investment',
            type: 'Co-investissement',
            aiLevel: 'high',
            aiAnalysis: 'Mêmes actifs (Primergy Solar, Rowan DI) que Quinbrook NZPF. Lien via demande hyperscale tirée par cloud & IA.',
            aiSources: 'Documentation Quinbrook'
        },
        {
            name: 'Omnes Capenergie 5',
            type: 'Énergie Renouvelable',
            aiLevel: 'low',
            aiAnalysis: 'Pas de lien IA explicite trouvé dans rapports/recherches.',
            aiSources: 'Rapports Omnes'
        },
        {
            name: 'Stonepeak euNetworks',
            type: 'Infrastructure Réseau (Secondaire)',
            aiLevel: 'high',
            aiAnalysis: 'Connectivité centres de données & réseau fibre. Demande tirée par investissements hyperscale cloud & IA.',
            aiSources: 'Aware.com.au, analyses sectorielles'
        },
        {
            name: 'EIG Powerfield II',
            type: 'Énergie Renouvelable (Co-investissement)',
            aiLevel: 'low',
            aiAnalysis: 'Pas de lien IA explicite trouvé dans rapports/recherches.',
            aiSources: 'Documentation EIG'
        },
        {
            name: 'Calisen',
            type: 'Compteurs Intelligents',
            aiLevel: 'low',
            aiAnalysis: 'Acteur clé compteurs intelligents. IA utilisée pour optimisation réseaux intelligents (pas directement par Calisen).',
            aiSources: 'Rapport Q4, analyses sectorielles'
        }
    ],

    // CORRECTED AI Exposure Breakdown for Portfolio Tab - Re-calculated based on filtered companies (Data source for non-functional AI tab chart/summary)
    aiExposureBreakdown: [
        { level: 'Exposition Élevée', count: 3, color: '#008000' },
        { level: 'Exposition Modérée', count: 1, color: '#4a90e2' },
        { level: 'Exposition Limitée', count: 7, color: '#87ceeb' }
    ],

    // Qualitative Highlights - FIXED: French character escaping (Data source for empty highlights cards)
    highlights: [
        {
            title: 'Sortie Réussie : Océinde Communications',
            description: 'Vente en Octobre 2024. Multiple brut : <span class="highlight-positive">~2,0×</span>, IRR : <span class="highlight-positive">~19%</span>. Produit majoritairement distribué.',
            type: 'success'
        },
        {
            title: 'Refinancement Projet : Primergy',
            description: 'Financement fiscal finalisé Q4 2024. Dégage <span class="highlight-positive">~70 M$</span> liquidités au niveau projet.',
            type: 'milestone'
        },
        {
            title: 'Performance Opérationnelle Forte',
            description: 'Entreprises en portefeuille : croissance organique <span class="highlight-positive">+24% CA</span>, <span class="highlight-positive">+32% EBITDA</span> (moyenne 2024 vs 2023).',
            type: 'performance'
        },
        {
            title: 'Impacts de Marché Positifs',
            description: 'Appréciation USD, environnement de taux Europe favorable aux valorisations.',
            type: 'market'
        },
        {
            title: 'Lancement PCIOF II',
            description: 'Nouveau fonds successeur annoncé (cible IRR net <span class="highlight-positive">10–12%</span>, stratégie plus orientée plus-value).',
            type: 'milestone'
        },
        {
            title: 'Priorité 2025 (PCIOF I)',
            description: 'Finalisation déploiement (<span class="highlight-positive">~39 M€</span> restants, 2-3 transactions max.).',
            type: 'outlook'
        },
        {
            title: 'Distributions Futures Attendues',
            description: 'Anticipation d\'une accélération sur 2025-2027 (ICG Infrastructure, projets maturation).',
            type: 'outlook'
        },
        {
            title: 'Confiance du Gestionnaire',
            description: 'Confiance basée sur résilience et qualité portefeuille, alignement mégatendances climatiques.',
            type: 'outlook'
        }
    ]
};
