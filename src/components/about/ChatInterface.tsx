import { useState, useRef, useEffect } from 'react';
import { User, Bot, FastForward, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { ExperienceCard } from './ExperienceCard';
import { SideProjectCard } from './SideProjectCard';
import { MetricCard } from './MetricCard';
import { ProjectShowcase } from './ProjectShowcase';
import { type ChatResponse, type ChatMessage, chatScenario } from '@/data/resume';
import { cn } from '@/lib/utils';
import { ChainOfThought, ChainOfThoughtContent, ChainOfThoughtHeader, ChainOfThoughtStep } from '../ai-elements/chain-of-thought';

export const ChatInterface = () => {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [streamingText, setStreamingText] = useState('');
  const [streamingMessage, setStreamingMessage] = useState<ChatMessage | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFastForward, setIsFastForward] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, streamingText, streamingMessage]);

  // 텍스트 스트리밍 애니메이션
  const streamMessage = async (message: ChatMessage, fast: boolean = false) => {
    setIsStreaming(true);
    setStreamingMessage(message);

    // Chain of Thought가 있으면 모든 스텝이 표시될 때까지 대기
    if (!fast && message.response?.type === 'chain-of-thought' && message.response.data?.chainOfThought) {
      const totalSteps = message.response.data.chainOfThought.steps.length;
      const stepDelay = 500; // 각 스텝마다 500ms
      await new Promise((resolve) => setTimeout(resolve, totalSteps * stepDelay + 300)); // 여유시간 추가
    }

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
    setStreamingMessage(null);
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
    setStreamingMessage(null);
    setIsStreaming(false);

    // 모든 메시지를 한 번에 표시 (중복 방지)
    setVisibleMessages([...chatScenario]);
    setCurrentMessageIndex(chatScenario.length);

    // 모든 Chain of Thought 스텝을 즉시 표시
    const allStepsVisible: Record<string, number> = {};
    chatScenario.forEach(message => {
      if (message.response?.type === 'chain-of-thought' && message.response.data?.chainOfThought) {
        allStepsVisible[message.id] = message.response.data.chainOfThought.steps.length;
      }
    });
    setVisibleSteps(allStepsVisible);

    setIsFastForward(false);
  };

  // "다음" 버튼 클릭 핸들러
  const handleNext = async () => {
    if (isProcessing || isStreaming || currentMessageIndex >= chatScenario.length) {
      return;
    }

    setIsProcessing(true);
    await showNextMessage(false);
    setIsProcessing(false);
  };

  // 초기 메시지 표시
  useEffect(() => {
    if (currentMessageIndex === 0 && !isProcessing) {
      setIsProcessing(true);
      showNextMessage(false).finally(() => {
        setIsProcessing(false);
      });
    }
  }, []);

  // Chain of Thought 스텝을 순차적으로 표시
  useEffect(() => {
    const messagesToCheck = [...visibleMessages];
    if (streamingMessage) {
      messagesToCheck.push(streamingMessage);
    }

    messagesToCheck.forEach((message, msgIndex) => {
      if (message.response?.type === 'chain-of-thought' && message.response.data?.chainOfThought) {
        const messageId = message.id;
        const totalSteps = message.response.data.chainOfThought.steps.length;
        const currentVisible = visibleSteps[messageId] || 0;

        if (currentVisible < totalSteps) {
          const timer = setTimeout(() => {
            setVisibleSteps(prev => ({
              ...prev,
              [messageId]: currentVisible + 1
            }));
          }, 500); // 각 스텝마다 500ms 간격

          return () => clearTimeout(timer);
        }
      }
    });
  }, [visibleMessages, visibleSteps, streamingMessage]);

  const renderGenerativeUI = (response: ChatResponse, messageId: string) => {
    const { type, data } = response;

    switch (type) {
      case 'chain-of-thought':
        if (data?.chainOfThought) {
          const currentVisibleSteps = visibleSteps[messageId] || 0;

          return (
            <div className="animate-fade-in">
              <ChainOfThought defaultOpen={true}>
                <ChainOfThoughtHeader>
                  {data.chainOfThought.title}
                </ChainOfThoughtHeader>
                {data.chainOfThought.steps.slice(0, currentVisibleSteps).map((step, index) => (
                  <ChainOfThoughtStep
                    key={index}
                    label={step.label}
                    icon={step.icon}
                    status={step.status}
                    description={step.description}
                  >
                    <ChainOfThoughtContent>
                      {step.content}
                    </ChainOfThoughtContent>
                  </ChainOfThoughtStep>
                ))}
              </ChainOfThought>
            </div>
          );
        }
        break;

      // case 'experience':
      //   if (data?.experience) {
      //     return (
      //       <div className="mt-4 animate-fade-in">
      //         <ExperienceCard experience={data.experience} />
      //       </div>
      //     );
      //   }
      //   break;

      // case 'project':
      //   if (data?.project) {
      //     return (
      //       <div className="mt-4 animate-fade-in">
      //         <SideProjectCard project={data.project} />
      //       </div>
      //     );
      //   }
      //   break;

      // case 'metric':
      //   if (data?.achievement?.metrics) {
      //     return (
      //       <div className="mt-4 animate-fade-in">
      //         <MetricCard
      //           metric={data.achievement.metrics}
      //           title={data.achievement.title}
      //           animated={true}
      //         />
      //       </div>
      //     );
      //   }
      //   break;

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

  const renderMessageContent = (content: string, messageId: string, response?: ChatResponse) => {
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold" style="color: var(--color-primary)">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 font-medium" style="color: var(--color-primary)">$1</a>')
      .replace(/\n/g, '<br />');

    return (
      <div className="space-y-2">
        {response && renderGenerativeUI(response, messageId)}
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
    );
  };

  return (
    <div className="relative">
      {/* 버튼 그룹 */}
      {currentMessageIndex < chatScenario.length && (
        <div className="fixed bottom-8 right-8 z-50 flex gap-3">
          <Button
            onClick={handleNext}
            disabled={isProcessing || isStreaming}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="w-5 h-5 mr-2" />
            다음
          </Button>
          <Button
            onClick={handleFastForward}
            disabled={isFastForward || isProcessing || isStreaming}
            size="lg"
            variant="outline"
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
              <Message key={message.id} from={message.role}>
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                    message.role === 'user'
                      ? 'text-white ml-auto'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  )}
                  style={message.role === 'user' ? { backgroundColor: 'var(--color-primary)' } : undefined}
                >
                  {message.role === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <MessageContent>
                  {renderMessageContent(message.content, message.id, message.response)}
                </MessageContent>
              </Message>
            ))}

            {/* 스트리밍 중인 메시지 */}
            {isStreaming && streamingMessage && (
              <Message from="user">
                <div
                  className="ml-auto w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <User className="w-5 h-5" />
                </div>
                <MessageContent>
                  <div className="space-y-2">
                    {streamingMessage.response && renderGenerativeUI(streamingMessage.response, streamingMessage.id)}
                    {streamingText && (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <span dangerouslySetInnerHTML={{
                          __html: streamingText
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold" style="color: var(--color-primary)">$1</strong>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 font-medium" style="color: var(--color-primary)">$1</a>')
                            .replace(/\n/g, '<br />')
                        }} />
                        <span className="inline-block w-2 h-4 animate-pulse ml-1" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                      </div>
                    )}
                  </div>
                </MessageContent>
              </Message>
            )}

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
