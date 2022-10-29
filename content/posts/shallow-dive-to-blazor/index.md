---
title: 블레이저 WASM에 얕게 빠져보기(version NET 6.0)
date: 2022-10-29T00:00:00
description: C#기반 SPA 프레임워크인 Blazor WASM을 한 번 사용해보고 장단점을 알아보자.
canonical_url: false
banner: '../images/shallow-dive-to-blazor-0.png'
slug: '/blog/shallow-dive-to-blazor'
published: true
series: false
tags: ["Blazor"]
---

## Just For Fun...

우리나라에서 C#이 메인이 되지도 않았고, [WASM이 매우 많은 성능 향상을 이끌어내는가](https://zaplib.com/docs/blog_post_mortem.html)의 이야기는 아직도 현재진행중이다. 하지만 이번에는 Blazor의 성능과 사용법, 그리고 장단점에 알아보고 재미로 사용해보려고 Blazor로 웹사이트를 만들어보기로 결정했다.

Blazor의 시작 방법은 매우 쉽다. [dotnet](https://dotnet.microsoft.com/en-us/download)을 설치하고 `dotnet new blazorwasm -o 프로젝트이름 --no-https -f net6.0`으로 실행하면 프로젝트 이름으로 Blazor WASM 프로젝트가 만들어진다.

Blazor의 [튜토리얼](https://learn.microsoft.com/ko-kr/aspnet/core/blazor)은 매우 잘되어있다. 그래서 따라가다보면 쉽게 Blazor를 마스터할 수 있다. 그래서 이번 포스팅에서는 Blazor의 특징을 다루려고 한다.

### dotnet 런타임을 다운받는다.

때문에 [LCP](https://web.dev/lcp/)까지 시간이 오래걸린다. 현재 Hydration을 개선하는 방식으로 JS 생태계가 발전해나아가고 있는데 런타임 WASM을 다운받는 것은 큰 단점이 될 수 있다. 물론 큰 JS를 삽입하지만 않는다면 속도는 양호하다.

![기본 Blazor 프로젝트의 속도](../images/shallow-dive-to-blazor-1.png)

하지만 TypeScript같은 컴파일타임에 타입을 검사하는 것 뿐만아니라 런타임에도 타입을 검사하기 때문에 타입 검사가 더 강력하다. C#의 문법을 아는 사람이라면 더욱 빠르게 적응할 수 있다.

### 라우팅과 상태관리

양방향 바인딩을 바탕으로 컴포넌트간 통신/컴포넌트와 DOM과 통신을 다룬다. 양방향 바인딩이 데이터를 주고 이벤트가 트리거되었을 경우 바인딩된 데이터를 바꿔주는 방식으로 바인딩한다. 기본 input에서는 `@bind="데이터`방식으로 바인딩하고 바인딩된 데이터를 바꾸는 방법은 `@bind:event="이벤트이름"`으로 바꾼다. 컴포넌트에서는 `@bind-이름="데이터"`방식으로 바인딩하고 이벤트는 `이름Changed`로 생성된다. 이벤트에 함수를 바인딩 하는 방식은 `@on이벤트="함수이름"`이다.

전역 상태를 관리하려면 외부 라이브러리를 사용해야 한다.

라우팅은 파일 기반 라우팅을 사용하고 있으며 `@page`지시문이 있는 파일만 라우팅에 포함한다. 동적 라우팅 또한 지원하며 동적 라우팅의 제약조건을 설정하는 것또한 가능하다. Routing이 변했을 경우 생명주기인 `LocationChanged`도 제공한다.

##
