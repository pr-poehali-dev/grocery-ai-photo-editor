import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface PricingSectionProps {
  onBack: () => void;
}

const PricingSection = ({ onBack }: PricingSectionProps) => {
  const plans = [
    {
      name: 'Бесплатный',
      price: '0',
      period: 'навсегда',
      description: 'Для знакомства с платформой',
      features: [
        '5 ИИ-обработок в месяц',
        'Базовое удаление объектов',
        'Удаление фона',
        'Разрешение до 1080p',
        'Водяной знак Grocery',
      ],
      popular: false,
      cta: 'Начать бесплатно',
      gradient: 'from-muted to-muted',
    },
    {
      name: 'Про',
      price: '990',
      period: 'в месяц',
      description: 'Для профессионалов',
      features: [
        '100 ИИ-обработок в месяц',
        'Все инструменты удаления',
        'Улучшение качества до 4K',
        'Без водяных знаков',
        'Приоритетная поддержка',
        'История изменений',
      ],
      popular: true,
      cta: 'Начать пробный период',
      gradient: 'from-primary via-secondary to-accent',
    },
    {
      name: 'Бизнес',
      price: '2990',
      period: 'в месяц',
      description: 'Для команд и студий',
      features: [
        'Неограниченные обработки',
        'API доступ',
        'Пакетная обработка',
        'Кастомные модели ИИ',
        'Приоритетная поддержка 24/7',
        'Командный доступ',
        'Белая метка',
      ],
      popular: false,
      cta: 'Связаться с нами',
      gradient: 'from-accent to-primary',
    },
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
            <span className="text-muted-foreground">/ Тарифы</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">
            Выберите свой <span className="gradient-text">тариф</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Начните с бесплатного плана или выберите Про для полного доступа к ИИ-инструментам
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 animate-slide-up ${
                plan.popular
                  ? 'glass-effect border-2 border-primary shadow-2xl shadow-primary/20'
                  : 'glass-effect'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`h-1 bg-gradient-to-r ${plan.gradient}`} />
                  <div className="absolute top-4 right-4">
                    <Badge className="gradient-primary">Популярный</Badge>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold gradient-text">
                      {plan.price}
                    </span>
                    <span className="text-lg text-muted-foreground">₽</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                </div>

                <Button
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'gradient-primary hover:opacity-90 animate-glow'
                      : 'border-primary/50 hover:bg-primary/10'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto p-8 glass-effect border-primary/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Нужен индивидуальный <span className="gradient-text">план</span>?
              </h2>
              <p className="text-muted-foreground mb-6">
                Свяжитесь с нами для обсуждения корпоративных решений, 
                специальных тарифов и дополнительных возможностей
              </p>
              <div className="flex gap-3">
                <Button className="gradient-primary">
                  <Icon name="MessageCircle" className="mr-2" size={18} />
                  Связаться
                </Button>
                <Button variant="outline" className="border-primary/50">
                  <Icon name="Calendar" className="mr-2" size={18} />
                  Забронировать звонок
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'Shield', text: 'Безопасность данных' },
                { icon: 'Zap', text: 'Приоритетная обработка' },
                { icon: 'Users', text: 'Командная работа' },
                { icon: 'HeadphonesIcon', text: 'Персональная поддержка' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50"
                >
                  <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                    <Icon name={item.icon as any} size={20} className="text-white" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Все планы включают 14-дневный пробный период без привязки карты
          </p>
        </div>
      </main>
    </div>
  );
};

export default PricingSection;
