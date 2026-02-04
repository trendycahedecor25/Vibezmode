/**
 * VibezMode A/B Testing Framework
 * Version: 1.0.0
 * Description: Randomly assigns a vibe to a user and tracks performance to determine the best fit.
 */

(function() {
    const abConfig = window.VibezModeABConfig || {
        testId: 'vibe-comparison-1',
        variants: [
            { vibe: 'calm', weight: 1 },
            { vibe: 'focus', weight: 1 }
        ],
        enableAnalytics: true,
        siteId: 'default'
    };

    // Helper to get or set assigned variant
    function getAssignedVariant() {
        const storageKey = `vibezmode_ab_${abConfig.testId}`;
        let assigned = localStorage.getItem(storageKey);
        
        if (!assigned) {
            // Weighted random selection
            const totalWeight = abConfig.variants.reduce((sum, v) => sum + (v.weight || 1), 0);
            let random = Math.random() * totalWeight;
            
            for (const variant of abConfig.variants) {
                if (random < (variant.weight || 1)) {
                    assigned = variant.vibe;
                    break;
                }
                random -= (variant.weight || 1);
            }
            
            localStorage.setItem(storageKey, assigned);
        }
        
        return assigned;
    }

    const selectedVibe = getAssignedVariant();
    console.log(`VibezMode A/B Test: Assigned to ${selectedVibe}`);

    // Load the corresponding analytics script
    const script = document.createElement('script');
    script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-${selectedVibe}.js`;
    
    // Set config for the loaded script
    window.VibezModeConfig = {
        vibe: selectedVibe,
        enableAnalytics: abConfig.enableAnalytics,
        siteId: abConfig.siteId,
        abTestId: abConfig.testId,
        abVariant: selectedVibe
    };

    document.head.appendChild(script);
})();
