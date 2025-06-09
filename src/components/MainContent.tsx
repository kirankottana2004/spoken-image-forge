
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTTS } from '@/contexts/TTSContext';
import SuggestionCards from '@/components/SuggestionCards';
import AudioPlayer from '@/components/AudioPlayer';
import ApiKeyInput from '@/components/ApiKeyInput';
import { generateSpeech } from '@/services/openaiTTS';
import { toast } from 'sonner';

const MainContent = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { isGenerating, setIsGenerating, settings, apiKey } = useTTS();

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    if (!apiKey) {
      toast.error('Please enter your OpenAI API key');
      return;
    }

    setIsGenerating(true);
    try {
      const audioBlob = await generateSpeech(text, settings, apiKey);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      toast.success('Speech generated successfully!');
    } catch (error) {
      console.error('Error generating speech:', error);
      toast.error('Failed to generate speech. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setText(suggestionText);
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Text to Speech</h2>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <ApiKeyInput />
          
          <div className="space-y-4">
            <Textarea
              placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] text-base resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-300"
            />
            
            <Button 
              onClick={handleGenerateSpeech}
              disabled={isGenerating || !apiKey}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 text-base font-medium"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              {isGenerating ? 'Generating Speech...' : 'Generate Speech'}
            </Button>
          </div>

          {audioUrl && (
            <AudioPlayer audioUrl={audioUrl} />
          )}

          <SuggestionCards onSuggestionClick={handleSuggestionClick} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
