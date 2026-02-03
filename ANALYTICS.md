# VibezMode Analytics Guide

## Overview

VibezMode now includes built-in analytics tracking to help you understand how users interact with your audio branding. All analytics are stored locally in the browser's localStorage and never sent to external servers by default, ensuring privacy and compliance.

## Features

### 1. Event Tracking

The analytics system tracks the following events:

| Event | Description | Data Captured |
|-------|-------------|----------------|
| `page_load` | User visits your website | URL, referrer, timestamp |
| `player_opened` | User opens the VibezMode player | Timestamp, session ID |
| `player_closed` | User closes the player | Timestamp, session ID |
| `playback` | User plays or pauses music | Action (play/pause), current time, duration |
| `volume_change` | User adjusts volume | Volume level (0-1) |
| `playback_completed` | Audio track finishes playing | Duration, timestamp |
| `playback_error` | Playback fails | Error message, timestamp |
| `page_hidden` | User switches tabs/minimizes window | Timestamp |
| `page_visible` | User returns to your website | Timestamp |
| `page_unload` | User leaves your website | Total session time |

### 2. Analytics Dashboard

Access the analytics dashboard at `analytics-dashboard.html` to visualize your data:

- **Total Events**: Count of all tracked interactions
- **Page Loads**: Number of unique sessions
- **Playback Events**: Total play/pause actions
- **Average Session Time**: Mean time users spend on your page
- **Vibe Breakdown**: Distribution of events by vibe
- **Event Distribution**: Breakdown of event types
- **Event Log**: Real-time log of recent events

### 3. Data Export

Export your analytics data in JSON format for:
- Integration with external analytics tools
- Custom analysis and reporting
- Archival and compliance
- Sharing with team members

## Implementation

### Using Analytics-Enabled Scripts

VibezMode provides two versions of each vibe script:

#### Standard Scripts (No Analytics)
```html
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

#### Analytics-Enabled Scripts
```html
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

### Configuration

Customize analytics behavior by setting `window.VibezModeConfig` before loading the script:

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        color: '#FFC0CB',
        enableAnalytics: true,  // Enable/disable analytics
        siteId: 'my-website'    // Identify your site
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

### Accessing Analytics Programmatically

The analytics system exposes a global object for programmatic access:

```javascript
// Get all tracked events
const events = window.VibezModeAnalytics.getEvents();

// Export events as JSON string
const jsonData = window.VibezModeAnalytics.exportEvents();

// Clear all analytics data
window.VibezModeAnalytics.clearEvents();
```

## Data Storage

### Local Storage

Analytics data is stored in browser localStorage under the key `vibezmode_analytics`:

```javascript
// Access raw data
const data = JSON.parse(localStorage.getItem('vibezmode_analytics') || '[]');
```

### Data Structure

Each event object contains:

```json
{
  "name": "playback",
  "timestamp": 1707032400000,
  "sessionDuration": 45000,
  "vibe": "calm",
  "siteId": "my-website",
  "action": "play",
  "currentTime": 0,
  "duration": 180
}
```

## Privacy & Compliance

### Data Retention

- Analytics data is stored only in the user's browser
- Data persists across sessions until manually cleared
- No data is sent to VibezMode servers by default
- Users can clear data anytime through the dashboard

### GDPR & Privacy

- No personally identifiable information (PII) is collected
- No tracking cookies are set
- No third-party data sharing
- Users have full control over their data

### Recommendations

1. **Disclose Analytics**: Inform users that analytics are enabled
2. **Provide Dashboard Access**: Let users access the analytics dashboard
3. **Allow Opt-Out**: Provide option to disable analytics via configuration
4. **Regular Cleanup**: Periodically export and archive old data

## Dashboard Usage

### Accessing the Dashboard

1. Open `analytics-dashboard.html` in your browser
2. The dashboard auto-refreshes every 5 seconds
3. View real-time analytics from your website

### Dashboard Features

#### Statistics Cards
- **Total Events**: Sum of all tracked interactions
- **Page Loads**: Count of page_load events
- **Playback Events**: Count of playback actions
- **Average Session Time**: Mean session duration

#### Vibe Breakdown
- Pie chart showing distribution of events by vibe
- Percentage breakdown for each vibe
- Helps identify most popular audio experiences

#### Event Distribution
- Bar chart showing distribution of event types
- Identifies which user actions are most common
- Useful for understanding user behavior

#### Event Log
- Real-time list of recent events
- Shows timestamp, event type, and vibe
- Scroll through to see interaction history

#### Export Tab
- View raw JSON data
- Copy to clipboard for external analysis
- Download as file for archival

### Dashboard Actions

| Action | Purpose |
|--------|---------|
| 🔄 Refresh Data | Manually update dashboard statistics |
| 📥 Export JSON | Download analytics as JSON file |
| 🗑️ Clear All Data | Remove all stored analytics data |
| 📋 Copy to Clipboard | Copy JSON data for sharing |

## Advanced Usage

### Custom Analytics Integration

Combine VibezMode analytics with your existing analytics platform:

```javascript
// After VibezMode loads
const events = window.VibezModeAnalytics.getEvents();

// Send to your analytics service
events.forEach(event => {
    // Example: Send to Google Analytics
    gtag('event', event.name, {
        vibe: event.vibe,
        sessionDuration: event.sessionDuration
    });
});
```

### A/B Testing

Compare performance across different vibes:

```javascript
const events = window.VibezModeAnalytics.getEvents();

// Group by vibe
const vibeStats = {};
events.forEach(e => {
    if (!vibeStats[e.vibe]) vibeStats[e.vibe] = { plays: 0, completions: 0 };
    if (e.name === 'playback' && e.action === 'play') vibeStats[e.vibe].plays++;
    if (e.name === 'playback_completed') vibeStats[e.vibe].completions++;
});

// Calculate completion rate
Object.entries(vibeStats).forEach(([vibe, stats]) => {
    const rate = stats.plays > 0 ? (stats.completions / stats.plays * 100).toFixed(2) : 0;
    console.log(`${vibe}: ${rate}% completion rate`);
});
```

### Session Analysis

Analyze user sessions:

```javascript
const events = window.VibezModeAnalytics.getEvents();

// Group by session
const sessions = {};
events.forEach(e => {
    const sessionId = e.sessionId || 'default';
    if (!sessions[sessionId]) sessions[sessionId] = [];
    sessions[sessionId].push(e);
});

// Analyze each session
Object.entries(sessions).forEach(([sessionId, sessionEvents]) => {
    const duration = sessionEvents[sessionEvents.length - 1].sessionDuration;
    const playCount = sessionEvents.filter(e => e.name === 'playback' && e.action === 'play').length;
    console.log(`Session ${sessionId}: ${duration}ms, ${playCount} plays`);
});
```

## Troubleshooting

### Analytics Not Recording

1. **Check if enabled**: Verify `enableAnalytics: true` in config
2. **Check localStorage**: Ensure browser allows localStorage
3. **Check console**: Look for error messages in browser console
4. **Check script**: Verify analytics script is loaded (not standard script)

### Data Not Appearing in Dashboard

1. **Refresh page**: Reload analytics-dashboard.html
2. **Check localStorage**: Open DevTools > Application > Local Storage
3. **Verify events**: Run `window.VibezModeAnalytics.getEvents()` in console
4. **Clear cache**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Dashboard Not Auto-Refreshing

1. **Check browser console**: Look for JavaScript errors
2. **Verify localStorage access**: Ensure localStorage is not disabled
3. **Manual refresh**: Click "🔄 Refresh Data" button
4. **Check interval**: Dashboard refreshes every 5 seconds

## Best Practices

1. **Regular Exports**: Periodically export analytics for backup
2. **Data Privacy**: Inform users about analytics collection
3. **Performance**: Monitor localStorage size (limit ~5-10MB)
4. **Analysis**: Review analytics weekly to identify trends
5. **Optimization**: Use insights to improve vibe selection
6. **Compliance**: Ensure GDPR/CCPA compliance if applicable

## Future Enhancements

Planned analytics features:

- Cloud-based analytics dashboard
- Real-time notifications for engagement spikes
- Advanced segmentation and filtering
- Custom event tracking
- Integration with popular analytics platforms
- Heatmap visualization of player interactions
- Predictive analytics for vibe recommendations

## Support

For questions or issues with analytics:

- Check this guide for troubleshooting
- Review browser console for error messages
- Visit [GitHub Issues](https://github.com/trendycahedecor25/Vibezmode/issues)
- Contact [hello@vibezmode.com](mailto:hello@vibezmode.com)

---

**Last Updated**: February 2026

For the most up-to-date information, visit our [GitHub repository](https://github.com/trendycahedecor25/Vibezmode).
