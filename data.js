// CORRECTED: Complete data structure for Patrimonium PCIOF I Dashboard - All data properly populated
const dashboardData = {
    // FIXED: KPI Data - Complete and properly structured (Source for previously empty KPI cards)
    kpis: {
        fundNet: {
            irrNet: { value: 7.9, unit: '%', context: 'au 31/12/2024' },
            tvpiNet: { value: 1.12, unit: '×', context: 'vs 1.0× fin 2023' },
            dpiNet: { value: 0.05, unit: '×', context: 'distributions' },
            rvpiNet: { value: 1.07, unit: '×', context: 'valeur résiduelle' },
            nav: { value: '90-91', unit: ' M€', context: 'au 31/12/2024' }
        },
        // CORRECTED: Stéphane Bonvin Individual Performance Data (Source for empty Stéphane Bonvin cards)
        individual: {
            tvpi: { value: 1.15, unit: '×', context: 'performance individuelle' },
            dpi: { value: 0.05, unit: '×', context: 'distributions reçues' },
            rvpi: { value: 1.10, unit: '×', context: 'valeur résiduelle' },
            nav: { value: '1.118', unit: ' M€', context: 'au 31/12/2024' }
        }
    },

    // CORRECTED: Complete Stéphane Bonvin Individual Data based on CNnrw sources (Source for empty Stéphane Bonvin section)
    stephaneBovin: {
        engagement: { value: 1500000, label: 'Engagement Total' },
        capitalAppele: { value: 981413, label: 'Capital Appelé à date' },
        capitalNonAppele: { value: 518587, label: 'Capital Non Appelé' },
        distributionsTotales: { value: 49000, label: 'Distributions Totales à date' },
        capitalVerse: { value: 965023, label: 'Capital Versé Net' },
        navActuelle: { value: 1118231, label: 'Valeur Actuelle Nette (NAV)' },
        // CORRECTED: Complete transactions array based on exact CNnrw data
        transactions: [
            { date: '29/09/2023', type: 'Drawdown', description: 'DD11 - 5th Closing', montant: 594172 },
            { date: '09/01/2024', type: 'Adjustment', description: 'Final Closing (crédit)', montant: -3423 },
            { date: '08/03/2024', type: 'Drawdown', description: 'DD12 + Equalisation', montant: 73126 },
            { date: '10/07/2024', type: 'Drawdown', description: 'DD13', montant: 19753 },
            { date: '14/08/2024', type: 'Drawdown', description: 'DD14', montant: 148401 },
            { date: '27/09/2024', type: 'Drawdown', description: 'DD15', montant: 149383 },
            { date: '30/10/2024', type: 'Distribution', description: 'First Distribution', montant: -49000 }
        ]
    },

    // CORRECTED: Historical Data for Charts - Complete data series (Source for empty charts)
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
            { date: '2023-Q1', tvpi
: 1.04, rvpi: 1.04 },
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
            { date: '2023-Q1', contributions: 58.9, distributions: 0 },
            { date: '2023-Q2', contributions: 65.4, distributions: 0 },
            { date: '2023-Q3', contributions: 72.8, distributions: 0 },
            { date: '2023-Q4', contributions: 78.2, distributions: 0 },
            { date: '2024-Q1', contributions: 80.1, distributions: 0 },
            { date: '2024-Q2', contributions: 81.5, distributions: 0 },
            { date: '2024-Q3', contributions: 82.2, distributions: 0 },
            { date: '2024-Q4', contributions: 82.2, distributions: 4.1 }
        ]
    },

    // CORRECTED: Diversification Data - Complete and accurate (Source for empty charts)
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

    // CORRECTED: Cash Flow Data - Complete (Source for empty charts)
    cashFlow: {
        data: [
            { label: 'Capital Appelé', value: 21, type: 'inflow' },
            { label: 'Distributions', value: -4.1, type: 'outflow' },
            { label: 'Revenus Courants', value: 1.62, type: 'inflow' }
        ]
    },

    // CORRECTED: Portfolio Companies - COMPLETE AI ANALYSIS based on hyRut and xfgln research (Source for non-functional AI tab)
    portfolioCompanies: [
        {
            name: 'Equitix Fund VI',
            type: 'Infrastructure Générale',
            aiLevel: 'low',
            aiAnalysis: 'Aucun lien IA direct identifié. Le groupe Equitix explore l\'utilisation de l\'IA pour l\'évaluation des risques climatiques dans son approche ESG, mais aucune implémentation spécifique documentée pour Fund VI.',
            aiSources: 'Equitix ESG Report 2023-2024'
        },
        {
            name: 'ICG Infrastructure EF',
            type: 'Infrastructure Générale',
            aiLevel: 'medium',
            aiAnalysis: 'Exposition indirecte via investissements dans la transformation numérique et l\'infrastructure digitale (compteurs intelligents, fibre optique). Zeplug, actif du portefeuille, utilise des solutions SaaS/IA. Le groupe ICG souligne l\'importance stratégique de l\'IA.',
            aiSources: 'ICG European Infrastructure, Zeplug platform documentation'
        },
        {
            name: 'Quinbrook Net Zero Fund',
            type: 'Infrastructure Énergétique',
            aiLevel: 'high',
            aiAnalysis: 'Exposition directe élevée via le développement de solutions énergétiques vertes pour centres de données hyperscale. Actifs Primergy Solar et Rowan Digital Infrastructure positionnés pour servir la demande croissante des clouds et IA. Primergy utilise l\'IA SparkCognition pour l\'optimisation opérationnelle.',
            aiSources: 'Quinbrook portfolio reports, Primergy SparkCognition partnership'
        },
        {
            name: 'Omnes Tag Energy',
            type: 'Énergie Renouvelable (Co-investissement)',
            aiLevel: 'low',
            aiAnalysis: 'Aucun lien IA explicite identifié dans la documentation disponible. Focus sur développement d\'énergies renouvelables traditionnelles sans mention d\'applications IA spécifiques.',
            aiSources: 'Omnes Capital reports'
        },
        {
            name: 'Equitix Aurora Infra',
            type: 'Infrastructure Générale (Co-investissement)',
            aiLevel: 'low',
            aiAnalysis: 'Aucun lien IA explicite identifié dans la documentation disponible. Co-investissement dans infrastructures générales sans exposition IA documentée.',
            aiSources: 'Equitix documentation'
        },
        {
            name: 'Equitix Euro Fund I',
            type: 'Infrastructure Européenne (Secondaire)',
            aiLevel: 'low',
            aiAnalysis: 'Exposition limitée. Actifs comme Telecom Castilla La Mancha supportent l\'infrastructure digitale de base, mais aucune stratégie IA explicite. Positionnement comme enabler indirect de l\'écosystème numérique.',
            aiSources: 'Equitix Fund I reports'
        },
        {
            name: 'Quinbrook Co-investment',
            type: 'Co-investissement',
            aiLevel: 'high',
            aiAnalysis: 'Exposition directe élevée via les mêmes actifs que Quinbrook NZPF (Primergy Solar, Rowan Digital Infrastructure). Bénéficie de la demande hyperscale tirée par l\'expansion des services cloud et IA. Primergy implémente l\'IA pour l\'optimisation énergétique.',
            aiSources: 'Quinbrook co-investment docs, Primergy AI implementations'
        },
        {
            name: 'Omnes Capenergie 5',
            type: 'Énergie Renouvelable',
            aiLevel: 'low',
            aiAnalysis: 'Aucun lien IA explicite identifié dans la documentation disponible. Focus sur développement d\'actifs énergétiques renouvelables sans stratégie IA documentée.',
            aiSources: 'Omnes Capenergie reports'
        },
        {
            name: 'Stonepeak euNetworks',
            type: 'Infrastructure Réseau (Secondaire)',
            aiLevel: 'high',
            aiAnalysis: 'Exposition directe élevée en tant qu\'enabler critique de l\'IA. euNetworks fournit la connectivité fibre essentielle aux centres de données et réseaux hyperscale. Croissance directement tirée par les investissements massifs en infrastructure cloud et IA des hyperscalers.',
            aiSources: 'Aware.com.au analysis, Stonepeak digital infrastructure strategy'
        },
        {
            name: 'EIG Powerfield II',
            type: 'Énergie Renouvelable (Co-investissement)',
            aiLevel: 'low',
            aiAnalysis: 'Aucun lien IA explicite documenté dans les sources disponibles. Co-investissement dans énergies renouvelables sans exposition IA identifiée.',
            aiSources: 'EIG Powerfield documentation'
        },
        {
            name: 'Calisen',
            type: 'Compteurs Intelligents',
            aiLevel: 'low',
            aiAnalysis: 'Acteur clé dans le déploiement de compteurs intelligents au Royaume-Uni. Bien que l\'IA soit utilisée dans l\'optimisation des réseaux intelligents par d\'autres acteurs, aucune implémentation IA directe par Calisen n\'est documentée. Positionnement comme enabler indirect des smart grids.',
            aiSources: 'Calisen UK smart meter reports, sectoral smart grid analysis'
        }
    ],

    // CORRECTED: AI Exposure Breakdown - Recalculated based on complete analysis (Source for AI tab chart)
    aiExposureBreakdown: [
        { level: 'Exposition Élevée', count: 3, color: '#008000' },
        { level: 'Exposition Modérée', count: 1, color: '#4a90e2' },
        { level: 'Exposition Limitée', count: 7, color: '#87ceeb' }
    ],

    // CORRECTED: Qualitative Highlights - Complete based on Q4 report (Source for empty highlights cards)
    highlights: [
        {
            title: 'Sortie Réussie : Océinde Communications',
            description: 'Vente réalisée en Octobre 2024. Multiple brut de <span class="highlight-positive">~2,0×</span>, IRR de <span class="highlight-positive">~19%</span>. Produit net majoritairement distribué aux investisseurs.',
            type: 'success'
        },
        {
            title: 'Refinancement Projet : Primergy Solar',
            description: 'Financement fiscal finalisé Q4 2024. Dégage <span class="highlight-positive">~70 M$</span> de liquidités au niveau projet, renforçant la position financière.',
            type: 'milestone'
        },
        {
            title: 'Performance Opérationnelle Forte',
            description: 'Entreprises en portefeuille affichent une croissance organique remarquable : <span class="highlight-positive">+24% de chiffre d\'affaires</span> et <span class="highlight-positive">+32% d\'EBITDA</span> (moyenne 2024 vs 2023).',
            type: 'performance'
        },
        {
            title: 'Impacts de Marché Positifs',
            description: 'Appréciation favorable de l\'USD et environnement de taux européens supportent les valorisations du portefeuille.',
            type: 'market'
        },
        {
            title: 'Lancement PCIOF II',
            description: 'Nouveau fonds successeur annoncé avec cible IRR net de <span class="highlight-positive">10–12%</span> et stratégie plus orientée plus-value.',
            type: 'milestone'
        },
        {
            title: 'Priorité 2025 (PCIOF I)',
            description: 'Finalisation du déploiement avec <span class="highlight-positive">~39 M€</span> restants à investir via 2-3 transactions maximum.',
            type: 'outlook'
        },
        {
            title: 'Distributions Futures Attendues',
            description: 'Anticipation d\'une accélération des distributions sur 2025-2027, notamment via ICG Infrastructure et projets en maturation.',
            type: 'outlook'
        },
        {
            title: 'Confiance du Gestionnaire',
            description: 'Confiance renforcée basée sur la résilience et qualité du portefeuille, parfaitement aligné avec les mégatendances climatiques.',
            type: 'outlook'
        }
    ]
};
