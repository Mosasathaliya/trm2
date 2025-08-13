import React, { useState, useEffect, useRef } from 'react';
import type { StoryPart } from '@/lib/adventure-game-types';
import { UserIcon, WandSparklesIcon, SendIcon } from '@/components/adventure-icon-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { TranslationState } from '@/lib/adventure-game-types';
// Image import removed - using regular img tags for Astro

interface GamePanelProps {
  storyHistory: StoryPart[];
  onSendAction: (action: string) => void;
  onWordClick: (word: string) => void; // For special vocabulary words
  onNarrativeWordClick: (word: string) => void; // For regular words
  loading: boolean;
  error: string | null;
  translation: TranslationState | null;
  sceneImageUrl: string | null;
  loadingSceneImage: boolean;
}

const ClickableNarrative: React.FC<{
  text: string;
  specialWord?: string;
  onSpecialWordClick: (word: string) => void;
  onRegularWordClick: (word: string) => void;
  translation: TranslationState | null;
}> = ({ text, specialWord, onSpecialWordClick, onRegularWordClick, translation }) => {
  return (
    <>
      {text.split(/(\s+)/).map((segment, index) => {
        const word = segment.trim();
        const cleanedWord = word.replace(/[^a-zA-Z]/g, '');

        if (!cleanedWord) {
          return <span key={index}>{segment}</span>; // Render spaces and punctuation
        }

        const isSpecial = specialWord && cleanedWord.toLowerCase() === specialWord.toLowerCase();

        return (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <span
                onClick={() => isSpecial ? onSpecialWordClick(cleanedWord) : onRegularWordClick(word)}
                className={
                  isSpecial
                    ? "font-bold text-purple-400 hover:text-purple-300 underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
                    : "cursor-pointer hover:bg-primary/20 rounded-sm transition-colors"
                }
              >
                {segment}
              </span>
            </PopoverTrigger>
            {!isSpecial && translation?.word === word && (
              <PopoverContent className="w-auto p-2" side="top">
                {translation.isLoading ? (
                  <div className="text-sm">...</div>
                ) : (
                  <div className="text-sm font-semibold">{translation.text}</div>
                )}
              </PopoverContent>
            )}
          </Popover>
        );
      })}
    </>
  );
};


export const GamePanel: React.FC<GamePanelProps> = ({ storyHistory, onSendAction, onWordClick, onNarrativeWordClick, loading, error, translation, sceneImageUrl, loadingSceneImage }) => {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [storyHistory]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendAction(inputValue);
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendAction(suggestion);
    setInputValue('');
  };

  const lastAiPart = storyHistory.slice().reverse().find(p => p.sender === 'ai');

  return (
    <div className="flex flex-col w-full h-full max-h-full">
        {(sceneImageUrl || loadingSceneImage) && (
            <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden mb-4 shrink-0">
                {loadingSceneImage && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                    </div>
                )}
                {sceneImageUrl && (
                     <img src={sceneImageUrl} alt="Scene illustration" className="transition-opacity duration-500 opacity-100 w-full h-full object-cover" />
                )}
            </div>
        )}
      <div ref={scrollRef} className="flex-grow overflow-y-auto pr-4 space-y-6">
        {storyHistory.map((part) => (
          <div key={part.id} className={`flex items-start gap-4 ${part.sender === 'user' ? 'justify-end' : ''}`}>
             {part.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
                <WandSparklesIcon className="w-5 h-5 text-purple-400" />
              </div>
            )}
            <div className={`p-4 rounded-xl max-w-xl ${part.sender === 'ai' ? 'bg-gray-800' : 'bg-blue-600/80'}`}>
              <p className="text-white whitespace-pre-wrap">
                {part.sender === 'ai' ? (
                   <ClickableNarrative 
                      text={part.text}
                      specialWord={part.vocabularyWord}
                      onSpecialWordClick={onWordClick}
                      onRegularWordClick={onNarrativeWordClick}
                      translation={translation}
                   />
                ) : (
                   part.text
                )}
              </p>
            </div>
            {part.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-400" />
                </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
            </div>
            <div className="p-4 rounded-xl bg-gray-800 max-w-xl">
              <p className="text-gray-400 italic">The world pauses, awaiting your fate...</p>
            </div>
          </div>
        )}
         {error && (
            <div className="p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-300">
                <strong>Error:</strong> {error}
            </div>
         )}
      </div>

      <div className="flex-shrink-0 pt-4 mt-auto">
        {lastAiPart && lastAiPart.suggestions && !loading && !lastAiPart.gameOver && (
            <div className="flex flex-wrap gap-2 mb-3">
                {lastAiPart.suggestions.map((s, i) => (
                    <button key={i} onClick={() => handleSuggestionClick(s)} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full text-sm transition-colors">
                        {s}
                    </button>
                ))}
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 border border-gray-700 focus-within:border-purple-500">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What do you do next?"
            className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none px-2"
            disabled={loading || lastAiPart?.gameOver}
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim() || lastAiPart?.gameOver}
            className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
