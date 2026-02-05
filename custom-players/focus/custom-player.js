/**
 * VibezMode Custom Player
 * Generated: 2026-02-05T08:12:27.777238
 * Vibe: focus
 * Configuration: {
  "vibe": "focus",
  "player_position": "bottom-left",
  "player_size": "small",
  "primary_color": "#E0E0E0",
  "secondary_color": "#00CED1",
  "autoplay": false,
  "volume": 60,
  "enable_analytics": true,
  "site_id": "productivity-app",
  "custom_css": ".vibezmode-player { border-radius: 15px !important; }"
}
 */

(function() {
    // Configuration
    const config = {
        vibe: 'focus',
        siteId: 'productivity-app',
        enableAnalytics: true,
        autoplay: false,
        volume: 60,
        playerPosition: 'bottom-left',
        playerSize: 'small'
    };

    // Apply custom styles
    const style = document.createElement('style');
    style.textContent = `
        .vibezmode-player {
            bottom: 30px; left: 30px;
            width: 60px; height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #E0E0E0 0%, #00CED1 100%);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 9999;
            position: fixed;
        }

        .vibezmode-player:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }

        .vibezmode-player button {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .vibezmode-player button:hover {
            transform: scale(1.2);
        }

        .vibezmode-player.playing {
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            50% {
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
            }
        }

        .vibezmode-player { border-radius: 15px !important; }
    `;
    document.head.appendChild(style);

    // Set configuration
    window.VibezModeConfig = config;

    // Load the appropriate script
    const scriptName = config.enableAnalytics ? 'analytics-' : '';
    const scriptUrl = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${scriptName}${config.vibe}.js`;
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script);
})();
