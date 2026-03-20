# ShallowL

Ollama를 사용한 아름다운 로컬 번역기, DeepL에서 영감을 받았습니다.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 기능

- 🌐 **로컬 번역** - Ollama로 구동되며, 완전히 프라이빗하고 오프라인에서 작동
- ⚡ **빠르고 반응형** - Electron, Vite, React로 최적의 성능 제공
- 🎨 **현대적 UI** - Tailwind CSS로 만든 아름다운 인터페이스
- 🔐 **안전** - 모든 처리가 로컬 머신에서 진행
- ⌨️ **키보드 단축키** - `Ctrl+Alt+T`로 빠른 접근

## 기술 스택

- **프론트엔드**: React 18 + TypeScript
- **빌드 도구**: Vite
- **데스크톱**: Electron
- **스타일링**: Tailwind CSS + PostCSS
- **상태 관리**: Zustand
- **백엔드**: Node.js with native Ollama API 통합

## 필수 요구사항

- Node.js 18+
- Ollama (`http://192.168.0.67:11434`에서 실행 중)
- npm 또는 yarn

## 설치

1. 저장소 클론:
```bash
git clone https://github.com/yourusername/shallowl.git
cd shallowl
```

2. 의존성 설치:
```bash
npm install
```

## 개발

Electron과 함께 개발 서버 시작:

```bash
npm run dev
```

다음을 수행합니다:
- TypeScript 파일 컴파일
- Vite 개발 서버 시작
- Electron 앱 실행 (핫 리로드 지원)
- DevTools 열기

## 빌드

프로덕션 빌드 생성:

```bash
npm run build
```

다음을 수행합니다:
- TypeScript 컴파일
- Vite로 빌드
- Electron Builder로 패키징

## 프로젝트 구조

```
shallowl/
├── electron/           # Electron 메인 프로세스
│   ├── main.ts         # 앱 진입점
│   └── preload.ts      # IPC 브릿지
├── src/                # React 프론트엔드
│   ├── components/     # React 컴포넌트
│   ├── hooks/          # 커스텀 훅
│   ├── store/          # Zustand 스토어
│   ├── utils/          # 유틸리티
│   ├── App.tsx         # 메인 앱 컴포넌트
│   └── main.tsx        # React 진입점
├── vite.config.ts      # Vite 설정
├── tsconfig.json       # TypeScript 설정
└── tailwind.config.js  # Tailwind CSS 설정
```

## 환경 변수

`.env` 파일을 생성하여 설정합니다 (`.env.example` 참고):

```env
# 여기에 설정을 추가하세요
```

## 키보드 단축키

| 단축키 | 동작 |
|--------|------|
| `Ctrl+Alt+T` | 응용프로그램 표시/숨기기 |

## IPC 핸들러

앱에서 제공하는 번역 IPC 채널:

- `translate` - Ollama에 번역 요청 전송
- `check-ollama` - Ollama 연결 상태 확인
- `list-models` - 사용 가능한 Ollama 모델 목록 조회

## 기여

기여를 환영합니다! 자유롭게 Pull Request를 제출해주세요.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 라이센스됩니다 - 자세한 내용은 LICENSE 파일을 참고하세요.

## 문제 해결

### 포트 5173이 이미 사용 중
개발 서버가 5173이 사용 중이면 자동으로 다른 포트를 시도합니다.

### Ollama에 연결할 수 없음
다음을 확인하세요:
1. Ollama가 설정된 주소에서 실행 중인지 확인
2. IP 주소가 올바른지 확인 (현재: `192.168.0.67:11434`)
3. 머신 간 네트워크 연결이 작동하는지 확인

### Windows의 캐시 오류
이는 무해하며 기능에 영향을 주지 않습니다. 정상적인 Electron/Chromium 캐시 경고입니다.

## 지원

문제나 질문이 있으면 저장소에 이슈를 생성해주세요.
