
import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTTS } from '@/contexts/TTSContext';

const ApiKeyInput = () => {
  const { apiKey, setApiKey } = useTTS();
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempKey);
  };

  if (apiKey) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Key className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">API Key Configured</span>
          </div>
          <Button
            onClick={() => setApiKey('')}
            variant="outline"
            size="sm"
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            Change Key
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="space-y-3">
        <div className="flex items-center">
          <Key className="w-5 h-5 text-blue-600 mr-2" />
          <Label className="text-blue-900 font-medium">OpenAI API Key Required</Label>
        </div>
        <p className="text-sm text-blue-700">
          Enter your OpenAI API key to generate speech. Your key is stored locally and never shared.
        </p>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <Button onClick={handleSave} disabled={!tempKey.trim()}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
