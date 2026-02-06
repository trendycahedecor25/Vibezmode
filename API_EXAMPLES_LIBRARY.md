# VibezMode API Code Examples Library

**Version**: 1.0.0  
**Last Updated**: February 6, 2026  
**Status**: Complete  
**Purpose**: Practical, copy-pasteable code snippets for common VibezMode use cases

---

## Table of Contents

1. [Basic Player Control](#basic-player-control)
2. [Volume & Playback Management](#volume--playback-management)
3. [Analytics Integration](#analytics-integration)
4. [A/B Testing](#ab-testing)
5. [Custom UI Controls](#custom-ui-controls)
6. [Event Handling](#event-handling)
7. [Configuration & Customization](#configuration--customization)
8. [Advanced Patterns](#advanced-patterns)
9. [Error Handling](#error-handling)
10. [Performance Optimization](#performance-optimization)

---

## Basic Player Control

### Example 1.1: Simple Play/Pause Toggle

**Use Case**: Add a button that toggles music playback

```javascript
const playPauseBtn = document.getElementById('play-pause-btn');

playPauseBtn.addEventListener('click', () => {
    if (window.VibezMode.isPlaying()) {
        window.VibezMode.pause();
        playPauseBtn.textContent = '▶ Play';
    } else {
        window.VibezMode.play();
        playPauseBtn.textContent = '⏸ Pause';
    }
});
```

**HTML**:
```html
<button id="play-pause-btn">▶ Play</button>
```

---

### Example 1.2: Get Current Vibe Information

**Use Case**: Display the current vibe name to users

```javascript
window.addEventListener('VibezModeReady', () => {
    const vibeName = window.VibezMode.getVibe();
    const duration = window.VibezMode.getDuration();
    
    console.log(`Currently playing: ${vibeName}`);
    console.log(`Duration: ${Math.floor(duration / 60)} minutes`);
    
    // Update UI
    document.getElementById('current-vibe').textContent = vibeName;
});
```

**HTML**:
```html
<p>Now playing: <span id="current-vibe">Loading...</span></p>
```

---

### Example 1.3: Play Specific Vibe

**Use Case**: Create buttons to switch between different vibes

```javascript
const vibes = ['calm', 'focus', 'uplift', 'bold', 'earth', 'luxury', 'playful'];

vibes.forEach(vibe => {
    const btn = document.getElementById(`vibe-${vibe}`);
    btn.addEventListener('click', () => {
        // Note: You would need to load the specific vibe script
        // This example assumes you have a way to switch vibes
        console.log(`Switching to ${vibe} vibe`);
        window.VibezMode.play();
    });
});
```

**HTML**:
```html
<div class="vibe-buttons">
    <button id="vibe-calm">Calm</button>
    <button id="vibe-focus">Focus</button>
    <button id="vibe-uplift">Uplift</button>
    <button id="vibe-bold">Bold</button>
    <button id="vibe-earth">Earth</button>
    <button id="vibe-luxury">Luxury</button>
    <button id="vibe-playful">Playful</button>
</div>
```

---

## Volume & Playback Management

### Example 2.1: Volume Slider Control

**Use Case**: Add a slider for users to adjust volume

```javascript
const volumeSlider = document.getElementById('volume-slider');
const volumeDisplay = document.getElementById('volume-display');

// Set initial volume
window.addEventListener('VibezModeReady', () => {
    const currentVolume = window.VibezMode.getVolume();
    volumeSlider.value = currentVolume;
    volumeDisplay.textContent = `${currentVolume}%`;
});

// Update volume when slider changes
volumeSlider.addEventListener('input', (e) => {
    const volume = parseInt(e.target.value);
    window.VibezMode.setVolume(volume);
    volumeDisplay.textContent = `${volume}%`;
});
```

**HTML**:
```html
<div class="volume-control">
    <label for="volume-slider">Volume:</label>
    <input type="range" id="volume-slider" min="0" max="100" value="50">
    <span id="volume-display">50%</span>
</div>
```

**CSS**:
```css
.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
}

#volume-slider {
    width: 200px;
}
```

---

### Example 2.2: Mute/Unmute Button

**Use Case**: Quick mute toggle without losing current volume

```javascript
let previousVolume = 50;
const muteBtn = document.getElementById('mute-btn');

muteBtn.addEventListener('click', () => {
    const currentVolume = window.VibezMode.getVolume();
    
    if (currentVolume > 0) {
        previousVolume = currentVolume;
        window.VibezMode.setVolume(0);
        muteBtn.textContent = '🔊 Unmute';
        muteBtn.classList.add('muted');
    } else {
        window.VibezMode.setVolume(previousVolume);
        muteBtn.textContent = '🔇 Mute';
        muteBtn.classList.remove('muted');
    }
});
```

**HTML**:
```html
<button id="mute-btn">🔇 Mute</button>
```

---

### Example 2.3: Playback Progress Display

**Use Case**: Show current playback time and total duration

```javascript
function updatePlaybackProgress() {
    const currentTime = window.VibezMode.getCurrentTime();
    const duration = window.VibezMode.getDuration();
    
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    
    const timeDisplay = `${currentMinutes}:${String(currentSeconds).padStart(2, '0')} / ${durationMinutes}:${String(durationSeconds).padStart(2, '0')}`;
    
    document.getElementById('playback-time').textContent = timeDisplay;
    
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
}

// Update every 500ms
setInterval(updatePlaybackProgress, 500);
```

**HTML**:
```html
<div class="playback-info">
    <div class="progress-container">
        <div id="progress-bar" class="progress-bar"></div>
    </div>
    <span id="playback-time">0:00 / 0:00</span>
</div>
```

**CSS**:
```css
.progress-container {
    width: 100%;
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-bar {
    height: 100%;
    background-color: #667eea;
    width: 0%;
    transition: width 0.1s linear;
}
```

---

## Analytics Integration

### Example 3.1: Track Custom Events

**Use Case**: Log user interactions with your website

```javascript
// Track when user clicks a product
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const productName = card.getAttribute('data-product-name');
        
        window.VibezModeAnalytics.trackEvent('product_clicked', {
            productName: productName,
            timestamp: Date.now(),
            vibe: window.VibezMode.getVibe()
        });
    });
});
```

---

### Example 3.2: Create Analytics Dashboard

**Use Case**: Display real-time analytics in your admin panel

```javascript
function displayAnalyticsDashboard() {
    const events = window.VibezModeAnalytics.getEvents();
    const stats = window.VibezModeAnalytics.getStatistics();
    
    // Update dashboard elements
    document.getElementById('total-events').textContent = events.length;
    document.getElementById('page-loads').textContent = stats.pageLoads || 0;
    document.getElementById('total-plays').textContent = stats.totalPlays || 0;
    document.getElementById('avg-session').textContent = 
        `${Math.floor((stats.avgSessionDuration || 0) / 1000)}s`;
    
    // Display event breakdown by type
    const eventCounts = {};
    events.forEach(event => {
        eventCounts[event.name] = (eventCounts[event.name] || 0) + 1;
    });
    
    const eventList = document.getElementById('event-breakdown');
    eventList.innerHTML = Object.entries(eventCounts)
        .map(([name, count]) => `<li>${name}: ${count}</li>`)
        .join('');
}

// Update dashboard every 5 seconds
setInterval(displayAnalyticsDashboard, 5000);
```

**HTML**:
```html
<div class="analytics-dashboard">
    <div class="stat-card">
        <h3>Total Events</h3>
        <p id="total-events">0</p>
    </div>
    <div class="stat-card">
        <h3>Page Loads</h3>
        <p id="page-loads">0</p>
    </div>
    <div class="stat-card">
        <h3>Total Plays</h3>
        <p id="total-plays">0</p>
    </div>
    <div class="stat-card">
        <h3>Avg Session</h3>
        <p id="avg-session">0s</p>
    </div>
    <div class="event-breakdown">
        <h3>Event Breakdown</h3>
        <ul id="event-breakdown"></ul>
    </div>
</div>
```

---

### Example 3.3: Export Analytics Data

**Use Case**: Download analytics for external analysis

```javascript
function exportAnalyticsAsJSON() {
    const events = window.VibezModeAnalytics.getEvents();
    const stats = window.VibezModeAnalytics.getStatistics();
    
    const data = {
        exportDate: new Date().toISOString(),
        statistics: stats,
        events: events
    };
    
    // Create blob and download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibezmode-analytics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Attach to button
document.getElementById('export-btn').addEventListener('click', exportAnalyticsAsJSON);
```

**HTML**:
```html
<button id="export-btn">📥 Export Analytics</button>
```

---

### Example 3.4: Track User Engagement Score

**Use Case**: Calculate engagement based on playback and interactions

```javascript
function calculateEngagementScore() {
    const events = window.VibezModeAnalytics.getEvents();
    
    let score = 0;
    const eventWeights = {
        'playback': 10,
        'volume_change': 5,
        'playback_completed': 20,
        'player_opened': 3
    };
    
    events.forEach(event => {
        score += eventWeights[event.name] || 0;
    });
    
    return score;
}

// Display engagement score
function displayEngagementScore() {
    const score = calculateEngagementScore();
    const level = score < 50 ? 'Low' : score < 150 ? 'Medium' : 'High';
    
    document.getElementById('engagement-score').textContent = score;
    document.getElementById('engagement-level').textContent = level;
}

displayEngagementScore();
```

**HTML**:
```html
<div class="engagement-card">
    <h3>Engagement Score</h3>
    <p id="engagement-score">0</p>
    <p>Level: <span id="engagement-level">Low</span></p>
</div>
```

---

## A/B Testing

### Example 4.1: Basic A/B Test Setup

**Use Case**: Test two different vibes to see which performs better

```javascript
window.addEventListener('VibezModeReady', () => {
    const testId = window.VibezModeAB.getTestId();
    const variant = window.VibezModeAB.getVariant();
    
    console.log(`Test ID: ${testId}`);
    console.log(`Assigned Variant: ${variant}`);
    
    // Apply variant-specific styling
    if (variant === 'A') {
        document.body.classList.add('variant-a');
    } else {
        document.body.classList.add('variant-b');
    }
});
```

**CSS**:
```css
body.variant-a {
    /* Styling for variant A */
}

body.variant-b {
    /* Styling for variant B */
}
```

---

### Example 4.2: Track Variant Performance

**Use Case**: Monitor which variant has better engagement

```javascript
function trackVariantPerformance() {
    const variant = window.VibezModeAB.getVariant();
    const events = window.VibezModeAnalytics.getEvents();
    
    // Count plays for this variant
    const plays = events.filter(e => e.name === 'playback').length;
    
    // Track conversion (e.g., purchase, signup)
    document.addEventListener('conversion', () => {
        window.VibezModeAnalytics.trackEvent('conversion', {
            variant: variant,
            timestamp: Date.now()
        });
    });
    
    return {
        variant: variant,
        plays: plays,
        conversionRate: calculateConversionRate(variant)
    };
}

function calculateConversionRate(variant) {
    const events = window.VibezModeAnalytics.getEvents();
    const variantEvents = events.filter(e => e.variant === variant);
    const conversions = variantEvents.filter(e => e.name === 'conversion').length;
    
    return variantEvents.length > 0 ? (conversions / variantEvents.length) * 100 : 0;
}
```

---

### Example 4.3: Get A/B Test Results

**Use Case**: Display test results in your admin dashboard

```javascript
function displayABTestResults() {
    const results = window.VibezModeAB.getResults();
    
    const resultsDiv = document.getElementById('ab-results');
    resultsDiv.innerHTML = `
        <h3>A/B Test Results</h3>
        <table>
            <tr>
                <th>Variant</th>
                <th>Plays</th>
                <th>Conversions</th>
                <th>Conversion Rate</th>
            </tr>
            ${Object.entries(results).map(([variant, data]) => `
                <tr>
                    <td>${variant}</td>
                    <td>${data.plays || 0}</td>
                    <td>${data.conversions || 0}</td>
                    <td>${((data.conversionRate || 0) * 100).toFixed(2)}%</td>
                </tr>
            `).join('')}
        </table>
    `;
}

displayABTestResults();
```

**HTML**:
```html
<div id="ab-results"></div>
```

---

## Custom UI Controls

### Example 5.1: Custom Player Widget

**Use Case**: Create a branded custom player interface

```javascript
class CustomVibezPlayer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }
    
    init() {
        window.addEventListener('VibezModeReady', () => {
            this.render();
            this.attachListeners();
        });
    }
    
    render() {
        this.container.innerHTML = `
            <div class="custom-player">
                <div class="player-header">
                    <h3 id="vibe-name">Loading...</h3>
                </div>
                <div class="player-controls">
                    <button id="play-btn" class="control-btn">▶</button>
                    <button id="pause-btn" class="control-btn">⏸</button>
                </div>
                <div class="player-volume">
                    <input type="range" id="volume-control" min="0" max="100" value="50">
                </div>
                <div class="player-progress">
                    <div id="progress-fill" class="progress-fill"></div>
                </div>
            </div>
        `;
    }
    
    attachListeners() {
        document.getElementById('play-btn').addEventListener('click', () => {
            window.VibezMode.play();
        });
        
        document.getElementById('pause-btn').addEventListener('click', () => {
            window.VibezMode.pause();
        });
        
        document.getElementById('volume-control').addEventListener('input', (e) => {
            window.VibezMode.setVolume(e.target.value);
        });
        
        // Update vibe name
        document.getElementById('vibe-name').textContent = 
            window.VibezMode.getVibe().toUpperCase();
    }
}

// Initialize
const player = new CustomVibezPlayer('custom-player-container');
```

**HTML**:
```html
<div id="custom-player-container"></div>
```

**CSS**:
```css
.custom-player {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    padding: 20px;
    color: white;
    max-width: 300px;
}

.player-header h3 {
    margin: 0 0 15px 0;
    font-size: 16px;
}

.player-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

.control-btn {
    flex: 1;
    padding: 10px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-size: 18px;
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.player-volume input {
    width: 100%;
    margin-bottom: 15px;
}

.player-progress {
    background: rgba(255, 255, 255, 0.2);
    height: 4px;
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: white;
    width: 0%;
}
```

---

### Example 5.2: Floating Mini Player

**Use Case**: Add a compact floating player in the corner

```javascript
class FloatingMiniPlayer {
    constructor() {
        this.isMinimized = false;
        this.init();
    }
    
    init() {
        window.addEventListener('VibezModeReady', () => {
            this.create();
        });
    }
    
    create() {
        const player = document.createElement('div');
        player.id = 'floating-mini-player';
        player.innerHTML = `
            <div class="mini-player-header">
                <span class="mini-player-title">🎵 VibezMode</span>
                <button class="mini-player-minimize">−</button>
            </div>
            <div class="mini-player-content">
                <button class="mini-play-btn">▶</button>
                <input type="range" class="mini-volume" min="0" max="100" value="50">
            </div>
        `;
        
        document.body.appendChild(player);
        this.attachListeners(player);
    }
    
    attachListeners(player) {
        player.querySelector('.mini-play-btn').addEventListener('click', () => {
            window.VibezMode.isPlaying() ? 
                window.VibezMode.pause() : 
                window.VibezMode.play();
        });
        
        player.querySelector('.mini-volume').addEventListener('input', (e) => {
            window.VibezMode.setVolume(e.target.value);
        });
        
        player.querySelector('.mini-player-minimize').addEventListener('click', () => {
            this.toggleMinimize(player);
        });
    }
    
    toggleMinimize(player) {
        this.isMinimized = !this.isMinimized;
        player.classList.toggle('minimized');
    }
}

const floatingPlayer = new FloatingMiniPlayer();
```

**CSS**:
```css
#floating-mini-player {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    min-width: 250px;
}

.mini-player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #667eea;
    color: white;
    border-radius: 12px 12px 0 0;
}

.mini-player-minimize {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 18px;
}

.mini-player-content {
    padding: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.mini-play-btn {
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    cursor: pointer;
}

.mini-volume {
    flex: 1;
}

#floating-mini-player.minimized .mini-player-content {
    display: none;
}
```

---

## Event Handling

### Example 6.1: Listen to Playback Events

**Use Case**: React to when music starts, stops, or completes

```javascript
// When music starts playing
window.addEventListener('VibezModePlay', () => {
    console.log('Music started playing');
    document.body.classList.add('music-playing');
});

// When music pauses
window.addEventListener('VibezModePause', () => {
    console.log('Music paused');
    document.body.classList.remove('music-playing');
});

// When music completes
window.addEventListener('VibezModeComplete', () => {
    console.log('Music finished');
    // Show completion message
    showNotification('Music finished! Enjoy the vibes.');
});

// When player is ready
window.addEventListener('VibezModeReady', () => {
    console.log('VibezMode is ready');
    // Initialize your custom controls
});
```

---

### Example 6.2: Create Event Logger

**Use Case**: Log all VibezMode events for debugging

```javascript
class VibezEventLogger {
    constructor() {
        this.events = [];
        this.init();
    }
    
    init() {
        const eventNames = ['VibezModePlay', 'VibezModePause', 'VibezModeComplete', 'VibezModeReady'];
        
        eventNames.forEach(eventName => {
            window.addEventListener(eventName, (e) => {
                this.logEvent(eventName, e);
            });
        });
    }
    
    logEvent(name, event) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            eventName: name,
            details: {
                isPlaying: window.VibezMode.isPlaying(),
                currentVibe: window.VibezMode.getVibe(),
                volume: window.VibezMode.getVolume()
            }
        };
        
        this.events.push(logEntry);
        console.log(`[VibezMode Event] ${name}`, logEntry);
        
        // Keep only last 100 events
        if (this.events.length > 100) {
            this.events.shift();
        }
    }
    
    getEventLog() {
        return this.events;
    }
}

const logger = new VibezEventLogger();
```

---

### Example 6.3: Trigger Actions on Volume Change

**Use Case**: Update UI or analytics when volume changes

```javascript
let lastVolume = 50;

window.addEventListener('VibezModeVolumeChange', (e) => {
    const currentVolume = window.VibezMode.getVolume();
    
    // Track volume changes in analytics
    if (currentVolume !== lastVolume) {
        window.VibezModeAnalytics.trackEvent('volume_adjusted', {
            previousVolume: lastVolume,
            newVolume: currentVolume,
            timestamp: Date.now()
        });
        
        // Update UI
        document.getElementById('volume-display').textContent = `${currentVolume}%`;
        
        lastVolume = currentVolume;
    }
});
```

---

## Configuration & Customization

### Example 7.1: Set Custom Configuration

**Use Case**: Configure VibezMode before loading

```javascript
// Set configuration before VibezMode script loads
window.VibezModeConfig = {
    vibe: 'calm',
    playerPosition: 'bottom-right',
    playerSize: 'medium',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    autoplay: false,
    volume: 50,
    enableAnalytics: true,
    enableABTesting: true
};

// Then load the VibezMode script
const script = document.createElement('script');
script.src = 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js';
document.body.appendChild(script);
```

---

### Example 7.2: Dynamic Configuration Based on User Type

**Use Case**: Apply different settings for different user segments

```javascript
function configureVibezModeForUser(userType) {
    const configs = {
        'premium': {
            playerPosition: 'top-right',
            playerSize: 'large',
            enableAnalytics: true,
            enableABTesting: true
        },
        'free': {
            playerPosition: 'bottom-right',
            playerSize: 'small',
            enableAnalytics: true,
            enableABTesting: false
        },
        'guest': {
            playerPosition: 'bottom-center',
            playerSize: 'small',
            enableAnalytics: false,
            enableABTesting: false
        }
    };
    
    window.VibezModeConfig = configs[userType] || configs['guest'];
}

// Use based on your authentication system
const userType = getCurrentUserType(); // Your function
configureVibezModeForUser(userType);
```

---

### Example 7.3: Customize Player Colors

**Use Case**: Match player colors to your brand

```javascript
function customizePlayerColors(primaryColor, secondaryColor) {
    const style = document.createElement('style');
    style.textContent = `
        .vibezmode-player {
            background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
        }
        
        .vibezmode-player button:hover {
            background: rgba(255, 255, 255, 0.2) !important;
        }
        
        .vibezmode-player .progress-bar {
            background: ${primaryColor} !important;
        }
    `;
    
    document.head.appendChild(style);
}

// Apply your brand colors
customizePlayerColors('#FF6B6B', '#FF8E72');
```

---

## Advanced Patterns

### Example 8.1: Session Management

**Use Case**: Track user sessions and session duration

```javascript
class VibezSessionManager {
    constructor() {
        this.sessionStart = Date.now();
        this.sessionId = this.generateSessionId();
        this.init();
    }
    
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    init() {
        window.addEventListener('VibezModeReady', () => {
            this.trackSessionStart();
        });
        
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });
    }
    
    trackSessionStart() {
        window.VibezModeAnalytics.trackEvent('session_start', {
            sessionId: this.sessionId,
            timestamp: Date.now()
        });
    }
    
    trackSessionEnd() {
        const sessionDuration = Date.now() - this.sessionStart;
        window.VibezModeAnalytics.trackEvent('session_end', {
            sessionId: this.sessionId,
            duration: sessionDuration,
            timestamp: Date.now()
        });
    }
    
    getSessionDuration() {
        return Date.now() - this.sessionStart;
    }
}

const sessionManager = new VibezSessionManager();
```

---

### Example 8.2: Conditional Player Display

**Use Case**: Show/hide player based on page conditions

```javascript
class ConditionalPlayerManager {
    init() {
        window.addEventListener('VibezModeReady', () => {
            this.checkPageConditions();
        });
    }
    
    checkPageConditions() {
        // Hide player on checkout page
        if (window.location.pathname.includes('/checkout')) {
            window.VibezMode.hidePlayer();
            return;
        }
        
        // Hide player for mobile users
        if (window.innerWidth < 768) {
            window.VibezMode.hidePlayer();
            return;
        }
        
        // Show player for all other cases
        window.VibezMode.showPlayer();
    }
}

const playerManager = new ConditionalPlayerManager();
playerManager.init();
```

---

### Example 8.3: Multi-Vibe Rotation

**Use Case**: Rotate through different vibes throughout the day

```javascript
class VibezRotationManager {
    constructor() {
        this.vibes = ['calm', 'focus', 'uplift', 'bold', 'earth', 'luxury', 'playful'];
        this.currentVibeIndex = 0;
        this.rotationInterval = 60 * 60 * 1000; // 1 hour
        this.init();
    }
    
    init() {
        window.addEventListener('VibezModeReady', () => {
            this.startRotation();
        });
    }
    
    startRotation() {
        setInterval(() => {
            this.rotateVibe();
        }, this.rotationInterval);
    }
    
    rotateVibe() {
        this.currentVibeIndex = (this.currentVibeIndex + 1) % this.vibes.length;
        const nextVibe = this.vibes[this.currentVibeIndex];
        
        console.log(`Rotating to ${nextVibe} vibe`);
        
        // Track rotation in analytics
        window.VibezModeAnalytics.trackEvent('vibe_rotated', {
            newVibe: nextVibe,
            timestamp: Date.now()
        });
    }
}

const rotationManager = new VibezRotationManager();
```

---

## Error Handling

### Example 9.1: Graceful Error Handling

**Use Case**: Handle errors without breaking your website

```javascript
function safeVibezModeCall(callback) {
    try {
        if (window.VibezMode) {
            callback();
        } else {
            console.warn('VibezMode not loaded yet');
            window.addEventListener('VibezModeReady', callback);
        }
    } catch (error) {
        console.error('VibezMode error:', error);
        // Fallback behavior
    }
}

// Usage
safeVibezModeCall(() => {
    window.VibezMode.play();
});
```

---

### Example 9.2: Playback Error Recovery

**Use Case**: Retry playback if it fails

```javascript
async function playWithRetry(maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            await window.VibezMode.play();
            console.log('Playback successful');
            return true;
        } catch (error) {
            console.warn(`Playback attempt ${i + 1} failed:`, error);
            
            if (i < maxRetries - 1) {
                // Wait 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    
    console.error('Playback failed after all retries');
    return false;
}

// Usage
playWithRetry();
```

---

### Example 9.3: Analytics Error Handling

**Use Case**: Handle analytics failures gracefully

```javascript
function trackEventSafely(eventName, data) {
    try {
        if (window.VibezModeAnalytics) {
            window.VibezModeAnalytics.trackEvent(eventName, data);
        }
    } catch (error) {
        console.warn(`Failed to track event "${eventName}":`, error);
        // Continue execution - don't break the app
    }
}

// Usage
trackEventSafely('user_interaction', {
    action: 'click',
    timestamp: Date.now()
});
```

---

## Performance Optimization

### Example 10.1: Debounce Volume Changes

**Use Case**: Optimize performance when volume slider is adjusted frequently

```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

const debouncedVolumeChange = debounce((volume) => {
    window.VibezMode.setVolume(volume);
    window.VibezModeAnalytics.trackEvent('volume_changed', { volume });
}, 300);

document.getElementById('volume-slider').addEventListener('input', (e) => {
    debouncedVolumeChange(e.target.value);
});
```

---

### Example 10.2: Lazy Load Analytics

**Use Case**: Defer analytics initialization until needed

```javascript
class LazyAnalyticsLoader {
    constructor() {
        this.analyticsLoaded = false;
    }
    
    ensureAnalyticsLoaded() {
        if (!this.analyticsLoaded && window.VibezModeAnalytics) {
            this.analyticsLoaded = true;
            return true;
        }
        return false;
    }
    
    trackEvent(name, data) {
        if (this.ensureAnalyticsLoaded()) {
            window.VibezModeAnalytics.trackEvent(name, data);
        }
    }
}

const lazyAnalytics = new LazyAnalyticsLoader();
```

---

### Example 10.3: Cache Configuration

**Use Case**: Cache VibezMode configuration to avoid repeated lookups

```javascript
class VibezConfigCache {
    constructor() {
        this.cache = null;
    }
    
    getConfig() {
        if (!this.cache) {
            this.cache = window.VibezMode.getConfig();
        }
        return this.cache;
    }
    
    updateCache() {
        this.cache = window.VibezMode.getConfig();
    }
}

const configCache = new VibezConfigCache();
```

---

## Quick Reference

### Common Patterns

| Task | Method | Example |
|------|--------|---------|
| Play music | `window.VibezMode.play()` | `window.VibezMode.play()` |
| Pause music | `window.VibezMode.pause()` | `window.VibezMode.pause()` |
| Check if playing | `window.VibezMode.isPlaying()` | `if (window.VibezMode.isPlaying()) { ... }` |
| Set volume | `window.VibezMode.setVolume(50)` | `window.VibezMode.setVolume(50)` |
| Get volume | `window.VibezMode.getVolume()` | `const vol = window.VibezMode.getVolume()` |
| Get current vibe | `window.VibezMode.getVibe()` | `const vibe = window.VibezMode.getVibe()` |
| Track event | `window.VibezModeAnalytics.trackEvent(name, data)` | `window.VibezModeAnalytics.trackEvent('play', {})` |
| Get events | `window.VibezModeAnalytics.getEvents()` | `const events = window.VibezModeAnalytics.getEvents()` |
| Export events | `window.VibezModeAnalytics.exportEvents()` | `const json = window.VibezModeAnalytics.exportEvents()` |

---

## Support & Resources

- **API Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Customization Guide**: [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Developer Quick Reference**: [DEVELOPER_QUICK_REFERENCE.md](DEVELOPER_QUICK_REFERENCE.md)
- **GitHub Repository**: [trendycahedecor25/Vibezmode](https://github.com/trendycahedecor25/Vibezmode)

---

**Last Updated**: February 6, 2026  
**Version**: 1.0.0  
**Status**: Complete and Ready for Use
