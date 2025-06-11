
import React, { useState } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useTTS } from '@/contexts/TTSContext';
import { generateWebSpeech, stopSpeech } from '@/services/webSpeechTTS';
import { toast } from 'sonner';

const PlaygroundPage = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const { settings, availableVoices } = useTTS();

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Hello, this is a test of the text-to-speech functionality.",
    "Welcome to our advanced voice synthesis playground!",
    "Technology is best when it brings people together.",
    "The future belongs to those who believe in the beauty of their dreams."
  ];

  const handlePlay = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to play');
      return;
    }

    setIsPlaying(true);
    try {
      await generateWebSpeech(text, settings, availableVoices);
      toast.success('Speech completed!');
    } catch (error) {
      console.error('Error playing speech:', error);
      toast.error('Failed to play speech');
    } finally {
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    stopSpeech();
    setIsPlaying(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-900">Playground</h2>
        <p className="text-gray-600 mt-1">Experiment with different voices and settings</p>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Text Input</h3>
            <Textarea
              placeholder="Type or paste your text here to experiment with different voices..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] mb-4"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={handlePlay}
                disabled={isPlaying || !text.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Play
              </Button>
              <Button 
                onClick={handleStop}
                disabled={!isPlaying}
                variant="outline"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Sample Texts</h3>
            <div className="grid grid-cols-1 gap-3">
              {sampleTexts.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setText(sample)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-gray-700">{sample}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
