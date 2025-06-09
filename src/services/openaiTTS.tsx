
import { TTSSettings } from '@/contexts/TTSContext';

export const generateSpeech = async (
  text: string,
  settings: TTSSettings,
  apiKey: string
): Promise<Blob> => {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: settings.model,
      input: text,
      voice: settings.voice,
      speed: settings.speed,
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.blob();
};
