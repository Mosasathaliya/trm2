"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Database, 
  Search, 
  Save, 
  TrendingUp, 
  DollarSign, 
  Lightbulb,
  BookOpen,
  MessageCircle,
  ImageIcon,
  Mic,
  Languages,
  Zap,
  History,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { 
  ragSystem, 
  storeAIContent, 
  searchRAG, 
  generateWithRAG, 
  getRAGAnalytics,
  type RAGDocument,
  type RAGQuery,
  type RAGGenerationContext
} from '@/lib/rag-system';
import { 
  generateText, 
  generateImage, 
  generateSpeech, 
  translateTextEnhanced,
  AI_MODELS 
} from '@/lib/cloudflare-ai';
import { speakText } from '@/lib/tts-system';
import { useToast } from '@/hooks/use-toast';

interface RAGEnhancedAIPanelProps {
  className?: string;
}

export function RAGEnhancedAIPanel({ className }: RAGEnhancedAIPanelProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RAGDocument[]>([]);
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [ragContext, setRagContext] = useState<RAGDocument[]>([]);
  const [analytics, setAnalytics] = useState(getRAGAnalytics());
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const { toast } = useToast();

  useEffect(() => {
    updateAnalytics();
  }, []);

  const updateAnalytics = () => {
    setAnalytics(getRAGAnalytics());
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchRAG(searchQuery, {
        maxResults: 10,
        similarityThreshold: 0.6
      });
      setSearchResults(results.map(r => r.document));
    } catch (error) {
      console.error('RAG search failed:', error);
      toast({
        title: "Search Failed",
        description: "Failed to search RAG system",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateWithRAG = async () => {
    if (!generationPrompt.trim()) return;
    
    setIsLoading(true);
    try {
      // First, search for relevant context
      const searchResults = await searchRAG(generationPrompt, {
        maxResults: 3,
        similarityThreshold: 0.5
      });

      const context: RAGGenerationContext = {
        query: generationPrompt,
        retrievedDocuments: searchResults.map(r => r.document),
        language: selectedLanguage,
        difficulty: selectedDifficulty
      };

      const result = await generateWithRAG(generationPrompt, context, {
        maxTokens: 500,
        temperature: 0.7
      });

      setGeneratedContent(result.content);
      setRagContext(result.ragContext);

      toast({
        title: "Content Generated",
        description: `Generated with RAG context (${result.ragContext.length} documents)`,
      });

      updateAnalytics();
    } catch (error) {
      console.error('RAG generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate content with RAG",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreContent = async (content: string, type: RAGDocument['metadata']['type']) => {
    try {
      await storeAIContent(content, type, {
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        tags: [type, 'manual-store']
      });
      
      toast({
        title: "Content Stored",
        description: "Content has been added to RAG system",
      });
      
      updateAnalytics();
    } catch (error) {
      console.error('Failed to store content:', error);
      toast({
        title: "Storage Failed",
        description: "Failed to store content in RAG system",
        variant: "destructive"
      });
    }
  };

  const handleCleanup = async () => {
    try {
      const removedCount = ragSystem.cleanupOldDocuments(7); // Remove documents older than 7 days
      toast({
        title: "Cleanup Complete",
        description: `Removed ${removedCount} old documents`,
      });
      updateAnalytics();
    } catch (error) {
      console.error('Cleanup failed:', error);
      toast({
        title: "Cleanup Failed",
        description: "Failed to cleanup old documents",
        variant: "destructive"
      });
    }
  };

  const handleQuickGenerate = async (type: string) => {
    const prompts = {
      lesson: `Generate a ${selectedDifficulty} level lesson about language learning in ${selectedLanguage}`,
      vocabulary: `Create a vocabulary list for ${selectedDifficulty} level ${selectedLanguage} learners`,
      grammar: `Explain a grammar concept for ${selectedDifficulty} level ${selectedLanguage} students`,
      conversation: `Generate a conversation scenario for ${selectedDifficulty} level ${selectedLanguage} practice`
    };

    const prompt = prompts[type as keyof typeof prompts] || prompts.lesson;
    setGenerationPrompt(prompt);
    await handleGenerateWithRAG();
  };

  const handleTTS = async (text: string) => {
    try {
      await speakText(text, { language: selectedLanguage });
    } catch (error) {
      console.error('TTS failed:', error);
      toast({
        title: "TTS Failed",
        description: "Failed to generate speech",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            RAG-Enhanced AI Learning System
          </h2>
          <p className="text-muted-foreground">
            Cost-effective AI-powered learning with intelligent content reuse
          </p>
        </div>
        <Button onClick={updateAnalytics} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="search">Search & Retrieve</TabsTrigger>
          <TabsTrigger value="generate">Generate with RAG</TabsTrigger>
          <TabsTrigger value="store">Store Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalDocuments}</div>
                <p className="text-xs text-muted-foreground">
                  Stored in RAG system
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalCost.toFixed(4)}</div>
                <p className="text-xs text-muted-foreground">
                  AI generation costs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.costSavings.toFixed(4)}</div>
                <p className="text-xs text-muted-foreground">
                  From content reuse
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.totalDocuments > 0 
                    ? Math.round((analytics.costSavings / (analytics.totalCost + analytics.costSavings)) * 100)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Cost efficiency rate
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Generate common content types with RAG enhancement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleQuickGenerate('lesson')} 
                    variant="outline" 
                    size="sm"
                    disabled={isLoading}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Lesson
                  </Button>
                  <Button 
                    onClick={() => handleQuickGenerate('vocabulary')} 
                    variant="outline" 
                    size="sm"
                    disabled={isLoading}
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    Vocabulary
                  </Button>
                  <Button 
                    onClick={() => handleQuickGenerate('grammar')} 
                    variant="outline" 
                    size="sm"
                    disabled={isLoading}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Grammar
                  </Button>
                  <Button 
                    onClick={() => handleQuickGenerate('conversation')} 
                    variant="outline" 
                    size="sm"
                    disabled={isLoading}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest content added to RAG system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {analytics.recentActivity.slice(0, 5).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {doc.metadata.type}
                          </Badge>
                          <span className="truncate max-w-32">
                            {doc.content.substring(0, 30)}...
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(doc.metadata.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Search & Retrieve Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search RAG System
              </CardTitle>
              <CardDescription>
                Find relevant content from previous AI generations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter search query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Search Results ({searchResults.length})</h4>
                  <ScrollArea className="h-64">
                    {searchResults.map((doc) => (
                      <Card key={doc.id} className="mb-3">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex gap-2">
                              <Badge variant="outline">{doc.metadata.type}</Badge>
                              {doc.metadata.language && (
                                <Badge variant="secondary">{doc.metadata.language}</Badge>
                              )}
                              {doc.metadata.difficulty && (
                                <Badge variant="secondary">{doc.metadata.difficulty}</Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(doc.metadata.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{doc.content}</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setGenerationPrompt(`Based on: ${doc.content}`)}
                            >
                              Use as Context
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTTS(doc.content)}
                            >
                              <Mic className="h-3 w-3 mr-1" />
                              TTS
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate with RAG Tab */}
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Generate Content with RAG
              </CardTitle>
              <CardDescription>
                Create new content using relevant context from previous generations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Generation Prompt</label>
                <Textarea
                  placeholder="Describe what you want to generate..."
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleGenerateWithRAG} 
                disabled={isLoading || !generationPrompt.trim()}
                className="w-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isLoading ? 'Generating...' : 'Generate with RAG'}
              </Button>

              {generatedContent && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Generated Content</h4>
                    <Card>
                      <CardContent className="p-4">
                        <p className="whitespace-pre-wrap">{generatedContent}</p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTTS(generatedContent)}
                          >
                            <Mic className="h-3 w-3 mr-1" />
                            TTS
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStoreContent(generatedContent, 'explanation')}
                          >
                            <Save className="h-3 w-3 mr-1" />
                            Store
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {ragContext.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">RAG Context Used ({ragContext.length} documents)</h4>
                      <div className="space-y-2">
                        {ragContext.map((doc) => (
                          <Card key={doc.id}>
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{doc.metadata.type}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(doc.metadata.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm">{doc.content.substring(0, 100)}...</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Store Content Tab */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Store Content in RAG
              </CardTitle>
              <CardDescription>
                Add new content to the RAG system for future reuse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Content Type</label>
                  <select
                    id="contentType"
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="lesson">Lesson</option>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="grammar">Grammar</option>
                    <option value="conversation">Conversation</option>
                    <option value="story">Story</option>
                    <option value="translation">Translation</option>
                    <option value="explanation">Explanation</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Topic (Optional)</label>
                  <Input
                    id="topic"
                    placeholder="e.g., Present Tense, Food Vocabulary"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  id="content"
                  placeholder="Enter the content to store..."
                  className="mt-1"
                  rows={6}
                />
              </div>

              <Button 
                onClick={() => {
                  const contentType = (document.getElementById('contentType') as HTMLSelectElement).value as RAGDocument['metadata']['type'];
                  const topic = (document.getElementById('topic') as HTMLInputElement).value;
                  const content = (document.getElementById('content') as HTMLTextAreaElement).value;
                  
                  if (content.trim()) {
                    handleStoreContent(content, contentType);
                    (document.getElementById('content') as HTMLTextAreaElement).value = '';
                    (document.getElementById('topic') as HTMLInputElement).value = '';
                  }
                }}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                Store Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Content Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.mostUsedTypes.map((type) => (
                    <div key={type.type} className="flex items-center justify-between">
                      <span className="capitalize">{type.type}</span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(type.count / analytics.totalDocuments) * 100} 
                          className="w-20"
                        />
                        <span className="text-sm font-medium">{type.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total AI Costs:</span>
                    <span className="font-medium">${analytics.totalCost.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Savings:</span>
                    <span className="font-medium text-green-600">${analytics.costSavings.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Cost:</span>
                    <span className="font-medium">
                      ${(analytics.totalCost - analytics.costSavings).toFixed(4)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <Button 
                      onClick={handleCleanup} 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cleanup Old Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
