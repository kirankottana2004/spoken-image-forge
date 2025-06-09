
import React from 'react';
import { Mic, History, Play, Wand2, Volume2 } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Mic, label: 'Text to Speech', active: true },
    { icon: History, label: 'History' },
    { icon: Play, label: 'Playground' },
    { icon: Wand2, label: 'Voice Changer' },
    { icon: Volume2, label: 'Sound Effects' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">OpenAI TTS</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                  item.active 
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
