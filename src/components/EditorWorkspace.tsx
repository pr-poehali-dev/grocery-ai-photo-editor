import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface EditorWorkspaceProps {
  onBack: () => void;
}

const EditorWorkspace = ({ onBack }: EditorWorkspaceProps) => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [brushSize, setBrushSize] = useState([20]);
  const { toast } = useToast();

  const tools = [
    { id: 'select', icon: 'MousePointer2', label: 'Выбрать' },
    { id: 'remove', icon: 'Eraser', label: 'Удалить объект' },
    { id: 'background', icon: 'ImageOff', label: 'Удалить фон' },
    { id: 'enhance', icon: 'Sparkles', label: 'Улучшить' },
    { id: 'brush', icon: 'Paintbrush', label: 'Кисть' },
    { id: 'crop', icon: 'Crop', label: 'Обрезать' },
  ];

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    toast({
      title: 'Инструмент выбран',
      description: `Выбран: ${tools.find(t => t.id === toolId)?.label}`,
    });
  };

  const handleExport = () => {
    toast({
      title: 'Экспорт',
      description: 'Изображение будет сохранено в галерею',
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border glass-effect">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Grocery</span>
            </div>
            <span className="text-muted-foreground">/ Редактор</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Icon name="Undo2" className="mr-2" size={16} />
              Отменить
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Redo2" className="mr-2" size={16} />
              Повторить
            </Button>
            <Button onClick={handleExport} className="gradient-primary">
              <Icon name="Download" className="mr-2" size={16} />
              Экспорт
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-20 border-r border-border glass-effect flex flex-col items-center py-6 gap-4">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? 'default' : 'ghost'}
              size="icon"
              className={`w-14 h-14 rounded-xl transition-all ${
                selectedTool === tool.id ? 'gradient-primary animate-glow' : ''
              }`}
              onClick={() => handleToolClick(tool.id)}
              title={tool.label}
            >
              <Icon name={tool.icon as any} size={24} />
            </Button>
          ))}
        </aside>

        <main className="flex-1 flex items-center justify-center p-8 bg-muted/20">
          <Card className="w-full max-w-4xl aspect-video glass-effect border-2 border-dashed border-primary/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto animate-pulse">
                <Icon name="ImagePlus" size={40} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold mb-2">Загрузите изображение</p>
                <p className="text-muted-foreground">
                  Перетащите файл сюда или нажмите для выбора
                </p>
              </div>
              <Button className="gradient-primary">
                <Icon name="Upload" className="mr-2" size={18} />
                Выбрать файл
              </Button>
            </div>
          </Card>
        </main>

        <aside className="w-80 border-l border-border glass-effect p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Настройки инструмента
            </h3>
            
            <Card className="p-4 space-y-4 bg-card/50">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Размер кисти</span>
                  <span className="text-sm text-muted-foreground">{brushSize[0]}px</span>
                </div>
                <Slider
                  value={brushSize}
                  onValueChange={setBrushSize}
                  min={5}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Точность ИИ</span>
                <div className="grid grid-cols-3 gap-2">
                  {['Низкая', 'Средняя', 'Высокая'].map((level) => (
                    <Button
                      key={level}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Zap" size={20} className="text-primary" />
              ИИ-функции
            </h3>
            
            <div className="space-y-2">
              {[
                { icon: 'Eraser', label: 'Удалить объект', desc: 'Выделите и удалите' },
                { icon: 'ImageOff', label: 'Удалить фон', desc: 'Автоматически' },
                { icon: 'Sparkles', label: 'Улучшить фото', desc: 'Повысить качество' },
              ].map((func) => (
                <Button
                  key={func.label}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                      <Icon name={func.icon as any} size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{func.label}</div>
                      <div className="text-xs text-muted-foreground">{func.desc}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Card className="p-4 gradient-primary/10 border-primary/30">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-1" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Совет</p>
                <p className="text-muted-foreground">
                  Используйте кисть для точного выделения объектов перед удалением
                </p>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default EditorWorkspace;
