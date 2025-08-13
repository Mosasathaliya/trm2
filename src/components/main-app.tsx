/**
 * @fileoverview Main application component that orchestrates the layout, navigation, and screens.
 */

import { useState, useEffect } from "react";
import { Home, Book, Bot, BarChart, Sun, Moon, Puzzle, FileText, Brain } from "lucide-react";
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

// Working HomeScreen with actual content
function HomeScreen({ setActiveTab }: { setActiveTab: (tab: ActiveTab) => void }) {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl font-bold mb-4 text-center">لوحة التحكم الخاصة بك</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        مرحباً بك! ابدأ رحلتك التعليمية من هنا.
      </p>
      
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">الأدوات التفاعلية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">مُنشئ المفردات</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              قم بتوسيع مفرداتك مع كلمات وتعريفات وأمثلة مولدة بالذكاء الاصطناعي.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              ابدأ التعلم
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Bot className="h-6 w-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold">مغامرة جيمني</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              العب لعبة مغامرة نصية لتعلم المفردات في سياقها.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              ابدأ المغامرة
            </Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Home className="h-6 w-6 text-yellow-500" />
              </div>
              <h4 className="text-lg font-semibold">صانع القصص</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              حوّل أفكارك إلى قصص قصيرة مصورة باللغة الإنجليزية.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              ابدأ الكتابة
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Book className="h-6 w-6 text-destructive" />
              </div>
              <h4 className="text-lg font-semibold">خبير الأزمنة</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              تحدث مع خبير الذكاء الاصطناعي لإتقان أزمنة اللغة الإنجليزية.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              تحدث مع الخبير
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Puzzle className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold">لعبة الكلمات المبعثرة</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              أعد ترتيب الحروف لتكوين كلمات وحسّن مهاراتك الإملائية.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              ابدأ اللعبة
            </Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <FileText className="h-6 w-6 text-pink-500" />
              </div>
              <h4 className="text-lg font-semibold">قصصي واختباراتي</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              اقرأ القصص التي أنشأتها واختبر فهمك.
            </p>
            <Button onClick={() => setActiveTab("progress")} className="w-full">
              عرض القصص
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">الموارد التعليمية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Book className="h-6 w-6 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold">مواد تعليمية</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              تصفح مكتبة الدروس المنظمة حسب المستوى والموضوع.
            </p>
            <Button onClick={() => setActiveTab("book")} className="w-full">
              تصفح المكتبة
            </Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <Home className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="text-lg font-semibold">تعلم بالفيديو</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              شاهد فيديوهات يوتيوب تعليمية مباشرة داخل التطبيق.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              شاهد الفيديوهات
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <h4 className="text-lg font-semibold">ماذا لو...؟</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              استكشف سيناريوهات علمية رائعة مع شرح الذكاء الاصطناعي.
            </p>
            <Button onClick={() => setActiveTab("ai")} className="w-full">
              استكشف السيناريوهات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Working BookScreen
function BookScreen() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center">مكتبة الدروس</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((unit) => (
          <div key={unit} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3">الوحدة {unit}</h3>
            <p className="text-muted-foreground mb-4">
              دروس تفاعلية لتعلم اللغة الإنجليزية بطريقة ممتعة وفعالة.
            </p>
            <Button className="w-full">ابدأ الدرس</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Working AiScreen
function AiScreen({ setActiveTab }: { setActiveTab: (tab: ActiveTab) => void }) {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center">الذكاء الاصطناعي</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">محادثة ذكية</h3>
          <p className="text-muted-foreground mb-4">
            تحدث مع الذكاء الاصطناعي لتعلم اللغة الإنجليزية.
          </p>
          <Button className="w-full">ابدأ المحادثة</Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">إنشاء القصص</h3>
          <p className="text-muted-foreground mb-4">
            اطلب من الذكاء الاصطناعي إنشاء قصص تعليمية.
          </p>
          <Button className="w-full">أنشئ قصة</Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">ترجمة ذكية</h3>
          <p className="text-muted-foreground mb-4">
            ترجم النصوص مع شرح القواعد والمفردات.
          </p>
          <Button className="w-full">ابدأ الترجمة</Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">ممارسة المحادثة</h3>
          <p className="text-muted-foreground mb-4">
            تدرب على المحادثة مع مساعد صوتي ذكي.
          </p>
          <Button className="w-full">ابدأ التدريب</Button>
        </div>
      </div>
    </div>
  );
}

// Working ProgressScreen
function ProgressScreen() {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center">تقدمك التعليمي</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">الدروس المكتملة</h3>
          <div className="text-3xl font-bold text-primary mb-2">12</div>
          <p className="text-muted-foreground">من أصل 20 درس</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">النقاط المكتسبة</h3>
          <div className="text-3xl font-bold text-accent mb-2">850</div>
          <p className="text-muted-foreground">نقطة</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">أيام التعلم</h3>
          <div className="text-3xl font-bold text-green-500 mb-2">15</div>
          <p className="text-muted-foreground">يوم متتالي</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-3">المستوى الحالي</h3>
          <div className="text-3xl font-bold text-purple-500 mb-2">متوسط</div>
          <p className="text-muted-foreground">B1</p>
        </div>
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
