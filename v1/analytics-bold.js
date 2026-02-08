(function() {
    const config = {
        vibe: 'bold',
        color: '#FFB3BA',
        audioUrl: 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/music/bold.mp3',
        enableAnalytics: true,
        siteId: 'default'
    };

    // Analytics tracker
    const analytics = {
        sessionId: Math.random().toString(36).substr(2, 9),
        startTime: Date.now(),
        events: [],
        
        track: function(eventName, data = {}) {
            if (!config.enableAnalytics) return;
            
            const event = {
                name: eventName,
                timestamp: Date.now(),
                sessionDuration: Date.now() - this.startTime,
                vibe: config.vibe,
                siteId: config.siteId,
                ...data
            };
            
            this.events.push(event);
            
            // Store in localStorage for batch sending
            const stored = JSON.parse(localStorage.getItem('vibezmode_analytics') || '[]');
            stored.push(event);
            localStorage.setItem('vibezmode_analytics', JSON.stringify(stored));
        },
        
        trackPlayback: function(action) {
            this.track('playback', {
                action: action,
                currentTime: audio.currentTime,
                duration: audio.duration
            });
        },
        
        trackVolumeChange: function(volume) {
            this.track('volume_change', {
                volume: volume
            });
        }
    };

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
            transition: transform 0.3s, box-shadow 0.3s;
            border: 2px solid white;
        }
        .vibez-player-trigger:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
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
            width: calc(100vw - 40px);
            max-width: 280px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            padding: 20px;
            display: none;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            border: 1px solid #eee;
            animation: vibezSlideIn 0.3s ease;
        }
        @keyframes vibezSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .vibez-panel.active {
            display: block;
        }
        .vibez-panel h4 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
        }
        .vibez-close {
            cursor: pointer;
            font-size: 20px;
            color: #999;
            transition: color 0.2s;
            line-height: 1;
        }
        .vibez-close:hover {
            color: #333;
        }
        .vibez-controls {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .vibez-play-btn {
            background: ${config.color};
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.2s, transform 0.2s;
        }
        .vibez-play-btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        .vibez-play-btn:active {
            transform: translateY(0);
        }
        .vibez-volume-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .vibez-volume-container span {
            font-size: 14px;
            color: #666;
        }
        .vibez-volume-slider {
            flex: 1;
            accent-color: ${config.color};
            cursor: pointer;
            height: 5px;
        }
        .vibez-brand {
            margin-top: 15px;
            font-size: 11px;
            color: #ccc;
            text-align: center;
            text-decoration: none;
            display: block;
            transition: color 0.2s;
        }
        .vibez-brand:hover {
            color: #999;
        }
    `;
    document.head.appendChild(style);

    const audio = new Audio(config.audioUrl);
    audio.loop = true;

    analytics.track('page_load', {
        url: window.location.href,
        referrer: document.referrer
    });

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
            <button class="vibez-play-btn" id="vibez-play-pause">▶ Play Music</button>
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

    trigger.onclick = () => {
        panel.classList.toggle('active');
        analytics.track('player_opened');
    };
    
    panel.querySelector('.vibez-close').onclick = () => {
        panel.classList.remove('active');
        analytics.track('player_closed');
    };

    const playBtn = panel.querySelector('#vibez-play-pause');
    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play().catch(e => {
                console.error("VibezMode: Playback failed. User interaction might be required.", e);
                analytics.track('playback_error', { error: e.message });
            });
            playBtn.textContent = '⏸ Pause Music';
            analytics.trackPlayback('play');
        } else {
            audio.pause();
            playBtn.textContent = '▶ Play Music';
            analytics.trackPlayback('pause');
        }
    };

    const volumeSlider = panel.querySelector('#vibez-volume');
    volumeSlider.oninput = (e) => {
        audio.volume = e.target.value;
        analytics.trackVolumeChange(e.target.value);
    };

    audio.volume = 0.5;

    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶ Play Music';
        analytics.track('playback_completed', {
            duration: audio.duration
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            analytics.track('page_hidden');
        } else {
            analytics.track('page_visible');
        }
    });

    window.addEventListener('beforeunload', () => {
        analytics.track('page_unload', {
            totalSessionTime: Date.now() - analytics.startTime
        });
    });

    window.VibezModeAnalytics = {
        getEvents: () => analytics.events,
        clearEvents: () => {
            analytics.events = [];
            localStorage.removeItem('vibezmode_analytics');
        },
        exportEvents: () => JSON.stringify(analytics.events, null, 2)
    };
})();