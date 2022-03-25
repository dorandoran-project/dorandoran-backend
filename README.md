<img width="1000" alt="mainPage" src="https://user-images.githubusercontent.com/95286903/154764107-49e6fcc2-7e45-4f21-862b-9418bb252ce3.png">

<br/><br/>

## Links

#### Service: [doran-chat.com](https://www.doran-chat.com/)

#### Client: [dorandoran-frontend](https://github.com/dorandoran-project/dorandoran-frontend)

#### Server: [dorandoran-backend](https://github.com/dorandoran-project/dorandoran-backend)

#### Notion: [dorandoran-notion](https://www.notion.so/DoranDoran-Project-5516570984be4637a6fb822430361ab5)

---

<br/>

## 동기

아이디어 회의 중 노인분들을 위한 앱이 비교적 매우 적어 코로나 상황에서
어르신들이 더욱 고립되고 있다는 의견을 냈고 모두 공감했습니다.

자신의 할머니를 생각하며 필요성을 느끼기도 했으며 통계적인 자료를 확인하며 서울에 70세 이상 노인 인구가 100만명에 이르고 노인정은 3472개로 많이 부족하다는 정량적 사실도 알 수 있었습니다.

또한 현재 노인정의 실제 이용자는 80대중반이 많다는 조사결과도 있으며 60~70대 분들의 입장에선 노인정이 더 나이가 많으신 분들이 이용하는 곳으로 비춰지고 있어 심리적 거부감으로 이용을 꺼리기도 한다고 합니다.

이러한 사실에 입거해 우리 팀은 노인분들이 소통할 수 있는 앱을 만들어 보자!
라는 의견 통합을 이뤘고 프로젝트를 시작하게 되었습니다.

<br/>

---

## 소개

<br/>

## Kakao sdk + Jwt

##### kakao 소셜 로그인을 사용하여 로그인을 구현하였고 Jwt로 accessToken과 refreshToken으로 로그인 상태유지를 하였습니다.

##### accessToken이 만료되면 refreshToken의 만료여부를 체크하여 accessToken을 대체할지, 새로 로그인을 요청할지 결정하였습니다.

<img width="1000" alt="카카오" src="https://user-images.githubusercontent.com/95286903/154743839-6b6cf993-7ef6-4037-9c1e-f64cbb3f7246.png">
<img src="https://user-images.githubusercontent.com/95286903/154756061-f1a9280f-5753-4571-aa3e-1bed744e4489.gif" width="510" height="300">

<br/><br/><br/>

## Mongoose

##### 방만들기 버튼을 통한 방 생성, 새로고침 버튼을 통한 업데이트,<br/>

##### < > 버튼을 통한 업데이트, 방에서 마지막 1명이 퇴장시 방 제거

<img width="1000" alt="roomlist" src="https://user-images.githubusercontent.com/95286903/154745543-9784e4ac-396d-45c2-90db-2ff665e03d4a.png">
<img src="https://user-images.githubusercontent.com/95286903/154755756-2277bd60-a4a7-4a97-b8d6-bc2d432bf7df.gif" width="510" height="300">

<br/><br/><br/>

## Socket.io , RTC (simple peer)

##### 소켓을 이용한 실시간 캐릭터 이동구현, 캐릭터 이동중 의자를 만나면

##### 카카오톡 아바타에서 카카오톡 프로필로 이미지 변경처리 및 화상채팅으로 이동

##### RTC (simple peer)를 이용한 mesh 구조의 화상채팅 구현 , 소켓을 활용한 이모티콘 표현 공유

<img width="1000" alt="video" src="https://user-images.githubusercontent.com/95286903/154745531-0eb38373-207e-4c0d-a0d6-b46469f1a7f6.png">
<img src="https://user-images.githubusercontent.com/95286903/154755736-32188909-21cf-4768-befb-12df84b72c10.gif" width="510" height="300">

<br/><br/><br/>

---

## 기술 명세

| Client           | Server         | Common                           |
| ---------------- | -------------- | -------------------------------- |
| React            | Express        | client: Netlify                  |
| Redux-saga       | Mongoose       | server: Amazon Elastic Beanstalk |
| Redux-toolkit    | Socket.IO      | Eslint                           |
| Socket.IO-client | Json web token | Prettier                         |
| Kakao sdk        | Joi            | Husky                            |
| React-router     |                |                                  |
| Simple-peer      |                |                                  |
| Styled-component |                |                                  |

<br/><br/><br/>

---

## 스케줄

전체 일정 ( 설 연휴 제외한 개발기간 총 3주 ) : 2022 년 1 월 24 일 ~ 2 월 18 일 <br />
설 연휴 ( 휴무 ) : 2022 년 1 월 29 일 ~ 2 월 2 일

<br/>

### 1주차 [ 22년 1월 24일 ~ 1월 28일 ]

- 아이디어 수집
- 기술 선정
- Mockup UI
- Schema
- Kanban
- Git Repository 생성

<br/>

### 2주차 [ 22년 2월 3일 ~ 2월 6일 ]

- 클라이언트 ( React ) 초기설정
- 서버 ( Express ) 초기설정
- 로그인, 로그아웃
- 메인 (방 목록) CRUD

<br/>

### 3주차 [ 22년 2월 7일 ~ 2월 13일 ]

- 방 UI
- 공용 컴포넌트
- Socket 실시간 캐릭터 이동
- Socket 실시간 방 입장, 퇴장, 카카오 프로필 전환
- Rtc 1:1 연결

<br/>

### 4주차: [ 22년 2월 14일 ~ 2월 18일 ]

- Rtc N:N
- Socket emoticon 공유
- 서버 테스트 코드
- 클라이언트 테스트 코드
- 서버 AWS 배포
- 클라이언트 Netlify 배포
- README 작성

<br/><br/><br/>

# 마무리

## 김예림

#### 많은 고민과, 공부를 한 3주였던 거 같습니다.

#### 개발이 시작된 두 번째 주부터는 일정에 맞춰 한 페이지씩 맡아서 작업을 했는데 막히는 부분, 에러 부분에서 팀원들과 함께 해결해 나아가면서 팀원들의 학습 태도나, 문제 해결 방식을 보면서 내가 무계획적으로 접근을 했다는 점을 느꼈고, 그 후부터는 어떻게 하면 에러를 잘 해결해 나갈 수 있을지 고민을 한 것 같습니다.

#### 또한, 기술적인 부분에서도 혼자서 작업을 했다면 놓치고 갔을 부분, 도전해 보지 못했을 사가와 소켓 함께 사용하는 방법, 2D, Rtc 등을 팀원들과 각자 공부를 한 후 짧게 이야기하는 시간을 가지며 서로 이해한 부분을 정리해 나아갔습니다.

#### 어려움도 많이 느꼈지만, 팀 프로젝트를 하면서 소통하는 방법과 다른 관점을 통해 시야를 넓힐 수 있는 계기가 된 것 같습니다.

<br/>

## 서동수

#### 초기에는 처음 하는 팀 프로젝트이기도 하고 첫 개발협업을 하기 때문에 기획 ,개발과정에서 필요한 규칙들을 많은 부분 얘기하고 합의한 뒤에 시작했지만 실제 개발이 들어가면서 서로 생각하는 부분의 차이점을 발견할 수 있었고 차이를 좁혀 팀으로써 맞춰갈 수 있도록 매일 스크럼을 올리고 진행하고 마무리하는 단계에서 커뮤니케이션의 시간을 꼭 확보해 진행해 나갔습니다.

#### 개발기간은 2주라는 시간이 정해져 있었기 때문에 중간중간 발생하는 기능구현의 지연, 오류,버그 발생등의 상황에서 우선순위를 두고 선택과 집중을 통해 Goal을 보고 결정해 나갔습니다.

#### 프로젝트의 특성상 화상채팅이 필수였기 때문에 WebRTC를 공부하고 구현하면서 1:1 연결 해제에는 문제가 없었지만 2:2 3:3 4:4 가되며 연결, 해제, 시그널링에 문제가 발생했고 결국 처음부터 구조를 다시 생각하고 접근해야 하는 결론을 냈으며 4:4 mesh 구조로 연결 해제에 성공했습니다.

#### stun, turn 서버문제로 네트워크가 다르게 되면 연결이 원할하지 않거나 , 안되는 점은 매우 아쉽지만 기간내 협업을 통해 우리팀이 가치있다고 생각한 일을 현실로 구현해 낸 경험을 얻었고 협업을 통한 문제해결, 커뮤니케이션의 중요성도 다시금 깨닫을 수 있었습니다.

<br/>

## 한소영

#### 팀 프로젝트를 진행하면서 팀원과 협업하면서 개발을 진행했기 때문에 개인 과제때보다 더 책임감을 가지고 진행하였고,소통하며 개발하려면 사용한 기술들을 더 깊이 이해하고 사용해야 했기에 기술적으로 많이 성장했다고 느꼈습니다.팀 프로젝트를 하면서 혼자 하는 것과 다르다고 느꼈던 것은 모든 것을 전부 같이 정해야 한다는 사실이었습니다

#### 만약 시간이 많았다면 충분한 회의 끝에 결론에 만족스럽게 도달할 수 있었을 테지만 촉박한 시간 동안 다른 사람과 의견을 나눈다는 것은 꽤 어려운 일이었고,내가 가진 의견을 확실하게 전달하여 어떤 의견이 더 좋은지 같이 커뮤니케이션해야 했으나, 팀원분들에게 의견 전달이 충분히 되지 않게끔 진행된 것 같아, 그동안의 저의 커뮤니케이션 방식을 되돌아보게 되었습니다. 이번 프로젝트를 진행하며 반성도 많았지만, 협업하는 방식에 대해 이해하게 되어 뜻깊은 시간이 된 것 같습니다
