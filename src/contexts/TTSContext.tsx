
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TTSSettings {
  voice: string;
  model: string;
  speed: number;
  quality: 'standard' | 'hd';
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
    voice: 'alloy',
    model: 'tts-1',
    speed: 1.0,
    quality: 'standard'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai-api-key') || '');

  const updateSettings = (newSettings: Partial<TTSSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
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
      setApiKey: (key: string) => {
        setApiKey(key);
        localStorage.setItem('openai-api-key', key);
      }
    }}>
      {children}
    </TTSContext.Provider>
  );
};
