(function() {
    const config = window.VibezModeConfig || {
        vibe: 'calm',
        color: '#667eea',
        audioUrl: 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/music/calm.mp3'
    };

    // Create Styles
    const style = document.createElement('style');
    style.textContent = `
        .vibez-player-trigger {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: ${config.color};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: transform 0.3s;
        }
        .vibez-player-trigger:hover {
            transform: scale(1.1);
        }
        .vibez-player-trigger svg {
            width: 30px;
            height: 30px;
            fill: white;
        }
        .vibez-panel {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 250px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            padding: 20px;
            display: none;
            z-index: 9999;
            font-family: sans-serif;
        }
        .vibez-panel.active {
            display: block;
        }
        .vibez-panel h4 {
            margin: 0 0 10px 0;
            color: #333;
        }
        .vibez-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .vibez-btn {
            background: ${config.color};
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Create Audio
    const audio = new Audio(config.audioUrl);
    audio.loop = true;

    // Create UI
    const trigger = document.createElement('div');
    trigger.className = 'vibez-player-trigger';
    trigger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    
    const panel = document.createElement('div');
    panel.className = 'vibez-panel';
    panel.innerHTML = `
        <h4>VibezMode: ${config.vibe.charAt(0).toUpperCase() + config.vibe.slice(1)}</h4>
        <div class="vibez-controls">
            <button class="vibez-btn" id="vibez-play-pause">Play</button>
            <input type="range" id="vibez-volume" min="0" max="1" step="0.1" value="0.5">
        </div>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    // Events
    trigger.onclick = () => panel.classList.toggle('active');

    const playBtn = panel.querySelector('#vibez-play-pause');
    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playBtn.textContent = 'Play';
        }
    };

    const volumeSlider = panel.querySelector('#vibez-volume');
    volumeSlider.oninput = (e) => {
        audio.volume = e.target.value;
    };
})();
