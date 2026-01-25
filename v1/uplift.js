(function() {
    const config = {
        vibe: 'uplift',
        color: '#4ECDC4',
        audioUrl: 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/music/uplift.mp3'
    };

    const style = document.createElement('style');
    style.textContent = `
        .vibez-player-trigger {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: ${config.color};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: all 0.3s;
            border: 2px solid white;
        }
        .vibez-player-trigger:hover {
            transform: scale(1.1);
        }
        .vibez-player-trigger svg {
            width: 24px;
            height: 24px;
            fill: white;
        }
        .vibez-panel {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 220px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            padding: 15px;
            display: none;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            border: 1px solid #eee;
        }
        .vibez-panel.active {
            display: block;
            animation: vibezFadeIn 0.3s ease;
        }
        @keyframes vibezFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .vibez-panel h4 {
            margin: 0 0 12px 0;
            color: #333;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .vibez-close {
            cursor: pointer;
            font-size: 18px;
            color: #999;
        }
        .vibez-controls {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .vibez-play-btn {
            background: ${config.color};
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.2s;
        }
        .vibez-play-btn:hover {
            opacity: 0.9;
        }
        .vibez-volume-container {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .vibez-volume-container span {
            font-size: 12px;
            color: #666;
        }
        .vibez-volume-slider {
            flex: 1;
            accent-color: ${config.color};
            cursor: pointer;
        }
        .vibez-brand {
            margin-top: 12px;
            font-size: 10px;
            color: #ccc;
            text-align: center;
            text-decoration: none;
            display: block;
        }
    `;
    document.head.appendChild(style);

    const audio = new Audio(config.audioUrl);
    audio.loop = true;

    const trigger = document.createElement('div');
    trigger.className = 'vibez-player-trigger';
    trigger.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    
    const panel = document.createElement('div');
    panel.className = 'vibez-panel';
    panel.innerHTML = `
        <h4>
            <span>${config.vibe.charAt(0).toUpperCase() + config.vibe.slice(1)} Vibe</span>
            <span class="vibez-close">&times;</span>
        </h4>
        <div class="vibez-controls">
            <button class="vibez-play-btn" id="vibez-play-pause">Play Music</button>
            <div class="vibez-volume-container">
                <span>🔈</span>
                <input type="range" class="vibez-volume-slider" id="vibez-volume" min="0" max="1" step="0.1" value="0.5">
                <span>🔊</span>
            </div>
        </div>
        <a href="https://vibezmode.com" target="_blank" class="vibez-brand">Powered by VibezMode</a>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    trigger.onclick = () => panel.classList.toggle('active');
    panel.querySelector('.vibez-close').onclick = () => panel.classList.remove('active');

    const playBtn = panel.querySelector('#vibez-play-pause');
    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play().catch(e => {
                console.error("VibezMode: Playback failed. User interaction might be required.", e);
                alert("Please click anywhere on the page first to enable audio.");
            });
            playBtn.textContent = 'Pause Music';
        } else {
            audio.pause();
            playBtn.textContent = 'Play Music';
        }
    };

    const volumeSlider = panel.querySelector('#vibez-volume');
    volumeSlider.oninput = (e) => {
        audio.volume = e.target.value;
    };
})();