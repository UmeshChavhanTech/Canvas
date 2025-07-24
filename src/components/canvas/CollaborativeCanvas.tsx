import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, Path, IText } from 'fabric';
import { CanvasToolbar } from './CanvasToolbar';
import { CollaboratorsList } from './CollaboratorsList';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

interface CollaborativeCanvasProps {
  roomId?: string;
  isReadOnly?: boolean;
}

export const CollaborativeCanvas: React.FC<CollaborativeCanvasProps> = ({ 
  roomId = 'demo-room', 
  isReadOnly = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState('#2563eb');
  const [brushSize, setBrushSize] = useState(5);
  const [activeTool, setActiveTool] = useState<'select' | 'draw' | 'rectangle' | 'circle' | 'text'>('draw');
  const { state: authState } = useAuth();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth < 768 ? window.innerWidth - 40 : 800,
      height: window.innerWidth < 768 ? 400 : 600,
      backgroundColor: '#ffffff',
      isDrawingMode: !isReadOnly,
    });

    // Configure drawing brush
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
    }

    // Add event listeners for collaboration
    canvas.on('path:created', (e) => {
      if (!isReadOnly) {
        console.log('Path created:', e);
        toast('Drawing synchronized with collaborators!');
      }
    });

    canvas.on('object:added', (e) => {
      if (!isReadOnly) {
        console.log('Object added:', e);
      }
    });

    canvas.on('object:modified', (e) => {
      if (!isReadOnly) {
        console.log('Object modified:', e);
      }
    });

    setFabricCanvas(canvas);
    toast.success('Canvas ready! Start creating amazing art!');

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth < 768 ? window.innerWidth - 40 : 800;
      const newHeight = window.innerWidth < 768 ? 400 : 600;
      canvas.setDimensions({ width: newWidth, height: newHeight });
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [roomId, isReadOnly]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === 'draw' && !isReadOnly;
    
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas, isReadOnly]);

  const handleToolClick = (tool: typeof activeTool) => {
    if (isReadOnly) return;
    
    setActiveTool(tool);

    if (tool === 'rectangle') {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 100,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas?.add(rect);
      fabricCanvas?.setActiveObject(rect);
      toast('Rectangle added to canvas!');
    } else if (tool === 'circle') {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        radius: 50,
        stroke: activeColor,
        strokeWidth: brushSize,
      });
      fabricCanvas?.add(circle);
      fabricCanvas?.setActiveObject(circle);
      toast('Circle added to canvas!');
    } else if (tool === 'text') {
      const text = new IText('Click to edit text', {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 20,
        fontFamily: 'Arial',
      });
      fabricCanvas?.add(text);
      fabricCanvas?.setActiveObject(text);
      toast('Text added to canvas!');
    }
  };

  const handleClear = () => {
    if (!fabricCanvas || isReadOnly) return;
    
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = '#ffffff';
    fabricCanvas.renderAll();
    toast.success('Canvas cleared!');
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
    
    const link = document.createElement('a');
    link.download = `artwork-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    toast.success('Artwork saved successfully!');
  };

  const handleUndo = () => {
    if (!fabricCanvas || isReadOnly) return;
    
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
      toast('Undid last action!');
    }
  };

  const mockCollaborators = [
    {
      id: '1',
      username: 'Umesh Chavhan',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c4?w=50&h=50&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      username: 'Harshal Mehre',
      email: 'bob@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="flex-1 flex flex-col gap-4 p-2 md:p-4">
        <CanvasToolbar
          activeTool={activeTool}
          onToolClick={handleToolClick}
          activeColor={activeColor}
          onColorChange={setActiveColor}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          onClear={handleClear}
          onSave={handleSave}
          onUndo={handleUndo}
          isReadOnly={isReadOnly}
        />
        
        <Card className="flex-1 flex items-center justify-center p-2 md:p-4 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner bg-white">
            <canvas 
              ref={canvasRef} 
              className="block cursor-crosshair max-w-full h-auto"
              style={{ touchAction: 'none' }}
            />
          </div>
        </Card>
      </div>
      
      {!isReadOnly && (
        <div className="w-full lg:w-80 p-2 md:p-4">
          <CollaboratorsList 
            collaborators={mockCollaborators}
            currentUser={authState.user}
          />
        </div>
      )}
    </div>
  );
};
