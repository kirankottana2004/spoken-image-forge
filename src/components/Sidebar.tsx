
import React from 'react';
import { Mic, History, Play, Wand2, Volume2 } from 'lucide-react';
import { useTTS } from '@/contexts/TTSContext';

const Sidebar = () => {
  const { currentPage, setCurrentPage } = useTTS();

  const menuItems = [
    { icon: Mic, label: 'Text to Speech', id: 'text-to-speech' },
    { icon: History, label: 'History', id: 'history' },
    { icon: Play, label: 'Playground', id: 'playground' },
    { icon: Wand2, label: 'Voice Changer', id: 'voice-changer' },
    { icon: Volume2, label: 'Sound Effects', id: 'sound-effects' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Web TTS Studio</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-gray-100 text-gray-900 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
