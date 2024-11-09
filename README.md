## 🚀 프로젝트 소개

## 📅 개발 기간

- 24.10.24 ~ 24.11.07

## 🛠 기술 스택
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white" /> 
<img src="https://img.shields.io/badge/react-3178C6?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/styledcomponent-06B6D4?style=for-the-badge&logo=styledcomponent&logoColor=white" />
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"  />

## 🏠 R&R

- 김도훈
    - 구현: 메인 페이지 (`/`), 글로벌 스타일 및 테마 디자인, 공통 버튼 컴포넌트
    - 기능 :
        1. 새로운 피드 생성: 이름 입력 후 ‘질문 받기’버튼 클릭
        2. 피드 생성 후 생성된 피드의 답변 페이지(`/post/{id}/answer`)로 이동
        3. 유효성 검사 : 이름 입력, 글자수 제한
        4. 라이트, 다크모드 전환
        5. 버튼 애니메이션

- 이주훈
    - 구현: 질문 리스트 페이지 (`/list`), 피드 카드 컴포넌트
    - 기능 :
        1. 피드 정렬(최신순, 이름순) 드롭다운
        2. 자신이 작성한 피드로 연결하는 드롭다운
        3. 페이지 반응형 디자인: 너비에 따라 카드 개수 및 크기 변경
        4. 페이지네이션
        5. 페이지 로딩 스피너

- 이동훈
    - 구현: 개별 피드 페이지 `/post/{id}` , `/post/{id}/answer` , 질문 작성 및 피드 삭제 모달
    - 기능:
        1. 공유 버튼 : URL 복사, 카카오톡 공유, 페이스북 공유
        2. 질문 컨테이너: 질문 박스 컴포넌트 매핑, 작성자 여부 확인 후 조건부 렌더링
        3. 질문 작성: 질문 페이지에서 질문 입력 후 ‘질문 보내기’ 버튼 클릭
        4. 피드 삭제: 답변 페이지에서 ‘삭제하기’버튼 클릭
        5. 무한 스크롤
        6. 페이지 상단 이동(TOP) 버튼

- 한정빈
    - 구현: 질문 박스 컴포넌트, 토스트 메시지 컴포넌트
    - 기능:
      1. 사용자 값에 따라 '질문자', '답변자' 시점의 기능 조건부 렌더링
      2. 답변 상태에 따른 조건부 렌더링
      3. 케밥메뉴 : 답변 작성, 삭제, 수정 기능
      4. 좋아요 기능 애니메이션
      5. 토스트 메시지 컴포넌트화



## 📝 추가 기능

- 기본 요구 사항 외 구현한 추가 기능

![image](https://github.com/user-attachments/assets/549cbb8f-bfca-4e5a-b8a1-129e20f67f14)


## 🖥 User Flow

![image](https://github.com/user-attachments/assets/414ae038-d6a7-4074-b65c-fcd3763cff45)



## 📊 Git Flow

- 개발 전 이슈를 먼저 생성하고, 이슈 번호를 사용하여 브랜치 생성

![image](https://github.com/user-attachments/assets/1d8920c8-7f68-4070-bf16-65d3b4871621)



## 📡 배포 주소

- [open-mind-team-6.netlify.app/](http://open-mind-team-6.netlify.app/)
