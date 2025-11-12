import { Rocket, Zap, Database, TestTube, User } from 'lucide-react';
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
  role: 'assistant' | 'user';
  content: string;
  response?: ChatResponse;
  delay?: number; // 메시지 표시 전 대기 시간 (ms)
}

// 자동으로 진행되는 대화 시나리오 (AI가 질문, 사용자가 답변)
export const chatScenario: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: '안녕하세요! 오늘 인터뷰에 참여해 주셔서 감사합니다. 먼저 간단히 자기소개 부탁드립니다.',
    delay: 0,
  },
  {
    id: '2',
    role: 'assistant',
    content: '안녕하세요! 심윤섭입니다. 저는 사용자 경험과 개발 생산성을 **숫자로 증명**하는 프론트엔드 개발자입니다.\n\n저는 **회사와 나, 그리고 동료와의 지속가능한 개발**을 추구합니다. **CI/CD 시간을 60% 단축**하여 회사의 개발 프로세스를 개선하고, **신규 팀원의 온보딩 기간을 3일에서 1일로 줄여** 동료들이 빠르게 성장할 수 있는 환경을 만듭니다. 이를 통해 나 자신도 지속적으로 성장하며, 모두가 함께 발전하는 개발 문화를 만들어갑니다.',
    delay: 800,
  },
  {
    id: '3',
    role: 'user',
    content: '인상적이네요. 그럼 최근에 진행하신 프로젝트 경험에 대해 말씀해 주시겠어요?',
    delay: 1500,
  },
  {
    id: '4',
    role: 'assistant',
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
    role: 'assistant',
    content: '그리고, 교과서 QA를 위한 devtool MVP를 제작했습니다.\n\n기존에는 CRA 기반 프로젝트였기 때문에 빌드 속도가 느렸습니다. 이로 인해 QA 담당자가 수정사항을 빠르게 확인하기 어려웠습니다. 이 문제를 해결하기 위해 **Rsbuild로 전환**했습니다. 그 결과 빌드 시간을 1분에서 4초로 단축했고, **CI/CD 전체 시간을 2분 40초에서 1분으로 60% 단축**했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 CI/CD를 60% 단축했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: 'git push 후 릴리즈까지 평균 2분 40초 소요',
              content: '플랫폼 로딩 시간이 길어서 교과서 내용을 확인하기까지 시간이 오래 걸렸습니다. CRA 기반 빌드는 2분 40초나 소요되었습니다. 이로 인해 QA 담당자가 수정사항에 대한 피드백을 빠르게 주기 어려운 상태였습니다. 교과서 개발은 콘텐츠 검수가 중요하므로 빠른 프리뷰가 필수적이었습니다.',
              status: 'completed',
            },
            {
              label: 'QA를 위한 Devtool MVP 개발',
              description: '스테이징에서 모든 route를 빠르게 방문할 수 있는 편의 기능 추가',
              content: '교과서의 모든 페이지를 빠르게 테스트할 수 있도록 devtool을 개발하여, QA 담당자가 효율적으로 검수할 수 있는 환경을 제공했습니다.',
              status: 'completed',
            },
            {
              icon: Zap,
              label: 'CRA → Rsbuild 마이그레이션',
              description: 'Vite 호환성 문제로 Rspack 기반 Rsbuild 선택',
              content: '처음에는 Vite 기반으로 변경을 시도했습니다. 하지만 기존 프로젝트의 CJS(CommonJS) 모듈 호환성 문제로 실패했습니다. 대신 Webpack과 호환되는 Rspack 기반의 Rsbuild를 선택했습니다. Rsbuild로 플러그인과 템플릿을 변경한 결과, 빌드 속도를 1분에서 4초로 대폭 단축했습니다.',
              status: 'completed',
            },
            {
              icon: Database,
              label: 'CI/CD 파이프라인 분석',
              description: 'node_modules 캐싱이 오히려 오버헤드가 되는 상황 발견',
              content: 'Rsbuild로 전환했는데도 CI/CD 속도가 기대만큼 빨라지지 않았습니다. 파이프라인을 분석한 결과, 문제의 원인을 발견했습니다. Gitlab Actions에서 node_modules를 캐싱하는 과정 자체가 불필요한 오버헤드를 발생시키고 있었습니다. 프로젝트에서 pnpm을 사용하고 있었는데, pnpm은 이미 효율적인 패키지 관리 방식을 가지고 있어서 별도 캐싱이 필요 없었습니다. 캐싱을 제거하니 속도가 더 빨라졌습니다.',
              status: 'completed',
            },
            {
              label: '최종 결과',
              description: 'Before 160s → After(Rsbuild) 110s → After(Caching) 60s',
              status: 'completed',
              content: 'CRA 기반일 때는 160초가 걸렸습니다. Rsbuild로 전환 후 110초로 줄었습니다. 최종적으로 불필요한 캐싱을 제거하니 60초까지 단축되었습니다. 결과적으로 **60% 성능 개선**을 달성했습니다. 이를 통해 개발자의 컨텍스트 스위칭을 최소화할 수 있었습니다. QA 피드백에 대응할 때 집중도가 향상되었고, 실수도 감소했습니다.',
            },
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '5',
    role: 'user',
    content: '프로젝트를 진행하면서 성능 개선도 하셨나요?',
    delay: 1500,
  },
  {
    id: '6',
    role: 'assistant',
    content: '네, 데이터 fetching 방식을 개선했습니다.\n\n기존 CRA 템플릿은 Tanstack Query 기반이었습니다. 이 방식에서는 데이터 요청이 순차적으로 발생하는 워터폴 현상이 생겼습니다. 이 문제를 해결하기 위해 **React Router 기반으로 템플릿을 재구성**했습니다. 그리고 **SWR**을 활용하여 유저 데이터를 가져오는 코드를 한 곳에 모았습니다. 그 결과 **LCP를 800ms에서 600ms로 25% 개선**했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 LCP를 25% 개선했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: 'CRA 템플릿의 Tanstack Query 사용 시 워터폴 발생',
              content: '기존 CRA 템플릿은 Tanstack Query 기반이었습니다. Tanstack Query는 컴포넌트가 마운트된 후에야 데이터 요청을 시작합니다. 따라서 여러 컴포넌트가 순차적으로 마운트되면, 각 컴포넌트의 데이터 요청도 순차적으로 발생합니다. 이러한 연속적인 데이터 fetching이 워터폴을 형성했습니다. 그 결과 초기 로딩이 느렸습니다.',
            },
            {
              label: 'React Router 기반 템플릿 재구성',
              description: '라우터 레벨에서 데이터 프리페칭',
              content: '기존 CRA 템플릿을 React Router 기반으로 재구성했습니다. React Router의 loader 기능을 활용하면 페이지에 진입하기 전에 데이터 fetching을 미리 시작할 수 있습니다. 이렇게 하면 컴포넌트가 마운트되는 시점에는 이미 데이터가 준비되어 있습니다. 따라서 워터폴 현상을 제거할 수 있었습니다.',
            },
            {
              label: 'SWR 활용',
              description: '유저 데이터 fetching 코드를 한 곳에 모아 관리',
              content: 'SWR(Stale-While-Revalidate) 전략을 활용했습니다. 이 방식은 캐시된 데이터를 먼저 사용자에게 보여줍니다. 그리고 백그라운드에서 데이터를 갱신합니다. 사용자는 즉시 콘텐츠를 볼 수 있어 체감 속도가 빨라집니다. 또한 기존에는 유저 데이터를 가져오는 로직이 여러 곳에 분산되어 있었습니다. 이를 한 곳에 모아 관리하도록 변경했습니다. 그 결과 유지보수성도 향상되었습니다.',
            },
            {
              label: 'LCP 개선',
              description: '로컬에서 측정했을 때 LCP를 800ms에서 600ms로 25% 개선',
              content: '이러한 개선으로 LCP(Largest Contentful Paint) 지표가 향상되었습니다. 로컬 환경에서 측정했을 때 800ms에서 600ms로 25% 개선되었습니다. 사용자는 교과서의 주요 콘텐츠를 더 빠르게 볼 수 있게 되었습니다. 학생들이 교과서에 더 빠르게 접근할 수 있게 되어 학습 경험이 향상되었습니다.',
            },
          ]
        },
      },
    },
    delay: 1000,
  },
  {
    id: '6a',
    role: 'user',
    content: '디자인 시스템 측면에서도 개선을 하셨나요?',
    delay: 1500,
  },
  {
    id: '6b',
    role: 'assistant',
    content: '네, **Fluid Typography 시스템**을 구축했습니다. 이를 통해 다양한 디바이스에서 일관된 사용자 경험을 제공할 수 있었습니다.\n\n기존에는 교과서마다 개별적으로 font-size를 설정했습니다. 이로 인해 유지보수가 어려웠습니다. 이 문제를 해결하기 위해 **clamp() 기반 Fluid Typography**로 전환했습니다. 디자인 시스템이 단순화되었습니다. viewport 크기에 따라 폰트 크기가 자동으로 조절됩니다. 그 결과 **사용성이 대폭 향상**되었습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 Fluid Typography를 구축했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: '교과서마다 개별 font-size 설정으로 유지보수 어려움',
              content: '각 교과서마다 서로 다른 font-size를 설정하고 있었습니다. 따라서 디자인을 수정할 때마다 모든 교과서를 일일이 확인해야 했습니다. 각 교과서의 코드를 하나씩 수정해야 했기 때문에 작업량이 많았습니다. 또한 태블릿, 데스크톱 등 다양한 디바이스에서 일관된 경험을 제공하기 어려웠습니다.',
              status: 'completed',
            },
            {
              icon: Zap,
              label: 'clamp() 기반 Fluid Typography 도입',
              description: 'viewport에 따라 자동으로 조절되는 폰트 시스템',
              content: 'CSS clamp() 함수를 활용했습니다. clamp() 함수는 최소값, 선호값, 최대값을 정의할 수 있습니다. viewport 크기에 따라 이 범위 내에서 폰트 크기가 자동으로 조절됩니다. 이렇게 구축한 시스템 덕분에 모든 화면 크기에서 최적의 가독성을 제공할 수 있었습니다.',
              status: 'completed',
            },
            {
              label: '디자인 시스템 단순화',
              description: '한 곳에서 관리하는 타이포그래피 토큰',
              content: '모든 교과서가 동일한 타이포그래피 토큰을 사용하도록 통일했습니다. 이제 디자인 수정이 필요할 때 한 곳의 토큰 값만 변경하면 됩니다. 변경사항이 모든 교과서에 일괄적으로 적용됩니다. 이전에는 각 교과서를 개별적으로 수정해야 했던 것에 비해 유지보수 비용을 크게 절감할 수 있었습니다.',
              status: 'completed',
            },
            {
              label: '사용성 향상',
              description: '다양한 디바이스에서 일관된 가독성 제공',
              content: '태블릿, 데스크톱, 초대형 모니터 등 모든 화면 크기에 대응할 수 있게 되었습니다. 각 디바이스에서 적절한 폰트 크기가 자동으로 적용됩니다. 학생들은 어떤 환경에서든 편안하게 교과서를 읽을 수 있게 되었습니다. 특히 교육 현장에서 사용되는 다양한 디바이스 환경을 모두 고려할 수 있어 사용성이 크게 향상되었습니다.',
              status: 'completed',
            },
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '7',
    role: 'user',
    content: '엘리스 이전의 경력도 궁금한데요, 어떤 경험을 하셨나요?',
    delay: 1500,
  },
  {
    id: '8',
    role: 'assistant',
    content: '**온오프믹스**에서 Software Engineer로 근무하며 외부 홈페이지 개발 노코드 솔루션인 **Web CMS**를 개발했습니다.',
    delay: 1000,
    response: {
      type: 'showcase',
      data: {
        projectShowcase: {
          projectName: 'Web CMS',
          description: 'Headless CMS 기반 노코드 솔루션',
          screens: [
            {
              type: 'image',
              src: '/resume/web-cms-content.png',
            }
          ],
        },
      },
    },
  },
  {
    id: '9',
    role: 'user',
    content: '온오프믹스에서는 어떤 성과를 이루셨나요?',
    delay: 1500,
  },
  {
    id: '10',
    role: 'assistant',
    content: '**Headless CMS 기반 Web CMS 솔루션**을 처음부터 설계하고 개발했습니다.\n\nPayloadCMS를 리서치하고 도입했습니다. 기존 랜딩페이지 개발 프로세스는 비효율적이었는데, 이를 제거할 수 있었습니다. 그 결과 페이지 개발 기간을 1개월에서 2주로 50% 단축했습니다. 디자이너도 어드민에서 쉽게 사용할 수 있도록 블록 컴포넌트를 개발했습니다. 이를 통해 비개발자도 UI를 수정하고 삭제할 수 있게 되었습니다.\n\n클라이언트와 디자이너의 다양한 요구사항에 빠르게 대응해야 했습니다. 이를 위해 Lexical 기반 위지윅 에디터를 확장했습니다. 테이블 기능과 이미지 크롭 기능을 추가로 개발했습니다. 관리자가 여러 어드민 페이지를 번갈아가며 관리해야 하는 불편함이 있었습니다. 이를 해소하기 위해 Multi-tenant 구조를 도입했습니다. 이제 한 곳에서 모든 사이트를 통합 관리할 수 있게 되었습니다.\n\n성능 개선을 위해 Nuxt.js를 도입했습니다. 프론트엔드 개발자들에게 Nuxt.js 사용법을 교육했습니다. 그 결과 LCP를 3초에서 1초로 67% 개선했습니다. 로컬 개발 환경의 온보딩을 간소화하기 위해 모노레포를 구성했습니다. ESLint와 Caddy를 활용한 자동화를 진행했습니다. PayloadCMS를 깊이 분석하면서 여러 버그를 발견했습니다. 이를 수정하고 새로운 기능을 개발하여 14개의 오픈소스 contribution을 기여했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 개발 기간을 50% 단축하고 LCP를 67% 개선했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: '랜딩페이지 개발마다 프론트엔드 개발자 작업 필요, 비효율적인 프로세스',
              content: '모든 콘텐츠 변경과 새 페이지 추가에 개발자가 필요했습니다. 개발 인원이 부족한 상황이었기 때문에 작업에 1개월 이상이 소요되었습니다. 디자이너가 간단한 UI 수정을 요청해도 개발자를 거쳐야 했습니다. 이러한 프로세스는 매우 비효율적이었습니다.',
            },
            {
              icon: Database,
              label: 'Headless CMS 리서치 및 PayloadCMS 선택',
              description: 'TypeScript 기반의 커스터마이징 가능한 CMS 도입',
              content: 'Strapi, Contentful 등 여러 Headless CMS를 비교 분석했습니다. 각 CMS의 장단점을 파악하기 위해 PoC(Proof of Concept)를 진행했습니다. 최종적으로 PayloadCMS를 선택했습니다. PayloadCMS는 TypeScript 기반이라 타입 안정성이 뛰어났습니다. 또한 커스터마이징이 용이했습니다. 실제 서비스에 적용하면서 PayloadCMS 코드를 깊이 분석했습니다. 그 과정에서 발견한 버그를 수정하고 새로운 기능을 개발하여 14개의 오픈소스 contribution을 기여했습니다.',
              status: 'completed',
            },
            {
              icon: Database,
              label: 'Multi-tenant 구조 도입',
              description: '여러 어드민 페이지를 한 곳에서 통합 관리',
              content: '기존에는 각 랜딩페이지마다 별도의 어드민 페이지가 있었습니다. 관리자는 여러 어드민 페이지를 번갈아가며 접속해야 했습니다. 이는 매우 불편한 프로세스였습니다. 이 문제를 해소하기 위해 Multi-tenant 구조를 도입했습니다. 이제 한 곳의 어드민에서 모든 사이트를 관리할 수 있습니다. 관리 효율이 크게 향상되었습니다.',
              status: 'completed',
            },
            {
              icon: Rocket,
              label: 'Nuxt.js 도입 및 교육',
              description: 'LCP를 3초에서 1초로 67% 개선',
              content: '랜딩페이지는 SEO가 중요하기 때문에 SSR(Server-Side Rendering)이 필요했습니다. 성능을 개선하기 위해 Nuxt.js를 도입했습니다. 팀 내 다른 프론트엔드 개발자들에게 Vue 3 Composition API와 Nuxt.js 사용법을 교육했습니다. 그 결과 LCP가 3초에서 1초로 67% 개선되었습니다. SEO가 향상되었고 사용자 경험도 크게 개선되었습니다.',
              status: 'completed',
            },
            {
              icon: TestTube,
              label: '모노레포 구성 및 개발 환경 자동화',
              description: '온보딩 기간 3일 → 1일로 단축',
              content: '여러 프로젝트가 분리되어 있으면 개발자의 컨텍스트 스위칭이 자주 발생합니다. 이를 최소화하기 위해 모노레포를 구성했습니다. ESLint 설정을 통일하여 코드 스타일 가이드를 자동화했습니다. Caddy를 활용하여 로컬 개발 환경 설정을 자동화했습니다. 이러한 환경 구축과 함께 간단한 문서를 작성했습니다. 그 결과 신규 개발자의 온보딩 기간을 3일에서 1일로 67% 단축할 수 있었습니다.',
              status: 'completed',
            },
            {
              label: 'PayloadCMS 오픈소스 기여',
              description: '14개의 버그 수정 및 기능 개발 contribution',
              content: 'PayloadCMS를 실제 서비스에 적용하면서 코드를 깊이 분석했습니다. 그 과정에서 여러 버그를 발견했습니다. 이러한 버그들을 수정했습니다. 또한 서비스에 필요한 새로운 기능도 개발했습니다. 이러한 수정사항과 기능들을 PayloadCMS 오픈소스 프로젝트에 기여했습니다. 총 14개의 contribution을 제출했습니다. 실제 프로덕션 환경에서 발견한 문제를 해결하며 오픈소스 생태계에 기여할 수 있었습니다.',
              status: 'completed',
            },
          ]
        },
      },
    },
    delay: 1000,
  },
  {
    id: '10b',
    role: 'assistant',
    content: '',
    response: {
      type: 'showcase',
      data: {
        projectShowcase: {
          projectName: '블록 컴포넌트 & Lexical 에디터',
          description: '비개발자도 사용 가능한 블록 기반 UI 구성 시스템',
          screens: [
            {
              type: 'image',
              src: '/resume/web-cms-block-content.png',
            }
          ],
        },
      },
    },
    delay: 800,
  },
  {
    id: '11',
    role: 'user',
    content: '온오프믹스 이전에는 어떤 경험이 있으신가요?',
    delay: 1500,
  },
  {
    id: '12',
    role: 'assistant',
    content: '**쏘쏘마켓**에서 Frontend Engineer로 근무하며 지역 기반 소셜 네트워킹 서비스인 **이웃스토리**를 개발했습니다.',
    response: {
      type: 'showcase',
      data: {
        projectShowcase: {
          projectName: '이웃스토리',
          description: 'SPA-RN 하이브리드 아키텍처 기반 지역 소셜 네트워킹 앱',
          screens: [
            {
              type: 'image',
              src: '/resume/neighborhood-mobile.png',
            },
            {
              type: 'image',
              src: '/resume/neighborhood-mobile-1.png',
            }
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '13',
    role: 'user',
    content: '쏘쏘마켓에서는 어떤 성과를 이루셨나요?',
    delay: 1500,
  },
  {
    id: '14',
    role: 'assistant',
    content: 'React Native로만 개발할 때는 문제가 있었습니다. 모든 업데이트가 앱 스토어 심사를 거쳐야 했습니다. 따라서 배포에 3일 이상이 소요되었습니다. 저희는 제한된 리소스로 MVP를 빠르게 개발해야 하는 상황이었습니다. 이를 위해 **SPA-RN 하이브리드 아키텍처**를 설계했습니다. 그 결과 **배포 시간을 3일에서 5분으로 99% 단축**했습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 배포 시간을 3일에서 5분으로 단축했을까요?',
          steps: [
            {
              label: '문제 파악',
              description: '네이티브 앱 스토어 심사로 인한 긴 배포 주기',
              content: 'React Native로만 개발할 경우 모든 업데이트가 네이티브 코드 변경을 의미합니다. 네이티브 코드가 변경되면 앱 스토어 심사를 거쳐야 합니다. Apple App Store와 Google Play Store 모두 심사 과정을 거치는데, 이 과정에 최소 3일 이상이 소요되었습니다. MVP를 빠르게 검증해야 하는 스타트업 환경에서는 치명적인 문제였습니다.',
            },
            {
              icon: Rocket,
              label: '하이브리드 아키텍처 설계',
              description: 'Stackflow + WebView + React Native Bridge',
              content: 'Stackflow를 활용하여 WebView 내에서 SPA가 동작하도록 설계했습니다. 대부분의 UI와 비즈니스 로직은 웹으로 구현했습니다. 네이티브 기능이 꼭 필요한 부분만 React Native로 구현하는 하이브리드 구조를 만들었습니다. 이렇게 하면 웹 기술의 장점과 네이티브의 장점을 모두 활용할 수 있습니다. 웹 기술로 빠른 개발과 즉시 배포가 가능했습니다. 동시에 네이티브 기능으로 최적의 사용자 경험을 제공할 수 있었습니다.',
              status: 'completed',
            },
            {
              icon: Zap,
              label: 'React Native WebView + Bridge',
              description: '카메라, 위치 정보 등 네이티브 API 연결',
              content: '대부분의 UI와 비즈니스 로직은 SPA로 구현했습니다. 하지만 일부 기능은 네이티브 API가 필요했습니다. 예를 들어 카메라, 위치 정보, 푸시 알림 등입니다. 이러한 기능들만 React Native로 구현했습니다. 그리고 Bridge를 통해 웹과 네이티브를 연결했습니다. 이렇게 웹과 네이티브의 장점을 모두 활용한 효율적인 구조를 완성했습니다.',
              status: 'completed',
            },
            {
              icon: Rocket,
              label: 'Stackflow를 활용한 앱 라이크한 네비게이션',
              description: 'SPA 내에서 네이티브 앱과 같은 화면 전환 구현',
              content: 'Stackflow 라이브러리를 활용했습니다. Stackflow는 웹에서 네이티브 앱과 같은 화면 전환을 구현할 수 있게 해줍니다. WebView 내에서 동작하는 SPA에서도 스무스한 화면 전환 애니메이션을 구현했습니다. 사용자는 웹으로 개발된 앱을 사용하지만, 네이티브 앱과 동일한 부드러운 경험을 얻을 수 있게 되었습니다.',
              status: 'completed',
            },
            {
              icon: Zap,
              label: '즉시 배포 가능한 SPA',
              description: 'UI 변경은 웹 서버 배포만으로 즉시 반영',
              content: 'UI나 비즈니스 로직을 수정하면 웹 서버에만 배포하면 됩니다. 앱 스토어 심사를 거칠 필요가 없습니다. 사용자가 앱을 열면 즉시 최신 버전의 웹 페이지가 로드됩니다. 앱 스토어 심사가 필요한 네이티브 코드 변경을 최소화했습니다. 이를 통해 배포 주기를 획기적으로 단축할 수 있었습니다.',
              status: 'completed',
            },
            {
              label: '결과 측정',
              description: '배포 시간을 3일에서 5분으로 99% 단축',
              status: 'completed',
              content: '배포 시간이 3일에서 5분으로 단축되었습니다. 99%의 개선입니다. 이제 MVP를 신속하게 검증하고 개선할 수 있게 되었습니다. 사용자 피드백을 받으면 즉시 반영할 수 있습니다. 제한된 리소스를 가진 스타트업 환경에서도 효율적인 개발이 가능해졌습니다.',
            },
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '13b',
    role: 'user',
    content: '업무 외에 개인적으로 진행하는 프로젝트도 있으신가요?',
    delay: 1500,
  },
  {
    id: '14a',
    role: 'assistant',
    content: '네, 현재 **Ones To Watch for FE Newsletter**를 운영하고 있습니다.\n\n2024년부터 시작했습니다. 양질의 프론트엔드 개발 정보를 선별하여 큐레이션하고 있습니다. 매주 꾸준히 뉴스레터를 발행하고 있습니다. 현재 **200명 이상의 구독자**가 있습니다. **MAU(월간 활성 사용자) 300명**을 꾸준히 기록하고 있습니다.',
    delay: 1000,
  },
  {
    id: '15',
    role: 'user',
    content: '다른 사이드 프로젝트도 있나요?',
    delay: 1500,
  },
  {
    id: '16',
    role: 'assistant',
    content: '대학교 재학 중 **KOIN** 프로젝트에 참여했습니다.\n\n**한국기술교육대학교 커뮤니티 서비스**로, 가게 홍보 게시판, 동아리 소개 등 교내 활동 정보를 통합했습니다.',

    response: {
      type: 'showcase',
      data: {
        projectShowcase: {
          projectName: 'KOIN 한기대 사람들',
          description: '한국기술교육대학교 커뮤니티 서비스',
          screens: [
            {
              type: 'image',
              src: '/resume/koin-view.png',
            },
          ],
        },
      },
    },
  },
  {
    id: '16',
    role: 'assistant',
    content: '두 번의 리코드(전면 재작성)를 진행했습니다. 첫 번째는 **Vue에서 React**로, 두 번째는 **JavaScript에서 TypeScript**로 전환했습니다. 개발 환경도 개선했습니다. **Lint 설정, CI 구축, 코드 리뷰 문화를 도입**했습니다. 이를 통해 **신규 팀원의 온보딩 기간을 3일에서 1일로 67% 단축**할 수 있었습니다.\n\n**주요 웹 성능 지표도 20% 개선**되었습니다. 프로젝트의 개발 패러다임 자체를 개선할 수 있었습니다.',
    response: {
      type: 'chain-of-thought',
      data: {
        chainOfThought: {
          title: '🤔 어떻게 온보딩 기간을 67% 단축했을까요?',
          steps: [
            {
              label: '첫 번째 리코드: Vue → React',
              description: 'React Hooks 등장으로 양방향 바인딩의 복잡성 제거',
              content: 'React Hooks가 등장하면서 상황이 변했습니다. 기존에 Vue의 주요 장점은 낮은 러닝커브였습니다. 하지만 React Hooks로 인해 React도 배우기 쉬워졌습니다. 따라서 Vue의 이 장점이 상쇄되었습니다. 프로젝트를 분석해보니 양방향 바인딩 활용도가 낮았습니다. 오히려 불필요한 복잡성만 더하고 있었습니다. React로 마이그레이션하기로 결정했습니다. 불필요한 개발 패러다임을 걷어냈습니다. 코드가 더 단순해지고 이해하기 쉬워졌습니다.',
            },
            {
              icon: TestTube,
              label: '두 번째 리코드: JS → TypeScript',
              description: '타입 안정성 확보로 런타임 에러 사전 방지',
              content: 'TypeScript를 도입했습니다. 타입 안정성을 확보할 수 있었습니다. 컴포넌트 인터페이스를 명확히 정의했습니다. 각 컴포넌트가 어떤 props를 받는지 명확해졌습니다. API 응답 타입도 명시했습니다. 이전에는 런타임에 발생했던 타입 에러를 이제 컴파일 타임에 미리 발견할 수 있게 되었습니다. IDE의 자동완성 기능도 향상되었습니다. 개발 속도가 빨라졌고 실수도 줄어들었습니다.',
              status: 'completed',
            },
            {
              icon: TestTube,
              label: 'Lint 설정 및 CI 구축',
              description: 'ESLint, Prettier로 코드 품질 관리 자동화',
              content: 'ESLint와 Prettier를 설정했습니다. 코드 스타일을 자동으로 통일할 수 있게 되었습니다. GitHub Actions로 CI를 구축했습니다. Pull Request가 생성될 때마다 자동으로 린트와 테스트가 실행됩니다. 코드 리뷰 시 스타일에 대한 논쟁이 줄어들었습니다. 이제 본질적인 로직과 구조에 집중할 수 있게 되었습니다.',
              status: 'completed',
            },
            {
              icon: TestTube,
              label: 'Jest 테스트 도입',
              description: '핵심 비즈니스 로직에 대한 단위 테스트 작성',
              content: 'Jest를 도입했습니다. 핵심 비즈니스 로직에 대한 단위 테스트를 작성했습니다. 이제 코드를 리팩토링할 때 안심할 수 있습니다. 테스트를 실행하면 기존 기능이 깨졌는지 즉시 확인할 수 있기 때문입니다. 변경사항이 예상치 못한 버그를 만들어내지 않았는지 빠르게 검증할 수 있습니다. 더 안정적인 개발이 가능해졌습니다.',
              status: 'completed',
            },
            {
              icon: User,
              label: '코드 리뷰 문화 도입',
              description: '신규 팀원 온보딩 원활화 및 팀 코드 이해도 향상',
              content: '코드 리뷰 문화를 도입했습니다. 모든 Pull Request는 최소 한 명 이상의 리뷰를 받도록 했습니다. 신규 팀원들은 코드 리뷰를 통해 프로젝트의 코드 스타일과 구조를 빠르게 이해할 수 있었습니다. 프로젝트에 더 빠르게 기여할 수 있게 되었습니다. 문서화와 코드 리뷰를 병행하며 팀 전체의 코드 이해도를 높였습니다. 특정 사람에게만 지식이 집중되는 것을 방지할 수 있었습니다.',
              status: 'completed',
            },
            {
              label: '성과 측정',
              description: '온보딩 기간 3일 → 1일로 67% 단축, 웹 지표 20% 개선',
              status: 'completed',
              content: '여러 개선사항들이 시너지를 발휘했습니다. 타입 안정성, 테스트, CI, 코드 리뷰 문화가 결합되었습니다. 신규 팀원이 프로젝트에 빠르게 기여할 수 있게 되었습니다. 온보딩 기간이 3일에서 1일로 67% 단축되었습니다. React와 TypeScript로 전환하면서 성능도 개선되었습니다. INP(Interaction to Next Paint), LCP(Largest Contentful Paint), FCP(First Contentful Paint) 등 주요 웹 성능 지표가 20% 개선되었습니다.',
            },
          ],
        },
      },
    },
    delay: 1000,
  },
  {
    id: '17',
    role: 'user',
    content: '마지막으로, 개발자로서 어떤 가치를 추구하시나요?',
    delay: 1500,
  },
  {
    id: '18',
    role: 'assistant',
    content: '저는 **회사와 나, 그리고 동료와의 지속가능한 개발**을 추구합니다.\n\n단순히 기능을 구현하는 것으로 끝나지 않습니다. **회사의 개발 프로세스**를 개선하고, **동료들의 성장**을 돕고, **나 자신도 함께 발전**하는 것을 목표로 합니다. 이 모든 것을 **숫자로 증명**합니다.\n\n• CI/CD 시간 **60% 단축** - 회사의 개발 효율 향상\n• LCP **25-67% 개선** - 사용자 경험 개선\n• 개발 기간 **50% 단축** - 회사의 비즈니스 민첩성 향상\n• 배포 시간 **99% 단축** - 팀의 빠른 피드백 사이클\n• 온보딩 기간 **67% 단축** - 동료들의 빠른 성장 지원\n\n이러한 구체적인 성과들은 회사, 동료, 그리고 나 모두에게 실질적인 가치를 제공합니다. 함께 성장하며 지속가능한 개발 문화를 만들어갑니다.',
    delay: 1000,
  },
  {
    id: '19',
    role: 'user',
    content: '좋은 인터뷰였습니다. 혹시 연락 가능한 방법을 알려주실 수 있나요?',
    delay: 1500,
  },
  {
    id: '20',
    role: 'assistant',
    content: '네, 언제든지 연락 주세요!\n\n 📧 [pedogunu@gmail.com](mailto:pedogunu@gmail.com)\n💼 [LinkedIn](https://www.linkedin.com/in/pedogunu)\n🐙 [GitHub](https://github.com/SimYunSup)',
    delay: 800,
  },
];
