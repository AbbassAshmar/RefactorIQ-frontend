export const latestScanSummaryResponse = {
    status: 'success',
    error: null,
    data: {
        project_id: 'proj_4f92c1e8',
        scan_id: 'scan_2026_02_25_001',
        total_files: 1842,
        severity_summary: {
            critical: {
                count: 47,
                percentage: 2.55,
                score_range: {
                    min: 70,
                    max: 100,
                },
            },
            high: {
                count: 163,
                percentage: 8.85,
                score_range: {
                    min: 55,
                    max: 69,
                },
            },
            medium: {
                count: 624,
                percentage: 33.88,
                score_range: {
                    min: 31,
                    max: 54,
                },
            },
            low: {
                count: 1008,
                percentage: 54.72,
                score_range: {
                    min: 0,
                    max: 30,
                },
            },
        },
    },
    metadata: {
        generated_at: '2026-02-25T14:12:33Z',
        thresholds: {
            critical: '>= 70',
            high: '55-69',
            medium: '31-54',
            low: '0-30',
        },
    },
};
