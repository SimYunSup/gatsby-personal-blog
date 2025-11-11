import { experiences, sideProjects, koinAchievements, summary, education } from '../data/resume';
import type { Experience, SideProject, Achievement } from '../data/resume';
import type { ReactNode } from 'react';

export interface ChatResponse {
  type: 'text' | 'experience' | 'project' | 'metric' | 'showcase' | 'chain-of-thought';
  content: string;
  data?: {
    experience?: Experience;
    project?: SideProject;
    achievement?: Achievement;
    projectShowcase?: {
      projectName: string;
      description: string;
      screens?: {
        mobile?: string;
        desktop?: string;
        architecture?: string;
      };
    };
    chainOfThought?: ReactNode;
  };
}

const patterns = {
  greeting: /안녕|hello|hi|헬로|반가|처음|소개/i,
  summary: /요약|한 줄|간단히|자기소개|누구|who are you/i,
  experience: /경험|경력|회사|일한|worked|experience|엘리스|온오프믹스|쏘쏘마켓/i,
  cicd: /ci\/cd|cicd|배포|빌드|build|deploy/i,
  lcp: /lcp|성능|performance|개선|속도|느린/i,
  cms: /cms|headless|payload|노코드/i,
  nuxt: /nuxt|ssr|vue/i,
  react: /react|리액트/i,
  project: /프로젝트|사이드|newsletter|뉴스레터|koin|코인/i,
  architecture: /아키텍처|구조|architecture|설계/i,
  metric: /숫자|지표|metric|개선|향상|단축/i,
  opensource: /오픈소스|open source|contribution|기여/i,
  education: /학교|대학|education|학력/i,
};

export function matchUserQuery(query: string): ChatResponse {
  const lowerQuery = query.toLowerCase();

  // Greeting
  if (patterns.greeting.test(query)) {
    return {
      type: 'text',
      content: `안녕하세요! ${summary.ko}\n\n저에 대해 궁금한 것이 있으시다면 편하게 물어보세요. 예를 들어:\n- CI/CD 개선 경험에 대해 알려주세요\n- LCP 성능 개선은 어떻게 하셨나요?\n- 진행한 프로젝트에 대해 알려주세요\n- 오픈소스 기여 경험이 있나요?`,
    };
  }

  // Summary
  if (patterns.summary.test(query)) {
    return {
      type: 'text',
      content: summary.ko,
    };
  }

  // CI/CD experience
  if (patterns.cicd.test(query)) {
    const eliceExp = experiences.find(e => e.company === '엘리스');
    if (eliceExp) {
      const cicdAchievement = eliceExp.projects[0].achievements.find(a =>
        a.title.includes('CI/CD')
      );
      if (cicdAchievement) {
        return {
          type: 'metric',
          content: `엘리스에서 CI/CD 시간을 **60% 단축**한 경험이 있습니다.\n\n${cicdAchievement.description}`,
          data: {
            achievement: cicdAchievement,
          },
        };
      }
    }
  }

  // LCP performance
  if (patterns.lcp.test(query)) {
    const allAchievements: Array<{ achievement: Achievement; company: string }> = [];

    experiences.forEach(exp => {
      exp.projects.forEach(project => {
        project.achievements.forEach(achievement => {
          if (achievement.metrics?.unit === 'LCP' || achievement.title.includes('LCP')) {
            allAchievements.push({ achievement, company: exp.company });
          }
        });
      });
    });

    if (allAchievements.length > 0) {
      const achievementText = allAchievements
        .map(({ achievement, company }) => `**${company}**: ${achievement.title}\n${achievement.description}`)
        .join('\n\n');

      return {
        type: 'metric',
        content: `LCP 성능 개선 경험이 여러 번 있습니다:\n\n${achievementText}`,
        data: {
          achievement: allAchievements[0].achievement,
        },
      };
    }
  }

  // CMS experience
  if (patterns.cms.test(query)) {
    const onoffmixExp = experiences.find(e => e.company === '온오프믹스');
    if (onoffmixExp) {
      return {
        type: 'experience',
        content: `온오프믹스에서 Headless CMS를 도입하여 개발 생산성을 크게 향상시켰습니다.`,
        data: {
          experience: onoffmixExp,
        },
      };
    }
  }

  // Side projects
  if (patterns.project.test(query)) {
    if (query.includes('newsletter') || query.includes('뉴스레터')) {
      const newsletter = sideProjects.find(p => p.name.includes('Newsletter'));
      if (newsletter) {
        return {
          type: 'project',
          content: `현재 **Ones To Watch for FE Newsletter**를 운영하고 있습니다. 2024년부터 꾸준히 발행하며 200명 이상의 구독자와 MAU 300을 기록하고 있습니다.`,
          data: {
            project: newsletter,
          },
        };
      }
    }

    if (query.includes('koin') || query.includes('코인')) {
      const koin = sideProjects.find(p => p.name === 'KOIN');
      if (koin) {
        return {
          type: 'project',
          content: `KOIN은 한국기술교육대학교 커뮤니티 서비스입니다. Vue.js에서 React로 전환하고, 테스트 자동화를 도입하여 신규 팀원의 온보딩 기간을 **3일에서 1일로 단축**했습니다.`,
          data: {
            project: koin,
          },
        };
      }
    }

    return {
      type: 'text',
      content: `현재 진행 중인 주요 프로젝트들:\n\n1. **Ones To Watch for FE Newsletter** (2024.01 - 현재)\n   - 양질의 FE 개발 정보 뉴스레터\n   - 구독자 200+, MAU 300\n\n2. **KOIN** (2019.08 - 2023.06)\n   - 한국기술교육대학교 커뮤니티 서비스\n   - React 전환 및 테스트 자동화 구축`,
    };
  }

  // Open source
  if (patterns.opensource.test(query)) {
    const onoffmixExp = experiences.find(e => e.company === '온오프믹스');
    const opensource = onoffmixExp?.projects[0].achievements.find(a =>
      a.title.includes('오픈소스')
    );

    if (opensource) {
      return {
        type: 'text',
        content: `**PayloadCMS**에 14개의 contribution을 기여했습니다.\n\n${opensource.description}\n\n오픈소스 기여를 통해 핵심 기술 스택에 대한 높은 이해도를 확보했고, 내부 버그를 신속하게 해결할 수 있었습니다.`,
      };
    }
  }

  // Architecture
  if (patterns.architecture.test(query)) {
    return {
      type: 'showcase',
      content: `프로젝트 아키텍처에 대해 궁금하신가요? 다음과 같은 프로젝트들의 아키텍처를 설계하고 구현했습니다:`,
      data: {
        projectShowcase: {
          projectName: 'SPA-RN 하이브리드 아키텍처',
          description: '이웃스토리에서 Stackflow를 활용한 하이브리드 앱 구조를 설계하여 배포 시간을 3일에서 5분으로 단축했습니다.',
          screens: {
            architecture: '/architecture/spa-rn-hybrid.svg',
          },
        },
      },
    };
  }

  // Education
  if (patterns.education.test(query)) {
    return {
      type: 'text',
      content: `**${education.school}**\n${education.department}\n${education.period}`,
    };
  }

  // All experience
  if (patterns.experience.test(query)) {
    const experienceList = experiences
      .map(
        exp =>
          `**${exp.company}** - ${exp.position}\n${exp.period}\n${exp.projects.map(p => `  - ${p.name}`).join('\n')}`
      )
      .join('\n\n');

    return {
      type: 'text',
      content: `제 경력 사항입니다:\n\n${experienceList}\n\n구체적인 회사나 프로젝트에 대해 더 자세히 알고 싶으시다면 질문해주세요!`,
    };
  }

  // Metrics/Numbers
  if (patterns.metric.test(query)) {
    return {
      type: 'text',
      content: `숫자로 증명하는 개발 성과들:\n\n• CI/CD 시간 **60% 단축** (2분 40초 → 1분)\n• LCP **25-67% 개선** (여러 프로젝트)\n• 개발 기간 **50% 단축** (1개월 → 2주)\n• 배포 시간 **99% 단축** (3일 → 5분)\n• 온보딩 기간 **67% 단축** (3일 → 1일)\n\n구체적인 개선 사례가 궁금하시다면 질문해주세요!`,
    };
  }

  // Default response
  return {
    type: 'text',
    content: `죄송합니다. 질문을 정확히 이해하지 못했습니다. 다음과 같은 주제로 질문해주세요:\n\n• 경력 및 경험\n• CI/CD 개선\n• 성능 최적화 (LCP)\n• 프로젝트 소개\n• 오픈소스 기여\n• 아키텍처 설계`,
  };
}
