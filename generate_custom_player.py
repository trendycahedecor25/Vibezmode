#!/usr/bin/env python3
"""
VibezMode Custom Player Generator
Generates customized player scripts with specific styling and behavior options.
Version: 1.0.0
"""

import json
import os
from datetime import datetime

def generate_custom_player_script(config):
    """
    Generate a custom player script with specified options.
    
    Args:
        config (dict): Configuration options including:
            - vibe: Vibe name (calm, focus, uplift, bold, earth, luxury, playful)
            - player_position: Position (bottom-right, bottom-left, top-right, top-left)
            - player_size: Size (small, medium, large)
            - primary_color: Primary color (hex)
            - secondary_color: Secondary color (hex)
            - autoplay: Boolean for autoplay
            - volume: Default volume (0-100)
            - enable_analytics: Boolean for analytics
            - site_id: Site identifier
            - custom_css: Additional CSS rules
    
    Returns:
        str: Generated JavaScript code
    """
    
    vibe = config.get('vibe', 'calm')
    position = config.get('player_position', 'bottom-right')
    size = config.get('player_size', 'medium')
    primary_color = config.get('primary_color', '#667eea')
    secondary_color = config.get('secondary_color', '#764ba2')
    autoplay = config.get('autoplay', False)
    volume = config.get('volume', 50)
    enable_analytics = config.get('enable_analytics', True)
    site_id = config.get('site_id', 'default')
    custom_css = config.get('custom_css', '')
    
    # Position mapping
    position_styles = {
        'bottom-right': 'bottom: 30px; right: 30px;',
        'bottom-left': 'bottom: 30px; left: 30px;',
        'top-right': 'top: 30px; right: 30px;',
        'top-left': 'top: 30px; left: 30px;'
    }
    
    # Size mapping
    size_styles = {
        'small': 'width: 60px; height: 60px;',
        'medium': 'width: 80px; height: 80px;',
        'large': 'width: 100px; height: 100px;'
    }
    
    position_css = position_styles.get(position, position_styles['bottom-right'])
    size_css = size_styles.get(size, size_styles['medium'])
    
    # Generate the script
    script = f"""/**
 * VibezMode Custom Player
 * Generated: {datetime.now().isoformat()}
 * Vibe: {vibe}
 * Configuration: {json.dumps(config, indent=2)}
 */

(function() {{
    // Configuration
    const config = {{
        vibe: '{vibe}',
        siteId: '{site_id}',
        enableAnalytics: {str(enable_analytics).lower()},
        autoplay: {str(autoplay).lower()},
        volume: {volume},
        playerPosition: '{position}',
        playerSize: '{size}'
    }};

    // Apply custom styles
    const style = document.createElement('style');
    style.textContent = `
        .vibezmode-player {{
            {position_css}
            {size_css}
            border-radius: 50%;
            background: linear-gradient(135deg, {primary_color} 0%, {secondary_color} 100%);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 9999;
            position: fixed;
        }}

        .vibezmode-player:hover {{
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }}

        .vibezmode-player button {{
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }}

        .vibezmode-player button:hover {{
            transform: scale(1.2);
        }}

        .vibezmode-player.playing {{
            animation: pulse 2s ease-in-out infinite;
        }}

        @keyframes pulse {{
            0%, 100% {{
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }}
            50% {{
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
            }}
        }}

        {custom_css}
    `;
    document.head.appendChild(style);

    // Set configuration
    window.VibezModeConfig = config;

    // Load the appropriate script
    const scriptName = config.enableAnalytics ? 'analytics-' : '';
    const scriptUrl = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${{scriptName}}${{config.vibe}}.js`;
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script);
}})();
"""
    
    return script


def generate_html_example(config):
    """
    Generate an HTML example using the custom player.
    
    Args:
        config (dict): Configuration options
    
    Returns:
        str: HTML code
    """
    
    vibe = config.get('vibe', 'calm')
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VibezMode Custom Player - {vibe.title()}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}

        .container {{
            max-width: 600px;
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
        }}

        h1 {{
            color: #1a1a1a;
            margin-bottom: 20px;
            font-size: 2.5rem;
        }}

        p {{
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
        }}

        .info {{
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            border-radius: 8px;
            text-align: left;
            margin-top: 30px;
        }}

        .info h3 {{
            color: #667eea;
            margin-bottom: 10px;
        }}

        .info ul {{
            list-style: none;
            color: #666;
        }}

        .info li {{
            padding: 5px 0;
        }}

        .info li::before {{
            content: "✓ ";
            color: #667eea;
            font-weight: bold;
            margin-right: 8px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 VibezMode</h1>
        <p>Experience the power of audio branding with your custom {vibe.title()} vibe.</p>
        
        <p>Look for the music player in the corner of your screen. Click to play!</p>
        
        <div class="info">
            <h3>Configuration</h3>
            <ul>
                <li>Vibe: {vibe.title()}</li>
                <li>Position: {config.get('player_position', 'bottom-right')}</li>
                <li>Size: {config.get('player_size', 'medium')}</li>
                <li>Default Volume: {config.get('volume', 50)}%</li>
                <li>Analytics: {'Enabled' if config.get('enable_analytics', True) else 'Disabled'}</li>
            </ul>
        </div>
    </div>

    <!-- Load custom player -->
    <script src="custom-player.js"></script>
</body>
</html>
"""
    
    return html


def save_files(config, output_dir='.'):
    """
    Save generated files to disk.
    
    Args:
        config (dict): Configuration options
        output_dir (str): Output directory
    """
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate script
    script = generate_custom_player_script(config)
    script_path = os.path.join(output_dir, 'custom-player.js')
    with open(script_path, 'w') as f:
        f.write(script)
    print(f"✓ Generated: {script_path}")
    
    # Generate HTML example
    html = generate_html_example(config)
    html_path = os.path.join(output_dir, 'custom-player-example.html')
    with open(html_path, 'w') as f:
        f.write(html)
    print(f"✓ Generated: {html_path}")
    
    # Save configuration
    config_path = os.path.join(output_dir, 'custom-player-config.json')
    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2)
    print(f"✓ Generated: {config_path}")


def main():
    """Main function - example usage"""
    
    # Example configurations
    configs = [
        {
            'vibe': 'calm',
            'player_position': 'bottom-right',
            'player_size': 'medium',
            'primary_color': '#FFC0CB',
            'secondary_color': '#40E0D0',
            'autoplay': False,
            'volume': 50,
            'enable_analytics': True,
            'site_id': 'my-website',
            'custom_css': ''
        },
        {
            'vibe': 'focus',
            'player_position': 'bottom-left',
            'player_size': 'small',
            'primary_color': '#E0E0E0',
            'secondary_color': '#00CED1',
            'autoplay': False,
            'volume': 60,
            'enable_analytics': True,
            'site_id': 'productivity-app',
            'custom_css': '.vibezmode-player { border-radius: 15px !important; }'
        },
        {
            'vibe': 'uplift',
            'player_position': 'top-right',
            'player_size': 'large',
            'primary_color': '#4ECDC4',
            'secondary_color': '#F7DC6F',
            'autoplay': False,
            'volume': 70,
            'enable_analytics': True,
            'site_id': 'fitness-app',
            'custom_css': '@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } } .vibezmode-player { animation: float 3s ease-in-out infinite !important; }'
        }
    ]
    
    print("VibezMode Custom Player Generator")
    print("=" * 50)
    print()
    
    # Generate files for each configuration
    for i, config in enumerate(configs, 1):
        vibe = config.get('vibe', 'unknown')
        output_dir = f'custom-players/{vibe}'
        
        print(f"Generating custom player {i}/{len(configs)}: {vibe.upper()}")
        save_files(config, output_dir)
        print()
    
    print("=" * 50)
    print("✓ All custom players generated successfully!")
    print()
    print("Generated files:")
    print("  - custom-player.js (JavaScript embed code)")
    print("  - custom-player-example.html (HTML example)")
    print("  - custom-player-config.json (Configuration)")
    print()
    print("Next steps:")
    print("  1. Copy custom-player.js to your website")
    print("  2. Add <script src=\"custom-player.js\"></script> to your HTML")
    print("  3. Or open custom-player-example.html in your browser")


if __name__ == '__main__':
    main()
