/**
 * VibezMode Custom Player
 * Generated: 2026-02-05T08:12:27.777488
 * Vibe: uplift
 * Configuration: {
  "vibe": "uplift",
  "player_position": "top-right",
  "player_size": "large",
  "primary_color": "#4ECDC4",
  "secondary_color": "#F7DC6F",
  "autoplay": false,
  "volume": 70,
  "enable_analytics": true,
  "site_id": "fitness-app",
  "custom_css": "@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } } .vibezmode-player { animation: float 3s ease-in-out infinite !important; }"
}
 */

(function() {
    // Configuration
    const config = {
        vibe: 'uplift',
        siteId: 'fitness-app',
        enableAnalytics: true,
        autoplay: false,
        volume: 70,
        playerPosition: 'top-right',
        playerSize: 'large'
    };

    // Apply custom styles
    const style = document.createElement('style');
    style.textContent = `
        .vibezmode-player {
            top: 30px; right: 30px;
            width: 100px; height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4ECDC4 0%, #F7DC6F 100%);
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

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } } .vibezmode-player { animation: float 3s ease-in-out infinite !important; }
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
