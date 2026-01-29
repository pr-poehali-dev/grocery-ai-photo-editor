import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface GallerySectionProps {
  onBack: () => void;
}

const GallerySection = ({ onBack }: GallerySectionProps) => {
  const mockProjects = [
    { id: 1, title: 'Фото без фона', date: '2 часа назад', thumbnail: '🖼️' },
    { id: 2, title: 'Удаление объекта', date: 'Вчера', thumbnail: '🎨' },
    { id: 3, title: 'Улучшенное фото', date: '3 дня назад', thumbnail: '✨' },
    { id: 4, title: 'Портрет', date: 'Неделю назад', thumbnail: '👤' },
    { id: 5, title: 'Пейзаж', date: '2 недели назад', thumbnail: '🏞️' },
    { id: 6, title: 'Продукт', date: 'Месяц назад', thumbnail: '📦' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border glass-effect sticky top-0 z-50">
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
            <span className="text-muted-foreground">/ Галерея</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input 
                placeholder="Поиск проектов..." 
                className="pl-10 bg-background/50"
              />
            </div>
            <Button className="gradient-primary">
              <Icon name="Plus" className="mr-2" size={18} />
              Новый проект
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Мои проекты</h1>
            <p className="text-muted-foreground">
              Всего проектов: {mockProjects.length}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="LayoutGrid" className="mr-2" size={16} />
              Сетка
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="List" className="mr-2" size={16} />
              Список
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="group overflow-hidden glass-effect hover:border-primary/50 transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {project.thumbnail}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{project.date}</p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 hover:border-primary/50"
                  >
                    <Icon name="Eye" className="mr-2" size={14} />
                    Открыть
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="hover:border-primary/50"
                  >
                    <Icon name="Download" size={14} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="hover:border-destructive/50 hover:text-destructive"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 glass-effect border-primary/20 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto">
              <Icon name="Folder" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold">Хотите создать новый проект?</h3>
            <p className="text-muted-foreground">
              Начните с загрузки изображения и используйте мощные ИИ-инструменты
            </p>
            <Button className="gradient-primary">
              <Icon name="Plus" className="mr-2" size={18} />
              Создать проект
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default GallerySection;
