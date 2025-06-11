
import React, { useState } from 'react';
import { Volume2, Play, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTTS } from '@/contexts/TTSContext';
import { generateWebSpeech } from '@/services/webSpeechTTS';
import { toast } from 'sonner';

const VoiceChangerPage = () => {
  const [text, setText] = useState('Hello, I am testing the voice changer effect!');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const { availableVoices, isGenerating, setIsGenerating } = useTTS();

  const voiceEffects = [
    { name: 'Robot', pitch: 0.5, rate: 0.8 },
    { name: 'Chipmunk', pitch: 2, rate: 1.5 },
    { name: 'Monster', pitch: 0.3, rate: 0.6 },
    { name: 'Fast Speaker', pitch: 1.2, rate: 2 },
    { name: 'Slow & Deep', pitch: 0.7, rate: 0.5 },
    { name: 'Normal', pitch: 1, rate: 1 }
  ];

  const handleApplyEffect = (effect: typeof voiceEffects[0]) => {
    setPitch(effect.pitch);
    setRate(effect.rate);
  };

  const handlePlay = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setIsGenerating(true);
    try {
      const customSettings = {
        voice: availableVoices[0]?.name || '',
        model: 'web-speech',
        speed: rate,
        pitch: pitch,
        volume: volume,
        quality: 'standard' as const
      };
      
      await generateWebSpeech(text, customSettings, availableVoices);
      toast.success('Voice effect applied!');
    } catch (error) {
      console.error('Error applying voice effect:', error);
      toast.error('Failed to apply voice effect');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center">
          <Wand2 className="w-6 h-6 mr-3 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Voice Changer</h2>
        </div>
        <p className="text-gray-600 mt-1">Transform your voice with different effects</p>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Text Input</h3>
            <Textarea
              placeholder="Enter text to apply voice effects..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px] mb-4"
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Quick Effects</h3>
              <div className="grid grid-cols-2 gap-3">
                {voiceEffects.map((effect, index) => (
                  <Button
                    key={index}
                    onClick={() => handleApplyEffect(effect)}
                    variant="outline"
                    className="h-auto py-3"
                  >
                    {effect.name}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Manual Controls</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Pitch: {pitch.toFixed(1)}
                  </label>
                  <Slider
                    value={[pitch]}
                    onValueChange={(value) => setPitch(value[0])}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Speed: {rate.toFixed(1)}x
                  </label>
                  <Slider
                    value={[rate]}
                    onValueChange={(value) => setRate(value[0])}
                    min={0.1}
                    max={3}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Volume: {Math.round(volume * 100)}%
                  </label>
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <Button 
              onClick={handlePlay}
              disabled={isGenerating || !text.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              {isGenerating ? 'Applying Effect...' : 'Apply Voice Effect'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceChangerPage;
