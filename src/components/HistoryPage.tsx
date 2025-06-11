
import React from 'react';
import { Play, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTTS } from '@/contexts/TTSContext';
import { generateWebSpeech } from '@/services/webSpeechTTS';
import { toast } from 'sonner';

const HistoryPage = () => {
  const { history, clearHistory, availableVoices, isGenerating, setIsGenerating } = useTTS();

  const handlePlayHistoryItem = async (text: string, settings: any) => {
    setIsGenerating(true);
    try {
      await generateWebSpeech(text, settings, availableVoices);
      toast.success('Speech played successfully!');
    } catch (error) {
      console.error('Error playing speech:', error);
      toast.error('Failed to play speech');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">History</h2>
          {history.length > 0 && (
            <Button onClick={clearHistory} variant="outline">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
              <p className="text-gray-600">Your generated speech history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{item.text}</p>
                      <div className="text-sm text-gray-500 mb-3">
                        <span>{formatDate(item.timestamp)}</span>
                        <span className="mx-2">•</span>
                        <span>Voice: {item.settings.voice}</span>
                        <span className="mx-2">•</span>
                        <span>Speed: {item.settings.speed}x</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePlayHistoryItem(item.text, item.settings)}
                      disabled={isGenerating}
                      variant="outline"
                      size="sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
