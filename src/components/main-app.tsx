/**
 * @fileoverview Main application component that orchestrates the layout, navigation, and screens.
 */

import { useState, useEffect } from "react";
import { Home, Book, Bot, BarChart, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { BackgroundShapes } from "./triangular-background";

export type ActiveTab = "home" | "book" | "ai" | "progress";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 px-4 py-1 transition-all transform hover:scale-110 ${
        isActive ? "text-primary scale-110 font-bold" : "text-muted-foreground"
      }`}
    >
      <span className="transform transition-transform">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
}

// Simple test component
function TestHomeScreen() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-4">لوحة التحكم الخاصة بك</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        مرحباً بك! ابدأ رحلتك التعليمية من هنا.
      </p>
      <div className="bg-card p-6 rounded-lg max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">اختبار التطبيق</h3>
        <p className="text-sm text-muted-foreground">
          إذا كنت ترى هذا النص، فهذا يعني أن التطبيق يعمل بشكل صحيح!
        </p>
      </div>
    </div>
  );
}

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <TestHomeScreen />;
      case "book": return <div className="text-center py-20"><h2>المكتبة</h2></div>;
      case "ai": return <div className="text-center py-20"><h2>الذكاء الاصطناعي</h2></div>;
      case "progress": return <div className="text-center py-20"><h2>التقدم</h2></div>;
      default: return <TestHomeScreen />;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative overflow-hidden">
      <BackgroundShapes />
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-6 shrink-0">
          <h1 className="text-2xl font-bold">
              {activeTab !== 'home' && 'Learn English'}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent"
          >
            {mounted && (theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />)}
            <span className="sr-only">تبديل الوضع</span>
          </Button>
        </header>

        {/* Main Content */}
        <main className="px-6 pb-24 flex-grow overflow-y-auto">
          {renderScreen()}
        </main>

        {/* Transparent Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/70 border-t border-border/50 shrink-0">
          <div className="flex justify-around py-3">
            <NavItem icon={<Home />} label="الرئيسية" isActive={activeTab === "home"} onClick={() => setActiveTab("home")} />
            <NavItem icon={<Book />} label="المكتبة" isActive={activeTab === "book"} onClick={() => setActiveTab("book")} />
            <NavItem icon={<Bot />} label="الذكاء الاصطناعي" isActive={activeTab === "ai"} onClick={() => setActiveTab("ai")} />
            <NavItem icon={<BarChart />} label="التقدم" isActive={activeTab === "progress"} onClick={() => setActiveTab("progress")} />
          </div>
        </nav>
      </div>
    </div>
  );
}
