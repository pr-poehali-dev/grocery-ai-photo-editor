import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

const AuthModal = ({ open, onOpenChange, onLogin }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-effect border-primary/20">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center animate-glow">
              <Icon name="Sparkles" size={28} className="text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center gradient-text">
            Добро пожаловать в Grocery
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-primary hover:opacity-90 transition-opacity"
              >
                <Icon name="LogIn" className="mr-2" size={18} />
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Имя</Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Пароль</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-primary hover:opacity-90 transition-opacity"
              >
                <Icon name="UserPlus" className="mr-2" size={18} />
                Создать аккаунт
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">или</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full border-primary/30">
            <Icon name="Mail" className="mr-2" size={18} />
            Google
          </Button>
          <Button variant="outline" className="w-full border-primary/30">
            <Icon name="Github" className="mr-2" size={18} />
            GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
