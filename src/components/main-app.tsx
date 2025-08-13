/**
 * @fileoverview Main application component that orchestrates the layout, navigation, and screens.
 */

import { useState, useEffect } from "react";
import { Home, Book, Bot, BarChart, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { BackgroundShapes } from "./triangular-background";
import { HomeScreen, BookScreen, AiScreen, ProgressScreen } from "./screens";

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

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen setActiveTab={setActiveTab} />;
      case "book": return <BookScreen />;
      case "ai": return <AiScreen setActiveTab={setActiveTab} />;
      case "progress": return <ProgressScreen />;
      default: return <HomeScreen setActiveTab={setActiveTab} />;
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
