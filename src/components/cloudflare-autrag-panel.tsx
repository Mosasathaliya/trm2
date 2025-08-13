import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Search, 
  Plus, 
  FileText, 
  BarChart3, 
  Settings, 
  Play, 
  Save, 
  Trash2,
  Lightbulb,
  Zap,
  Database,
  Cloud,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { 
  autoRAGClient, 
  autoRAGUtils,
  type AutoRAGDocument,
  type AutoRAGSearchResult,
  type AutoRAGAnalytics
} from '@/lib/cloudflare-autrag-client';
import { speakText } from '@/lib/tts-system';

interface RAGPanelState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  analytics: AutoRAGAnalytics | null;
  searchResults: AutoRAGSearchResult[];
  recentDocuments: AutoRAGDocument[];
}

export default function CloudflareAutoRAGPanel() {
  const [state, setState] = useState<RAGPanelState>({
    isLoading: false,
    error: null,
    success: null,
    analytics: null,
    searchResults: [],
    recentDocuments: []
  });

  const [formData, setFormData] = useState({
    // Store form
    storeContent: '',
    storeType: 'lesson',
    storeTopic: '',
    storeLanguage: 'ar',
    storeDifficulty: 'beginner',
    storeTags: '',
    
    // Search form
    searchQuery: '',
    searchType: '',
    searchTopic: '',
    searchLanguage: '',
    searchDifficulty: '',
    searchMaxResults: 5,
    useReranking: true,
    
    // Generate form
    generatePrompt: '',
    generateType: 'lesson',
    generateTopic: '',
    generateLanguage: 'ar',
    generateDifficulty: 'beginner',
    generateMaxTokens: 500,
    generateTemperature: 0.7,
    useRAGContext: true
  });

  // Initialize AutoRAG on component mount
  useEffect(() => {
    initializeAutoRAG();
    loadAnalytics();
  }, []);

  const initializeAutoRAG = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await autoRAGClient.initialize();
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          success: 'AutoRAG pipeline initialized successfully',
          isLoading: false 
        }));
        setTimeout(() => setState(prev => ({ ...prev, success: null })), 3000);
      } else {
        throw new Error(response.error || 'Failed to initialize AutoRAG');
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      }));
    }
  };

  const loadAnalytics = async () => {
    try {
      const response = await autoRAGClient.getAnalytics();
      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          analytics: response.data.analytics,
          recentDocuments: response.data.analytics.recentActivity.map(activity => ({
            id: activity.id,
            content: 'Content preview...',
            metadata: {
              type: activity.type,
              topic: activity.topic,
              language: activity.language,
              difficulty: activity.difficulty,
              tags: [],
              timestamp: activity.timestamp,
              source: activity.source,
              aiGenerated: activity.aiGenerated
            }
          }))
        }));
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const handleStoreDocument = async () => {
    if (!formData.storeContent || !formData.storeType || !formData.storeTopic) {
      setState(prev => ({ ...prev, error: 'Please fill in all required fields' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, success: null }));

    try {
      const response = await autoRAGClient.storeDocument(
        formData.storeContent,
        formData.storeType,
        formData.storeTopic,
        {
          language: formData.storeLanguage,
          difficulty: formData.storeDifficulty,
          tags: formData.storeTags.split(',').map(tag => tag.trim()).filter(Boolean)
        }
      );

      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          success: `Document stored successfully! Created ${response.data?.chunksCount} chunks.`,
          isLoading: false 
        }));
        
        // Clear form
        setFormData(prev => ({ ...prev, storeContent: '', storeTopic: '', storeTags: '' }));
        
        // Reload analytics
        loadAnalytics();
        
        setTimeout(() => setState(prev => ({ ...prev, success: null })), 5000);
      } else {
        throw new Error(response.error || 'Failed to store document');
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      }));
    }
  };

  const handleSearch = async () => {
    if (!formData.searchQuery) {
      setState(prev => ({ ...prev, error: 'Please enter a search query' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await autoRAGClient.search(formData.searchQuery, {
        type: formData.searchType || undefined,
        topic: formData.searchTopic || undefined,
        language: formData.searchLanguage || undefined,
        difficulty: formData.searchDifficulty || undefined,
        maxResults: formData.searchMaxResults,
        useReranking: formData.useReranking
      });

      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          searchResults: response.data.results,
          isLoading: false 
        }));
      } else {
        throw new Error(response.error || 'Search failed');
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      }));
    }
  };

  const handleGenerate = async () => {
    if (!formData.generatePrompt || !formData.generateType || !formData.generateTopic) {
      setState(prev => ({ ...prev, error: 'Please fill in all required fields' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, success: null }));

    try {
      const response = await autoRAGClient.generateContent(
        formData.generatePrompt,
        {
          type: formData.generateType,
          topic: formData.generateTopic,
          language: formData.generateLanguage,
          difficulty: formData.generateDifficulty
        },
        {
          maxTokens: formData.generateMaxTokens,
          temperature: formData.generateTemperature,
          useRAGContext: formData.useRAGContext,
          includeSourceDocuments: true
        }
      );

      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          success: `Content generated successfully! Cost: $${response.data.estimatedCost.toFixed(4)}`,
          isLoading: false 
        }));
        
        // Clear form
        setFormData(prev => ({ ...prev, generatePrompt: '' }));
        
        // Reload analytics
        loadAnalytics();
        
        setTimeout(() => setState(prev => ({ ...prev, success: null })), 5000);
      } else {
        throw new Error(response.error || 'Generation failed');
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      }));
    }
  };

  const handleCleanup = async () => {
    if (!confirm('Are you sure you want to clean up old documents? This action cannot be undone.')) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await autoRAGClient.cleanupOldDocuments(30);
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          success: `Cleanup completed! Deleted ${response.data?.deletedCount} old documents.`,
          isLoading: false 
        }));
        loadAnalytics();
        setTimeout(() => setState(prev => ({ ...prev, success: null })), 5000);
      } else {
        throw new Error(response.error || 'Cleanup failed');
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      }));
    }
  };

  const speakContent = (text: string, language: string = 'ar') => {
    speakText(text, { language });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cloudflare AutoRAG System</h1>
            <p className="text-gray-600">Advanced RAG pipeline powered by Cloudflare AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Cloud className="h-3 w-3" />
            Cloudflare Backend
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            AutoRAG
          </Badge>
        </div>
      </div>

      {/* Status Messages */}
      {state.error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-red-700">{state.error}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setState(prev => ({ ...prev, error: null }))}
          >
            ×
          </Button>
        </div>
      )}

      {state.success && (
        <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-green-700">{state.success}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setState(prev => ({ ...prev, success: null }))}
          >
            ×
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="dashboard" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-5 mx-6 mt-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Store Content
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search & Retrieve
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Generate with RAG
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {state.analytics?.totalDocuments || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {state.analytics?.totalChunks || 0} chunks
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ${(state.analytics?.totalCost || 0).toFixed(4)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">AI operations cost</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {state.analytics?.totalDocuments ? 
                        Math.round((state.analytics.totalDocuments / (state.analytics.totalDocuments + 10)) * 100) : 0
                      }%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Content reuse rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Generate common content types quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { type: 'lesson', topic: 'basic-greetings', label: 'Basic Greetings' },
                      { type: 'vocabulary', topic: 'numbers', label: 'Numbers 1-10' },
                      { type: 'conversation', topic: 'introductions', label: 'Introductions' },
                      { type: 'grammar', topic: 'verb-conjugation', label: 'Verb Conjugation' }
                    ].map((action) => (
                      <Button
                        key={action.type + action.topic}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            generateType: action.type,
                            generateTopic: action.topic,
                            generatePrompt: `Create a ${action.type} about ${action.topic} in Arabic`
                          }));
                          // Switch to generate tab
                          document.querySelector('[data-value="generate"]')?.click();
                        }}
                        className="h-auto p-3 flex flex-col items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {state.recentDocuments.slice(0, 5).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={doc.metadata.aiGenerated ? "default" : "secondary"}>
                            {doc.metadata.aiGenerated ? "AI Generated" : "Manual"}
                          </Badge>
                          <div>
                            <p className="font-medium text-sm">{doc.metadata.type} - {doc.metadata.topic}</p>
                            <p className="text-xs text-gray-500">
                              {doc.metadata.language} • {doc.metadata.difficulty} • {new Date(doc.metadata.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakContent(doc.content, doc.metadata.language)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Store Content Tab */}
            <TabsContent value="store" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Store Content in AutoRAG
                  </CardTitle>
                  <CardDescription>
                    Add new content to the RAG system for future retrieval
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeType">Content Type *</Label>
                      <Select value={formData.storeType} onValueChange={(value) => setFormData(prev => ({ ...prev, storeType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">Lesson</SelectItem>
                          <SelectItem value="vocabulary">Vocabulary</SelectItem>
                          <SelectItem value="conversation">Conversation</SelectItem>
                          <SelectItem value="grammar">Grammar</SelectItem>
                          <SelectItem value="exercise">Exercise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeTopic">Topic *</Label>
                      <Input
                        id="storeTopic"
                        value={formData.storeTopic}
                        onChange={(e) => setFormData(prev => ({ ...prev, storeTopic: e.target.value }))}
                        placeholder="e.g., basic-greetings, numbers, introductions"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeLanguage">Language</Label>
                      <Select value={formData.storeLanguage} onValueChange={(value) => setFormData(prev => ({ ...prev, storeLanguage: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeDifficulty">Difficulty</Label>
                      <Select value={formData.storeDifficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, storeDifficulty: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeTags">Tags (comma-separated)</Label>
                    <Input
                      id="storeTags"
                      value={formData.storeTags}
                      onChange={(e) => setFormData(prev => ({ ...prev, storeTags: e.target.value }))}
                      placeholder="e.g., basic, greetings, formal, informal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeContent">Content *</Label>
                    <Textarea
                      id="storeContent"
                      value={formData.storeContent}
                      onChange={(e) => setFormData(prev => ({ ...prev, storeContent: e.target.value }))}
                      placeholder="Enter the content to store..."
                      rows={6}
                    />
                  </div>

                  <Button 
                    onClick={handleStoreDocument} 
                    disabled={state.isLoading}
                    className="w-full"
                  >
                    {state.isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Storing...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Store in AutoRAG
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search & Retrieve Content
                  </CardTitle>
                  <CardDescription>
                    Find relevant content using semantic search with AutoRAG
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="searchQuery">Search Query *</Label>
                      <Input
                        id="searchQuery"
                        value={formData.searchQuery}
                        onChange={(e) => setFormData(prev => ({ ...prev, searchQuery: e.target.value }))}
                        placeholder="What are you looking for?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="searchMaxResults">Max Results</Label>
                      <Select value={formData.searchMaxResults.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, searchMaxResults: parseInt(value) }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="searchType">Type Filter</Label>
                      <Select value={formData.searchType} onValueChange={(value) => setFormData(prev => ({ ...prev, searchType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any type</SelectItem>
                          <SelectItem value="lesson">Lesson</SelectItem>
                          <SelectItem value="vocabulary">Vocabulary</SelectItem>
                          <SelectItem value="conversation">Conversation</SelectItem>
                          <SelectItem value="grammar">Grammar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="searchTopic">Topic Filter</Label>
                      <Input
                        id="searchTopic"
                        value={formData.searchTopic}
                        onChange={(e) => setFormData(prev => ({ ...prev, searchTopic: e.target.value }))}
                        placeholder="Any topic"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="searchLanguage">Language Filter</Label>
                      <Select value={formData.searchLanguage} onValueChange={(value) => setFormData(prev => ({ ...prev, searchLanguage: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any language</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="searchDifficulty">Difficulty Filter</Label>
                      <Select value={formData.searchDifficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, searchDifficulty: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any difficulty</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useReranking"
                      checked={formData.useReranking}
                      onChange={(e) => setFormData(prev => ({ ...prev, useReranking: e.target.checked }))}
                      className="rounded"
                    />
                    <Label htmlFor="useReranking">Use AI reranking for better results</Label>
                  </div>

                  <Button 
                    onClick={handleSearch} 
                    disabled={state.isLoading}
                    className="w-full"
                  >
                    {state.isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search AutoRAG
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Search Results */}
              {state.searchResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Search Results ({state.searchResults.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {state.searchResults.map((result, index) => (
                        <div key={result.document.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{result.document.metadata.type}</Badge>
                              <Badge variant="secondary">{result.document.metadata.topic}</Badge>
                              <Badge variant="outline">{result.document.metadata.language}</Badge>
                              <Badge variant="outline">{result.document.metadata.difficulty}</Badge>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <div>Similarity: {(result.similarity * 100).toFixed(1)}%</div>
                              <div>Relevance: {(result.relevance * 100).toFixed(1)}%</div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-3">{result.context}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Chunk {result.chunkIndex}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => speakContent(result.context, result.document.metadata.language)}
                              >
                                <Play className="h-3 w-3" />
                                Speak
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    generatePrompt: `Expand on this content: ${result.context}`,
                                    generateType: result.document.metadata.type,
                                    generateTopic: result.document.metadata.topic,
                                    generateLanguage: result.document.metadata.language,
                                    generateDifficulty: result.document.metadata.difficulty
                                  }));
                                  document.querySelector('[data-value="generate"]')?.click();
                                }}
                              >
                                <Brain className="h-3 w-3" />
                                Generate More
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Generate Tab */}
            <TabsContent value="generate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Generate Content with RAG
                  </CardTitle>
                  <CardDescription>
                    Create new content using AI with relevant context from AutoRAG
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="generateType">Content Type *</Label>
                      <Select value={formData.generateType} onValueChange={(value) => setFormData(prev => ({ ...prev, generateType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">Lesson</SelectItem>
                          <SelectItem value="vocabulary">Vocabulary</SelectItem>
                          <SelectItem value="conversation">Conversation</SelectItem>
                          <SelectItem value="grammar">Grammar</SelectItem>
                          <SelectItem value="exercise">Exercise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="generateTopic">Topic *</Label>
                      <Input
                        id="generateTopic"
                        value={formData.generateTopic}
                        onChange={(e) => setFormData(prev => ({ ...prev, generateTopic: e.target.value }))}
                        placeholder="e.g., advanced-greetings, business-conversations"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="generateLanguage">Language</Label>
                      <Select value={formData.generateLanguage} onValueChange={(value) => setFormData(prev => ({ ...prev, generateLanguage: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="generateDifficulty">Difficulty</Label>
                      <Select value={formData.generateDifficulty} onValueChange={(value) => setFormData(prev => ({ ...prev, generateDifficulty: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="generateMaxTokens">Max Tokens</Label>
                      <Input
                        id="generateMaxTokens"
                        type="number"
                        value={formData.generateMaxTokens}
                        onChange={(e) => setFormData(prev => ({ ...prev, generateMaxTokens: parseInt(e.target.value) }))}
                        min="100"
                        max="2000"
                        step="100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="generateTemperature">Temperature</Label>
                      <Input
                        id="generateTemperature"
                        type="number"
                        value={formData.generateTemperature}
                        onChange={(e) => setFormData(prev => ({ ...prev, generateTemperature: parseFloat(e.target.value) }))}
                        min="0"
                        max="1"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="generatePrompt">Generation Prompt *</Label>
                    <Textarea
                      id="generatePrompt"
                      value={formData.generatePrompt}
                      onChange={(e) => setFormData(prev => ({ ...prev, generatePrompt: e.target.value }))}
                      placeholder="Describe what you want to generate..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useRAGContext"
                      checked={formData.useRAGContext}
                      onChange={(e) => setFormData(prev => ({ ...prev, useRAGContext: e.target.checked }))}
                      className="rounded"
                    />
                    <Label htmlFor="useRAGContext">Use RAG context for better generation</Label>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={state.isLoading}
                    className="w-full"
                  >
                    {state.isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate with AutoRAG
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    AutoRAG Analytics
                  </CardTitle>
                  <CardDescription>
                    Detailed insights into your RAG system usage and performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {state.analytics ? (
                    <>
                      {/* Content Distribution */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Content Distribution</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>By Type</Label>
                            <div className="space-y-2">
                              {Object.entries(state.analytics.typeDistribution).map(([type, count]) => (
                                <div key={type} className="flex items-center justify-between">
                                  <span className="text-sm capitalize">{type}</span>
                                  <Badge variant="outline">{count}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>By Language</Label>
                            <div className="space-y-2">
                              {Object.entries(state.analytics.languageDistribution).map(([lang, count]) => (
                                <div key={lang} className="flex items-center justify-between">
                                  <span className="text-sm">{lang.toUpperCase()}</span>
                                  <Badge variant="outline">{count}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>By Difficulty</Label>
                            <div className="space-y-2">
                              {Object.entries(state.analytics.difficultyDistribution).map(([diff, count]) => (
                                <div key={diff} className="flex items-center justify-between">
                                  <span className="text-sm capitalize">{diff}</span>
                                  <Badge variant="outline">{count}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Cost Analysis */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Cost Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-2xl font-bold text-green-600">
                                ${state.analytics.totalCost.toFixed(4)}
                              </div>
                              <p className="text-sm text-gray-500">Total AI Operations Cost</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-2xl font-bold text-blue-600">
                                ${(state.analytics.totalCost / Math.max(state.analytics.totalDocuments, 1)).toFixed(4)}
                              </div>
                              <p className="text-sm text-gray-500">Average Cost per Document</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <Separator />

                      {/* Recent Activity */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Recent Activity</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCleanup}
                            disabled={state.isLoading}
                          >
                            {state.isLoading ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-2" />
                            )}
                            Cleanup Old Documents
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {state.analytics.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Badge variant={activity.aiGenerated ? "default" : "secondary"}>
                                  {activity.aiGenerated ? "AI" : "Manual"}
                                </Badge>
                                <div>
                                  <p className="font-medium text-sm">{activity.type} - {activity.topic}</p>
                                  <p className="text-xs text-gray-500">
                                    {activity.language} • {activity.difficulty} • {new Date(activity.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {activity.source}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
                      <p className="text-gray-500 mt-2">Loading analytics...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// Missing Clock component - using a simple div instead
const Clock = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  </div>
);
