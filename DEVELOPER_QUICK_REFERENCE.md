# VibezMode Developer Quick Reference

**Version**: 1.0.0  
**Last Updated**: February 5, 2026

---

## Quick Links

- [Player Control](#player-control)
- [Analytics](#analytics)
- [A/B Testing](#ab-testing)
- [Configuration](#configuration)
- [Events](#events)
- [Common Tasks](#common-tasks)

---

## Player Control

### Basic Operations

```javascript
// Play/Pause
window.VibezMode.play();
window.VibezMode.pause();

// Volume (0-100)
window.VibezMode.setVolume(50);
const vol = window.VibezMode.getVolume();

// Status
const playing = window.VibezMode.isPlaying();
const vibe = window.VibezMode.getVibe();

// Time (seconds)
const duration = window.VibezMode.getDuration();
const current = window.VibezMode.getCurrentTime();
window.VibezMode.seek(30);

// UI
window.VibezMode.showPlayer();
window.VibezMode.hidePlayer();
window.VibezMode.togglePlayer();
```

---

## Analytics

### Event Tracking

```javascript
// Track events
window.VibezModeAnalytics.trackEvent('event_name', { data: 'value' });

// Get all events
const events = window.VibezModeAnalytics.getEvents();

// Filter by type
const playbackEvents = window.VibezModeAnalytics.getEventsByType('playback');

// Export data
const json = window.VibezModeAnalytics.exportEvents();

// Clear data
window.VibezModeAnalytics.clearEvents();

// Get statistics
const stats = window.VibezModeAnalytics.getStatistics();
```

---

## A/B Testing

### Test Management

```javascript
// Get assigned variant
const variant = window.VibezModeAB.getVariant();

// Get test ID
const testId = window.VibezModeAB.getTestId();

// Get results
const results = window.VibezModeAB.getResults();
```

---

## Configuration

### Script Configuration

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',                    // Vibe name
        siteId: 'my-website',            // Site identifier
        enableAnalytics: true,           // Enable tracking
        autoplay: false,                 // Auto-play on load
        volume: 50,                      // Default volume (0-100)
        playerPosition: 'bottom-right',  // Position
        playerSize: 'medium',            // Size (small, medium, large)
        loop: true,                      // Loop playback
        muted: false                     // Start muted
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

### Update Configuration

```javascript
window.VibezMode.updateConfig({
    volume: 75,
    playerPosition: 'top-right'
});

const config = window.VibezMode.getConfig();
```

---

## Events

### Player Events

```javascript
window.addEventListener('VibezModeReady', () => {
    console.log('Ready');
});

window.addEventListener('VibezModePlay', () => {
    console.log('Playing');
});

window.addEventListener('VibezModePause', () => {
    console.log('Paused');
});

window.addEventListener('VibezModeVolumeChange', (e) => {
    console.log('Volume:', e.detail.volume);
});

window.addEventListener('VibezModeEnded', () => {
    console.log('Track ended');
});

window.addEventListener('VibezModeError', (e) => {
    console.error('Error:', e.detail.error);
});
```

---

## Common Tasks

### Task 1: Create Custom Controls

```html
<button onclick="window.VibezMode.play()">Play</button>
<button onclick="window.VibezMode.pause()">Pause</button>
<input type="range" min="0" max="100" 
       oninput="window.VibezMode.setVolume(this.value)">
```

### Task 2: Display Current Status

```javascript
function updateStatus() {
    const status = {
        playing: window.VibezMode.isPlaying(),
        vibe: window.VibezMode.getVibe(),
        volume: window.VibezMode.getVolume(),
        time: window.VibezMode.getCurrentTime(),
        duration: window.VibezMode.getDuration()
    };
    console.log(status);
}

window.addEventListener('VibezModeReady', updateStatus);
```

### Task 3: Track User Engagement

```javascript
let sessionStart = Date.now();

window.addEventListener('VibezModePlay', () => {
    window.VibezModeAnalytics.trackEvent('session_started', {
        vibe: window.VibezMode.getVibe(),
        timestamp: Date.now()
    });
});

window.addEventListener('VibezModeEnded', () => {
    const duration = Date.now() - sessionStart;
    window.VibezModeAnalytics.trackEvent('session_ended', {
        duration: duration,
        vibe: window.VibezMode.getVibe()
    });
});
```

### Task 4: A/B Test Integration

```html
<script>
    window.VibezModeABConfig = {
        testId: 'homepage-test',
        variants: [
            { vibe: 'calm', weight: 1 },
            { vibe: 'focus', weight: 1 }
        ]
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/ab-testing.js"></script>

<script>
    window.addEventListener('VibezModeReady', () => {
        const variant = window.VibezModeAB.getVariant();
        console.log('User assigned to:', variant);
    });
</script>
```

### Task 5: Export Analytics

```javascript
function exportAnalytics() {
    const json = window.VibezModeAnalytics.exportEvents();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics.json';
    a.click();
}
```

### Task 6: Conditional Display

```javascript
window.addEventListener('VibezModeReady', () => {
    const userType = getUserType(); // Your function
    
    if (userType === 'premium') {
        window.VibezMode.showPlayer();
    } else {
        window.VibezMode.hidePlayer();
    }
});
```

### Task 7: Error Handling

```javascript
window.addEventListener('VibezModeError', (e) => {
    console.error('VibezMode error:', e.detail.error);
    
    // Fallback action
    console.log('Attempting recovery...');
    window.VibezMode.setVolume(50);
    window.VibezMode.play();
});
```

### Task 8: Performance Monitoring

```javascript
window.addEventListener('VibezModeReady', () => {
    const startTime = performance.now();
    
    window.VibezMode.play();
    
    window.addEventListener('VibezModePlay', () => {
        const loadTime = performance.now() - startTime;
        console.log(`Playback started in ${loadTime}ms`);
    });
});
```

---

## API Reference Table

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `play()` | - | Promise | Start playback |
| `pause()` | - | Promise | Pause playback |
| `setVolume(vol)` | number (0-100) | void | Set volume |
| `getVolume()` | - | number | Get volume |
| `isPlaying()` | - | boolean | Check if playing |
| `getVibe()` | - | string | Get current vibe |
| `getDuration()` | - | number | Get track duration |
| `getCurrentTime()` | - | number | Get current position |
| `seek(time)` | number | void | Seek to position |
| `showPlayer()` | - | void | Show UI |
| `hidePlayer()` | - | void | Hide UI |
| `togglePlayer()` | - | void | Toggle UI |
| `getConfig()` | - | Object | Get config |
| `updateConfig(opts)` | Object | void | Update config |

---

## Event Reference Table

| Event | Detail | Description |
|-------|--------|-------------|
| `VibezModeReady` | - | API ready |
| `VibezModePlay` | - | Playback started |
| `VibezModePause` | - | Playback paused |
| `VibezModeVolumeChange` | `{volume}` | Volume changed |
| `VibezModeEnded` | - | Track ended |
| `VibezModeError` | `{error}` | Error occurred |

---

## Configuration Reference Table

| Option | Type | Default | Values |
|--------|------|---------|--------|
| `vibe` | string | 'calm' | calm, focus, uplift, bold, earth, luxury, playful |
| `siteId` | string | 'default' | Any string |
| `enableAnalytics` | boolean | true | true, false |
| `autoplay` | boolean | false | true, false |
| `volume` | number | 50 | 0-100 |
| `playerPosition` | string | 'bottom-right' | bottom-right, bottom-left, top-right, top-left |
| `playerSize` | string | 'medium' | small, medium, large |
| `loop` | boolean | true | true, false |
| `muted` | boolean | false | true, false |

---

## Vibe Names

```javascript
const vibes = [
    'calm',      // 🕯️ Calm & Cozy
    'focus',     // 🎯 Focus & Flow
    'uplift',    // ✨ Uplift & Glow
    'bold',      // 🎨 Bold & Creative
    'earth',     // 🌿 Earth & Nature
    'luxury',    // 👑 Luxury & Chill
    'playful'    // 🎉 Playful & Fun
];
```

---

## Error Codes

| Code | Message | Solution |
|------|---------|----------|
| `AUTOPLAY_BLOCKED` | Browser blocked autoplay | Require user interaction |
| `AUDIO_NOT_FOUND` | Audio file not found | Check file path |
| `STORAGE_QUOTA_EXCEEDED` | localStorage full | Clear old data |
| `UNSUPPORTED_BROWSER` | Browser not supported | Use modern browser |

---

## Tips & Tricks

### Tip 1: Wait for Ready Event

Always wait for `VibezModeReady` before using the API:

```javascript
window.addEventListener('VibezModeReady', () => {
    // API is now safe to use
    window.VibezMode.play();
});
```

### Tip 2: Use Promises

Many methods return promises:

```javascript
window.VibezMode.play()
    .then(() => console.log('Playing'))
    .catch(err => console.error('Error:', err));
```

### Tip 3: Check Browser Support

```javascript
if (window.VibezMode) {
    // VibezMode is available
} else {
    console.log('VibezMode not loaded');
}
```

### Tip 4: Batch Operations

```javascript
// Don't do this (inefficient)
window.VibezMode.setVolume(25);
window.VibezMode.setVolume(50);
window.VibezMode.setVolume(75);

// Do this instead
window.VibezMode.setVolume(75);
```

### Tip 5: Clean Up Events

```javascript
function handlePlay() {
    console.log('Playing');
}

// Add listener
window.addEventListener('VibezModePlay', handlePlay);

// Remove when done
window.removeEventListener('VibezModePlay', handlePlay);
```

---

## Resources

- **Full API**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Customization**: [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Analytics**: [ANALYTICS.md](ANALYTICS.md)
- **A/B Testing**: [AB_TESTING.md](AB_TESTING.md)
- **GitHub**: https://github.com/trendycahedecor25/Vibezmode
- **Support**: hello@vibezmode.com

---

**VibezMode Developer Quick Reference © 2026**
