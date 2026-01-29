import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface EditorWorkspaceProps {
  onBack: () => void;
}

const EditorWorkspace = ({ onBack }: EditorWorkspaceProps) => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [brushSize, setBrushSize] = useState([20]);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedObjects, setGeneratedObjects] = useState<Array<{id: number, url: string, prompt: string, position: {x: number, y: number}}>>([]);
  const { toast } = useToast();

  const tools = [
    { id: 'select', icon: 'MousePointer2', label: 'Выбрать' },
    { id: 'add-ai', icon: 'Sparkles', label: 'Добавить ИИ-объект' },
    { id: 'remove', icon: 'Eraser', label: 'Удалить объект' },
    { id: 'background', icon: 'ImageOff', label: 'Удалить фон' },
    { id: 'enhance', icon: 'Wand2', label: 'Улучшить' },
    { id: 'brush', icon: 'Paintbrush', label: 'Кисть' },
    { id: 'crop', icon: 'Crop', label: 'Обрезать' },
  ];

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    if (toolId === 'add-ai') {
      setAiDialogOpen(true);
    } else {
      toast({
        title: 'Инструмент выбран',
        description: `Выбран: ${tools.find(t => t.id === toolId)?.label}`,
      });
    }
  };

  const handleGenerateObject = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите описание объекта',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: 'Генерация началась',
      description: 'ИИ создаёт объект по вашему описанию...',
    });

    try {
      const response = await fetch('https://functions.poehali.dev/9898c7ee-1e43-4574-8eb5-74eba98fd377', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      const data = await response.json();
      
      if (data.imageUrl) {
        const newObject = {
          id: Date.now(),
          url: data.imageUrl,
          prompt: aiPrompt,
          position: { x: 100, y: 100 },
        };
        
        setGeneratedObjects(prev => [...prev, newObject]);
        setAiDialogOpen(false);
        setAiPrompt('');
        
        toast({
          title: 'Объект создан!',
          description: 'ИИ-объект добавлен на холст',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка генерации',
        description: 'Не удалось создать объект. Попробуйте ещё раз.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        toast({
          title: 'Изображение загружено',
          description: 'Теперь вы можете добавлять ИИ-объекты',
        });
      };
      reader.readAsDataURL(file);
    }
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

        <main className="flex-1 flex items-center justify-center p-8 bg-muted/20 relative">
          {!uploadedImage ? (
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
                <label htmlFor="image-upload">
                  <Button className="gradient-primary" asChild>
                    <span>
                      <Icon name="Upload" className="mr-2" size={18} />
                      Выбрать файл
                    </span>
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </Card>
          ) : (
            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="max-w-full max-h-[70vh] rounded-xl shadow-2xl"
                />
                {generatedObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className="absolute cursor-move hover:ring-2 hover:ring-primary rounded-lg transition-all"
                    style={{
                      left: `${obj.position.x}px`,
                      top: `${obj.position.y}px`,
                    }}
                  >
                    <img 
                      src={obj.url} 
                      alt={obj.prompt}
                      className="max-w-[200px] rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:border-primary/50 transition-all border-primary/40"
                onClick={() => setAiDialogOpen(true)}
              >
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 animate-glow">
                    <Icon name="Sparkles" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Добавить ИИ-объект</div>
                    <div className="text-xs text-muted-foreground">Генерация по описанию</div>
                  </div>
                </div>
              </Button>

              {[
                { icon: 'Eraser', label: 'Удалить объект', desc: 'Выделите и удалите' },
                { icon: 'ImageOff', label: 'Удалить фон', desc: 'Автоматически' },
                { icon: 'Wand2', label: 'Улучшить фото', desc: 'Повысить качество' },
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
                  Используйте ИИ для добавления объектов — опишите что хотите добавить
                </p>
              </div>
            </div>
          </Card>

          {generatedObjects.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="Layers" size={16} />
                Добавленные объекты
              </h3>
              <div className="space-y-2">
                {generatedObjects.map((obj) => (
                  <Card key={obj.id} className="p-3 bg-card/50 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2 justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{obj.prompt}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
        <DialogContent className="sm:max-w-lg glass-effect border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-glow">
                <Icon name="Sparkles" size={22} className="text-white" />
              </div>
              Добавить ИИ-объект
            </DialogTitle>
            <DialogDescription>
              Опишите объект, который хотите добавить на изображение
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">Описание объекта</Label>
              <Textarea
                id="ai-prompt"
                placeholder="Например: красная роза в вазе, золотая корона, летящая бабочка..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[100px] bg-background/50"
              />
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={18} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Советы для лучших результатов:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Будьте конкретны: цвет, размер, стиль</li>
                    <li>Укажите настроение: реалистично, мультяшно, винтаж</li>
                    <li>Используйте детали: текстуры, освещение</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setAiDialogOpen(false)}
                variant="outline"
                className="flex-1"
                disabled={isGenerating}
              >
                Отмена
              </Button>
              <Button
                onClick={handleGenerateObject}
                className="flex-1 gradient-primary"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Icon name="Wand2" className="mr-2" size={18} />
                    Создать объект
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorWorkspace;