/**
 * AI Integration Panel Component
 * Provides access to all AI-powered learning features
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Bot, 
  Brain, 
  MessageCircle, 
  BookOpen, 
  Mic, 
  Image, 
  Languages, 
  Sparkles,
  Loader2,
  Play,
  Pause,
  Volume2,
  Settings,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { speakText, getTTSStatus, preloadVoices } from '../lib/tts-system';
import { generateConversationScenarios, startConversationSession } from '../lib/ai-conversation-practice';
import { generateEnhancedLesson } from '../lib/ai-lesson-enhancer';
import { getAIUsageAnalytics } from '../ai/flows/enhanced-ai-flows';
import { translateText } from '../ai/flows/translate-flow';

interface AIFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'loading' | 'error' | 'disabled';
  cost: number;
  usage: number;
}

export default function AIIntegrationPanel() {
  const [features, setFeatures] = useState<AIFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [ttsStatus, setTtsStatus] = useState(getTTSStatus());
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    initializeAIFeatures();
    preloadVoices();
    loadAnalytics();
  }, []);

  const initializeAIFeatures = () => {
    const initialFeatures: AIFeature[] = [
      {
        id: 'conversation-practice',
        name: 'AI Conversation Practice',
        description: 'Practice speaking with AI conversation partners',
        icon: <MessageCircle className="h-6 w-6" />,
        status: 'available',
        cost: 0.001,
        usage: 0
      },
      {
        id: 'lesson-enhancement',
        name: 'Smart Lesson Enhancement',
        description: 'AI-powered lesson content generation',
        icon: <BookOpen className="h-6 w-6" />,
        status: 'available',
        cost: 0.002,
        usage: 0
      },
      {
        id: 'voice-learning',
        name: 'Voice Learning Assistant',
        description: 'Text-to-speech and pronunciation help',
        icon: <Mic className="h-6 w-6" />,
        status: 'available',
        cost: 0.0005,
        usage: 0
      },
      {
        id: 'image-generation',
        name: 'Visual Learning',
        description: 'Generate images for vocabulary and concepts',
        icon: <Image className="h-6 w-6" />,
        status: 'available',
        cost: 0.0025,
        usage: 0
      },
      {
        id: 'translation-tools',
        name: 'Advanced Translation',
        description: 'Multi-language translation with context',
        icon: <Languages className="h-6 w-6" />,
        status: 'available',
        cost: 0.0002,
        usage: 0
      },
      {
        id: 'learning-analytics',
        name: 'Learning Analytics',
        description: 'AI-powered progress tracking and insights',
        icon: <TrendingUp className="h-6 w-6" />,
        status: 'available',
        cost: 0.0001,
        usage: 0
      }
    ];
    setFeatures(initialFeatures);
  };

  const loadAnalytics = async () => {
    try {
      const aiAnalytics = getAIUsageAnalytics();
      setAnalytics(aiAnalytics);
    } catch (error) {
      console.error('Failed to load AI analytics:', error);
    }
  };

  const handleFeatureClick = async (featureId: string) => {
    setSelectedFeature(featureId);
    setIsLoading(true);

    try {
      switch (featureId) {
        case 'conversation-practice':
          await handleConversationPractice();
          break;
        case 'lesson-enhancement':
          await handleLessonEnhancement();
          break;
        case 'voice-learning':
          await handleVoiceLearning();
          break;
        case 'image-generation':
          await handleImageGeneration();
          break;
        case 'translation-tools':
          await handleTranslationTools();
          break;
        case 'learning-analytics':
          await handleLearningAnalytics();
          break;
      }
    } catch (error) {
      console.error(`Feature ${featureId} failed:`, error);
      updateFeatureStatus(featureId, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversationPractice = async () => {
    try {
      const scenarios = await generateConversationScenarios('beginner', ['greetings', 'introductions'], 3);
      console.log('Generated conversation scenarios:', scenarios);
      
      if (scenarios.length > 0) {
        const session = await startConversationSession(scenarios[0], 'beginner', 'en');
        console.log('Started conversation session:', session);
      }
      
      updateFeatureStatus('conversation-practice', 'available');
    } catch (error) {
      throw error;
    }
  };

  const handleLessonEnhancement = async () => {
    try {
      const enhancedLesson = await generateEnhancedLesson({
        id: 'demo-lesson',
        title: 'Basic Grammar',
        topic: 'Present Simple Tense',
        level: 'beginner',
        target_language: 'en'
      }, {
        includeVocabulary: true,
        includeExercises: true,
        includePronunciation: true,
        includeCulturalNotes: true,
        includeAudio: true,
        maxTokens: 1500
      });
      
      console.log('Generated enhanced lesson:', enhancedLesson);
      updateFeatureStatus('lesson-enhancement', 'available');
    } catch (error) {
      throw error;
    }
  };

  const handleVoiceLearning = async () => {
    try {
      const testText = 'Hello, welcome to our English learning app!';
      const result = await speakText(testText, {
        lang: 'en',
        rate: 0.9,
        useCloudflare: false
      });
      
      console.log('Voice learning test result:', result);
      setTtsStatus(getTTSStatus());
      updateFeatureStatus('voice-learning', 'available');
    } catch (error) {
      throw error;
    }
  };

  const handleImageGeneration = async () => {
    try {
      // This would integrate with the image generation flow
      console.log('Image generation feature activated');
      updateFeatureStatus('image-generation', 'available');
    } catch (error) {
      throw error;
    }
  };

  const handleTranslationTools = async () => {
    try {
      const testTranslation = await translateText({
        text: 'Hello, how are you today?',
        sourceLanguage: 'en',
        targetLanguage: 'ar',
        useFallback: true,
        quality: 'balanced'
      });
      
      console.log('Translation test result:', testTranslation);
      updateFeatureStatus('translation-tools', 'available');
    } catch (error) {
      throw error;
    }
  };

  const handleLearningAnalytics = async () => {
    try {
      // This would integrate with the learning analytics system
      console.log('Learning analytics feature activated');
      updateFeatureStatus('learning-analytics', 'available');
    } catch (error) {
      throw error;
    }
  };

  const updateFeatureStatus = (featureId: string, status: AIFeature['status']) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId ? { ...feature, status } : feature
    ));
  };

  const getStatusColor = (status: AIFeature['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'loading': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'disabled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: AIFeature['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'loading': return 'Loading';
      case 'error': return 'Error';
      case 'disabled': return 'Disabled';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          <Bot className="inline-block mr-2" />
          AI Learning Assistant
        </h2>
        <p className="text-muted-foreground">
          Powered by Cloudflare AI - Your intelligent learning companion
        </p>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card 
            key={feature.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedFeature === feature.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleFeatureClick(feature.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(feature.status)} text-white`}
                  >
                    {getStatusText(feature.status)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ${feature.cost.toFixed(4)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {feature.description}
              </p>
              
              {/* Usage Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Usage</span>
                  <span>{feature.usage}%</span>
                </div>
                <Progress value={feature.usage} className="h-2" />
              </div>

              {/* Cost Indicator */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Cost per use:</span>
                <span className="font-mono">${feature.cost.toFixed(4)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            Activating AI feature...
          </p>
        </div>
      )}

      {/* TTS Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="mr-2" />
            Voice Learning Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {ttsStatus.voices}
              </div>
              <div className="text-sm text-muted-foreground">Available Voices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {ttsStatus.available ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-muted-foreground">Browser TTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {ttsStatus.speaking ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-muted-foreground">Currently Speaking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {ttsStatus.paused ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-muted-foreground">Paused</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analytics */}
      {analytics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              AI Usage Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${analytics.costEstimates.textGeneration.estimatedCost.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">Text Generation</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${analytics.costEstimates.translation.estimatedCost.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">Translation</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${analytics.costEstimates.tts.estimatedCost.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">Text-to-Speech</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Cost Optimization Tips:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {analytics.optimizationTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-2 text-primary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFeatureClick('voice-learning')}
              disabled={isLoading}
            >
              <Mic className="h-4 w-4 mr-2" />
              Test Voice
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFeatureClick('translation-tools')}
              disabled={isLoading}
            >
              <Languages className="h-4 w-4 mr-2" />
              Test Translation
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFeatureClick('conversation-practice')}
              disabled={isLoading}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
