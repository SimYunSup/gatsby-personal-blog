import { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { ExperienceCard } from './ExperienceCard';
import { SideProjectCard } from './SideProjectCard';
import { MetricCard } from './MetricCard';
import { ProjectShowcase } from './ProjectShowcase';

export const ChatInterface = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '0',
        role: 'assistant',
        content: '안녕하세요! 심윤섭입니다. 궁금하신 것이 있으시면 편하게 물어보세요.\n\n예를 들어:\n• CI/CD 개선 경험에 대해 알려주세요\n• LCP 성능 개선은 어떻게 하셨나요?\n• 진행한 프로젝트에 대해 알려주세요',
      },
    ],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (message: any) => {
    const content = message.content;

    // Parse content for markdown-like formatting
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');

    return (
      <div className="message-content-wrapper">
        <div
          className="message-text"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
    );
  };

  const handleQuickQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-slate-50 dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex gap-3 animate-slide-in ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`flex-1 max-w-[70%] ${message.role === 'user' ? 'bg-emerald-500 text-white rounded-xl p-3' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3'}`}>
              {renderMessageContent(message)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-slide-in">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
              🤖
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.16s' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.32s' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
        <div className="flex gap-2 mb-3 flex-wrap">
          <button
            type="button"
            className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
            onClick={() => handleQuickQuestion('CI/CD 개선 경험에 대해 알려주세요')}
          >
            CI/CD 개선
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
            onClick={() => handleQuickQuestion('LCP 성능 개선은 어떻게 하셨나요?')}
          >
            성능 최적화
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
            onClick={() => handleQuickQuestion('진행한 프로젝트에 대해 알려주세요')}
          >
            프로젝트
          </button>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="궁금한 것을 물어보세요..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xl hover:bg-emerald-600 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[50px]"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </form>
    </div>
  );
};
