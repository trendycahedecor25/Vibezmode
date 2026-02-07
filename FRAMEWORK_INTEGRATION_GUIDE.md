# VibezMode Framework Integration Guide

**Version**: 1.0.0  
**Last Updated**: February 7, 2026  
**Status**: Complete  
**Purpose**: Practical integration examples for popular JavaScript frameworks

---

## Table of Contents

1. [React Integration](#react-integration)
2. [Vue Integration](#vue-integration)
3. [Angular Integration](#angular-integration)
4. [Next.js Integration](#nextjs-integration)
5. [Nuxt.js Integration](#nuxtjs-integration)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## React Integration

### Setup

VibezMode works seamlessly with React. Here's how to integrate it:

#### Installation

```bash
npm install vibezmode
# or
yarn add vibezmode
```

#### Basic Hook Implementation

Create a custom hook to manage VibezMode:

```javascript
// hooks/useVibezMode.js
import { useEffect, useState, useCallback } from 'react';

export const useVibezMode = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentVibe, setCurrentVibe] = useState(null);

    useEffect(() => {
        // Load VibezMode script
        const script = document.createElement('script');
        script.src = 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js';
        script.async = true;

        script.onload = () => {
            if (window.VibezMode) {
                setCurrentVibe(window.VibezMode.getVibe());
                setVolume(window.VibezMode.getVolume());
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const play = useCallback(() => {
        if (window.VibezMode) {
            window.VibezMode.play();
            setIsPlaying(true);
        }
    }, []);

    const pause = useCallback(() => {
        if (window.VibezMode) {
            window.VibezMode.pause();
            setIsPlaying(false);
        }
    }, []);

    const setVolumeLevel = useCallback((level) => {
        if (window.VibezMode) {
            window.VibezMode.setVolume(level);
            setVolume(level);
        }
    }, []);

    return {
        isPlaying,
        volume,
        currentVibe,
        play,
        pause,
        setVolume: setVolumeLevel
    };
};
```

#### React Component Example

```javascript
// components/VibezPlayer.jsx
import React from 'react';
import { useVibezMode } from '../hooks/useVibezMode';

export const VibezPlayer = () => {
    const { isPlaying, volume, currentVibe, play, pause, setVolume } = useVibezMode();

    return (
        <div className="vibez-player">
            <h3>Now Playing: {currentVibe || 'Loading...'}</h3>
            
            <div className="controls">
                <button onClick={isPlaying ? pause : play}>
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
            </div>

            <div className="volume-control">
                <label htmlFor="volume-slider">Volume:</label>
                <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                />
                <span>{volume}%</span>
            </div>
        </div>
    );
};
```

#### React Context Provider (Advanced)

```javascript
// context/VibezContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const VibezContext = createContext();

export const VibezProvider = ({ children, vibeScript = 'calm' }) => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
        script.async = true;

        script.onload = () => {
            setIsReady(true);
            window.addEventListener('VibezModeReady', () => {
                setIsReady(true);
            });
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [vibeScript]);

    const value = {
        isReady,
        isPlaying,
        setIsPlaying,
        play: () => {
            if (window.VibezMode) {
                window.VibezMode.play();
                setIsPlaying(true);
            }
        },
        pause: () => {
            if (window.VibezMode) {
                window.VibezMode.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <VibezContext.Provider value={value}>
            {children}
        </VibezContext.Provider>
    );
};

export const useVibez = () => {
    const context = useContext(VibezContext);
    if (!context) {
        throw new Error('useVibez must be used within VibezProvider');
    }
    return context;
};
```

---

## Vue Integration

### Setup

#### Vue 3 Composition API

Create a composable:

```javascript
// composables/useVibezMode.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useVibezMode(vibeScript = 'calm') {
    const isPlaying = ref(false);
    const volume = ref(50);
    const currentVibe = ref(null);
    const isReady = ref(false);

    onMounted(() => {
        const script = document.createElement('script');
        script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
        script.async = true;

        script.onload = () => {
            window.addEventListener('VibezModeReady', () => {
                isReady.value = true;
                if (window.VibezMode) {
                    currentVibe.value = window.VibezMode.getVibe();
                    volume.value = window.VibezMode.getVolume();
                }
            });
        };

        document.body.appendChild(script);
    });

    const play = () => {
        if (window.VibezMode) {
            window.VibezMode.play();
            isPlaying.value = true;
        }
    };

    const pause = () => {
        if (window.VibezMode) {
            window.VibezMode.pause();
            isPlaying.value = false;
        }
    };

    const setVolume = (level) => {
        if (window.VibezMode) {
            window.VibezMode.setVolume(level);
            volume.value = level;
        }
    };

    return {
        isPlaying,
        volume,
        currentVibe,
        isReady,
        play,
        pause,
        setVolume
    };
}
```

#### Vue 3 Component Example

```vue
<!-- components/VibezPlayer.vue -->
<template>
    <div class="vibez-player">
        <h3>Now Playing: {{ currentVibe || 'Loading...' }}</h3>
        
        <div class="controls">
            <button @click="isPlaying ? pause() : play()">
                {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
            </button>
        </div>

        <div class="volume-control">
            <label for="volume-slider">Volume:</label>
            <input
                id="volume-slider"
                type="range"
                min="0"
                max="100"
                :value="volume"
                @input="setVolume($event.target.value)"
            />
            <span>{{ volume }}%</span>
        </div>
    </div>
</template>

<script setup>
import { useVibezMode } from '../composables/useVibezMode';

const { isPlaying, volume, currentVibe, play, pause, setVolume } = useVibezMode('calm');
</script>

<style scoped>
.vibez-player {
    padding: 2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.controls {
    margin: 1rem 0;
}

button {
    padding: 0.8rem 1.5rem;
    background: white;
    color: #667eea;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}

input[type="range"] {
    flex: 1;
}
</style>
```

#### Vue 3 Plugin (Advanced)

```javascript
// plugins/vibezmode.js
export default {
    install(app, options = {}) {
        const vibeScript = options.vibeScript || 'calm';

        app.config.globalProperties.$vibezMode = {
            play: () => window.VibezMode?.play(),
            pause: () => window.VibezMode?.pause(),
            setVolume: (level) => window.VibezMode?.setVolume(level),
            getVolume: () => window.VibezMode?.getVolume(),
            getVibe: () => window.VibezMode?.getVibe(),
            isPlaying: () => window.VibezMode?.isPlaying()
        };

        // Load script
        const script = document.createElement('script');
        script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
        script.async = true;
        document.body.appendChild(script);
    }
};
```

Usage in main.js:

```javascript
import VibezModePlugin from './plugins/vibezmode';

app.use(VibezModePlugin, { vibeScript: 'calm' });
```

---

## Angular Integration

### Setup

#### Angular Service

```typescript
// services/vibezmode.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VibezModeService {
    private isPlayingSubject = new BehaviorSubject<boolean>(false);
    private volumeSubject = new BehaviorSubject<number>(50);
    private currentVibeSubject = new BehaviorSubject<string | null>(null);
    private isReadySubject = new BehaviorSubject<boolean>(false);

    isPlaying$ = this.isPlayingSubject.asObservable();
    volume$ = this.volumeSubject.asObservable();
    currentVibe$ = this.currentVibeSubject.asObservable();
    isReady$ = this.isReadySubject.asObservable();

    constructor() {
        this.loadVibezMode('calm');
    }

    private loadVibezMode(vibeScript: string): void {
        const script = document.createElement('script');
        script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
        script.async = true;

        script.onload = () => {
            window.addEventListener('VibezModeReady', () => {
                this.isReadySubject.next(true);
                if ((window as any).VibezMode) {
                    this.currentVibeSubject.next((window as any).VibezMode.getVibe());
                    this.volumeSubject.next((window as any).VibezMode.getVolume());
                }
            });
        };

        document.body.appendChild(script);
    }

    play(): void {
        if ((window as any).VibezMode) {
            (window as any).VibezMode.play();
            this.isPlayingSubject.next(true);
        }
    }

    pause(): void {
        if ((window as any).VibezMode) {
            (window as any).VibezMode.pause();
            this.isPlayingSubject.next(false);
        }
    }

    setVolume(level: number): void {
        if ((window as any).VibezMode) {
            (window as any).VibezMode.setVolume(level);
            this.volumeSubject.next(level);
        }
    }

    getVolume(): number {
        return this.volumeSubject.value;
    }

    getVibe(): string | null {
        return this.currentVibeSubject.value;
    }

    isPlaying(): boolean {
        return this.isPlayingSubject.value;
    }
}
```

#### Angular Component Example

```typescript
// components/vibez-player/vibez-player.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VibezModeService } from '../../services/vibezmode.service';

@Component({
    selector: 'app-vibez-player',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="vibez-player">
            <h3>Now Playing: {{ currentVibe$ | async || 'Loading...' }}</h3>
            
            <div class="controls">
                <button (click)="togglePlayback()">
                    {{ (isPlaying$ | async) ? '⏸ Pause' : '▶ Play' }}
                </button>
            </div>

            <div class="volume-control">
                <label for="volume-slider">Volume:</label>
                <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    [value]="volume$ | async"
                    (input)="onVolumeChange($event)"
                />
                <span>{{ volume$ | async }}%</span>
            </div>
        </div>
    `,
    styles: [`
        .vibez-player {
            padding: 2rem;
            border-radius: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        button {
            padding: 0.8rem 1.5rem;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
        }

        .volume-control {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
        }
    `]
})
export class VibezPlayerComponent implements OnInit {
    isPlaying$ = this.vibezService.isPlaying$;
    volume$ = this.vibezService.volume$;
    currentVibe$ = this.vibezService.currentVibe$;

    constructor(private vibezService: VibezModeService) {}

    ngOnInit(): void {
        // Component initialization
    }

    togglePlayback(): void {
        if (this.vibezService.isPlaying()) {
            this.vibezService.pause();
        } else {
            this.vibezService.play();
        }
    }

    onVolumeChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.vibezService.setVolume(parseInt(target.value));
    }
}
```

---

## Next.js Integration

### Setup

#### Next.js Hook with SSR Support

```javascript
// hooks/useVibezMode.js
import { useEffect, useState, useCallback } from 'react';

export const useVibezMode = (vibeScript = 'calm') => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentVibe, setCurrentVibe] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        const script = document.createElement('script');
        script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
        script.async = true;

        script.onload = () => {
            window.addEventListener('VibezModeReady', () => {
                setIsReady(true);
                if (window.VibezMode) {
                    setCurrentVibe(window.VibezMode.getVibe());
                    setVolume(window.VibezMode.getVolume());
                }
            });
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [vibeScript]);

    const play = useCallback(() => {
        if (typeof window !== 'undefined' && window.VibezMode) {
            window.VibezMode.play();
            setIsPlaying(true);
        }
    }, []);

    const pause = useCallback(() => {
        if (typeof window !== 'undefined' && window.VibezMode) {
            window.VibezMode.pause();
            setIsPlaying(false);
        }
    }, []);

    const setVolumeLevel = useCallback((level) => {
        if (typeof window !== 'undefined' && window.VibezMode) {
            window.VibezMode.setVolume(level);
            setVolume(level);
        }
    }, []);

    return {
        isPlaying,
        volume,
        currentVibe,
        isReady,
        play,
        pause,
        setVolume: setVolumeLevel
    };
};
```

#### Next.js Page Component

```javascript
// pages/player.js
import { useVibezMode } from '../hooks/useVibezMode';

export default function PlayerPage() {
    const { isPlaying, volume, currentVibe, isReady, play, pause, setVolume } = useVibezMode('calm');

    if (!isReady) {
        return <div>Loading VibezMode...</div>;
    }

    return (
        <div className="player-page">
            <h1>VibezMode Player</h1>
            <h3>Now Playing: {currentVibe || 'Loading...'}</h3>
            
            <button onClick={isPlaying ? pause : play}>
                {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>

            <div className="volume-control">
                <label htmlFor="volume">Volume:</label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                />
                <span>{volume}%</span>
            </div>
        </div>
    );
}
```

#### Next.js App Router (App Directory)

```javascript
// app/player/page.js
'use client';

import { useVibezMode } from '@/hooks/useVibezMode';

export default function PlayerPage() {
    const { isPlaying, volume, currentVibe, isReady, play, pause, setVolume } = useVibezMode('calm');

    return (
        <main>
            <h1>VibezMode Player</h1>
            {isReady ? (
                <>
                    <h3>Now Playing: {currentVibe}</h3>
                    <button onClick={isPlaying ? pause : play}>
                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}
```

---

## Nuxt.js Integration

### Setup

#### Nuxt 3 Composable

```javascript
// composables/useVibezMode.ts
export const useVibezMode = (vibeScript: string = 'calm') => {
    const isPlaying = ref(false);
    const volume = ref(50);
    const currentVibe = ref<string | null>(null);
    const isReady = ref(false);

    onMounted(() => {
        const script = document.createElement('script');
        script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
        script.async = true;

        script.onload = () => {
            window.addEventListener('VibezModeReady', () => {
                isReady.value = true;
                if ((window as any).VibezMode) {
                    currentVibe.value = (window as any).VibezMode.getVibe();
                    volume.value = (window as any).VibezMode.getVolume();
                }
            });
        };

        document.body.appendChild(script);
    });

    const play = () => {
        if ((window as any).VibezMode) {
            (window as any).VibezMode.play();
            isPlaying.value = true;
        }
    };

    const pause = () => {
        if ((window as any).VibezMode) {
            (window as any).VibezMode.pause();
            isPlaying.value = false;
        }
    };

    const setVolume = (level: number) => {
        if ((window as any).VibezMode) {
            (window as any).VibezMode.setVolume(level);
            volume.value = level;
        }
    };

    return {
        isPlaying,
        volume,
        currentVibe,
        isReady,
        play,
        pause,
        setVolume
    };
};
```

#### Nuxt 3 Component

```vue
<!-- components/VibezPlayer.vue -->
<template>
    <div class="vibez-player">
        <h3>Now Playing: {{ currentVibe || 'Loading...' }}</h3>
        
        <div class="controls">
            <button @click="isPlaying ? pause() : play()">
                {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
            </button>
        </div>

        <div class="volume-control">
            <label for="volume-slider">Volume:</label>
            <input
                id="volume-slider"
                type="range"
                min="0"
                max="100"
                :value="volume"
                @input="setVolume($event.target.value)"
            />
            <span>{{ volume }}%</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const { isPlaying, volume, currentVibe, play, pause, setVolume } = useVibezMode('calm');
</script>

<style scoped>
.vibez-player {
    padding: 2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

button {
    padding: 0.8rem 1.5rem;
    background: white;
    color: #667eea;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}
</style>
```

#### Nuxt 3 Plugin

```typescript
// plugins/vibezmode.client.ts
export default defineNuxtPlugin(() => {
    const vibeScript = useRuntimeConfig().public.vibezScript || 'calm';

    const script = document.createElement('script');
    script.src = `https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/${vibeScript}.js`;
    script.async = true;
    document.body.appendChild(script);

    return {
        provide: {
            vibezMode: {
                play: () => (window as any).VibezMode?.play(),
                pause: () => (window as any).VibezMode?.pause(),
                setVolume: (level: number) => (window as any).VibezMode?.setVolume(level),
                getVolume: () => (window as any).VibezMode?.getVolume(),
                getVibe: () => (window as any).VibezMode?.getVibe(),
                isPlaying: () => (window as any).VibezMode?.isPlaying()
            }
        }
    };
});
```

Usage in nuxt.config.ts:

```typescript
export default defineNuxtConfig({
    public: {
        vibezScript: 'calm'
    }
});
```

---

## Best Practices

### 1. Script Loading

**Always check for script availability before calling methods:**

```javascript
if (typeof window !== 'undefined' && window.VibezMode) {
    window.VibezMode.play();
}
```

### 2. Error Handling

**Wrap VibezMode calls in try-catch blocks:**

```javascript
try {
    window.VibezMode.play();
} catch (error) {
    console.error('VibezMode error:', error);
}
```

### 3. Memory Management

**Clean up event listeners and scripts:**

```javascript
onUnmounted(() => {
    if (document.body.contains(script)) {
        document.body.removeChild(script);
    }
    window.removeEventListener('VibezModeReady', handler);
});
```

### 4. SSR Considerations

**Always check if running on client side:**

```javascript
if (typeof window !== 'undefined') {
    // Client-side only code
}
```

### 5. Performance Optimization

**Lazy load VibezMode only when needed:**

```javascript
const loadVibezModeOnDemand = async () => {
    if (!window.VibezMode) {
        const script = document.createElement('script');
        script.src = 'https://raw.githubusercontent.com/trendycahedecor25/Vibezmode/main/v1/calm.js';
        await new Promise(resolve => {
            script.onload = resolve;
            document.body.appendChild(script);
        });
    }
};
```

---

## Troubleshooting

### Issue: "VibezMode is not defined"

**Solution**: Ensure the script has loaded before calling methods:

```javascript
window.addEventListener('VibezModeReady', () => {
    window.VibezMode.play();
});
```

### Issue: Audio not playing on mobile

**Solution**: Mobile browsers require user interaction for audio playback. Ensure play() is called from a user event:

```javascript
button.addEventListener('click', () => {
    window.VibezMode.play();
});
```

### Issue: Multiple script instances loading

**Solution**: Check if script is already loaded:

```javascript
if (!window.VibezMode) {
    const script = document.createElement('script');
    script.src = '...';
    document.body.appendChild(script);
}
```

### Issue: State not updating in framework

**Solution**: Use framework-specific state management:

```javascript
// React
const [isPlaying, setIsPlaying] = useState(false);

// Vue
const isPlaying = ref(false);

// Angular
private isPlayingSubject = new BehaviorSubject(false);
```

### Issue: Memory leaks with repeated mounting/unmounting

**Solution**: Always clean up in component lifecycle:

```javascript
// React
useEffect(() => {
    return () => {
        // Cleanup code
    };
}, []);

// Vue
onUnmounted(() => {
    // Cleanup code
});

// Angular
ngOnDestroy() {
    // Cleanup code
}
```

---

## Common Integration Patterns

### Pattern 1: Global Player State

```javascript
// Store/manage VibezMode state globally
const vibezState = {
    isPlaying: false,
    volume: 50,
    currentVibe: null
};

// Update state when VibezMode events occur
window.addEventListener('VibezModeReady', () => {
    vibezState.currentVibe = window.VibezMode.getVibe();
});
```

### Pattern 2: Event-Driven Architecture

```javascript
// Emit custom events for VibezMode changes
const playEvent = new CustomEvent('vibez:play', { detail: { vibe: 'calm' } });
window.dispatchEvent(playEvent);

// Listen for events
window.addEventListener('vibez:play', (e) => {
    console.log('Playing:', e.detail.vibe);
});
```

### Pattern 3: Conditional Rendering

```javascript
// Show/hide player based on conditions
if (userPreferences.musicEnabled && !isCheckoutPage) {
    window.VibezMode.showPlayer();
} else {
    window.VibezMode.hidePlayer();
}
```

---

## Support & Resources

- **API Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Code Examples**: [API_EXAMPLES_LIBRARY.md](API_EXAMPLES_LIBRARY.md)
- **Developer Quick Reference**: [DEVELOPER_QUICK_REFERENCE.md](DEVELOPER_QUICK_REFERENCE.md)
- **GitHub Repository**: [trendycahedecor25/Vibezmode](https://github.com/trendycahedecor25/Vibezmode)

---

**Last Updated**: February 7, 2026  
**Version**: 1.0.0  
**Status**: Complete and Ready for Use
