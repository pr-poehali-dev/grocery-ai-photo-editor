import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';
import EditorWorkspace from '@/components/EditorWorkspace';
import GallerySection from '@/components/GallerySection';
import PricingSection from '@/components/PricingSection';

const Index = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<'landing' | 'editor' | 'gallery' | 'pricing'>('landing');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setAuthOpen(false);
    setActiveView('editor');
  };

  if (activeView === 'editor' && isLoggedIn) {
    return <EditorWorkspace onBack={() => setActiveView('landing')} />;
  }

  if (activeView === 'gallery' && isLoggedIn) {
    return <GallerySection onBack={() => setActiveView('landing')} />;
  }

  if (activeView === 'pricing') {
    return <PricingSection onBack={() => setActiveView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-glow">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Grocery</span>
          </div>
          
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveView('editor')}
                  className="hover:text-primary transition-colors"
                >
                  Редактор
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveView('gallery')}
                  className="hover:text-primary transition-colors"
                >
                  Галерея
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveView('pricing')}
                  className="hover:text-primary transition-colors"
                >
                  Подписки
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => setActiveView('pricing')}
                  className="hover:text-primary transition-colors"
                >
                  Тарифы
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setAuthOpen(true)}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  Войти
                </Button>
              </>
            )}
            <Button 
              onClick={() => isLoggedIn ? setActiveView('editor') : setAuthOpen(true)}
              className="gradient-primary hover:opacity-90 transition-opacity"
            >
              Начать работу
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full glass-effect border border-primary/30 text-sm mb-6">
                <span className="gradient-text font-semibold">✨ Редактор изображений с ИИ</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Редактируйте фото с помощью{' '}
              <span className="gradient-text">искусственного интеллекта</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Удаляйте ненужные объекты, меняйте фон и улучшайте изображения 
              одним кликом. Профессиональные результаты без навыков дизайна.
            </p>

            <div className="flex gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                onClick={() => isLoggedIn ? setActiveView('editor') : setAuthOpen(true)}
                className="gradient-primary text-lg px-8 py-6 hover:opacity-90 transition-opacity animate-glow"
              >
                <Icon name="Wand2" className="mr-2" size={20} />
                Попробовать бесплатно
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveView('pricing')}
                className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10"
              >
                Посмотреть тарифы
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Eraser',
                title: 'Удаление объектов',
                description: 'Уберите ненужные элементы с фото одним движением. ИИ автоматически заполнит пробелы.'
              },
              {
                icon: 'ImageOff',
                title: 'Замена фона',
                description: 'Удалите или замените фон за секунды. Идеально для предметной съёмки и портретов.'
              },
              {
                icon: 'Sparkles',
                title: 'Улучшение качества',
                description: 'Повысьте резкость, улучшите цвета и восстановите детали автоматически.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-effect p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6">
                  <Icon name={feature.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Готовы к магии <span className="gradient-text">ИИ-редактирования</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Присоединяйтесь к тысячам пользователей, которые уже создают потрясающие изображения
          </p>
          <Button 
            size="lg"
            onClick={() => isLoggedIn ? setActiveView('editor') : setAuthOpen(true)}
            className="gradient-primary text-lg px-10 py-6 hover:opacity-90 transition-opacity"
          >
            Начать бесплатно
          </Button>
        </div>
      </section>

      <AuthModal 
        open={authOpen} 
        onOpenChange={setAuthOpen}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
