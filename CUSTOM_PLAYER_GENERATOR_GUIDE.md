# VibezMode Custom Player Generator Guide

**Version**: 1.0.0  
**Last Updated**: February 8, 2026  
**Status**: Complete

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Customization Options](#customization-options)
4. [Advanced Configuration](#advanced-configuration)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The VibezMode Custom Player Generator allows you to create fully branded, custom audio players for your website. Instead of using the default player UI, you can design a player that perfectly matches your brand identity.

### Key Features

- **Full Customization**: Colors, fonts, sizes, and layout
- **Multiple Themes**: Pre-built themes for different industries
- **Responsive Design**: Works perfectly on all devices
- **Analytics Ready**: Built-in support for tracking user interactions
- **Easy Integration**: Single script tag to embed

---

## Getting Started

### Step 1: Choose Your Vibe

First, decide which VibezMode vibe you want to use:

- **Calm & Cozy** - Perfect for wellness and meditation apps
- **Focus & Flow** - Ideal for productivity tools
- **Uplift & Glow** - Great for fitness and coaching
- **Bold & Creative** - Perfect for creative agencies
- **Earth & Nature** - Ideal for eco-brands
- **Luxury & Chill** - Perfect for premium services
- **Playful & Fun** - Great for entertainment

### Step 2: Define Your Branding

Gather the following information:

- **Primary Color**: Your brand's main color (hex code)
- **Secondary Color**: An accent color (hex code)
- **Font Family**: Your preferred font (e.g., 'Segoe UI', 'Arial')
- **Player Size**: Small, Medium, or Large
- **Player Position**: Where to place the player (bottom-right, bottom-left, top-right, top-left)

### Step 3: Generate Your Custom Player

Use the provided Python script to generate your custom player:

```bash
python3 generate_custom_player.py --vibe calm --primary "#667eea" --secondary "#764ba2" --font "Segoe UI" --size medium --position bottom-right
```

---

## Customization Options

### Color Customization

```javascript
// In your HTML, before loading the script:
window.VibezModeConfig = {
    vibe: 'calm',
    primaryColor: '#667eea',      // Main brand color
    secondaryColor: '#764ba2',    // Accent color
    textColor: '#333',            // Text color
    backgroundColor: '#fff'       // Background color
};
```

### Size Options

```javascript
window.VibezModeConfig = {
    playerSize: 'small'    // 40px trigger button
    // or
    playerSize: 'medium'   // 60px trigger button (default)
    // or
    playerSize: 'large'    // 80px trigger button
};
```

### Position Options

```javascript
window.VibezModeConfig = {
    playerPosition: 'bottom-right'   // Default
    // or
    playerPosition: 'bottom-left'
    // or
    playerPosition: 'top-right'
    // or
    playerPosition: 'top-left'
};
```

### Font Customization

```javascript
window.VibezModeConfig = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};
```

---

## Advanced Configuration

### Analytics Integration

```javascript
window.VibezModeConfig = {
    vibe: 'calm',
    enableAnalytics: true,
    siteId: 'my-website',
    trackCustomEvents: true
};
```

### A/B Testing

```javascript
window.VibezModeABConfig = {
    testId: 'vibe-comparison-1',
    variants: [
        { vibe: 'calm', weight: 1 },
        { vibe: 'focus', weight: 1 }
    ],
    enableAnalytics: true
};
```

### Custom Branding

```javascript
window.VibezModeConfig = {
    vibe: 'calm',
    brandName: 'My App',
    brandUrl: 'https://myapp.com',
    showBrandingLink: true,
    customCSS: `
        .vibez-panel {
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
    `
};
```

---

## Examples

### Example 1: Fitness App Player

```html
<script>
    window.VibezModeConfig = {
        vibe: 'uplift',
        primaryColor: '#FF6B6B',
        secondaryColor: '#FF8E72',
        playerSize: 'large',
        playerPosition: 'bottom-right',
        fontFamily: '"Poppins", sans-serif',
        brandName: 'FitFlow',
        siteId: 'fitflow-app'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-uplift.js"></script>
```

### Example 2: Meditation App Player

```html
<script>
    window.VibezModeConfig = {
        vibe: 'calm',
        primaryColor: '#9B7EBD',
        secondaryColor: '#C8B8E4',
        playerSize: 'medium',
        playerPosition: 'bottom-left',
        fontFamily: '"Lato", sans-serif',
        brandName: 'MindfulSpace',
        siteId: 'mindful-space'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-calm.js"></script>
```

### Example 3: Creative Agency Player

```html
<script>
    window.VibezModeConfig = {
        vibe: 'bold',
        primaryColor: '#FF1744',
        secondaryColor: '#F50057',
        playerSize: 'medium',
        playerPosition: 'top-right',
        fontFamily: '"Montserrat", sans-serif',
        brandName: 'Creative Studio',
        siteId: 'creative-studio'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-bold.js"></script>
```

### Example 4: E-commerce Store Player

```html
<script>
    window.VibezModeConfig = {
        vibe: 'luxury',
        primaryColor: '#D4AF37',
        secondaryColor: '#1a1a1a',
        playerSize: 'small',
        playerPosition: 'bottom-right',
        fontFamily: '"Playfair Display", serif',
        brandName: 'Luxury Goods Co.',
        siteId: 'luxury-store'
    };
</script>
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/analytics-luxury.js"></script>
```

---

## Troubleshooting

### Player Not Appearing

**Problem**: The player trigger button doesn't show up.

**Solution**: 
1. Check that the script is loaded correctly
2. Verify that `window.VibezModeConfig` is defined before the script tag
3. Check browser console for errors
4. Ensure the audio URL is accessible

```javascript
// Debug: Check if API is ready
window.addEventListener('VibezModeReady', () => {
    console.log('VibezMode is ready!');
});
```

### Colors Not Applying

**Problem**: Custom colors are not showing up.

**Solution**:
1. Ensure `primaryColor` and `secondaryColor` are valid hex codes
2. Check that the config is set before the script loads
3. Verify there are no CSS conflicts with other stylesheets

```javascript
// Verify config is loaded
console.log(window.VibezModeConfig);
```

### Audio Not Playing

**Problem**: The audio won't play when clicking the button.

**Solution**:
1. Check browser autoplay policies (may require user interaction)
2. Verify the audio URL is correct and accessible
3. Check browser console for CORS errors
4. Ensure the vibe audio file exists

### Analytics Not Tracking

**Problem**: Events are not being recorded.

**Solution**:
1. Verify `enableAnalytics: true` is set in config
2. Check that localStorage is not disabled
3. Check browser console for errors
4. Verify the analytics script is loaded (use `analytics-*.js` scripts)

---

## Best Practices

1. **Always Define Config Before Script**: Set `window.VibezModeConfig` before loading the VibezMode script.
2. **Use Analytics-Enabled Scripts**: For tracking user interactions, use the `analytics-*.js` scripts.
3. **Test on Mobile**: Always test your custom player on mobile devices to ensure proper sizing and positioning.
4. **Brand Consistency**: Use colors that match your brand guidelines.
5. **Monitor Performance**: Track analytics to understand how users interact with your custom player.

---

## Support

For questions or issues:

- **GitHub Issues**: https://github.com/trendycahedecor25/Vibezmode/issues
- **Email**: hello@vibezmode.com
- **Documentation**: https://github.com/trendycahedecor25/Vibezmode

---

**VibezMode Custom Player Generator © 2026**  
Transform your website with custom-branded audio experiences.
