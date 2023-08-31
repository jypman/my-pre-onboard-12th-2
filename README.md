# 프리온보딩 2주차 과제

## 이름
박진영

## 배포 주소


## 실행 방법
- `git clone https://github.com/jypman/my-pre-onboard-12th-2-8.git ./` : 프로젝트 내려받기
- `npm install` : 패키지 설치
- `npm start` : 애플리케이션 실행 (브라우저가 자동으로 실행되어 홈페이지로 이동합니다.)

## 사용한 라이브러리 목록
- React
- react-router-dom
- axios
- styled-components
- react-markdown
- remark-gfm

## 프로젝트 디렉토리 설명:
- `src / api`: api 요청 함수 관리
- `src / hooks`: 커스텀 훅 관리
- `src / pages`: 페이지를 렌더링하는 컴포넌트 관리
- `src / components`: 프로젝트 내에서 공통으로 자주 쓰이는 컴포넌트

## 구현 사항
- API 요청 함수, 데이터 로직을 뷰 컴포넌트 파일 내에서 정의하지 않고 커스텀훅에서 사용하여 재사용성 및 관심사 분리 용이
- axios 인스턴스를 생성함으로써 서버 요청시 공통적으로 적용되는 로직을 한 파일에서 관리하여 추후 axios 요청 로직 수정 시 유지보수면에서 용이
- API
  - /repos/facebook/react/issues?page=0&per_page=30 : 이슈 목록 요청
  - /repos/facebook/react/issues/:issue_number : 특정 이슈의 상세 정보 요청
- styled-components 사용
  - 컴포넌트 개발할 때마다 css파일을 따로 생성하지 않아도 되는 이점
  - props에 따라 스타일을 유연하게 변경할 수 있는 이점
  - css-in-js를 지원하는 라이브러리 중에서 해당 라이브러리가 다운로드 수도 높고
    상대적으로 오래 유지보수 되어 안정감이 있다고 생각하여 styled-components 채택
- 이슈 목록 페이지
  - javascript 빌트인 객체 중 intersection observer를 통해 무한 스크롤 기능 구현
    - 관찰 대상이 되는 요소가 뷰포트에 교차되었을 때 비동기로 동작하여 퍼포먼스면에서 이점
    - 단 몇줄로 lazy load 가능
- 이슈 상세 정보 페이지를 위해 다음 라이브러리 사용
  - react-markdown : react에서 string을 props로 받아 마크다운 문법을 해석하여 렌더링해주는 컴포넌트를 제공해주는 라이브러리 
  - remark-gfm : table, link 등 기존 마크다운의 추가 문법을 해석할 수 있도록 지원해주는 라이브러리
