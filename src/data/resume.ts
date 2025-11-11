export interface Experience {
  company: string;
  position: string;
  period: string;
  projects: Project[];
}

export interface Project {
  name: string;
  description: string;
  achievements: Achievement[];
}

export interface Achievement {
  title: string;
  description: string;
  metrics?: Metric;
}

export interface Metric {
  before: string | number;
  after: string | number;
  improvement: string;
  unit?: string;
}

export interface SideProject {
  name: string;
  description: string;
  period: string;
  link?: string;
  metrics?: {
    subscribers?: number;
    mau?: number;
  };
}

export const summary = {
  ko: "사용자 경험과 개발 생산성을 숫자로 증명하는 프론트엔드 개발자입니다. 저는 CI/CD 시간을 60% 단축하며 프로세스의 지속가능성을 높이고, 신규 팀원의 온보딩 기간을 3일에서 1일로 줄여 팀의 지속가능성에 기여하는 개발을 추구합니다.",
  en: "A frontend developer who proves user experience and development productivity with numbers. I pursue development that contributes to team sustainability by reducing CI/CD time by 60% and shortening new team member onboarding from 3 days to 1 day."
};

export const experiences: Experience[] = [
  {
    company: "엘리스",
    position: "AIDT Content Engineer (Freelancer)",
    period: "2025.04 - 2025.07",
    projects: [
      {
        name: "AIDT 교과서",
        description: "교문사 중등 정보, 교문사 고등 정보 교과서 개발과 앨리스 중등 영어 교과서 개발",
        achievements: [
          {
            title: "CI/CD 시간을 2분 40초→1분으로 60% 단축",
            description: "기존 CRA 기반 웹페이지를 Rsbuild로 전환하고 불필요한 캐싱을 제거하여 빌드 및 릴리즈 속도를 단축",
            metrics: {
              before: "2분 40초",
              after: "1분",
              improvement: "60%",
              unit: "시간"
            }
          },
          {
            title: "교과서 웹페이지 템플릿 데이터 fetching 방식 변경",
            description: "React Router + SWR를 활용하여 워터폴 현상을 해결하고 유저 데이터 fetching 코드를 한 곳에 집중",
            metrics: {
              before: "800ms",
              after: "600ms",
              improvement: "25%",
              unit: "LCP"
            }
          }
        ]
      }
    ]
  },
  {
    company: "온오프믹스",
    position: "Software Engineer",
    period: "2023.07 - 2024.07",
    projects: [
      {
        name: "Web CMS (가칭)",
        description: "외부 홈페이지 개발 노코드 솔루션",
        achievements: [
          {
            title: "Headless CMS 도입으로 개발 기간 50% 단축",
            description: "PayloadCMS를 도입하여 페이지 개발 완료 기간을 1개월에서 2주로 단축하고, 비개발 직군의 콘텐츠 수정 가능",
            metrics: {
              before: "1개월",
              after: "2주",
              improvement: "50%",
              unit: "개발 기간"
            }
          },
          {
            title: "Nuxt.js 전환을 통한 성능 개선 및 팀 기술 역량 강화",
            description: "SSR 도입으로 워터폴 현상 해결 및 팀의 Nuxt.js 역량 강화",
            metrics: {
              before: "3초",
              after: "1초",
              improvement: "67%",
              unit: "LCP"
            }
          },
          {
            title: "오픈소스(PayloadCMS) 기여를 통한 안정성 확보",
            description: "14 contribution을 통해 핵심 기술 스택에 대한 높은 이해도 확보 및 신속한 버그 해결 가능"
          }
        ]
      }
    ]
  },
  {
    company: "쏘쏘마켓",
    position: "Frontend Engineer",
    period: "2022.12 - 2023.06",
    projects: [
      {
        name: "이웃스토리",
        description: "지역 기반으로 정보를 주고받는 소셜 네트워킹 서비스",
        achievements: [
          {
            title: "SPA-RN 하이브리드 아키텍처로 MVP 신속 개발",
            description: "Stackflow 라이브러리를 활용하여 네이티브와 유사한 UX 구현하고 배포 프로세스 단축",
            metrics: {
              before: "3일",
              after: "5분",
              improvement: "99%",
              unit: "배포 시간"
            }
          }
        ]
      }
    ]
  }
];

export const sideProjects: SideProject[] = [
  {
    name: "Ones To Watch for FE Newsletter",
    description: "양질의 FE 개발 정보 뉴스레터",
    period: "2024.01 - 현재",
    link: "https://ones-to-watch.ethansup.net/",
    metrics: {
      subscribers: 200,
      mau: 300
    }
  },
  {
    name: "KOIN",
    description: "한국기술교육대학교 커뮤니티 서비스",
    period: "2019.08 ~ 2023.06",
    link: "https://koreatech.in",
  }
];

export const koinAchievements: Achievement[] = [
  {
    title: "Vue.js에서 React로의 프레임워크 전환",
    description: "MAU 3천 명의 Vue 2 프로젝트를 React Hooks 기반으로 마이그레이션하여 유지보수성 향상"
  },
  {
    title: "테스트 자동화 환경 구축 및 코드 리팩토링",
    description: "Jest와 RTL을 도입하여 테스트 커버리지 80% 달성 및 잠재적 버그 수정"
  },
  {
    title: "React + TypeScript 기반으로 레포지토리 리코드",
    description: "최신 스택 적용 및 협업 문화 도입으로 신규 인원 첫 PR 완료 기간 단축 및 웹 지표 개선",
    metrics: {
      before: "3일",
      after: "1일",
      improvement: "67%",
      unit: "온보딩 기간"
    }
  }
];

export const education = {
  school: "한국기술교육대학교",
  department: "컴퓨터공학부",
  period: "2019.02 - (휴학중)",
  type: "대학교"
};
