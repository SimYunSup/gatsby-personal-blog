import { useState, useRef, useEffect } from 'react';
import { User, Bot, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { ExperienceCard } from './ExperienceCard';
import { SideProjectCard } from './SideProjectCard';
import { MetricCard } from './MetricCard';
import { ProjectShowcase } from './ProjectShowcase';
import type { ChatResponse } from '@/utils/chatMatcher';
import { cn } from '@/lib/utils';
import { chatScenario, type ChatMessage } from '@/data/chatScenario';

export const ChatInterface = () => {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFastForward, setIsFastForward] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, streamingText]);

  // 텍스트 스트리밍 애니메이션
  const streamMessage = async (message: ChatMessage, fast: boolean = false) => {
    setIsStreaming(true);
    const text = message.content;
    const delay = fast ? 10 : 30; // 빨리 감기 시 더 빠르게

    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => {
        streamingTimeoutRef.current = setTimeout(resolve, delay);
      });
      setStreamingText(text.slice(0, i));
    }

    setIsStreaming(false);
    setStreamingText('');
    setVisibleMessages((prev) => [...prev, message]);
  };

  // 다음 메시지 표시
  const showNextMessage = async (fast: boolean = false) => {
    if (currentMessageIndex >= chatScenario.length) return;

    const message = chatScenario[currentMessageIndex];

    // delay 적용 (빨리 감기 시 스킵)
    if (!fast && message.delay) {
      await new Promise((resolve) => setTimeout(resolve, message.delay));
    }

    // user(답변자) 메시지는 스트리밍, assistant(질문자) 메시지는 즉시 표시
    if (message.role === 'user') {
      await streamMessage(message, fast);
    } else {
      setVisibleMessages((prev) => [...prev, message]);
    }

    setCurrentMessageIndex((prev) => prev + 1);
  };

  // 빨리 감기
  const handleFastForward = () => {
    setIsFastForward(true);

    // 현재 스트리밍 중이면 중단
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }

    // 스트리밍 상태 초기화
    setStreamingText('');
    setIsStreaming(false);

    // 모든 메시지를 한 번에 표시 (중복 방지)
    setVisibleMessages([...chatScenario]);
    setCurrentMessageIndex(chatScenario.length);
    setIsFastForward(false);
  };

  // IntersectionObserver로 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentMessageIndex < chatScenario.length) {
            showNextMessage(false);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, [currentMessageIndex, isStreaming]);

  // 초기 메시지 표시
  useEffect(() => {
    if (currentMessageIndex === 0) {
      showNextMessage(false);
    }
  }, []);

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

  const renderMessageContent = (content: string, response?: ChatResponse) => {
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-emerald-600 dark:text-emerald-400">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 underline hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">$1</a>')
      .replace(/\n/g, '<br />');

    return (
      <div className="space-y-2">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
        {response && renderGenerativeUI(response)}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* 빨리 감기 버튼 */}
      {currentMessageIndex < chatScenario.length && (
        <div className="fixed bottom-24 right-8 z-50">
          <Button
            onClick={handleFastForward}
            disabled={isFastForward}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            <FastForward className="w-5 h-5 mr-2" />
            빨리 감기
          </Button>
        </div>
      )}

      <Card className="flex flex-col min-h-[calc(100vh-200px)] overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {visibleMessages.map((message, index) => (
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
                    'flex-1 max-w-[85%] rounded-lg p-4',
                    message.role === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  )}
                >
                  {renderMessageContent(message.content, message.response)}
                </div>
              </div>
            ))}

            {/* 스트리밍 중인 메시지 */}
            {isStreaming && streamingText && (
              <div className="flex gap-3 animate-slide-in">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1 max-w-[85%] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  {renderMessageContent(streamingText)}
                  <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1"></span>
                </div>
              </div>
            )}

            {/* 스크롤 트리거 */}
            <div ref={triggerRef} className="h-px" />

            {/* 메시지 끝 표시 */}
            {currentMessageIndex >= chatScenario.length && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <p className="text-sm">포트폴리오를 끝까지 봐주셔서 감사합니다! 🙏</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};
