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
                    min: 80,
                    max: 100,
                },
            },
            high: {
                count: 163,
                percentage: 8.85,
                score_range: {
                    min: 60,
                    max: 79,
                },
            },
            medium: {
                count: 624,
                percentage: 33.88,
                score_range: {
                    min: 30,
                    max: 59,
                },
            },
            low: {
                count: 1008,
                percentage: 54.72,
                score_range: {
                    min: 0,
                    max: 29,
                },
            },
        },
    },
    metadata: {
        generated_at: '2026-02-25T14:12:33Z',
        thresholds: {
            critical: '>= 80',
            high: '60-79',
            medium: '30-59',
            low: '0-29',
        },
    },
};
