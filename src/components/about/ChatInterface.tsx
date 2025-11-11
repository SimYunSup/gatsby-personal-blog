import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { ExperienceCard } from './ExperienceCard';
import { SideProjectCard } from './SideProjectCard';
import { MetricCard } from './MetricCard';
import { ProjectShowcase } from './ProjectShowcase';
import { matchUserQuery, type ChatResponse } from '@/utils/chatMatcher';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response?: ChatResponse;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '안녕하세요! 심윤섭입니다. 궁금하신 것이 있으시면 편하게 물어보세요.\n\n예를 들어:\n• CI/CD 개선 경험에 대해 알려주세요\n• LCP 성능 개선은 어떻게 하셨나요?\n• 진행한 프로젝트에 대해 알려주세요',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get response from chatMatcher
    const response = matchUserQuery(userMessage.content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      response: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const renderGenerativeUI = (response: ChatResponse) => {
    const { type, data } = response;

    switch (type) {
      case 'experience':
        if (data?.experience) {
          return (
            <div className="mt-4 animate-fade-in">
              <ExperienceCard experience={data.experience} />
            </div>
          );
        }
        break;

      case 'project':
        if (data?.project) {
          return (
            <div className="mt-4 animate-fade-in">
              <SideProjectCard project={data.project} />
            </div>
          );
        }
        break;

      case 'metric':
        if (data?.achievement?.metrics) {
          return (
            <div className="mt-4 animate-fade-in">
              <MetricCard
                metric={data.achievement.metrics}
                title={data.achievement.title}
                animated={true}
              />
            </div>
          );
        }
        break;

      case 'showcase':
        if (data?.projectShowcase) {
          return (
            <div className="mt-4 animate-fade-in">
              <ProjectShowcase {...data.projectShowcase} />
            </div>
          );
        }
        break;
    }

    return null;
  };

  const renderMessageContent = (message: Message) => {
    const formattedContent = message.content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-600 dark:text-emerald-400">$1</strong>')
      .replace(/\n/g, '<br />');

    return (
      <div className="space-y-2">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
        {message.response && renderGenerativeUI(message.response)}
      </div>
    );
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)] overflow-hidden">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 animate-slide-in',
                message.role === 'user' && 'flex-row-reverse'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                )}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>

              <div
                className={cn(
                  'flex-1 max-w-[80%] rounded-lg p-4',
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                )}
              >
                {renderMessageContent(message)}
                <div
                  className={cn(
                    'text-xs mt-2 opacity-70',
                    message.role === 'user' ? 'text-white' : 'text-slate-500'
                  )}
                >
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-slide-in">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
        <div className="flex flex-wrap gap-2 mb-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion('CI/CD 개선 경험에 대해 알려주세요')}
            className="text-xs"
          >
            CI/CD 개선
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion('LCP 성능 개선은 어떻게 하셨나요?')}
            className="text-xs"
          >
            성능 최적화
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion('진행한 프로젝트에 대해 알려주세요')}
            className="text-xs"
          >
            프로젝트
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="궁금한 것을 물어보세요..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" disabled={isTyping || !input.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
