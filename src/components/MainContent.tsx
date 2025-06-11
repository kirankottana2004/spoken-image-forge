
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTTS } from '@/contexts/TTSContext';
import SuggestionCards from '@/components/SuggestionCards';
import HistoryPage from '@/components/HistoryPage';
import PlaygroundPage from '@/components/PlaygroundPage';
import VoiceChangerPage from '@/components/VoiceChangerPage';
import SoundEffectsPage from '@/components/SoundEffectsPage';
import { generateWebSpeech } from '@/services/webSpeechTTS';
import { toast } from 'sonner';

const MainContent = () => {
  const [text, setText] = useState('');
  const { 
    isGenerating, 
    setIsGenerating, 
    settings, 
    availableVoices, 
    addToHistory, 
    currentPage 
  } = useTTS();

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setIsGenerating(true);
    try {
      await generateWebSpeech(text, settings, availableVoices);
      addToHistory(text);
      toast.success('Speech generated successfully!');
    } catch (error) {
      console.error('Error generating speech:', error);
      toast.error('Failed to generate speech. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setText(suggestionText);
  };

  // Render different pages based on current page
  if (currentPage === 'history') {
    return <HistoryPage />;
  }

  if (currentPage === 'playground') {
    return <PlaygroundPage />;
  }

  if (currentPage === 'voice-changer') {
    return <VoiceChangerPage />;
  }

  if (currentPage === 'sound-effects') {
    return <SoundEffectsPage />;
  }

  // Default: Text to Speech page
  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Text to Speech</h2>
          <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            ✓ Web Speech API Ready
          </div>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] text-base resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-300"
            />
            
            <Button 
              onClick={handleGenerateSpeech}
              disabled={isGenerating}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 text-base font-medium"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              {isGenerating ? 'Generating Speech...' : 'Generate Speech'}
            </Button>
          </div>

          <SuggestionCards onSuggestionClick={handleSuggestionClick} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
