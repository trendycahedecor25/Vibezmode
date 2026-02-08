# VibezMode Troubleshooting & FAQ

**Version**: 1.0.0  
**Last Updated**: February 8, 2026  
**Status**: Complete

---

## Table of Contents

1. [Frequently Asked Questions](#frequently-asked-questions)
2. [Common Issues & Solutions](#common-issues--solutions)
3. [Browser Compatibility](#browser-compatibility)
4. [Mobile Issues](#mobile-issues)
5. [Analytics Issues](#analytics-issues)
6. [A/B Testing Issues](#ab-testing-issues)
7. [Getting Help](#getting-help)

---

## Frequently Asked Questions

### General Questions

**Q: What is VibezMode?**
A: VibezMode is an audio branding solution that adds curated background music to your website. It includes 7 unique vibes with 3 intensity modes each, for a total of 21 different audio experiences.

**Q: How much does VibezMode cost?**
A: VibezMode offers three pricing tiers:
- **Starter**: $29/month (1 vibe, 3 playlists)
- **Professional**: $79/month (3 vibes, analytics, A/B testing)
- **Agency**: $199/month (all 7 vibes, unlimited sites, white-label)

**Q: Is VibezMode free?**
A: The core VibezMode scripts are open-source and available for free on GitHub. Premium features and hosting may require a subscription.

**Q: How do I get started?**
A: 
1. Visit [vibezmode.com](https://vibezmode.com)
2. Choose your vibe
3. Copy the provided script tag
4. Paste it into your website's HTML before the closing `</body>` tag

**Q: Can I use VibezMode on multiple websites?**
A: Yes, with the Professional and Agency plans. The Starter plan is limited to one site.

### Technical Questions

**Q: What are the system requirements?**
A: VibezMode works on all modern browsers (Chrome, Firefox, Safari, Edge) and requires no external dependencies. It's just vanilla JavaScript.

**Q: How much bandwidth does VibezMode use?**
A: Each audio file is 3-5MB. Users only download audio when they click play, so bandwidth usage is minimal.

**Q: Can I customize the player appearance?**
A: Yes! You can customize colors, fonts, size, and position using the configuration options. See [CUSTOM_PLAYER_GENERATOR_GUIDE.md](CUSTOM_PLAYER_GENERATOR_GUIDE.md).

**Q: Does VibezMode track user data?**
A: By default, no. VibezMode respects user privacy. Analytics are opt-in and can be disabled in the configuration.

**Q: Is VibezMode GDPR compliant?**
A: Yes. VibezMode is designed to be GDPR compliant with privacy-first defaults. See [SEO_AND_PERFORMANCE_GUIDE.md](SEO_AND_PERFORMANCE_GUIDE.md) for privacy configuration.

---

## Common Issues & Solutions

### Issue: Player Not Appearing

**Symptoms**: The VibezMode player trigger button doesn't show up on the page.

**Solutions**:

1. **Check Script Loading**:
   ```html
   <!-- Verify the script is in your HTML -->
   <script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
   ```

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any error messages

3. **Verify Script URL**:
   - Ensure the URL is correct
   - Check that the vibe name matches (calm, focus, uplift, bold, earth, luxury, playful)

4. **Check for CSS Conflicts**:
   - Look for CSS that might hide the player (e.g., `display: none`)
   - Try using a different `playerPosition` in the config

5. **Debug Script**:
   ```javascript
   window.addEventListener('VibezModeReady', () => {
       console.log('VibezMode loaded successfully');
   });
   ```

---

### Issue: Audio Won't Play

**Symptoms**: Clicking the play button does nothing or shows an error.

**Solutions**:

1. **Check Browser Autoplay Policy**:
   - Modern browsers require user interaction before playing audio
   - This is a browser security feature, not a VibezMode issue
   - Solution: User must click the play button (they already do)

2. **Check Audio File URL**:
   ```javascript
   // Verify the audio file exists
   fetch('https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/music/calm.mp3')
       .then(r => console.log('Audio file found:', r.status))
       .catch(e => console.error('Audio file not found:', e));
   ```

3. **Check Browser Console for CORS Errors**:
   - If you see CORS errors, the audio file might be blocked
   - Solution: Use the official GitHub URLs or host files on your own server

4. **Check Volume**:
   ```javascript
   // Ensure volume is not 0
   window.VibezMode.setVolume(50);
   ```

5. **Try Different Vibe**:
   - Some audio files might be corrupted
   - Try a different vibe to isolate the issue

---

### Issue: Player Overlaps Other Content

**Symptoms**: The VibezMode player covers important page elements.

**Solutions**:

1. **Change Player Position**:
   ```javascript
   window.VibezModeConfig = {
       vibe: 'calm',
       playerPosition: 'bottom-left'  // Try different positions
   };
   ```

2. **Adjust Z-Index**:
   ```javascript
   window.VibezModeConfig = {
       vibe: 'calm',
       customCSS: `
           .vibez-player-trigger {
               z-index: 999 !important;  // Adjust as needed
           }
       `
   };
   ```

3. **Use Safe Area Insets** (for mobile):
   ```javascript
   window.VibezModeConfig = {
       vibe: 'calm',
       customCSS: `
           .vibez-player-trigger {
               bottom: calc(20px + env(safe-area-inset-bottom));
               right: calc(20px + env(safe-area-inset-right));
           }
       `
   };
   ```

---

### Issue: Slow Page Load

**Symptoms**: Adding VibezMode slows down page load time.

**Solutions**:

1. **Use Async Loading**:
   ```html
   <!-- Load script asynchronously -->
   <script async src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
   ```

2. **Use Defer Loading**:
   ```html
   <!-- Load script after page content -->
   <script defer src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
   ```

3. **Lazy Load Script**:
   ```javascript
   // Load script only when user interacts with page
   document.addEventListener('click', () => {
       const script = document.createElement('script');
       script.src = 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js';
       document.head.appendChild(script);
   }, { once: true });
   ```

---

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 12+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| iOS Safari | 12+ | ✅ Full Support |
| Chrome Mobile | Latest | ✅ Full Support |
| Samsung Internet | Latest | ✅ Full Support |

**Note**: Older browsers may not support some features. Test in your target browsers.

---

## Mobile Issues

### Issue: Player Too Large on Mobile

**Symptoms**: The player takes up too much screen space on small devices.

**Solution**: Use the mobile-optimized configuration:
```javascript
window.VibezModeConfig = {
    vibe: 'calm',
    playerSize: 'small'  // Smaller trigger button
};
```

### Issue: Player Overlaps Mobile Navigation

**Symptoms**: The player covers the bottom navigation bar on mobile.

**Solution**: Use safe area insets:
```javascript
window.VibezModeConfig = {
    vibe: 'calm',
    customCSS: `
        .vibez-player-trigger {
            bottom: calc(20px + env(safe-area-inset-bottom));
        }
    `
};
```

### Issue: Audio Doesn't Play on Mobile

**Symptoms**: Audio plays on desktop but not on mobile.

**Solution**: 
1. Check that user has interacted with the page first
2. Verify audio file is accessible
3. Try a different vibe
4. Check browser console for errors

---

## Analytics Issues

### Issue: Events Not Being Tracked

**Symptoms**: The analytics dashboard shows no data.

**Solutions**:

1. **Verify Analytics is Enabled**:
   ```javascript
   // Use analytics-enabled script
   // <script src="...v1/analytics-calm.js"></script>
   ```

2. **Check localStorage**:
   ```javascript
   // Verify data is stored
   const events = JSON.parse(localStorage.getItem('vibezmode_analytics') || '[]');
   console.log('Events:', events.length);
   ```

3. **Check Browser Settings**:
   - Verify localStorage is enabled
   - Check that cookies are not blocked
   - Disable privacy extensions temporarily

4. **Clear Old Data**:
   ```javascript
   // If storage is full, clear old events
   localStorage.removeItem('vibezmode_analytics');
   ```

### Issue: Analytics Data Disappears

**Symptoms**: Analytics data appears and then disappears.

**Solution**: This is normal behavior. localStorage has a size limit (usually 5-10MB). When the limit is reached, old data is automatically cleared.

---

## A/B Testing Issues

### Issue: All Users See Same Variant

**Symptoms**: A/B test is not working; all users are assigned to the same vibe.

**Solutions**:

1. **Verify A/B Testing Script is Loaded**:
   ```html
   <script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/ab-testing.js"></script>
   ```

2. **Check Configuration**:
   ```javascript
   window.VibezModeABConfig = {
       testId: 'my-test',
       variants: [
           { vibe: 'calm', weight: 1 },
           { vibe: 'focus', weight: 1 }
       ]
   };
   ```

3. **Clear localStorage**:
   ```javascript
   // A/B test assignment is cached in localStorage
   // Clear to get a new assignment
   localStorage.removeItem('vibezmode_ab_my-test');
   ```

### Issue: A/B Test Results Skewed

**Symptoms**: One variant has significantly more data than others.

**Solution**: This is normal. Different variants may have different play rates based on user preferences. Continue the test to gather more data.

---

## Getting Help

### Resources

- **Documentation**: https://github.com/trendycahedecor25/Vibezmode
- **GitHub Issues**: https://github.com/trendycahedecor25/Vibezmode/issues
- **Email Support**: hello@vibezmode.com
- **Website**: https://vibezmode.com

### How to Report a Bug

When reporting a bug, include:

1. **Description**: What happened?
2. **Steps to Reproduce**: How can we recreate the issue?
3. **Expected Behavior**: What should happen?
4. **Browser & OS**: What browser/OS are you using?
5. **Console Errors**: Any error messages in the browser console?
6. **Code Example**: Minimal code to reproduce the issue

### Example Bug Report

```
Title: Player not appearing on mobile Safari

Description:
The VibezMode player trigger button doesn't appear on my website when viewed on iPhone.

Steps to Reproduce:
1. Visit https://mywebsite.com on iPhone
2. Scroll to the bottom of the page
3. Player button should appear but doesn't

Expected Behavior:
The player trigger button should appear in the bottom-right corner.

Browser & OS:
Safari on iOS 15.2

Console Errors:
No errors in console

Code:
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

---

**VibezMode Troubleshooting & FAQ © 2026**  
Can't find your answer? Contact us at hello@vibezmode.com
