# VibezMode

**Transform your website with audio branding. 7 carefully curated vibes, 21 intensity modes—perfectly matched to your brand.**

VibezMode is a lightweight, easy-to-use audio branding solution that adds background music to your website in seconds. Enhance user experience, increase engagement, and create emotional connections with your audience through carefully curated soundscapes.

## Features

- **7 Unique Vibes**: Each with 3 distinct intensity modes, totaling 21 different audio experiences
- **Lightweight**: Only ~5KB minified JavaScript—no external dependencies
- **Easy Integration**: Copy and paste one line of code into your website
- **Cross-Platform**: Works with Shopify, WordPress, Squarespace, and custom websites
- **Fully Customizable**: Each vibe includes custom colors, fonts, and player styling
- **User Control**: Sticky player icon allows visitors to control volume and toggle music
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support
- **Mobile Optimized**: Fully responsive design works perfectly on all devices

## The 7 Vibes

### 🕯️ Calm & Cozy
Peaceful, warm, and inviting soundscapes perfect for wellness, spas, and meditation apps. Features soft piano, nature sounds, and lo-fi beats.

### 🎯 Focus & Flow
Energizing, clear, and productive audio designed for productivity tools, SaaS platforms, and educational content. Includes ambient tech and minimal beats.

### ✨ Uplift & Glow
Inspiring and uplifting music perfect for fitness, coaching, and motivational content. Features warm synth, uplifting strings, and motivational beats.

### 🎨 Bold & Creative
Artistic, vibrant, and expressive audio for agencies, galleries, and creative studios. Includes indie beats, jazz fusion, and experimental sounds.

### 🌿 Earth & Nature
Organic, grounded, and serene soundscapes for eco-brands, outdoor gear, and sustainable products. Features nature sounds, folk/acoustic, and ambient tones.

### 👑 Luxury & Chill
Sophisticated, elegant, and premium audio for high-end fashion, hotels, and premium services. Includes bossa nova, R&B, and deep house.

### 🎉 Playful & Fun
Energetic, joyful, and lively music for entertainment, toys, and youth-oriented brands. Features funk/disco, bubblegum pop, and dance tracks.

## Quick Start

### Installation

1. **Choose Your Vibe**: Visit [vibezmode.com](https://vibezmode.com) and select your preferred vibe
2. **Copy the Code**: Copy the provided script tag
3. **Paste Into Your Website**: Add the script before the closing `</body>` tag in your HTML
4. **Done!**: Refresh your page and hear your brand come to life

### Example Code

```html
<!-- Add this before your closing </body> tag -->
<script src="https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js"></script>
```

## How It Works

VibezMode works in three simple steps:

1. **Choose Your Vibe**: Pick from 7 vibes and 3 intensity modes that match your brand identity
2. **Add to Your Site**: Copy one line of code—works with any platform
3. **Visitors Hear Your Brand**: Background music starts after user permission, with a sticky player for volume control

## Browser Support

VibezMode works on all modern browsers:

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
Vibezmode/
├── index.html              # Landing page
├── README.md              # This file
├── CREDITS.md             # Credits and attributions
├── generate_scripts.py    # Script generator
├── music/                 # Audio files
│   ├── calm.mp3
│   ├── focus.mp3
│   ├── uplift.mp3
│   ├── bold.mp3
│   ├── earth.mp3
│   ├── luxury.mp3
│   └── playful.mp3
└── v1/                    # Generated JavaScript files
    ├── base.js
    ├── calm.js
    ├── focus.js
    ├── uplift.js
    ├── bold.js
    ├── earth.js
    ├── luxury.js
    └── playful.js
```

## Customization

### Generating Custom Scripts

If you want to create custom vibe scripts, use the provided Python script:

```bash
python3 generate_scripts.py
```

This will generate JavaScript files for all vibes in the `v1/` directory.

### Modifying Vibes

To add or modify vibes, edit `generate_scripts.py`:

```python
vibes = {
    'calm': '#FFC0CB',
    'focus': '#00CED1',
    # Add your custom vibes here
}
```

Then run the generator to create new scripts.

## Pricing

VibezMode offers three flexible pricing tiers:

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | $29/mo | 1 Vibe (3 modes), 3 playlists, Custom player, Brand colors |
| **Professional** | $79/mo | 3 Vibes (9 modes), Analytics, A/B testing, Priority support |
| **Agency** | $199/mo | All 7 Vibes (21 modes), Unlimited sites, White-label, API access |

## Credits & Attributions

VibezMode is built with care and powered by open-source technologies and curated audio experiences. See [CREDITS.md](CREDITS.md) for detailed attribution information.

### Key Contributors

- **Audio Production**: Professional composers and licensed music producers
- **Design & UX**: Accessibility-focused design team
- **Development**: Open-source JavaScript development
- **Community**: Beta testers and community contributors

## Technical Details

### Performance

- **Script Size**: ~5KB minified
- **Load Time**: <100ms
- **No Dependencies**: Pure vanilla JavaScript
- **Lazy Loading**: Audio loads on user interaction

### Security

- No tracking or analytics by default
- No personal data collection
- HTTPS-ready
- Content Security Policy compliant

### Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast color schemes

## Support & Feedback

### Getting Help

For questions, bug reports, or feature requests:

- **Email**: [hello@vibezmode.com](mailto:hello@vibezmode.com)
- **GitHub Issues**: [Report a bug](https://github.com/trendycahedecor25/Vibezmode/issues)
- **Website**: [vibezmode.com](https://vibezmode.com)

### Contributing

We welcome contributions from the community! Please see our GitHub repository for contribution guidelines.

## License

VibezMode is available under an open-source license. See LICENSE file for details.

All music is properly licensed for commercial use and web distribution.

## Changelog

### v1.0.0 (Current)
- Initial release
- 7 vibes with 3 modes each
- Lightweight JavaScript embed
- Professional landing page
- Comprehensive credits system
- Live preview feature
- Mobile-optimized design

## FAQ

**Q: Will the music work on mobile devices?**
A: Yes! VibezMode is fully responsive and works on all mobile browsers. Audio playback requires user interaction due to browser autoplay policies.

**Q: Can I customize the music?**
A: Currently, each vibe has a fixed audio track. Custom audio is available on the Agency plan.

**Q: Does VibezMode track user data?**
A: No. VibezMode respects user privacy and does not collect any personal data by default.

**Q: How much bandwidth does the audio use?**
A: Each audio file is approximately 3-5MB. Users only download audio when they click play.

**Q: Can I use VibezMode on multiple websites?**
A: Yes, with the Professional and Agency plans. The Starter plan is limited to one site.

**Q: What if users have autoplay disabled?**
A: Users will see the player and can manually click to start the music. This respects browser autoplay policies.

## Roadmap

Future features in development:

- Custom vibe creation
- Advanced analytics dashboard
- A/B testing capabilities
- API access for developers
- White-label solutions
- Integration with popular website builders

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 2026 | Initial release |

---

**VibezMode © 2026. All rights reserved.**

Transform your website with audio branding. [Get started today](https://vibezmode.com)!
