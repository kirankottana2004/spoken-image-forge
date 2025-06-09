
import React from 'react';
import { FileText, Smile, Mic, Video, User, Heart } from 'lucide-react';

interface SuggestionCardsProps {
  onSuggestionClick: (text: string) => void;
}

const SuggestionCards = ({ onSuggestionClick }: SuggestionCardsProps) => {
  const suggestions = [
    {
      icon: FileText,
      title: 'Narrate a story',
      text: 'Once upon a time, in a land far away, there lived a curious young explorer who discovered a magical forest filled with talking animals and enchanted trees.'
    },
    {
      icon: Smile,
      title: 'Tell a silly joke',
      text: 'Why don\'t scientists trust atoms? Because they make up everything! And why did the scarecrow win an award? He was outstanding in his field!'
    },
    {
      icon: Mic,
      title: 'Record an advertisement',
      text: 'Introducing the revolutionary new product that will change your life forever. Experience unmatched quality, incredible value, and satisfaction guaranteed.'
    },
    {
      icon: Video,
      title: 'Direct a dramatic movie scene',
      text: 'The rain poured down as she stood at the edge of the cliff, her heart pounding with the weight of the decision that would change everything forever.'
    },
    {
      icon: User,
      title: 'Hear from a video game character',
      text: 'Greetings, brave adventurer! Your quest awaits in the mystical realm beyond. Gather your courage, for the fate of the kingdom rests in your hands.'
    },
    {
      icon: Heart,
      title: 'Guide a meditation class',
      text: 'Take a deep breath in, and slowly exhale. Feel your body relaxing as you release all tension. Let your mind become calm and peaceful like still water.'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Get started with</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left group"
          >
            <div className="flex items-center mb-2">
              <suggestion.icon className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">{suggestion.title}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {suggestion.text.substring(0, 80)}...
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionCards;
