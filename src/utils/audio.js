let audioCtx = null;
let bgmInterval = null;
let bgmGain = null;
let bgmOscillators = [];

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPageFlip() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create white noise buffer
    const bufferSize = ctx.sampleRate * 0.35; // 0.35 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Create filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 4.0;
    
    // Sweep frequency to simulate sliding paper rustle
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.35);
    
    // Gain envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.04, now + 0.05); // low volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    gainNode.gain.setValueAtTime(0, now + 0.35);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseSource.start(now);
    noiseSource.stop(now + 0.35);
  } catch (e) {
    console.warn("Failed to play page flip sound:", e);
  }
}

export function playConfettiPop() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle';
    // Fast frequency drop (like a plop/pop)
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
    
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    console.warn("Failed to play pop sound:", e);
  }
}

export function playChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play a sequence of fast, sparkling notes (pentatonic C5, D5, E5, G5, A5, C6)
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    notes.forEach((freq, idx) => {
      const delay = idx * 0.06; // 60ms between notes
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(0.06, now + delay + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.45);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.5);
    });
  } catch (e) {
    console.warn("Failed to play chime sound:", e);
  }
}

let bgmAudio = null;

export function startBGM() {
  try {
    if (!bgmAudio) {
      bgmAudio = new Audio('/bts_birthday.m4a');
      bgmAudio.loop = true;
      bgmAudio.volume = 0.55;
    }
    bgmAudio.play().catch(e => {
      console.warn("Failed to play BGM:", e);
      const playOnUserInteraction = () => {
        if (bgmAudio) bgmAudio.play().catch(err => console.warn(err));
        window.removeEventListener('click', playOnUserInteraction);
        window.removeEventListener('touchstart', playOnUserInteraction);
      };
      window.addEventListener('click', playOnUserInteraction);
      window.addEventListener('touchstart', playOnUserInteraction);
    });
  } catch (e) {
    console.warn("Failed to start background music:", e);
  }
}

export function stopBGM() {
  try {
    if (bgmAudio) {
      bgmAudio.pause();
    }
  } catch (e) {
    console.warn("Failed to stop background music:", e);
  }
}
