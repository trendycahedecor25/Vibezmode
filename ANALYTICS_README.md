# VibezMode Analytics - Quick Start

## What's New

VibezMode now includes **built-in analytics tracking** to help you understand how users interact with your audio branding. Track plays, pauses, volume changes, and more—all stored locally in the browser.

## Quick Start (30 seconds)

### 1. Add Analytics to Your Website

Replace your standard VibezMode script with the analytics version:

```html
<!-- Before (no analytics) -->
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>

<!-- After (with analytics) -->
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

### 2. Open the Analytics Dashboard

1. Download `analytics-dashboard.html` from the repository
2. Open it in your browser
3. Start interacting with the VibezMode player on your website
4. Watch the analytics update in real-time!

## What Gets Tracked

- ✅ Page loads and sessions
- ✅ Player opens/closes
- ✅ Play/pause events
- ✅ Volume changes
- ✅ Session duration
- ✅ Playback completion
- ✅ Errors and issues

## Available Scripts

All vibes now have analytics-enabled versions:

```
v1/analytics-calm.js
v1/analytics-focus.js
v1/analytics-uplift.js
v1/analytics-bold.js
v1/analytics-earth.js
v1/analytics-luxury.js
v1/analytics-playful.js
```

## Dashboard Features

| Feature | What It Shows |
|---------|--------------|
| 📊 Statistics | Total events, page loads, playback count, avg session time |
| 🎵 Vibe Breakdown | Which vibes are most popular |
| 📈 Event Distribution | What users do most (play, pause, volume, etc.) |
| 📋 Event Log | Real-time list of user interactions |
| 📥 Export | Download data as JSON for analysis |

## Configuration

Customize analytics behavior:

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        enableAnalytics: true,      // Enable/disable tracking
        siteId: 'my-website'        // Identify your site
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

## Access Data Programmatically

```javascript
// Get all events
const events = window.VibezModeAnalytics.getEvents();

// Export as JSON
const json = window.VibezModeAnalytics.exportEvents();

// Clear all data
window.VibezModeAnalytics.clearEvents();
```

## Privacy

✅ **Privacy-First Design**
- Data stored only in user's browser
- No data sent to VibezMode servers
- No tracking cookies
- No personal information collected
- Users can clear data anytime

## Files

| File | Purpose |
|------|---------|
| `v1/analytics-*.js` | Analytics-enabled player scripts |
| `analytics-dashboard.html` | Real-time analytics dashboard |
| `ANALYTICS.md` | Comprehensive analytics guide |
| `generate_scripts_analytics.py` | Script generator for developers |

## Next Steps

1. **Update your website** with the analytics script
2. **Open the dashboard** to see real-time data
3. **Export data** for analysis and reporting
4. **Read ANALYTICS.md** for advanced features

## Questions?

- 📖 See [ANALYTICS.md](ANALYTICS.md) for detailed documentation
- 🐛 Report issues on [GitHub](https://github.com/trendycahedecor25/Vibezmode/issues)
- 📧 Contact [hello@vibezmode.com](mailto:hello@vibezmode.com)

---

**Version**: 1.0  
**Last Updated**: February 2026
