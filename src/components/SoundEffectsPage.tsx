
import React, { useState } from 'react';
import { Volume2, Play, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useTTS } from '@/contexts/TTSContext';
import { generateWebSpeech } from '@/services/webSpeechTTS';
import { toast } from 'sonner';

const SoundEffectsPage = () => {
  const [selectedEffect, setSelectedEffect] = useState<string>('');
  const { availableVoices, isGenerating, setIsGenerating } = useTTS();
  const [volume, setVolume] = useState(0.5);

  const soundEffects = [
    {
      name: 'Announcement',
      text: 'Attention passengers, the train to Platform 9 and 3/4 is now boarding.',
      icon: '📢'
    },
    {
      name: 'Robot Voice',
      text: 'System initialized. All systems operational. Welcome, human.',
      icon: '🤖'
    },
    {
      name: 'News Report',
      text: 'Breaking news: Scientists have made a groundbreaking discovery that could change everything.',
      icon: '📺'
    },
    {
      name: 'GPS Navigation',
      text: 'In 500 meters, turn right. Then continue straight for 2 kilometers.',
      icon: '🗺️'
    },
    {
      name: 'Phone Assistant',
      text: 'Hello! I am your virtual assistant. How can I help you today?',
      icon: '📱'
    },
    {
      name: 'Game Narrator',
      text: 'You enter a dark cave. The sound of dripping water echoes in the distance.',
      icon: '🎮'
    },
    {
      name: 'Meditation Guide',
      text: 'Take a deep breath in... and slowly breathe out. Feel your body relaxing.',
      icon: '🧘'
    },
    {
      name: 'Sports Commentator',
      text: 'And he shoots... and scores! What an incredible goal by the young player!',
      icon: '⚽'
    }
  ];

  const handlePlayEffect = async (effect: typeof soundEffects[0]) => {
    setSelectedEffect(effect.name);
    setIsGenerating(true);
    
    try {
      const effectSettings = {
        voice: availableVoices[0]?.name || '',
        model: 'web-speech',
        speed: effect.name === 'Robot Voice' ? 0.8 : 
               effect.name === 'Sports Commentator' ? 1.3 :
               effect.name === 'Meditation Guide' ? 0.7 : 1.0,
        pitch: effect.name === 'Robot Voice' ? 0.5 :
               effect.name === 'Sports Commentator' ? 1.2 :
               effect.name === 'Meditation Guide' ? 0.8 : 1.0,
        volume: volume,
        quality: 'standard' as const
      };
      
      await generateWebSpeech(effect.text, effectSettings, availableVoices);
      toast.success(`${effect.name} effect played!`);
    } catch (error) {
      console.error('Error playing sound effect:', error);
      toast.error('Failed to play sound effect');
    } finally {
      setIsGenerating(false);
      setSelectedEffect('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center">
          <Volume2 className="w-6 h-6 mr-3 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Sound Effects</h2>
        </div>
        <p className="text-gray-600 mt-1">Pre-configured voice effects for different scenarios</p>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Volume Control</h3>
              <span className="text-sm text-gray-600">{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soundEffects.map((effect, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{effect.icon}</div>
                  <h3 className="font-medium text-gray-900">{effect.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  "{effect.text}"
                </p>
                <Button 
                  onClick={() => handlePlayEffect(effect)}
                  disabled={isGenerating}
                  className="w-full"
                  variant={selectedEffect === effect.name ? "default" : "outline"}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {selectedEffect === effect.name ? 'Playing...' : 'Play'}
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center mb-2">
              <Music className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="font-medium text-blue-900">Pro Tip</h3>
            </div>
            <p className="text-sm text-blue-800">
              Each sound effect is optimized with specific speed and pitch settings to create the most realistic experience for different scenarios.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoundEffectsPage;
