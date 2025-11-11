import { experiences, sideProjects, koinAchievements } from './resume';
import type { ChatResponse } from '@/utils/chatMatcher';

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
    content: '가장 최근에는 **엘리스**에서 AIDT 교과서 프로젝트를 진행했습니다.\n\n기존 CRA 기반 웹페이지의 빌드 및 릴리즈 속도가 느려 QA 피드백이 어려웠는데, Rsbuild로 전환하고 불필요한 캐싱을 제거하여 **CI/CD 시간을 2분 40초에서 1분으로 60% 단축**했습니다.',
    response: {
      type: 'metric',
      content: '',
      data: {
        achievement: experiences[0].projects[0].achievements[0],
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
    content: '네, 데이터 fetching 방식을 개선했습니다.\n\n기존 Tanstack Query 사용 시 워터폴이 발생했는데, **React Router + SWR**을 활용하여 유저 데이터 fetching 코드를 한 곳에 모으고 **LCP를 800ms에서 600ms로 25% 개선**했습니다.',
    response: {
      type: 'metric',
      content: '',
      data: {
        achievement: experiences[0].projects[0].achievements[1],
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
    content: '가장 큰 성과는 **Headless CMS 도입으로 개발 기간을 50% 단축**한 것입니다.\n\nPayloadCMS를 도입하여 페이지 개발 완료 기간을 1개월에서 2주로 단축했고, 비개발 직군도 콘텐츠를 직접 수정할 수 있게 되었습니다.\n\n또한 **Nuxt.js로 전환**하여 SSR을 적용, **LCP를 3초에서 1초로 67% 개선**했습니다.',
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
    content: '**쏘쏘마켓**에서 Frontend Engineer로 근무하며 지역 기반 소셜 네트워킹 서비스인 **이웃스토리**를 개발했습니다.\n\n제한된 리소스로 MVP를 빠르게 개발하기 위해 **SPA-RN 하이브리드 아키텍처**를 설계하여 **배포 시간을 3일에서 5분으로 99% 단축**했습니다.',
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
    content: '네, 현재 **Ones To Watch for FE Newsletter**를 운영하고 있습니다.\n\n2024년부터 꾸준히 양질의 FE 개발 정보를 큐레이션하여 발행하고 있으며, **200명 이상의 구독자**와 **MAU 300**을 꾸준히 기록하고 있습니다.',
    response: {
      type: 'project',
      content: '',
      data: {
        project: sideProjects[0],
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
    content: '대학교 재학 중 **KOIN** 프로젝트에 참여했습니다.\n\n한국기술교육대학교 커뮤니티 서비스로, Vue.js에서 React로 전환하고 테스트 자동화를 도입하여 **신규 팀원의 온보딩 기간을 3일에서 1일로 67% 단축**했습니다.\n\nReact + TypeScript 기반으로 재작성하여 INP, LCP, FCP 등 **주요 웹 지표를 20% 개선**했습니다.',
    response: {
      type: 'project',
      content: '',
      data: {
        project: sideProjects[1],
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
    content: '네, 언제든지 연락 주세요!\n\n📧 pedogunu@gmail.com\n💼 [LinkedIn](https://www.linkedin.com/in/pedogunu)\n🐙 [GitHub](https://github.com/SimYunSup)',
    delay: 800,
  },
];
