
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface TTSSettings {
  voice: string;
  model: string;
  speed: number;
  quality: 'standard' | 'hd';
  pitch: number;
  volume: number;
}

export interface HistoryItem {
  id: string;
  text: string;
  timestamp: Date;
  settings: TTSSettings;
}

interface TTSContextType {
  settings: TTSSettings;
  updateSettings: (newSettings: Partial<TTSSettings>) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  availableVoices: SpeechSynthesisVoice[];
  history: HistoryItem[];
  addToHistory: (text: string) => void;
  clearHistory: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTS must be used within a TTSProvider');
  }
  return context;
};

export const TTSProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<TTSSettings>({
    voice: '',
    model: 'web-speech',
    speed: 1.0,
    quality: 'standard',
    pitch: 1.0,
    volume: 1.0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('tts-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPage, setCurrentPage] = useState('text-to-speech');

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !settings.voice) {
        setSettings(prev => ({ ...prev, voice: voices[0].name }));
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('tts-history', JSON.stringify(history));
  }, [history]);

  const updateSettings = (newSettings: Partial<TTSSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addToHistory = (text: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      settings: { ...settings }
    };
    setHistory(prev => [newItem, ...prev.slice(0, 49)]); // Keep last 50 items
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <TTSContext.Provider value={{
      settings,
      updateSettings,
      isGenerating,
      setIsGenerating,
      currentAudio,
      setCurrentAudio,
      apiKey,
      setApiKey,
      availableVoices,
      history,
      addToHistory,
      clearHistory,
      currentPage,
      setCurrentPage
    }}>
      {children}
    </TTSContext.Provider>
  );
};
