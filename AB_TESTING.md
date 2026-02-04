# VibezMode A/B Testing Framework

## Overview

The VibezMode A/B Testing Framework allows website owners to test different vibes on their audience to see which one drives the most engagement. By randomly assigning users to different "vibe variants," you can use data to make informed decisions about your audio branding.

## How It Works

1. **Random Assignment**: When a user visits your site, they are randomly assigned to one of the vibes you've specified.
2. **Persistence**: The assignment is saved in the user's browser (localStorage), so they hear the same vibe every time they return.
3. **Analytics Integration**: Performance data for each variant is automatically tracked and can be viewed in the analytics dashboard.

## Implementation

### 1. Add the A/B Testing Script

Replace your standard VibezMode script with the A/B testing script:

```html
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/ab-testing.js"></script>
```

### 2. Configure Your Test (Optional)

You can customize the test by setting `window.VibezModeABConfig` before the script:

```html
<script>
    window.VibezModeABConfig = {
        testId: 'summer-campaign', // Unique ID for this test
        variants: [
            { vibe: 'calm', weight: 1 },   // 50% chance
            { vibe: 'uplift', weight: 1 }  // 50% chance
        ],
        siteId: 'my-website'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/ab-testing.js"></script>
```

### 3. Analyze Results

Open the `analytics-dashboard.html` to see how each vibe is performing. Look for:
- **Playback Rate**: Which vibe do users play more often?
- **Session Duration**: Which vibe keeps users on the page longer?
- **Interaction**: Which vibe leads to more volume adjustments or player opens?

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `testId` | String | `'vibe-comparison-1'` | A unique identifier for your test. |
| `variants` | Array | `[{vibe:'calm', weight:1}, {vibe:'focus', weight:1}]` | The vibes to test and their relative weights. |
| `enableAnalytics` | Boolean | `true` | Whether to track performance data. |
| `siteId` | String | `'default'` | An identifier for your website. |

## Best Practices

- **Test 2-3 Vibes**: Don't test too many at once; it takes longer to get significant results.
- **Run for 1-2 Weeks**: Give the test enough time to collect data from different types of visitors.
- **Check Significance**: Ensure you have enough events before making a final decision.
- **One Test at a Time**: Avoid running multiple A/B tests on the same page to prevent data contamination.

---

**VibezMode** - Data-driven audio branding for the modern web.
