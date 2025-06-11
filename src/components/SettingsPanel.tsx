
import React from 'react';
import { Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useTTS } from '@/contexts/TTSContext';

const SettingsPanel = () => {
  const { settings, updateSettings, availableVoices } = useTTS();

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
                    {settings.voice ? settings.voice.charAt(0).toUpperCase() : 'V'}
                  </span>
                </div>
                <SelectValue placeholder="Select a voice" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {availableVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Engine</Label>
          <Select value={settings.model} onValueChange={(value) => updateSettings({ model: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-speech">Web Speech API</SelectItem>
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
            min={0.1}
            max={2.0}
            step={0.1}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {settings.speed}x
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <Label className="text-sm font-medium text-gray-700">Pitch</Label>
          </div>
          <Slider
            value={[settings.pitch]}
            onValueChange={(value) => updateSettings({ pitch: value[0] })}
            min={0.1}
            max={2.0}
            step={0.1}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {settings.pitch.toFixed(1)}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <Label className="text-sm font-medium text-gray-700">Volume</Label>
          </div>
          <Slider
            value={[settings.volume]}
            onValueChange={(value) => updateSettings({ volume: value[0] })}
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {Math.round(settings.volume * 100)}%
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-blue-900">Web Speech Ready</span>
          </div>
          <p className="text-xs text-blue-700">
            Using browser's built-in speech synthesis. No API key required!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
