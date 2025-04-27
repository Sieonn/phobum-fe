
# 📱 포범 (Phobum) - 당신만의 포토카드 제작 서비스
[MakeCard](https://github.com/Sieonn/Mini-Project)리팩토링 프로젝트<br/>
나만의 특별한 포토카드를 만들고 공유하는 웹 애플리케이션입니다.


## ✨ 주요 기능

- 🖼️ WebP 최적화를 통한 고품질 포토카드 제작
- 🌈 프리즘 효과가 있는 3D 인터랙티브 카드
- 🔐 카카오 소셜 로그인 및 일반 로그인 지원
- 👤 사용자 프로필 관리
- 📱 모바일/데스크톱 반응형 디자인
- 💫 부드러운 애니메이션과 전환 효과

## 🛠️ 기술 스택
### Frontend
- 프레임워크: `React`
- 스타일링:
  `Styled Components`
- 상태관리: `Zustand`🐻
- API 통신: `Axios`
- 타입 안정성: `TypeScript`
- 인증: JWT (리프레시 토큰)
- 이미지 처리: WebP 변환

## 🚀 시작하기

1. 저장소 클론:

   ``` powershell
   git clone [저장소-URL]
   ```

2. 의존성 설치:

   ``` powershell
   yarn install
   ```

3. 환경변수 설정:

   ``` powershell
   REACT_APP_API_BASE_URL=백엔드_API_주소
   ```

4. 개발 서버 실행:

   ``` powershell
   yarn start
   ```

   

## 🔍 프로젝트 구조

``` dockerfile
src/
├── api/          # API 통신 관련
├── assets/       # 정적 자원
├── components/   # 재사용 컴포넌트
├── constants/    # 전역 상수
├── pages/        # 페이지 컴포넌트
├── provider/     # Context 제공자
├── store/        # 전역 상태 관리
├── styles/       # 전역 스타일
├── types/        # 타입 정의
└── utils/        # 유틸리티 함수
```



## 📱 사용 가능한 스크립트

`yarn start` - 개발 모드 실행<br/>
`yarn build` - 프로덕션용 빌드<br/>
`yarn test` - 테스트 실행<br/>
`yarn eject` - CRA 설정 추출

## 🎨 상세 기능

포토카드 제작

- 이미지 업로드 및 미리보기
- WebP 포맷 최적화
- 제목과 설명 입력
- 3D 인터랙티브 효과

인증 시스템

- 카카오 OAuth 연동
- 자체 로그인 시스템
- 토큰 보안 관리
- 보호된 라우트

사용자 경험

- 부드러운 전환 효과
- 반응형 디자인
- 오류 처리
- 로딩 상태


---
## Backend

### 🛠 기술 스택
Backend
- Runtime: Node.js
- Framework: Express.js
- Database: Supabase
- Storage: Supabase Storage
- Authentication: JWT, Bcrypt
- Cloud Platform: Vercel

주요 라이브러리
``` powersheell
{
  "@supabase/supabase-js": "^2.49.4",
  "axios": "^1.8.3",
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1"
}
```

### 🚀 주요 기능
1. 인증 시스템
   일반 회원가입/로그인
   카카오 소셜 로그인
   JWT 기반 인증
   Access Token & Refresh Token 관리
2. 이미지 관리
   이미지 업로드 (5MB 제한)
   이미지 조회 및 상세보기
   이미지 삭제
   청크 단위 업로드 지원
3. 사용자 관리
   프로필 조회
   닉네임 변경
   회원 탈퇴
   이메일/닉네임 중복 확인
### 📁 프로젝트 구조
``` powershell
src/
├── app.js              # 애플리케이션 진입점
├── config/             # 설정 파일
│   ├── db.js          # 데이터베이스 설정
│   └── init.sql       # DB 스키마
├── middleware/         # 미들웨어
│   └── auth.js        # 인증 미들웨어
├── routes/            # 라우트 핸들러
│   ├── auth.js        # 인증 관련 라우트
│   └── images.js      # 이미지 관련 라우트
└── utils/             # 유틸리티
    └── tokenGenerator.js  # 토큰 생성기
```
### 🚦 API 엔드포인트
인증<br/>
- `POST /auth/signup` - 회원가입
- `POST /auth/login` - 로그인
- `GET /auth/kakao` - 카카오 로그인
- `POST /auth/refresh` - 토큰 갱신
- `GET /auth/me` - 사용자 정보 조회
- `DELETE /auth/me` - 회원 탈퇴

이미지<br>
- `POST /api/images` - 이미지 업로드
- `GET /api/images` - 이미지 목록 조회
- `GET /api/images/:id` - 이미지 상세 조회
- `DELETE /api/images/:id` - 이미지 삭제
  
### 🔒 보안 기능
- CORS 보안 설정
- JWT 기반 인증
- 비밀번호 암호화 (bcrypt)
- 파일 업로드 제한
- API 요청 타임아웃 처리
  
### 🔍 성능 최적화
- 이미지 청크 업로드
- 응답 캐싱
- 타임아웃 설정
- 비동기 처리 최적화

## 📄 저작권 및 사용권

이 프로젝트는 개인 프로젝트이며 모든 권리는 제작자에게 있습니다.

1. 🔒 **사용 제한**
   - 상업적 사용 불가
   - 무단 복제 및 배포 금지
   - 소스 코드 무단 사용 금지
2. ✅ **가능한 것**
   - 개인적인 학습 목적으로 코드 참고
   - 비상업적 목적의 테스트
3. ⚠️ **주의사항**
   - 프로젝트 내 사용된 이미지, 디자인 등의 에셋은 별도의 라이선스를 가질 수 있음
   - 프로젝트 사용 시 출처 표기 필요

© 2024 Phobum. All Rights Reserved.
