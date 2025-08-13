"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Search, Save, TrendingUp } from 'lucide-react';
import { storeAIContent, searchRAG, generateWithRAG } from '@/lib/rag-system';
import { useToast } from '@/hooks/use-toast';

export function RAGDemo() {
  const [demoText, setDemoText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const demoContent = [
    {
      type: 'lesson' as const,
      content: 'The present perfect tense is used to describe actions that started in the past and continue to the present, or actions that have just been completed.',
      tags: ['grammar', 'present-perfect', 'english']
    },
    {
      type: 'vocabulary' as const,
      content: 'Essential vocabulary for beginners: Hello, Goodbye, Thank you, Please, Sorry, Excuse me, How are you?',
      tags: ['vocabulary', 'beginner', 'greetings']
    },
    {
      type: 'conversation' as const,
      content: 'A typical conversation at a restaurant: "Can I have a table for two?" "What would you like to order?" "I\'ll have the chicken, please."',
      tags: ['conversation', 'restaurant', 'practical']
    }
  ];

  const handleStoreDemo = async () => {
    if (!demoText.trim()) return;
    
    setIsLoading(true);
    try {
      await storeAIContent(demoText, 'explanation', {
        tags: ['demo', 'user-generated'],
        language: 'en',
        difficulty: 'intermediate'
      });
      
      toast({
        title: "Content Stored",
        description: "Your content has been added to the RAG system!",
      });
      
      setDemoText('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to store content",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchRAG(searchQuery, { maxResults: 5 });
      setSearchResults(results.map(r => r.document));
    } catch (error) {
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
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const searchResults = await searchRAG(searchQuery, { maxResults: 3 });
      
      const result = await generateWithRAG(
        `Explain this concept: ${searchQuery}`,
        {
          query: searchQuery,
          retrievedDocuments: searchResults.map(r => r.document)
        }
      );
      
      toast({
        title: "Generated with RAG",
        description: `Used ${result.ragContext.length} existing documents as context`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content with RAG",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
          <Brain className="h-6 w-6 text-blue-600" />
          RAG System Demo
        </h3>
        <p className="text-muted-foreground">
          Experience how the RAG system stores, retrieves, and reuses AI-generated content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Store Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Content Type</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option value="lesson">Lesson</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="grammar">Grammar</option>
                <option value="conversation">Conversation</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <textarea
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                placeholder="Enter content to store in RAG system..."
                className="w-full mt-1 p-2 border rounded-md"
                rows={4}
              />
            </div>
            <Button 
              onClick={handleStoreDemo} 
              disabled={isLoading || !demoText.trim()}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Store in RAG
            </Button>
          </CardContent>
        </Card>

        {/* Search & Generate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Generate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Search Query</label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for existing content..."
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={isLoading || !searchQuery.trim()}
                variant="outline"
                className="flex-1"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                onClick={handleGenerateWithRAG} 
                disabled={isLoading || !searchQuery.trim()}
                className="flex-1"
              >
                <Brain className="h-4 w-4 mr-2" />
                Generate with RAG
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Pre-loaded Demo Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demoContent.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.content}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Search Results ({searchResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((doc, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline">{doc.metadata.type}</Badge>
                      {doc.metadata.language && (
                        <Badge variant="secondary">{doc.metadata.language}</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(doc.metadata.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{doc.content}</p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
