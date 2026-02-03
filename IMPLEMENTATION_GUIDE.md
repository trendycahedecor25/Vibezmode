# VibezMode Analytics Implementation Guide

## Overview

This guide walks you through implementing VibezMode analytics on your website in three simple steps.

## Step 1: Update Your Website (2 minutes)

### Option A: Replace Existing Script

If you already have VibezMode on your website:

**Before:**
```html
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

**After:**
```html
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

### Option B: Add Analytics to New Installation

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add VibezMode with Analytics -->
    <script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
</body>
</html>
```

### Option C: Configure with Custom Settings

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',                    // Choose: calm, focus, uplift, bold, earth, luxury, playful
        color: '#FFC0CB',                // Optional: custom color
        enableAnalytics: true,           // Enable/disable analytics
        siteId: 'my-website'             // Identify your site
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

## Step 2: Set Up Analytics Dashboard (1 minute)

### Download Dashboard

1. Go to [GitHub Repository](https://github.com/trendycahedecor25/Vibezmode)
2. Download `analytics-dashboard.html`
3. Save to your computer

### Open Dashboard

1. Double-click `analytics-dashboard.html` to open in your browser
2. Or upload to your web server and access via URL

### Dashboard is Ready!

The dashboard will:
- ✅ Auto-refresh every 5 seconds
- ✅ Show real-time analytics
- ✅ Update as users interact with your website
- ✅ Allow data export and analysis

## Step 3: Start Tracking (Ongoing)

### Monitor Analytics

1. **Keep dashboard open** while your website is live
2. **Interact with player** to generate test events
3. **Watch statistics update** in real-time
4. **Export data** regularly for analysis

### What Gets Tracked

| Event | Tracked | Example |
|-------|---------|---------|
| Page loads | ✅ | User visits your site |
| Player opens | ✅ | User clicks music icon |
| Playback | ✅ | User clicks play/pause |
| Volume changes | ✅ | User adjusts volume slider |
| Session time | ✅ | How long user stays on page |
| Completions | ✅ | Music finishes playing |

## Configuration Options

### Basic Configuration

```javascript
window.VibezModeConfig = {
    vibe: 'calm',              // Required: which vibe to use
};
```

### Full Configuration

```javascript
window.VibezModeConfig = {
    vibe: 'calm',                    // Required: calm, focus, uplift, bold, earth, luxury, playful
    color: '#FFC0CB',                // Optional: override vibe color
    audioUrl: 'custom-url.mp3',      // Optional: use custom audio
    enableAnalytics: true,           // Optional: enable/disable analytics (default: true)
    siteId: 'my-website'             // Optional: identify your site
};
```

### Vibe Options

| Vibe | Use Case | Color |
|------|----------|-------|
| calm | Wellness, meditation, relaxation | Pink/Teal |
| focus | Productivity, work, concentration | Grey/Cyan |
| uplift | Motivation, energy, inspiration | Teal/Yellow |
| bold | Creative, artistic, expressive | Pink/Blue |
| earth | Nature, organic, grounded | Green/Blue |
| luxury | Premium, sophisticated, elegant | Gold/Black |
| playful | Fun, entertainment, youth | Pink/Green |

## Dashboard Features

### Statistics Cards

```
📊 Total Events       → Count of all tracked interactions
📊 Page Loads         → Number of unique sessions
📊 Playback Events    → Total play/pause actions
📊 Avg Session Time   → Average time on page
```

### Vibe Breakdown

Shows which vibes are most popular:
- Visual progress bars
- Percentage distribution
- Event count per vibe

### Event Distribution

Shows what users do most:
- Event type breakdown
- Frequency of each action
- User behavior patterns

### Event Log

Real-time list of recent events:
- Timestamp of each event
- Event type and vibe
- Last 50 events displayed

### Export Data

Download analytics as JSON:
- Copy to clipboard
- Download as file
- Share with team

## Advanced Usage

### Programmatic Access

Access analytics data from your code:

```javascript
// Get all events
const events = window.VibezModeAnalytics.getEvents();
console.log('Total events:', events.length);

// Export as JSON string
const json = window.VibezModeAnalytics.exportEvents();

// Clear all data
window.VibezModeAnalytics.clearEvents();
```

### Custom Analytics Integration

Send data to your analytics platform:

```javascript
// After VibezMode loads
const events = window.VibezModeAnalytics.getEvents();

// Send to Google Analytics
events.forEach(event => {
    gtag('event', event.name, {
        vibe: event.vibe,
        sessionDuration: event.sessionDuration
    });
});

// Send to Mixpanel
events.forEach(event => {
    mixpanel.track(event.name, {
        vibe: event.vibe,
        timestamp: event.timestamp
    });
});
```

### A/B Testing

Compare performance across vibes:

```javascript
const events = window.VibezModeAnalytics.getEvents();

// Group by vibe
const vibeStats = {};
events.forEach(e => {
    if (!vibeStats[e.vibe]) {
        vibeStats[e.vibe] = { 
            opens: 0, 
            plays: 0, 
            completions: 0 
        };
    }
    
    if (e.name === 'player_opened') vibeStats[e.vibe].opens++;
    if (e.name === 'playback' && e.action === 'play') vibeStats[e.vibe].plays++;
    if (e.name === 'playback_completed') vibeStats[e.vibe].completions++;
});

// Calculate metrics
Object.entries(vibeStats).forEach(([vibe, stats]) => {
    const engagementRate = stats.opens > 0 
        ? (stats.plays / stats.opens * 100).toFixed(2) 
        : 0;
    console.log(`${vibe}: ${engagementRate}% engagement`);
});
```

### Session Analysis

Analyze individual user sessions:

```javascript
const events = window.VibezModeAnalytics.getEvents();

// Group by session
const sessions = {};
events.forEach(e => {
    const sessionId = e.sessionId || 'default';
    if (!sessions[sessionId]) sessions[sessionId] = [];
    sessions[sessionId].push(e);
});

// Analyze sessions
Object.entries(sessions).forEach(([sessionId, sessionEvents]) => {
    const duration = sessionEvents[sessionEvents.length - 1].sessionDuration;
    const plays = sessionEvents.filter(e => 
        e.name === 'playback' && e.action === 'play'
    ).length;
    
    console.log(`Session ${sessionId}:`);
    console.log(`  Duration: ${duration}ms`);
    console.log(`  Plays: ${plays}`);
});
```

## Troubleshooting

### Analytics Not Recording

**Problem**: Dashboard shows no data

**Solutions**:
1. Verify analytics script is loaded (check browser console)
2. Ensure localStorage is enabled in browser
3. Interact with the player (click, play, adjust volume)
4. Refresh dashboard (click "🔄 Refresh Data")
5. Check browser console for errors

### Dashboard Not Updating

**Problem**: Dashboard doesn't show new events

**Solutions**:
1. Manual refresh: Click "🔄 Refresh Data" button
2. Hard refresh page: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check localStorage: Open DevTools > Application > Local Storage
4. Verify script: Check that analytics script is loaded

### Data Not Persisting

**Problem**: Data disappears after closing browser

**Solutions**:
1. Export data regularly using "📥 Export JSON"
2. Store in external database
3. Use cloud analytics backend (planned feature)

## Best Practices

### 1. Regular Monitoring
- Check dashboard weekly
- Look for trends and patterns
- Identify popular vibes

### 2. Data Export
- Export analytics monthly
- Keep backups of data
- Archive for historical analysis

### 3. Privacy Compliance
- Disclose analytics in privacy policy
- Inform users about tracking
- Allow opt-out if required
- Respect user privacy

### 4. Performance
- Monitor localStorage usage
- Clear old data periodically
- Optimize for mobile devices

### 5. Analysis
- Calculate engagement rates
- Compare vibe performance
- Test different vibes
- Optimize based on data

## Data Privacy

### What's Collected
- ✅ User interactions (play, pause, volume)
- ✅ Session duration
- ✅ Page URL and referrer
- ✅ Event timestamps

### What's NOT Collected
- ❌ Personal information (name, email, etc.)
- ❌ IP addresses or location data
- ❌ Device identifiers
- ❌ Browsing history

### Data Storage
- 📍 Stored only in user's browser
- 📍 Never sent to VibezMode servers
- 📍 Persists until user clears browser data
- 📍 Users can clear anytime via dashboard

### Compliance
- ✅ GDPR compliant
- ✅ CCPA ready
- ✅ No tracking cookies
- ✅ User data control

## Support & Resources

### Documentation
- [ANALYTICS.md](ANALYTICS.md) - Comprehensive guide
- [ANALYTICS_README.md](ANALYTICS_README.md) - Quick reference
- [GitHub Issues](https://github.com/trendycahedecor25/Vibezmode/issues) - Bug reports

### Contact
- 📧 Email: [hello@vibezmode.com](mailto:hello@vibezmode.com)
- 🐛 Issues: [GitHub Issues](https://github.com/trendycahedecor25/Vibezmode/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/trendycahedecor25/Vibezmode/discussions)

## Next Steps

1. ✅ Update your website with analytics script
2. ✅ Download and open analytics dashboard
3. ✅ Interact with player to generate test data
4. ✅ Review analytics and identify patterns
5. ✅ Export data for analysis
6. ✅ Optimize vibe selection based on data

## Summary

| Step | Time | Action |
|------|------|--------|
| 1 | 2 min | Replace script with analytics version |
| 2 | 1 min | Download and open dashboard |
| 3 | Ongoing | Monitor and export analytics |

**Total Setup Time: 3 minutes**

---

**Version**: 1.0  
**Last Updated**: February 3, 2026  
**Repository**: [GitHub](https://github.com/trendycahedecor25/Vibezmode)
