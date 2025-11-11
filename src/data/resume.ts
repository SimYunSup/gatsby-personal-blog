import { Rocket, Zap, Database, TestTube, Users } from 'lucide-react';
export interface ChatResponse {
  type: 'text' | 'experience' | 'project' | 'metric' | 'showcase' | 'chain-of-thought';
  data?: {
    projectShowcase?: {
      projectName: string;
      description: string;
      screens?: {
        type: 'image',
        src: string;
      }[];
    };
    chainOfThought?: {
      title: string;
      steps: {
        icon?: React.FC;
        label: string;
        description: string;
        content: string;
        status?: 'completed' | 'in-progress' | 'pending';
      }[];
    };
  };
}

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
    content: '안녕하세요! 심윤섭입니다. 사용자 경험과 개발 생산성을 **숫자로 증명**하는 프론트엔드 개발자입니다.\n\n저는 **CI/CD 시간을 60% 단축**하며 프로세스의 지속가능성을 높이고, **신규 팀원의 온보딩 기간을 3일에서 1일로 줄여** 팀의 지속가능성에 기여하는 개발을 추구합니다.',
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
    content: '가장 최근에는 **엘리스**에서 **AI 디지털 교과서** 개발에 참여했습니다.\n\n**엘리스 중등 영어**, **교문사 중등 정보**, **교문사 고등 정보** 교과서 템플릿을 개발하였습니다.',
    response: {
      type: 'showcase',
      data: {
        projectShowcase: {
          projectName: 'AIDT',
          description: 'AI 디지털 교과서',
          screens: [
            {
              type: 'image',
              src: '/resume/elice-content.png',
            },
          ],
        },
      }
    },
  },
  {
    id: '4a',
    role: 'user',
    content: '그리고, 교과서 QA를 위한 devtool MVP를 제작했습니다.\n\n기존 CRA 기반 프로젝트의 빌드 속도가 느려 QA 피드백이 어려웠는데, **Rsbuild로 전환**하여 빌드 시간을 1분에서 4초로 단축하고, **CI/CD 전체 시간을 2분 40초에서 1분으로 60% 단축**했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 CI/CD를 60% 단축했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: 'CRA 기반 빌드가 느려 QA 피드백 주기가 길어지는 문제 발견',
              content: '플랫폼 로딩이 길어져 교과서 내용을 보기까지 시간이 오래 걸렸고, CRA 기반 빌드는 2분 40초가 소요되어 QA 피드백 루프가 느렸습니다. 교과서 개발 특성상 빠른 프리뷰가 중요했습니다.',
            },
            {
              label: 'QA를 위한 Devtool MVP 개발',
              description: '스테이징에서 모든 route를 빠르게 방문할 수 있는 편의 기능',
              content: '교과서의 모든 페이지를 빠르게 테스트할 수 있도록 devtool을 개발하여, QA 담당자가 효율적으로 검수할 수 있는 환경을 제공했습니다.',
            },
            {
              icon: Zap,
              label: 'CRA에서 Rsbuild로 전환',
              description: 'Webpack 대신 Rspack 기반의 Rsbuild로 마이그레이션',
              content: 'Rspack은 Rust 기반의 빠른 번들러로, 기존 CRA 레포지토리와 플러그인을 Rsbuild로 옮겨 빌드 속도를 1분에서 4초로 대폭 단축했습니다. Webpack보다 10배 이상 빠른 빌드 속도를 달성했습니다.',
            },
            {
              icon: Database,
              label: '캐싱 최적화',
              description: '불필요한 node_modules 캐싱 제거',
              content: 'Gitlab Actions에서 node_modules를 캐싱하고 있었으나, pnpm의 효율적인 패키지 관리로 인해 캐싱이 오히려 오버헤드가 되고 있었습니다. 이를 제거하여 추가 시간 절감을 달성했습니다.',
            },
            {
              label: '결과 측정',
              description: '빌드 시간 1분 → 4초, CI/CD 시간 60% 단축',
              status: 'completed',
              content: '빌드 시간이 극적으로 단축되어 QA 피드백 주기가 빨라졌고, 팀 전체의 생산성이 개선되었습니다. AI 디지털 교과서 개발 효율이 크게 향상되었습니다.',
            },
          ],
        },
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
    content: '네, 데이터 fetching 방식을 개선했습니다.\n\n기존 CRA 템플릿이 Tanstack Query 기반이어서 워터폴이 발생했는데, **React Router 기반으로 템플릿을 재구성**하고 **SWR**을 활용하여 유저 데이터 fetching 코드를 한 곳에 모아 **LCP를 800ms에서 600ms로 25% 개선**했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 LCP를 25% 개선했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: 'CRA 템플릿의 Tanstack Query 사용 시 워터폴 발생',
              content: '기존 CRA 템플릿이 Tanstack Query 기반이어서, 컴포넌트가 마운트되기 전까지 데이터 요청이 시작되지 않았습니다. 연속적인 데이터 fetching이 워터폴을 형성하여 초기 로딩이 느렸습니다.',
            },
            {
              label: 'React Router 기반 템플릿 재구성',
              description: '라우터 레벨에서 데이터 프리페칭',
              content: '기존 CRA 템플릿을 React Router 기반으로 재구성하여, loader 기능을 활용해 페이지 진입 전에 데이터 fetching을 시작했습니다. 컴포넌트 마운트 시점에 이미 데이터가 준비되어 있어 워터폴을 제거했습니다.',
            },
            {
              label: 'SWR 활용',
              description: '유저 데이터 fetching 코드를 한 곳에 모아 관리',
              content: 'SWR(Stale-While-Revalidate)로 캐시된 데이터를 먼저 보여주고, 백그라운드에서 데이터를 갱신하여 사용자 경험을 개선했습니다. 분산되어 있던 유저 데이터 fetching 로직을 한 곳에 모아 유지보수성도 향상시켰습니다.',
            },
            {
              label: 'LCP 개선',
              description: '로컬에서 측정했을 때 CP를 800ms에서 600ms로 25% 개선',
              content: '사용자가 교과서의 주요 콘텐츠를 더 빠르게 볼 수 있게 되어 체감 성능이 향상되었습니다. 학생들이 교과서를 더 빠르게 접근할 수 있게 되었습니다.',
            },
          ]
        },
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
    content: '**Headless CMS 기반 Web CMS 솔루션**을 처음부터 설계하고 개발했습니다.\n\nPayloadCMS를 리서치하고 도입하여 기존 랜딩페이지 개발 프로세스의 비효율성을 제거했고, 페이지 개발 기간을 1개월에서 2주로 50% 단축했습니다. 디자이너도 어드민에서 쉽게 사용할 수 있도록 블록 컴포넌트를 개발하여 비개발자도 UI 수정과 삭제가 가능하도록 만들었습니다.\n\n또한 클라이언트와 디자이너의 다양한 요구사항에 빠르게 대응하기 위해 Lexical 기반 위지윅 에디터에 테이블 기능과 이미지 크롭 기능을 추가로 개발했습니다. 관리자가 여러 어드민 페이지를 번갈아가며 관리하는 불편함을 해소하기 위해 Multi-tenant 구조를 도입하여 한 곳에서 통합 관리할 수 있게 했습니다.\n\n성능 개선을 위해 Nuxt.js를 도입하고 프론트엔드 개발자들에게 교육하여 LCP를 3초에서 1초로 67% 개선했습니다. 로컬 개발 환경의 온보딩을 간소화하기 위해 모노레포를 구성하고 ESLint와 Caddy를 활용한 자동화를 진행했으며, PayloadCMS를 깊이 분석하며 발견한 버그를 수정하고 새로운 기능을 개발하여 14개의 오픈소스 contribution을 기여했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 개발 기간을 50% 단축하고 LCP를 67% 개선했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: '랜딩페이지 개발마다 프론트엔드 개발자 작업 필요, 비효율적인 프로세스',
              content: '모든 콘텐츠 변경과 새 페이지 추가에 개발자가 필요했고, 개발 인원이 부족한 상황에서 1개월 이상이 소요되며 디자이너의 간단한 UI 수정 요청도 개발자를 거쳐야 했습니다.',
            },
            {
              icon: Database,
              label: 'Headless CMS 리서치 및 PayloadCMS 선택',
              description: 'TypeScript 기반의 커스터마이징 가능한 CMS 도입',
              content: 'Strapi, Contentful 등 여러 Headless CMS를 비교 분석하고 PoC를 거쳐, TypeScript 기반으로 커스터마이징이 용이한 PayloadCMS를 선택했습니다. 실제 서비스에 적용하며 PayloadCMS를 깊이 분석하여 14개의 오픈소스 contribution을 기여했습니다.',
            },
            {
              icon: TestTube,
              label: '모노레포 구성 및 개발 환경 자동화',
              description: '모노레포 구성 및 개발 환경 자동화',
              content: '다른 프론트엔드 개발자의 컨텍스트 스위칭을 최소화하기 위해 모노레포를 구성하고, ESLint 설정과 Caddy를 활용한 로컬 개발 환경 자동화를 진행했습니다. 간단한 문서화로 새로운 개발자도 빠르게 프로젝트에 기여할 수 있게 되었습니다.',
            },
          ]
        },
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
    content: '**쏘쏘마켓**에서 Frontend Engineer로 근무하며 지역 기반 소셜 네트워킹 서비스인 **이웃스토리**를 개발했습니다.',
    delay: 1000,
  },
  {
    id: '13',
    role: 'assistant',
    content: '쏘쏘마켓에서는 어떤 성과를 이루셨나요?',
    delay: 1500,
  },
  {
    id: '14',
    role: 'user',
    content: 'React Native로만 개발할 때, 모든 업데이트가 앱 스토어 심사를 거쳐야 하므로 배포에 3일 이상 소요되었습니다. 제한된 리소스로 MVP를 빠르게 개발하기 위해 **SPA-RN 하이브리드 아키텍처**를 설계하여 **배포 시간을 3일에서 5분으로 99% 단축**했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 배포 시간을 3일에서 5분으로 단축했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: '네이티브 앱 스토어 심사로 인한 긴 배포 주기',
              content: 'React Native로만 개발할 경우, 모든 업데이트가 앱 스토어 심사를 거쳐야 하므로 배포에 3일 이상 소요되었습니다.',
            },
            {
              icon: Rocket,
              label: '하이브리드 아키텍처 설계',
              description: 'SPA와 React Native를 결합한 구조 도입',
              content: 'Stackflow를 활용하여 WebView 내에서 SPA가 동작하도록 하되, 네이티브 기능이 필요한 부분만 React Native로 구현하는 하이브리드 구조를 설계했습니다.',
            },
            {
              icon: Zap,
              label: '즉시 배포 가능한 SPA',
              description: 'UI 변경은 WebView를 통해 즉시 반영',
              content: '대부분의 UI와 비즈니스 로직을 SPA로 구현하여, 코드 수정 후 웹 서버에 배포하면 즉시 사용자에게 반영되도록 했습니다. 웹에서 접근할 수 없는 네이티브 기능(카메라, 위치 정보)은 React Native와 Bridge로 연결하여 사용했습니다.',
            },
            {
              label: '결과 측정',
              description: '배포 시간을 3일에서 5분으로 99% 단축',
              status: 'completed',
              content: '빠른 배포 주기로 MVP를 신속하게 검증하고 개선할 수 있게 되어, 제한된 리소스로도 효율적인 개발이 가능해졌습니다.',
            },
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '13a',
    role: 'user',
    content: '',
    response: {
      type: 'showcase',
      data: {
        projectShowcase: {
          projectName: '이웃스토리 앱 아키텍처',
          description: 'SPA-RN 하이브리드 아키텍처',
          screens: [
            {
              type: 'image',
              src: '/resume/neighborhood-story-architecture.png',
            }
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '13b',
    role: 'assistant',
    content: '업무 외에 개인적으로 진행하는 프로젝트도 있으신가요?',
    delay: 1500,
  },
  {
    id: '14a',
    role: 'user',
    content: '네, 현재 **Ones To Watch for FE Newsletter**를 운영하고 있습니다.\n\n2024년부터 꾸준히 양질의 FE 개발 정보를 큐레이션하여 발행하고 있으며, **200명 이상의 구독자**와 **MAU 300**을 꾸준히 기록하고 있습니다.',
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
    content: '대학교 재학 중 **KOIN** 프로젝트에 참여했습니다.\n\n**한국기술교육대학교 커뮤니티 서비스**로, 가게 홍보 게시판, 동아리 소개 등 교내 활동 정보를 통합했습니다.\n\n**Vue → React**, **JS → TS**로 두 번의 리코드를 진행하고, **Lint 설정, CI 구축, 코드 리뷰 문화 도입**으로 **신규 팀원의 온보딩 기간을 3일에서 1일로 67% 단축**했습니다.\n\n**주요 웹 지표를 20% 개선**하며 개발 패러다임을 개선했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 온보딩 기간을 67% 단축했을까요?',
          steps: [
            {
              label: '첫 번째 리코드: Vue → React',
              description: 'React Hooks 등장으로 양방향 바인딩의 복잡성 제거',
              content: 'React Hooks의 등장으로 Vue의 낮은 러닝커브 장점이 상쇄되었고, 프로젝트 내에서 양방향 바인딩 활용도가 낮아 복잡성만 더한다고 판단했습니다. React로 마이그레이션하여 불필요한 개발 패러다임을 걷어내고 코드를 단순화했습니다.',
            },
            {
              icon: TestTube,
              label: '두 번째 리코드: JS → TypeScript',
              description: '코드 안정성과 개발 속도 향상을 위한 타입 시스템 도입',
              content: 'TypeScript를 도입하여 타입 안정성을 확보하고, 컴포넌트 인터페이스를 명확히 정의했습니다. 개발 패러다임 변경으로 코드 복잡도를 낮추고 성능과 개발 경험을 동시에 개선했습니다.',
            },
            {
              icon: Users,
              label: '코드 리뷰 문화 도입',
              description: '신규 팀원 온보딩 원활화 및 팀 코드 이해도 향상',
              content: '코드 리뷰 문화를 도입하여 신규 팀원들이 빠르게 프로젝트를 이해하고 기여할 수 있도록 했습니다. 문서화와 코드 리뷰를 통해 팀 전체의 코드 이해도를 높였습니다.',
            },
            {
              label: '성과 측정',
              description: '온보딩 기간 3일 → 1일로 67% 단축, 웹 지표 20% 개선',
              status: 'completed',
              content: '타입 안정성, 테스트, CI, 코드 리뷰 문화로 신규 팀원이 빠르게 기여할 수 있게 되었고, React + TypeScript로 전환하며 INP, LCP, FCP 등 주요 웹 지표가 20% 개선되었습니다.',
            },
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '16a',
    role: 'assistant',
    content: '멋진 경험이네요! 이외에도 코인에서 이루신 성과가 있나요?',
    delay: 1500,
  },
  {
    id: '17a',
    role: 'user',
    content: '작성중'
  },
  {
    id: '17b',
    role: 'assistant',
    content: '마지막으로, 개발자로서 어떤 가치를 추구하시나요?',
    delay: 1500,
  },
  {
    id: '18',
    role: 'user',
    content: '저는 **숫자로 증명하는 개발**을 추구합니다.\n\n단순히 기능을 구현하는 것을 넘어, 실제로 **사용자 경험이 얼마나 개선되었는지**, **팀의 생산성이 얼마나 향상되었는지**를 측정하고 개선합니다.\n\n• CI/CD 시간 **60% 단축**\n• LCP **25-67% 개선**\n• 개발 기간 **50% 단축**\n• 배포 시간 **99% 단축**\n• 온보딩 기간 **67% 단축**\n\n이러한 성과들은 팀과 사용자 모두에게 실질적인 가치를 제공합니다.',
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
    content: '네, 언제든지 연락 주세요!\n\n 📧 [pedogunu@gmail.com](mailto:pedogunu@gmail.com)\n💼 [LinkedIn](https://www.linkedin.com/in/pedogunu)\n🐙 [GitHub](https://github.com/SimYunSup)',
    delay: 800,
  },
];
