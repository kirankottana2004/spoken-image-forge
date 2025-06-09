
import React from 'react';
import { Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTTS } from '@/contexts/TTSContext';

const SettingsPanel = () => {
  const { settings, updateSettings } = useTTS();

  const voices = [
    { value: 'alloy', label: 'Alloy' },
    { value: 'echo', label: 'Echo' },
    { value: 'fable', label: 'Fable' },
    { value: 'onyx', label: 'Onyx' },
    { value: 'nova', label: 'Nova' },
    { value: 'shimmer', label: 'Shimmer' }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Settings className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Voice</Label>
          <Select value={settings.voice} onValueChange={(value) => updateSettings({ voice: value })}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-medium text-sm">
                    {settings.voice.charAt(0).toUpperCase()}
                  </span>
                </div>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.value} value={voice.value}>
                  {voice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Model</Label>
          <Select value={settings.model} onValueChange={(value) => updateSettings({ model: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tts-1">Standard (TTS-1)</SelectItem>
              <SelectItem value="tts-1-hd">HD Quality (TTS-1-HD)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <Label className="text-sm font-medium text-gray-700">Speed</Label>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>
          <Slider
            value={[settings.speed]}
            onValueChange={(value) => updateSettings({ speed: value[0] })}
            min={0.25}
            max={4.0}
            step={0.25}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {settings.speed}x
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">HD Quality</Label>
            <Switch
              checked={settings.quality === 'hd'}
              onCheckedChange={(checked) => 
                updateSettings({ 
                  quality: checked ? 'hd' : 'standard',
                  model: checked ? 'tts-1-hd' : 'tts-1'
                })
              }
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Higher quality audio with increased processing time
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
