import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  MousePointer2, 
  Brush, 
  Square, 
  Circle, 
  Type, 
  Trash2, 
  Save,
  Palette,
  Undo
} from 'lucide-react';

interface CanvasToolbarProps {
  activeTool: 'select' | 'draw' | 'rectangle' | 'circle' | 'text';
  onToolClick: (tool: 'select' | 'draw' | 'rectangle' | 'circle' | 'text') => void;
  activeColor: string;
  onColorChange: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  onClear: () => void;
  onSave: () => void;
  onUndo: () => void;
  isReadOnly?: boolean;
}

const colors = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', 
  '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
];

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  activeTool,
  onToolClick,
  activeColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  onClear,
  onSave,
  onUndo,
  isReadOnly = false,
}) => {
  return (
    <Card className="p-2 md:p-4 bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Drawing Tools */}
        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          <Button
            variant={activeTool === 'select' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolClick('select')}
            disabled={isReadOnly}
            className="h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
          >
            <MousePointer2 className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Select</span>
          </Button>
          
          <Button
            variant={activeTool === 'draw' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolClick('draw')}
            disabled={isReadOnly}
            className="h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
          >
            <Brush className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Draw</span>
          </Button>
          
          <Button
            variant={activeTool === 'rectangle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolClick('rectangle')}
            disabled={isReadOnly}
            className="h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
          >
            <Square className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Rectangle</span>
          </Button>
          
          <Button
            variant={activeTool === 'circle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolClick('circle')}
            disabled={isReadOnly}
            className="h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
          >
            <Circle className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Circle</span>
          </Button>
          
          <Button
            variant={activeTool === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToolClick('text')}
            disabled={isReadOnly}
            className="h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
          >
            <Type className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Text</span>
          </Button>
        </div>

        {/* Color Palette */}
        {!isReadOnly && (
          <div className="flex items-center gap-2 flex-wrap">
            <Palette className="h-4 w-4 text-gray-600 hidden md:block" />
            <div className="flex gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all hover:scale-110 ${
                    activeColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}
                />
              ))}
            </div>
            <input
              type="color"
              value={activeColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-6 h-6 md:w-8 md:h-8 rounded border cursor-pointer"
            />
          </div>
        )}

        {/* Brush Size */}
        {!isReadOnly && (
          <div className="flex items-center gap-2 min-w-24 md:min-w-32">
            <Label className="text-xs md:text-sm text-gray-600">Size:</Label>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => onBrushSizeChange(value[0])}
              max={50}
              min={1}
              step={1}
              className="flex-1"
            />
            <span className="text-xs md:text-sm text-gray-600 w-6 md:w-8">{brushSize}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {!isReadOnly && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onUndo}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
              >
                <Undo className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Undo</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Clear</span>
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 h-8 w-8 p-0 md:h-auto md:w-auto md:px-3"
          >
            <Save className="h-4 w-4" />
            <span className="hidden md:inline ml-2">Save</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
