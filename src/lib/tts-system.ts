/**
 * Enhanced Text-to-Speech System
 * Uses browser TTS when available (free) and falls back to Cloudflare AI (paid)
 */

import { generateSpeech } from './cloudflare-ai';

export interface TTSOptions {
  voice?: string;
  rate?: number; // 0.1 to 10
  pitch?: number; // 0 to 2
  volume?: number; // 0 to 1
  lang?: string;
  useCloudflare?: boolean; // Force Cloudflare usage
}

export interface TTSResult {
  success: boolean;
  method: 'browser' | 'cloudflare' | 'none';
  audio?: HTMLAudioElement | string;
  error?: string;
}

/**
 * Check if browser TTS is available
 */
export function isBrowserTTSAvailable(): boolean {
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

/**
 * Get available browser voices
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isBrowserTTSAvailable()) return [];
  
  const voices = speechSynthesis.getVoices();
  return voices.filter(voice => 
    voice.lang.startsWith('ar') || // Arabic voices
    voice.lang.startsWith('en') || // English voices
    voice.lang.startsWith('fr') || // French voices
    voice.lang.startsWith('es')    // Spanish voices
  );
}

/**
 * Find the best voice for a given language
 */
export function findBestVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = getAvailableVoices();
  
  // First try exact language match
  let voice = voices.find(v => v.lang === lang);
  if (voice) return voice;
  
  // Then try language family match
  const langFamily = lang.split('-')[0];
  voice = voices.find(v => v.lang.startsWith(langFamily));
  if (voice) return voice;
  
  // Finally, return any available voice
  return voices[0] || null;
}

/**
 * Enhanced TTS with browser fallback and Cloudflare AI
 */
export async function speakText(
  text: string,
  options: TTSOptions = {}
): Promise<TTSResult> {
  const {
    voice,
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
    lang = 'ar',
    useCloudflare = false
  } = options;

  // Try browser TTS first (free)
  if (!useCloudflare && isBrowserTTSAvailable()) {
    try {
      const result = await speakWithBrowser(text, { voice, rate, pitch, volume, lang });
      if (result.success) {
        return result;
      }
    } catch (error) {
      console.warn('Browser TTS failed, falling back to Cloudflare:', error);
    }
  }

  // Fallback to Cloudflare AI (paid but reliable)
  try {
    const result = await speakWithCloudflare(text, { lang, voice });
    return result;
  } catch (error) {
    console.error('Cloudflare TTS also failed:', error);
    return {
      success: false,
      method: 'none',
      error: 'All TTS methods failed'
    };
  }
}

/**
 * Browser TTS implementation
 */
async function speakWithBrowser(
  text: string,
  options: TTSOptions
): Promise<TTSResult> {
  return new Promise((resolve) => {
    if (!isBrowserTTSAvailable()) {
      resolve({
        success: false,
        method: 'browser',
        error: 'Browser TTS not available'
      });
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice
    if (options.voice) {
      utterance.voice = findBestVoice(options.lang || 'ar');
    }
    
    // Set properties
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    utterance.lang = options.lang || 'ar';
    
    // Event handlers
    utterance.onstart = () => {
      console.log('Browser TTS started');
    };
    
    utterance.onend = () => {
      console.log('Browser TTS completed');
      resolve({
        success: true,
        method: 'browser',
        audio: undefined
      });
    };
    
    utterance.onerror = (event) => {
      console.error('Browser TTS error:', event);
      resolve({
        success: false,
        method: 'browser',
        error: `TTS Error: ${event.error}`
      });
    };
    
    // Start speaking
    speechSynthesis.speak(utterance);
  });
}

/**
 * Cloudflare AI TTS implementation
 */
async function speakWithCloudflare(
  text: string,
  options: { lang: string; voice?: string }
): Promise<TTSResult> {
  try {
    const response = await generateSpeech(text, {
      voice: options.voice || (options.lang === 'ar' ? 'ar' : 'en'),
      speed: 1.0,
      quality: 'medium'
    });
    
    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return {
        success: true,
        method: 'cloudflare',
        audio: audioUrl
      };
    } else {
      throw new Error(`Cloudflare TTS failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Cloudflare TTS error:', error);
    return {
      success: false,
      method: 'cloudflare',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Stop all ongoing speech
 */
export function stopSpeech(): void {
  if (isBrowserTTSAvailable()) {
    speechSynthesis.cancel();
  }
}

/**
 * Pause speech
 */
export function pauseSpeech(): void {
  if (isBrowserTTSAvailable()) {
    speechSynthesis.pause();
  }
}

/**
 * Resume speech
 */
export function resumeSpeech(): void {
  if (isBrowserTTSAvailable()) {
    speechSynthesis.resume();
  }
}

/**
 * Check if speech is currently playing
 */
export function isSpeaking(): boolean {
  if (!isBrowserTTSAvailable()) return false;
  return speechSynthesis.speaking;
}

/**
 * Get TTS status
 */
export function getTTSStatus(): {
  available: boolean;
  speaking: boolean;
  paused: boolean;
  voices: number;
} {
  const available = isBrowserTTSAvailable();
  return {
    available,
    speaking: available ? speechSynthesis.speaking : false,
    paused: available ? speechSynthesis.paused : false,
    voices: available ? getAvailableVoices().length : 0
  };
}

/**
 * Preload voices for better performance
 */
export function preloadVoices(): void {
  if (isBrowserTTSAvailable()) {
    // Some browsers need time to load voices
    speechSynthesis.onvoiceschanged = () => {
      console.log(`Loaded ${getAvailableVoices().length} voices`);
    };
    
    // Trigger voice loading
    speechSynthesis.getVoices();
  }
}
