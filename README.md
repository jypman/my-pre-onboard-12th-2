# 프리온보딩 2주차 과제
## 🌐 배포 주소
### https://my-pre-onboard-12th-2-8.vercel.app/

## ⚙ 로컬 실행 방법

1. 프로젝트 내려받기 `git clone https://github.com/jypman/my-pre-onboard-12th-2.git ./`
2. 패키지 설치: `npm install`
3. 애플리케이션 실행: `npm start`
4. 테스트 코드 실행 `npm test`


## 🙋‍about me

| 박진영                                                                                            |
|------------------------------------------------------------------------------------------------|
| <img src="https://avatars.githubusercontent.com/u/69949824?v=4.png" width="300" height="300"/> |
| [닉네임 : jypman](https://github.com/jypman)|

## 💻 과제 요구사항
https://lean-mahogany-686.notion.site/Week-2-a28eb717312a434498ea431d2ff8fc17

## 📁 프로젝트 디렉토리 구조
```
📂src
├── App.tsx
├── 📂api
│   ├── config.ts (api의 base url, end point 관리)
│   ├── http.ts (axios instance, 요청 에러 핸들링 관리)
│   └── issues.ts (github issue 관련 리소스 요청 로직 관리)
├── 📂components (공용 UI 컴포넌트 관리)
│   ├── Ads.tsx
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── MarkDown.tsx
│   └── PageLayoyt.tsx
├── 📂hooks
│   └── useInfinityScroll.tsx
├── index.css
├── index.tsx
├── logo.svg
├── 📂pages (각 페이지를 렌더링하는 컴포넌트 관리)
│   ├── DetailIssue.tsx (이슈 상세정보 페이지)
│   ├── Home.tsx (홈 페이지)
│   ├── 📂Issues (이슈 목록 페이지)
│   │   ├── IssueItem.tsx
│   │   ├── IssueItemWrapper.tsx
│   │   └── Issues.tsx
│   ├── NotFound.tsx (404 페이지)
│   └── Routes.tsx (페이지 라우팅 관리)
├── 📂providers (서버 상태값과 업데이트 함수를 react context api를 통해 제공하는 파일 관리)
│   ├── DetailIssueProvider.tsx
│   └── IssueListProvider.tsx
├── react-app-env.d.ts
├── 📂reducers (서버 상태값 업데이트 액션의 타입과 그에 따른 업데이트 로직을 관리)
│   ├── detailIssueReducer.ts
│   └── issueListReducer.ts
├── reportWebVitals.ts
├── setupTests.ts
├── 📂tests
│   ├── DetailIssue.test.tsx
│   └── Issues.test.tsx
└── utils.ts
```

## 😁이 부분에 대해 고민해봤어요!
- **서버 요청 공통로직 개선**
  - <span style="color:green;font-weight:bold">why?</span>
    - 매 서버 요청 로직마다 base url, authorization header를 주입해줘야 하는 리소스 발생
    - 추후 서버 요청 로직이 수정될 경우 해당 함수를 탐색하여 일일이 수정해야 하는 리소스 발생
  - <span style="color:green;font-weight:bold">how?</span>
    - axios instance 생성
    - axios로 서버 요청 시 공통으로 적용되는 로직을 instance에 추가
    - 매 요청마다 해당 공통로직이 적용되어 유지보수 용이
      ([해당 파일로 이동](./src/api/http.ts))
  

- **무한 스크롤 구현**
  - <span style="color:green;font-weight:bold">how?</span>
    - javascript browser api 중 intersection observer로 구현
    - 해당 구현 기능은 추후 다른 페이지에서도 사용 가능함으로 커스텀 훅으로 분리하여 재사용성 고려
  - <span style="color:green;font-weight:bold">why?</span>
    - scroll 이벤트를 통해 스크롤이 특정 페이지 하단에 도달할 경우 api를 호출하는 방법도 가능
    - 하지만 스크롤 이벤트로 구현할 경우 리플로우에 의해 좋지 않은 렌더링 성능 이슈가 있다는 것을 구글링을 통해 발견
    - intersection observer의 경우 관찰 대상이 되는 요소가 뷰포트에 교차되었을 때 특정 로직이 실행되어 브라우저의 퍼포먼스 측면에서 이점
      ([참고 사이트](https://tech.kakaoenterprise.com/149))


- **view(JSX)와 로직 관심사 분리**
  - <span style="color:green;font-weight:bold">why?</span>
    - 하나의 모듈을 수정하는 목적을 하나로 제한하기 위함
    - 모듈 수정 시 수정 목적을 파악하기 용이
    - 이를 통해 유지보수 용이
  - <span style="color:green;font-weight:bold">how?</span>
    - view는 Issues.tsx, DetailIssue.tsx에서 관리
    - 상태값과 상태값 업데이트 함수는 context api를 사용한 Providers 디렉토리의 ***Provider.tsx에서 제공
    - ***Provider.tsx의 자식 컴포넌트에 위치한 컴포넌트는 <br/> ***Provider.tsx에서 제공하는 커스텀훅을 import하여 상태값과 함수 사용가능
    - 만약 ***Provider.tsx의 자식이 아닌 컴포넌트가 ***Provider.tsx의 커스텀 훅을 사용할 경우 <br/>"<span style="color:red;font-weight:bold">[커스텀훅명] should be used within [provider명]</span>"<br/> 에러를 던져 실수를 방지하여 개발자 경험 개선 ([해당 디렉토리로 이동](./src/providers/))
    - 서버 상태값 업데이트 액션의 타입과 그에 따른 업데이트 상세 로직은 리듀서에서 관리 ([해당 디렉토리로 이동](./src/reducers/))


- **이슈 상세정보 페이지 내 마크다운 렌더링**
  - <span style="color:green;font-weight:bold">how?</span>
    - react-markdown 라이브러리 사용
    - 마크다운 문법을 포함한 string을 라이브러리에서 제공하는 컴포넌트의 props로 받아 마크다운 문법을 해석하여 간편하게 렌더링해주는 라이브러리
  - <span style="color:green;font-weight:bold">why?</span>
    - 서버에서 이슈 관련 콘텐츠를 마크다운 문법을 포함한 스트링 값으로 응답
    - 해당 응답 값을 효과적으로 렌더링하고자 해당 라이브러리 선택


- **컴포넌트 스타일링**
  - <span style="color:green;font-weight:bold">how?</span>
    - styled-components 라이브러리 사용
  - <span style="color:green;font-weight:bold">why?</span>
    - 컴포넌트 개발할 때마다 css파일을 따로 생성하지 않아도 되는 이점
    - css className 네이밍 중복 이슈 방지
    - props에 따라 스타일을 유연하게 변경할 수 있는 이점
    - css-in-js를 지원하는 라이브러리 중에서 해당 라이브러리가 다운로드 수도 높고
      상대적으로 오래 유지보수 되어 안정감이 있다고 생각하여 styled-components 채택


- **테스트코드 추가**
  - <span style="color:green;font-weight:bold">why?</span>
    - 구현한 기능이 의도된대로 동작하는지 빠른 피드백이 가능
    - 해당 기능 정상작동의 확신 갖기 위함
  - <span style="color:green;font-weight:bold">how?</span>
    - jest 및 React Testing Library로 진행
    - 필수 구현 사항을 중점적으로 테스트 케이스 추가

## 🛠사용한 라이브러리
<div>

영역|목록|
:--------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
**Frontend** | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img alt="Static Badge" src="https://img.shields.io/badge/Axios-%235A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/react%20markdown-%23000000?style=for-the-badge&logo=markdown&logoColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Jest-%23C21325?style=for-the-badge&logo=Jest&logoColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Testing%20Library-%23E33332?style=for-the-badge&logo=Testing%20Library&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245.svg?&style=for-the-badge&logo=reactrouter&logoColor=white"> 
</div>