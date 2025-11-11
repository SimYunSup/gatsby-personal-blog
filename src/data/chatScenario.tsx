import { experiences, sideProjects, koinAchievements } from './resume';
import type { ChatResponse } from '@/utils/chatMatcher';
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought';
import { Rocket, Zap, Database, TestTube, Users } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response?: ChatResponse;
  delay?: number; // 메시지 표시 전 대기 시간 (ms)
}

// 자동으로 진행되는 대화 시나리오 (AI가 질문, 사용자가 답변)
export const chatScenario: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: '안녕하세요! 오늘 인터뷰에 참여해 주셔서 감사합니다. 먼저 간단히 자기소개 부탁드립니다.',
    delay: 0,
  },
  {
    id: '2',
    role: 'user',
    content: '안녕하세요! 심윤섭입니다. 사용자 경험과 개발 생산성을 **숫자로 증명**하는 프론트엔드 개발자입니다.\\n\\n저는 **CI/CD 시간을 60% 단축**하며 프로세스의 지속가능성을 높이고, **신규 팀원의 온보딩 기간을 3일에서 1일로 줄여** 팀의 지속가능성에 기여하는 개발을 추구합니다.',
    delay: 800,
  },
  {
    id: '3',
    role: 'assistant',
    content: '인상적이네요. 그럼 최근에 진행하신 프로젝트 경험에 대해 말씀해 주시겠어요?',
    delay: 1500,
  },
  {
    id: '4',
    role: 'user',
    content: '가장 최근에는 **엘리스**에서 AIDT 교과서 프로젝트를 진행했습니다.\\n\\n기존 CRA 기반 웹페이지의 빌드 및 릴리즈 속도가 느려 QA 피드백이 어려웠는데, Rsbuild로 전환하고 불필요한 캐싱을 제거하여 **CI/CD 시간을 2분 40초에서 1분으로 60% 단축**했습니다.',
    response: {
      type: 'chain-of-thought',
      content: '',
      data: {
        chainOfThought: (
          <ChainOfThought defaultOpen={false}>
            <ChainOfThoughtHeader>
              🤔 어떻게 CI/CD를 60% 단축했을까요?
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                icon={Rocket}
                label="문제 파악"
                description="CRA 기반 빌드가 느려 QA 피드백 주기가 길어지는 문제 발견"
              >
                기존 CRA 기반 프로젝트는 빌드 시간이 2분 40초로, 빠른 피드백 루프를 방해했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={Zap}
                label="Rsbuild 도입"
                description="Webpack 대신 Rspack 기반의 Rsbuild로 전환"
              >
                Rspack은 Rust 기반의 빠른 번들러로, Webpack보다 10배 이상 빠른 빌드 속도를 제공합니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={Database}
                label="캐싱 최적화"
                description="불필요한 node_modules 캐싱 제거"
              >
                GitHub Actions에서 node_modules를 캐싱하고 있었으나, pnpm의 효율적인 패키지 관리로 인해 캐싱이 오히려 오버헤드가 되고 있었습니다. 이를 제거하여 추가 시간 절감을 달성했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="결과 측정"
                description="CI/CD 시간을 2분 40초에서 1분으로 60% 단축"
                status="complete"
              >
                QA 피드백 주기가 빨라져 개발 속도가 향상되었고, 팀 전체의 생산성이 개선되었습니다.
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        ),
      },
    },
    delay: 1000,
  },
  {
    id: '5',
    role: 'assistant',
    content: '프로젝트를 진행하면서 성능 개선도 하셨나요?',
    delay: 1500,
  },
  {
    id: '6',
    role: 'user',
    content: '네, 데이터 fetching 방식을 개선했습니다.\\n\\n기존 Tanstack Query 사용 시 워터폴이 발생했는데, **React Router + SWR**을 활용하여 유저 데이터 fetching 코드를 한 곳에 모으고 **LCP를 800ms에서 600ms로 25% 개선**했습니다.',
    response: {
      type: 'chain-of-thought',
      content: '',
      data: {
        chainOfThought: (
          <ChainOfThought defaultOpen={false}>
            <ChainOfThoughtHeader>
              🤔 어떻게 LCP를 25% 개선했을까요?
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="문제 파악"
                description="Tanstack Query 사용 시 데이터 fetching 워터폴 발생"
              >
                컴포넌트가 마운트되기 전까지 데이터 요청이 시작되지 않아, 연속적인 데이터 fetching이 워터폴을 형성했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="React Router 활용"
                description="라우터 레벨에서 데이터 프리페칭"
              >
                React Router의 loader 기능을 활용하여 페이지 진입 전에 데이터 fetching을 시작했습니다. 이로써 컴포넌트 마운트 시점에 이미 데이터가 준비되어 있습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="SWR로 캐싱 최적화"
                description="SWR을 통한 효율적인 데이터 캐싱 및 갱신"
              >
                SWR(Stale-While-Revalidate)로 캐시된 데이터를 먼저 보여주고, 백그라운드에서 데이터를 갱신하여 사용자 경험을 개선했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="결과 측정"
                description="LCP를 800ms에서 600ms로 25% 개선"
                status="complete"
              >
                사용자가 페이지의 주요 콘텐츠를 더 빠르게 볼 수 있게 되어 체감 성능이 크게 향상되었습니다.
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        ),
      },
    },
    delay: 1000,
  },
  {
    id: '7',
    role: 'assistant',
    content: '엘리스 이전의 경력도 궁금한데요, 어떤 경험을 하셨나요?',
    delay: 1500,
  },
  {
    id: '8',
    role: 'user',
    content: '**온오프믹스**에서 Software Engineer로 근무하며 외부 홈페이지 개발 노코드 솔루션인 **Web CMS**를 개발했습니다.',
    response: {
      type: 'experience',
      content: '',
      data: {
        experience: experiences[1],
      },
    },
    delay: 1000,
  },
  {
    id: '9',
    role: 'assistant',
    content: '온오프믹스에서는 어떤 성과를 이루셨나요?',
    delay: 1500,
  },
  {
    id: '10',
    role: 'user',
    content: '가장 큰 성과는 **Headless CMS 도입으로 개발 기간을 50% 단축**한 것입니다.\\n\\nPayloadCMS를 도입하여 페이지 개발 완료 기간을 1개월에서 2주로 단축했고, 비개발 직군도 콘텐츠를 직접 수정할 수 있게 되었습니다.\\n\\n또한 **Nuxt.js로 전환**하여 SSR을 적용, **LCP를 3초에서 1초로 67% 개선**했습니다.',
    response: {
      type: 'chain-of-thought',
      content: '',
      data: {
        chainOfThought: (
          <ChainOfThought defaultOpen={false}>
            <ChainOfThoughtHeader>
              🤔 어떻게 개발 기간을 50% 단축하고 LCP를 67% 개선했을까요?
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="문제 파악"
                description="페이지 개발마다 프론트엔드 개발자의 코드 작성이 필요"
              >
                모든 콘텐츠 변경과 새 페이지 추가에 개발자가 필요했고, 이는 1개월 이상의 시간이 소요되었습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={Database}
                label="PayloadCMS 선택"
                description="TypeScript 기반의 Headless CMS 도입"
              >
                Strapi, Contentful 등 여러 CMS를 비교한 결과, TypeScript 기반의 PayloadCMS가 커스터마이징이 용이하고 개발 경험이 뛰어나다고 판단했습니다. 실제로 PayloadCMS 오픈소스에 14개의 contribution을 기여할 정도로 깊이 있게 학습했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="블록 기반 콘텐츠 구조 설계"
                description="비개발자도 사용 가능한 직관적인 관리 인터페이스 구축"
              >
                페이지를 블록 단위로 설계하여, 마케팅팀이 드래그 앤 드롭으로 페이지를 구성할 수 있도록 했습니다. 이로써 개발자 개입 없이 콘텐츠 수정이 가능해졌습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={Zap}
                label="Nuxt.js SSR 전환"
                description="CSR에서 SSR로 전환하여 초기 로딩 성능 대폭 개선"
              >
                기존 CSR 방식에서 Nuxt.js를 활용한 SSR로 전환하여, 서버에서 HTML을 미리 렌더링해 전송함으로써 첫 페이지 로드 속도를 크게 개선했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="성과 검증"
                description="개발 기간 50% 단축, LCP 67% 개선"
                status="complete"
              >
                페이지 개발 기간이 1개월에서 2주로 단축되었고, LCP는 3초에서 1초로 67% 개선되어 사용자 경험과 개발 생산성이 모두 향상되었습니다.
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        ),
      },
    },
    delay: 1000,
  },
  {
    id: '11',
    role: 'assistant',
    content: '온오프믹스 이전에는 어떤 경험이 있으신가요?',
    delay: 1500,
  },
  {
    id: '12',
    role: 'user',
    content: '**쏘쏘마켓**에서 Frontend Engineer로 근무하며 지역 기반 소셜 네트워킹 서비스인 **이웃스토리**를 개발했습니다.\\n\\n제한된 리소스로 MVP를 빠르게 개발하기 위해 **SPA-RN 하이브리드 아키텍처**를 설계하여 **배포 시간을 3일에서 5분으로 99% 단축**했습니다.',
    response: {
      type: 'chain-of-thought',
      content: '',
      data: {
        chainOfThought: (
          <ChainOfThought defaultOpen={false}>
            <ChainOfThoughtHeader>
              🤔 어떻게 배포 시간을 99% 단축했을까요?
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="문제 파악"
                description="네이티브 앱 스토어 심사로 인한 긴 배포 주기"
              >
                React Native로만 개발할 경우, 모든 업데이트가 앱 스토어 심사를 거쳐야 하므로 배포에 3일 이상 소요되었습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={Rocket}
                label="하이브리드 아키텍처 설계"
                description="SPA와 React Native를 결합한 구조 도입"
              >
                Stackflow를 활용하여 WebView 내에서 SPA가 동작하도록 하되, 네이티브 기능이 필요한 부분만 React Native로 구현하는 하이브리드 구조를 설계했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="즉시 배포 가능한 SPA"
                description="UI 변경은 WebView를 통해 즉시 반영"
              >
                대부분의 UI와 비즈니스 로직을 SPA로 구현하여, 코드 수정 후 웹 서버에 배포하면 즉시 사용자에게 반영되도록 했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="네이티브 기능은 Bridge 활용"
                description="카메라, 위치 등 네이티브 기능은 React Native로 처리"
              >
                웹에서 접근할 수 없는 네이티브 기능(카메라, 위치 정보)은 React Native와 Bridge로 연결하여 사용했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="결과 측정"
                description="배포 시간을 3일에서 5분으로 99% 단축"
                status="complete"
              >
                빠른 배포 주기로 MVP를 신속하게 검증하고 개선할 수 있게 되어, 제한된 리소스로도 효율적인 개발이 가능해졌습니다.
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        ),
      },
    },
    delay: 1000,
  },
  {
    id: '13',
    role: 'assistant',
    content: '업무 외에 개인적으로 진행하는 프로젝트도 있으신가요?',
    delay: 1500,
  },
  {
    id: '14',
    role: 'user',
    content: '네, 현재 **Ones To Watch for FE Newsletter**를 운영하고 있습니다.\\n\\n2024년부터 꾸준히 양질의 FE 개발 정보를 큐레이션하여 발행하고 있으며, **200명 이상의 구독자**와 **MAU 300**을 꾸준히 기록하고 있습니다.',
    response: {
      type: 'chain-of-thought',
      content: '',
      data: {
        chainOfThought: (
          <ChainOfThought defaultOpen={false}>
            <ChainOfThoughtHeader>
              🤔 어떻게 뉴스레터를 성장시켰을까요?
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="문제 의식"
                description="양질의 프론트엔드 정보를 찾기 어려움"
              >
                프론트엔드 생태계가 빠르게 변화하지만, 신뢰할 수 있는 정보를 큐레이션한 한국어 콘텐츠가 부족했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="지속적인 큐레이션"
                description="매주 엄선된 프론트엔드 아티클 발행"
              >
                해외의 주요 프론트엔드 블로그, GitHub 트렌드, Reddit 등에서 양질의 콘텐츠를 발굴하여 요약하고 소개했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="커뮤니티 참여"
                description="독자 피드백을 반영한 콘텐츠 개선"
              >
                구독자들의 피드백을 적극 반영하여, 실무에 도움이 되는 콘텐츠를 제공하도록 노력했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="성과 측정"
                description="구독자 200+, MAU 300 달성"
                status="complete"
              >
                꾸준한 발행으로 신뢰를 쌓아, 200명 이상의 구독자와 MAU 300을 기록하며 프론트엔드 커뮤니티에 기여하고 있습니다.
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        ),
      },
    },
    delay: 1000,
  },
  {
    id: '15',
    role: 'assistant',
    content: '다른 사이드 프로젝트도 있나요?',
    delay: 1500,
  },
  {
    id: '16',
    role: 'user',
    content: '대학교 재학 중 **KOIN** 프로젝트에 참여했습니다.\\n\\n한국기술교육대학교 커뮤니티 서비스로, Vue.js에서 React로 전환하고 테스트 자동화를 도입하여 **신규 팀원의 온보딩 기간을 3일에서 1일로 67% 단축**했습니다.\\n\\nReact + TypeScript 기반으로 재작성하여 INP, LCP, FCP 등 **주요 웹 지표를 20% 개선**했습니다.',
    response: {
      type: 'chain-of-thought',
      content: '',
      data: {
        chainOfThought: (
          <ChainOfThought defaultOpen={false}>
            <ChainOfThoughtHeader>
              🤔 어떻게 온보딩 기간을 67% 단축했을까요?
            </ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="문제 파악"
                description="신규 팀원이 프로젝트를 이해하고 기여하기까지 3일 소요"
              >
                기존 Vue.js 코드베이스가 문서화되지 않았고, 타입 안정성이 부족하여 신규 팀원이 코드를 이해하는 데 시간이 오래 걸렸습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={TestTube}
                label="React + TypeScript 전환"
                description="타입 안정성과 명확한 코드 구조 확립"
              >
                TypeScript를 도입하여 타입 안정성을 확보하고, 컴포넌트 인터페이스를 명확히 정의하여 코드 가독성을 높였습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={TestTube}
                label="테스트 자동화 도입"
                description="Jest, React Testing Library로 단위 테스트 구축"
              >
                주요 컴포넌트와 유틸리티 함수에 테스트를 작성하여, 코드 변경 시 안전하게 리팩토링할 수 있는 환경을 만들었습니다. 테스트 코드가 문서 역할도 함께 수행했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                icon={Users}
                label="문서화 및 가이드 작성"
                description="신규 팀원을 위한 온보딩 문서 작성"
              >
                프로젝트 구조, 컴포넌트 사용법, 코드 스타일 가이드 등을 문서화하여 신규 팀원이 빠르게 적응할 수 있도록 했습니다.
              </ChainOfThoughtStep>
              <ChainOfThoughtStep
                label="성과 측정"
                description="온보딩 기간 3일 → 1일로 67% 단축, 웹 지표 20% 개선"
                status="complete"
              >
                타입 안정성, 테스트, 문서화로 신규 팀원이 빠르게 기여할 수 있게 되었고, React로 전환하며 성능도 함께 개선되었습니다.
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        ),
      },
    },
    delay: 1000,
  },
  {
    id: '17',
    role: 'assistant',
    content: '마지막으로, 개발자로서 어떤 가치를 추구하시나요?',
    delay: 1500,
  },
  {
    id: '18',
    role: 'user',
    content: '저는 **숫자로 증명하는 개발**을 추구합니다.\\n\\n단순히 기능을 구현하는 것을 넘어, 실제로 **사용자 경험이 얼마나 개선되었는지**, **팀의 생산성이 얼마나 향상되었는지**를 측정하고 개선합니다.\\n\\n• CI/CD 시간 **60% 단축**\\n• LCP **25-67% 개선**\\n• 개발 기간 **50% 단축**\\n• 배포 시간 **99% 단축**\\n• 온보딩 기간 **67% 단축**\\n\\n이러한 성과들은 팀과 사용자 모두에게 실질적인 가치를 제공합니다.',
    delay: 1000,
  },
  {
    id: '19',
    role: 'assistant',
    content: '좋은 인터뷰였습니다. 혹시 연락 가능한 방법을 알려주실 수 있나요?',
    delay: 1500,
  },
  {
    id: '20',
    role: 'user',
    content: '네, 언제든지 연락 주세요!\\n\\n📧 pedogunu@gmail.com\\n💼 [LinkedIn](https://www.linkedin.com/in/pedogunu)\\n🐙 [GitHub](https://github.com/SimYunSup)',
    delay: 800,
  },
];
