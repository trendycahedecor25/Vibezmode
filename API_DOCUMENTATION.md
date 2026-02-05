# VibezMode API Documentation

**Version**: 1.0.0  
**Last Updated**: February 5, 2026  
**Status**: Complete

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Core API](#core-api)
4. [Analytics API](#analytics-api)
5. [A/B Testing API](#ab-testing-api)
6. [Configuration Options](#configuration-options)
7. [Events & Callbacks](#events--callbacks)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)
10. [Support](#support)

---

## Overview

The VibezMode API provides developers with programmatic access to control audio playback, track analytics, and manage A/B testing. All APIs are accessed through the global `window` object and require no external dependencies.

### Key Features

- **Player Control**: Play, pause, and manage volume programmatically
- **Analytics Integration**: Track custom events and retrieve analytics data
- **A/B Testing**: Configure and manage vibe variants
- **Configuration**: Customize player behavior and appearance
- **Event Listeners**: React to player state changes

### Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari 12+, Chrome Mobile)

---

## Getting Started

### Basic Implementation

```html
<!-- Add the VibezMode script -->
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>

<!-- Access the API -->
<script>
    // Wait for VibezMode to initialize
    window.addEventListener('VibezModeReady', function() {
        console.log('VibezMode is ready!');
        // API is now available
    });
</script>
```

### With Analytics

```html
<!-- Add the analytics-enabled script -->
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>

<script>
    window.addEventListener('VibezModeReady', function() {
        // Both player and analytics APIs are available
        window.VibezModeAnalytics.getEvents();
    });
</script>
```

---

## Core API

### Player Control

#### `window.VibezMode.play()`

Starts playback of the current vibe.

```javascript
window.VibezMode.play();
```

**Returns**: `Promise<void>`

**Example**:
```javascript
window.VibezMode.play().then(() => {
    console.log('Music started playing');
}).catch(error => {
    console.error('Playback failed:', error);
});
```

---

#### `window.VibezMode.pause()`

Pauses playback of the current vibe.

```javascript
window.VibezMode.pause();
```

**Returns**: `Promise<void>`

**Example**:
```javascript
window.VibezMode.pause();
console.log('Music paused');
```

---

#### `window.VibezMode.setVolume(volume)`

Sets the playback volume (0-100).

```javascript
window.VibezMode.setVolume(50);
```

**Parameters**:
- `volume` (number): Volume level from 0 to 100

**Returns**: `void`

**Example**:
```javascript
// Set volume to 50%
window.VibezMode.setVolume(50);

// Mute
window.VibezMode.setVolume(0);

// Full volume
window.VibezMode.setVolume(100);
```

---

#### `window.VibezMode.getVolume()`

Gets the current playback volume.

```javascript
const currentVolume = window.VibezMode.getVolume();
```

**Returns**: `number` (0-100)

**Example**:
```javascript
const volume = window.VibezMode.getVolume();
console.log(`Current volume: ${volume}%`);
```

---

#### `window.VibezMode.isPlaying()`

Checks if audio is currently playing.

```javascript
const playing = window.VibezMode.isPlaying();
```

**Returns**: `boolean`

**Example**:
```javascript
if (window.VibezMode.isPlaying()) {
    console.log('Music is playing');
} else {
    console.log('Music is not playing');
}
```

---

#### `window.VibezMode.getVibe()`

Gets the current vibe name.

```javascript
const vibe = window.VibezMode.getVibe();
```

**Returns**: `string` (One of: 'calm', 'focus', 'uplift', 'bold', 'earth', 'luxury', 'playful')

**Example**:
```javascript
const currentVibe = window.VibezMode.getVibe();
console.log(`Current vibe: ${currentVibe}`);
```

---

#### `window.VibezMode.getDuration()`

Gets the duration of the current audio track in seconds.

```javascript
const duration = window.VibezMode.getDuration();
```

**Returns**: `number` (seconds)

**Example**:
```javascript
const duration = window.VibezMode.getDuration();
console.log(`Track duration: ${Math.floor(duration / 60)} minutes`);
```

---

#### `window.VibezMode.getCurrentTime()`

Gets the current playback position in seconds.

```javascript
const currentTime = window.VibezMode.getCurrentTime();
```

**Returns**: `number` (seconds)

**Example**:
```javascript
const elapsed = window.VibezMode.getCurrentTime();
console.log(`Elapsed time: ${Math.floor(elapsed)} seconds`);
```

---

#### `window.VibezMode.seek(time)`

Seeks to a specific position in the track (in seconds).

```javascript
window.VibezMode.seek(30);
```

**Parameters**:
- `time` (number): Position in seconds

**Returns**: `void`

**Example**:
```javascript
// Jump to 1 minute mark
window.VibezMode.seek(60);

// Jump to middle of track
const duration = window.VibezMode.getDuration();
window.VibezMode.seek(duration / 2);
```

---

#### `window.VibezMode.togglePlayer()`

Toggles the visibility of the player UI.

```javascript
window.VibezMode.togglePlayer();
```

**Returns**: `void`

**Example**:
```javascript
// Hide/show player
window.VibezMode.togglePlayer();
```

---

#### `window.VibezMode.showPlayer()`

Shows the player UI.

```javascript
window.VibezMode.showPlayer();
```

**Returns**: `void`

---

#### `window.VibezMode.hidePlayer()`

Hides the player UI.

```javascript
window.VibezMode.hidePlayer();
```

**Returns**: `void`

---

### Configuration

#### `window.VibezMode.getConfig()`

Gets the current configuration.

```javascript
const config = window.VibezMode.getConfig();
```

**Returns**: `Object`

**Example**:
```javascript
const config = window.VibezMode.getConfig();
console.log('Site ID:', config.siteId);
console.log('Vibe:', config.vibe);
```

---

#### `window.VibezMode.updateConfig(options)`

Updates configuration options.

```javascript
window.VibezMode.updateConfig({
    siteId: 'my-website',
    playerPosition: 'bottom-right'
});
```

**Parameters**:
- `options` (Object): Configuration options to update

**Available Options**:
- `siteId` (string): Identifier for your website
- `playerPosition` (string): Position of player ('bottom-right', 'bottom-left', 'top-right', 'top-left')
- `playerSize` (string): Size of player ('small', 'medium', 'large')
- `autoplay` (boolean): Auto-play on page load
- `volume` (number): Default volume (0-100)

**Returns**: `void`

---

## Analytics API

### Event Tracking

#### `window.VibezModeAnalytics.trackEvent(eventName, data)`

Tracks a custom event.

```javascript
window.VibezModeAnalytics.trackEvent('custom_interaction', {
    action: 'user_clicked_button',
    timestamp: Date.now()
});
```

**Parameters**:
- `eventName` (string): Name of the event
- `data` (Object): Event data

**Returns**: `void`

**Example**:
```javascript
// Track user engagement
window.VibezModeAnalytics.trackEvent('user_engagement', {
    duration: 120,
    vibe: 'calm',
    action: 'completed_session'
});
```

---

#### `window.VibezModeAnalytics.getEvents()`

Retrieves all tracked events.

```javascript
const events = window.VibezModeAnalytics.getEvents();
```

**Returns**: `Array<Object>`

**Example**:
```javascript
const events = window.VibezModeAnalytics.getEvents();
console.log(`Total events tracked: ${events.length}`);

// Get playback events only
const playbackEvents = events.filter(e => e.name === 'playback');
console.log(`Playback events: ${playbackEvents.length}`);
```

---

#### `window.VibezModeAnalytics.getEventsByType(eventType)`

Retrieves events of a specific type.

```javascript
const playbackEvents = window.VibezModeAnalytics.getEventsByType('playback');
```

**Parameters**:
- `eventType` (string): Type of event to filter

**Returns**: `Array<Object>`

**Example**:
```javascript
const playerOpenEvents = window.VibezModeAnalytics.getEventsByType('player_opened');
console.log(`Player opened ${playerOpenEvents.length} times`);
```

---

#### `window.VibezModeAnalytics.exportEvents()`

Exports all events as a JSON string.

```javascript
const jsonData = window.VibezModeAnalytics.exportEvents();
```

**Returns**: `string` (JSON)

**Example**:
```javascript
const jsonData = window.VibezModeAnalytics.exportEvents();
const blob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'vibezmode-analytics.json';
a.click();
```

---

#### `window.VibezModeAnalytics.clearEvents()`

Clears all tracked events.

```javascript
window.VibezModeAnalytics.clearEvents();
```

**Returns**: `void`

**Example**:
```javascript
// Clear analytics data
if (confirm('Clear all analytics data?')) {
    window.VibezModeAnalytics.clearEvents();
    console.log('Analytics data cleared');
}
```

---

#### `window.VibezModeAnalytics.getStatistics()`

Gets aggregated statistics from tracked events.

```javascript
const stats = window.VibezModeAnalytics.getStatistics();
```

**Returns**: `Object`

**Example**:
```javascript
const stats = window.VibezModeAnalytics.getStatistics();
console.log('Total page loads:', stats.pageLoads);
console.log('Average session duration:', stats.avgSessionDuration);
console.log('Most popular vibe:', stats.mostPopularVibe);
```

---

## A/B Testing API

### Configuration

#### `window.VibezModeAB.getVariant()`

Gets the assigned A/B test variant for the current user.

```javascript
const variant = window.VibezModeAB.getVariant();
```

**Returns**: `string` (vibe name)

**Example**:
```javascript
const assignedVibe = window.VibezModeAB.getVariant();
console.log(`User assigned to: ${assignedVibe}`);
```

---

#### `window.VibezModeAB.getTestId()`

Gets the current A/B test ID.

```javascript
const testId = window.VibezModeAB.getTestId();
```

**Returns**: `string`

**Example**:
```javascript
const testId = window.VibezModeAB.getTestId();
console.log(`Current test: ${testId}`);
```

---

#### `window.VibezModeAB.getResults()`

Gets results from the current A/B test.

```javascript
const results = window.VibezModeAB.getResults();
```

**Returns**: `Object`

**Example**:
```javascript
const results = window.VibezModeAB.getResults();
console.log('Variant A performance:', results.variantA);
console.log('Variant B performance:', results.variantB);
console.log('Winner:', results.winner);
```

---

## Configuration Options

### Script Configuration

Configure VibezMode before loading the script:

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        siteId: 'my-website',
        enableAnalytics: true,
        autoplay: false,
        volume: 50,
        playerPosition: 'bottom-right',
        playerSize: 'medium'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

### Available Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vibe` | string | 'calm' | The vibe to load |
| `siteId` | string | 'default' | Identifier for your website |
| `enableAnalytics` | boolean | true | Enable event tracking |
| `autoplay` | boolean | false | Auto-play on page load |
| `volume` | number | 50 | Default volume (0-100) |
| `playerPosition` | string | 'bottom-right' | Player UI position |
| `playerSize` | string | 'medium' | Player UI size |
| `loop` | boolean | true | Loop audio playback |
| `muted` | boolean | false | Start muted |

---

## Events & Callbacks

### Player Events

Listen for player state changes:

```javascript
// Player ready
window.addEventListener('VibezModeReady', function() {
    console.log('VibezMode initialized');
});

// Playback started
window.addEventListener('VibezModePlay', function() {
    console.log('Playback started');
});

// Playback paused
window.addEventListener('VibezModePause', function() {
    console.log('Playback paused');
});

// Volume changed
window.addEventListener('VibezModeVolumeChange', function(event) {
    console.log('Volume:', event.detail.volume);
});

// Track ended
window.addEventListener('VibezModeEnded', function() {
    console.log('Track finished');
});

// Error occurred
window.addEventListener('VibezModeError', function(event) {
    console.error('Error:', event.detail.error);
});
```

### Analytics Events

Listen for analytics events:

```javascript
// Event tracked
window.addEventListener('VibezModeAnalyticsEvent', function(event) {
    console.log('Event tracked:', event.detail);
});

// Data exported
window.addEventListener('VibezModeAnalyticsExport', function(event) {
    console.log('Data exported:', event.detail);
});
```

---

## Examples

### Example 1: Custom Player Control

```javascript
// Create custom player controls
document.getElementById('play-btn').addEventListener('click', () => {
    window.VibezMode.play();
});

document.getElementById('pause-btn').addEventListener('click', () => {
    window.VibezMode.pause();
});

document.getElementById('volume-slider').addEventListener('input', (e) => {
    window.VibezMode.setVolume(e.target.value);
});
```

### Example 2: Analytics Dashboard

```javascript
// Create a simple analytics display
function updateAnalyticsDashboard() {
    const events = window.VibezModeAnalytics.getEvents();
    const stats = window.VibezModeAnalytics.getStatistics();
    
    document.getElementById('total-events').textContent = events.length;
    document.getElementById('page-loads').textContent = stats.pageLoads;
    document.getElementById('avg-session').textContent = 
        Math.floor(stats.avgSessionDuration / 1000) + 's';
}

// Update every 5 seconds
setInterval(updateAnalyticsDashboard, 5000);
```

### Example 3: A/B Testing Integration

```javascript
// Track which variant performs better
window.addEventListener('VibezModePlay', function() {
    const variant = window.VibezModeAB.getVariant();
    window.VibezModeAnalytics.trackEvent('variant_played', {
        variant: variant,
        timestamp: Date.now()
    });
});
```

### Example 4: Conditional Player Display

```javascript
// Show player only for certain users
window.addEventListener('VibezModeReady', function() {
    const userType = getUserType(); // Your function
    
    if (userType === 'premium') {
        window.VibezMode.showPlayer();
    } else {
        window.VibezMode.hidePlayer();
    }
});
```

### Example 5: Session Tracking

```javascript
// Track session duration
let sessionStart = Date.now();

window.addEventListener('VibezModePlay', function() {
    const sessionDuration = Date.now() - sessionStart;
    window.VibezModeAnalytics.trackEvent('session_duration', {
        duration: sessionDuration,
        vibe: window.VibezMode.getVibe()
    });
});
```

---

## Troubleshooting

### API Not Available

**Problem**: `window.VibezMode is undefined`

**Solution**: Wait for the `VibezModeReady` event:

```javascript
window.addEventListener('VibezModeReady', function() {
    // API is now available
    window.VibezMode.play();
});
```

---

### Playback Issues

**Problem**: Audio won't play

**Possible Causes**:
1. Browser autoplay policy - requires user interaction
2. Audio file not loading - check network tab
3. Volume set to 0 - check volume level

**Solution**:
```javascript
// Check if playing
if (!window.VibezMode.isPlaying()) {
    // Ensure volume is not 0
    window.VibezMode.setVolume(50);
    // Try playing
    window.VibezMode.play().catch(err => {
        console.error('Playback error:', err);
    });
}
```

---

### Analytics Not Tracking

**Problem**: Events not being recorded

**Possible Causes**:
1. Analytics not enabled - check config
2. localStorage disabled - check browser settings
3. Storage quota exceeded - clear old data

**Solution**:
```javascript
// Verify analytics is enabled
const config = window.VibezMode.getConfig();
console.log('Analytics enabled:', config.enableAnalytics);

// Check if events are being tracked
const events = window.VibezModeAnalytics.getEvents();
console.log('Events tracked:', events.length);

// Clear old data if needed
if (events.length > 1000) {
    window.VibezModeAnalytics.clearEvents();
}
```

---

### A/B Test Not Working

**Problem**: All users assigned to same variant

**Solution**: Ensure A/B testing script is loaded:

```html
<script>
    window.VibezModeABConfig = {
        testId: 'my-test',
        variants: [
            { vibe: 'calm', weight: 1 },
            { vibe: 'focus', weight: 1 }
        ]
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/ab-testing.js"></script>
```

---

## Support

### Documentation

- [README.md](README.md) - Project overview
- [ANALYTICS.md](ANALYTICS.md) - Analytics guide
- [AB_TESTING.md](AB_TESTING.md) - A/B testing guide
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Implementation steps

### Resources

- **GitHub**: https://github.com/trendycahedecor25/Vibezmode
- **Issues**: https://github.com/trendycahedecor25/Vibezmode/issues
- **Email**: hello@vibezmode.com
- **Website**: https://vibezmode.com

### Getting Help

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [Examples](#examples) for common use cases
3. Check GitHub Issues for similar problems
4. Contact support at hello@vibezmode.com

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 5, 2026 | Initial API documentation |

---

**VibezMode API Documentation © 2026**  
For the latest version, visit [GitHub](https://github.com/trendycahedecor25/Vibezmode)
