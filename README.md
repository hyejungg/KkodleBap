# 🍚 꼬들밥 (KkodleBap) - Web

> "하루 한 그릇, 자모를 모아 만드는 꼬들한 퍼즐!"

한글 자모 6개를 조합하여 오늘의 단어를 맞히는 웹 기반 퍼즐 게임입니다.

## ✨ 주요 기능

- **자모 조합 퍼즐**: 6개의 한글 자모를 조합하여 단어를 추측합니다.
- **일일 퍼즐**: 하루에 하나의 새로운 단어가 제공됩니다.
- **입력 피드백**: 추측한 단어의 각 자모 상태(정답, 다른 위치에 존재, 없음)를 타일과 키보드 색상으로 표시합니다.
- **유효성 검증**: 사전에 없는 단어는 제출할 수 없습니다.
- **결과 공유**: 성공 시 게임 결과를 이모지 형태로 클립보드에 복사하여 공유할 수 있습니다.
- **키보드 입력**: 가상 키보드뿐만 아니라 물리적 키보드로도 플레이할 수 있습니다.
- **반응형 UI**: 모바일 우선 접근 방식으로 다양한 화면 크기를 지원합니다.

## 🛠️ 기술 스택

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📝 프로젝트 구조 및 설계

프로젝트의 상세한 설계 내용, 컴포넌트 구조, 핵심 로직 등에 대한 정보는 [GEMINI.md](GEMINI.md) 파일을 참고해주세요.

## 🚀 시작하기

### 사전 준비

- [Node.js](https://nodejs.org/) (v18 이상 권장)
- [pnpm](https://pnpm.io/installation)

### 설치 및 실행

1.  **저장소 복제**
    ```bash
    git clone https://github.com/your-username/KkodleBap.git
    cd KkodleBap
    ```

2.  **의존성 설치**
    ```bash
    pnpm install
    ```

3.  **개발 서버 실행**
    ```bash
    pnpm dev
    ```
    서버가 실행되면 터미널에 표시된 로컬 주소(예: `http://localhost:5173`)로 접속하세요.

4.  **프로덕션 빌드**
    ```bash
    pnpm run build
    ```
    빌드 결과물은 `dist` 디렉토리에 생성됩니다.

## 🌐 배포

이 프로젝트는 [Vercel](https://vercel.com/) 배포에 최적화되어 있습니다. 프로젝트 루트의 `vercel.json` 파일을 통해 `pnpm`을 사용한 빌드 및 배포 설정이 완료되었습니다.