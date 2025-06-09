
import React from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import SettingsPanel from '@/components/SettingsPanel';
import { TTSProvider } from '@/contexts/TTSContext';

const Index = () => {
  return (
    <TTSProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <MainContent />
        <SettingsPanel />
      </div>
    </TTSProvider>
  );
};

export default Index;
