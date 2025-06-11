
import { TTSSettings } from '@/contexts/TTSContext';

export const generateWebSpeech = (
  text: string,
  settings: TTSSettings,
  availableVoices: SpeechSynthesisVoice[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the selected voice
    const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = settings.speed;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

    speechSynthesis.speak(utterance);
  });
};

export const stopSpeech = () => {
  speechSynthesis.cancel();
};

export const pauseSpeech = () => {
  speechSynthesis.pause();
};

export const resumeSpeech = () => {
  speechSynthesis.resume();
};
