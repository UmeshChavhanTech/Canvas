import React from 'react';
import { CollaborativeCanvas } from '@/components/canvas/CollaborativeCanvas';

export const Canvas = () => {
  return (
    <div className="h-screen bg-gray-50">
      <CollaborativeCanvas />
    </div>
  );
};
