# VibezMode Customization Guide

**Version**: 1.0.0  
**Last Updated**: February 5, 2026  
**Status**: Complete

---

## Table of Contents

1. [Overview](#overview)
2. [Player Positioning](#player-positioning)
3. [Player Sizing](#player-sizing)
4. [Color Customization](#color-customization)
5. [Advanced Styling](#advanced-styling)
6. [Behavior Configuration](#behavior-configuration)
7. [CSS Customization](#css-customization)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)

---

## Overview

VibezMode provides extensive customization options to match your brand identity. You can customize:

- **Player Position**: Where the player appears on your page
- **Player Size**: How large the player UI is
- **Colors**: Match your brand colors
- **Behavior**: Auto-play, looping, default volume
- **Styling**: Custom CSS for advanced customization

All customization is done through configuration options or CSS overrides.

---

## Player Positioning

### Built-in Positions

VibezMode supports four standard positions:

```javascript
window.VibezModeConfig = {
    playerPosition: 'bottom-right'  // Default
};
```

### Available Positions

| Position | Description |
|----------|-------------|
| `bottom-right` | Bottom right corner (default) |
| `bottom-left` | Bottom left corner |
| `top-right` | Top right corner |
| `top-left` | Top left corner |

### Examples

```html
<!-- Bottom right (default) -->
<script>
    window.VibezModeConfig = {
        playerPosition: 'bottom-right'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>

<!-- Top left -->
<script>
    window.VibezModeConfig = {
        playerPosition: 'top-left'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

### Custom Positioning with CSS

For more control, use CSS to position the player:

```css
/* Position player at a custom location */
.vibezmode-player {
    bottom: 30px !important;
    right: 30px !important;
}

/* Center the player */
.vibezmode-player {
    left: 50% !important;
    bottom: 20px !important;
    transform: translateX(-50%);
}

/* Fixed position at top */
.vibezmode-player {
    top: 20px !important;
    right: 20px !important;
    bottom: auto !important;
}
```

---

## Player Sizing

### Built-in Sizes

VibezMode supports three standard sizes:

```javascript
window.VibezModeConfig = {
    playerSize: 'medium'  // Default
};
```

### Available Sizes

| Size | Description | Typical Use |
|------|-------------|------------|
| `small` | Compact player | Mobile, minimal UI |
| `medium` | Standard player | Most websites (default) |
| `large` | Expanded player | Desktop, prominent display |

### Examples

```html
<!-- Small player -->
<script>
    window.VibezModeConfig = {
        playerSize: 'small'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>

<!-- Large player -->
<script>
    window.VibezModeConfig = {
        playerSize: 'large'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

### Custom Sizing with CSS

```css
/* Make player smaller */
.vibezmode-player {
    width: 60px !important;
    height: 60px !important;
}

/* Make player larger */
.vibezmode-player {
    width: 120px !important;
    height: 120px !important;
}

/* Adjust button sizes */
.vibezmode-player button {
    width: 40px !important;
    height: 40px !important;
    font-size: 18px !important;
}
```

---

## Color Customization

### Vibe Colors

Each vibe has a default color scheme:

| Vibe | Primary Color | Secondary Color |
|------|---------------|-----------------|
| Calm | #FFC0CB (Pink) | #40E0D0 (Turquoise) |
| Focus | #E0E0E0 (Gray) | #00CED1 (Cyan) |
| Uplift | #4ECDC4 (Teal) | #F7DC6F (Yellow) |
| Bold | #FFB3BA (Red) | #BAE1FF (Blue) |
| Earth | #9CAF88 (Green) | #83C5BE (Teal) |
| Luxury | #D4AF37 (Gold) | #1a1a1a (Black) |
| Playful | #FF69B4 (Pink) | #00FF00 (Green) |

### Customizing Colors with CSS

```css
/* Override player background color */
.vibezmode-player {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* Override button colors */
.vibezmode-player button {
    background-color: #667eea !important;
    color: white !important;
}

/* Override hover state */
.vibezmode-player button:hover {
    background-color: #764ba2 !important;
}

/* Custom text color */
.vibezmode-player .vibezmode-label {
    color: #333 !important;
}
```

### Brand Color Integration

```html
<style>
    :root {
        --brand-primary: #667eea;
        --brand-secondary: #764ba2;
        --brand-text: #1a1a1a;
    }

    .vibezmode-player {
        background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%) !important;
    }

    .vibezmode-player button {
        color: var(--brand-text) !important;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'calm'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

---

## Advanced Styling

### Player Container

```css
/* Customize player container */
.vibezmode-player {
    border-radius: 50% !important;  /* Circular player */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
    backdrop-filter: blur(10px) !important;
}

/* Add border */
.vibezmode-player {
    border: 3px solid #667eea !important;
}

/* Add animation */
.vibezmode-player {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}
```

### Player Icons

```css
/* Customize play/pause icon */
.vibezmode-player .play-icon::before {
    content: "▶" !important;
    font-size: 20px !important;
}

/* Customize volume icon */
.vibezmode-player .volume-icon::before {
    content: "🔊" !important;
}

/* Customize close icon */
.vibezmode-player .close-icon::before {
    content: "✕" !important;
}
```

### Expanded Player

```css
/* Customize expanded player view */
.vibezmode-player.expanded {
    width: 300px !important;
    height: 400px !important;
    border-radius: 15px !important;
}

/* Customize player title */
.vibezmode-player .vibezmode-title {
    font-size: 18px !important;
    font-weight: bold !important;
    color: white !important;
}

/* Customize player description */
.vibezmode-player .vibezmode-description {
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.8) !important;
}
```

---

## Behavior Configuration

### Auto-Play Configuration

```javascript
window.VibezModeConfig = {
    autoplay: true,  // Auto-play on page load
    volume: 50       // Default volume
};
```

### Loop Configuration

```javascript
window.VibezModeConfig = {
    loop: true       // Loop audio when finished
};
```

### Muted Configuration

```javascript
window.VibezModeConfig = {
    muted: false     // Start unmuted (default)
};
```

### Full Configuration Example

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        siteId: 'my-website',
        enableAnalytics: true,
        autoplay: false,
        volume: 50,
        playerPosition: 'bottom-right',
        playerSize: 'medium',
        loop: true,
        muted: false
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

---

## CSS Customization

### Complete CSS Override Example

```html
<style>
    /* Player container */
    .vibezmode-player {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 9999;
    }

    /* Player hover state */
    .vibezmode-player:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
    }

    /* Player buttons */
    .vibezmode-player button {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    /* Button hover state */
    .vibezmode-player button:hover {
        transform: scale(1.2);
    }

    /* Player active state */
    .vibezmode-player.playing {
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }
        50% {
            box-shadow: 0 4px 30px rgba(102, 126, 234, 0.8);
        }
    }

    /* Expanded view */
    .vibezmode-player.expanded {
        width: 300px;
        height: auto;
        border-radius: 15px;
        padding: 20px;
    }

    /* Player title */
    .vibezmode-player .vibezmode-title {
        font-size: 18px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
    }

    /* Player controls */
    .vibezmode-player .vibezmode-controls {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 15px;
    }

    /* Volume slider */
    .vibezmode-player input[type="range"] {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.3);
        outline: none;
    }

    .vibezmode-player input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
    }

    .vibezmode-player input[type="range"]::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
        border: none;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        playerPosition: 'bottom-right',
        playerSize: 'medium'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

---

## Examples

### Example 1: Minimal Player

```html
<style>
    .vibezmode-player {
        width: 50px !important;
        height: 50px !important;
        border-radius: 50% !important;
        background: #667eea !important;
        bottom: 20px !important;
        right: 20px !important;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        playerSize: 'small'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

### Example 2: Brand-Matched Player

```html
<style>
    :root {
        --brand-color: #FF6B6B;
        --brand-dark: #C92A2A;
    }

    .vibezmode-player {
        background: linear-gradient(135deg, var(--brand-color) 0%, var(--brand-dark) 100%) !important;
        border-radius: 15px !important;
        bottom: 30px !important;
        right: 30px !important;
    }

    .vibezmode-player button {
        color: white !important;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'uplift',
        playerSize: 'medium'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/uplift.js"></script>
```

### Example 3: Dark Mode Player

```html
<style>
    .vibezmode-player {
        background: #1a1a1a !important;
        border: 2px solid #333 !important;
        bottom: 30px !important;
        right: 30px !important;
    }

    .vibezmode-player button {
        color: #fff !important;
    }

    .vibezmode-player button:hover {
        background: #333 !important;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'focus',
        playerSize: 'medium'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/focus.js"></script>
```

### Example 4: Top Navigation Player

```html
<style>
    .vibezmode-player {
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        bottom: auto !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        z-index: 1000 !important;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        playerSize: 'small'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

### Example 5: Floating Animation Player

```html
<style>
    .vibezmode-player {
        animation: float 3s ease-in-out infinite !important;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    .vibezmode-player:hover {
        animation: none !important;
        transform: scale(1.1) !important;
    }
</style>

<script>
    window.VibezModeConfig = {
        vibe: 'uplift',
        playerSize: 'medium'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/uplift.js"></script>
```

---

## Troubleshooting

### CSS Not Applying

**Problem**: Custom CSS is not overriding VibezMode styles

**Solution**: Use `!important` flag:

```css
.vibezmode-player {
    background: #667eea !important;  /* Add !important */
}
```

---

### Player Position Not Changing

**Problem**: Player appears in wrong position

**Solution**: Check for conflicting CSS:

```css
/* Remove conflicting styles */
.vibezmode-player {
    position: fixed !important;
    bottom: 30px !important;
    right: 30px !important;
    left: auto !important;
    top: auto !important;
}
```

---

### Colors Not Matching

**Problem**: Colors look different than expected

**Solution**: Check browser color profiles and use hex codes:

```javascript
// Use consistent hex codes
window.VibezModeConfig = {
    vibe: 'calm'
};
```

---

### Responsive Issues

**Problem**: Player not responsive on mobile

**Solution**: Add media queries:

```css
/* Mobile customization */
@media (max-width: 768px) {
    .vibezmode-player {
        width: 60px !important;
        height: 60px !important;
        bottom: 15px !important;
        right: 15px !important;
    }
}

/* Tablet customization */
@media (max-width: 1024px) {
    .vibezmode-player {
        width: 70px !important;
        height: 70px !important;
    }
}
```

---

## Support

For additional help with customization:

- **Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **GitHub Issues**: https://github.com/trendycahedecor25/Vibezmode/issues
- **Email**: hello@vibezmode.com

---

**VibezMode Customization Guide © 2026**
