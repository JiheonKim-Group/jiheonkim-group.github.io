# Jiheon Kim Group 홈페이지

KAIST 생명화학공학과 김지헌 교수 연구실(자율실험실(SDL)·전기화학·나노소재) 공식 홈페이지.
배포 주소: https://jiheonkim-group.github.io (추후 amdl.kaist.ac.kr 연결 예정)

## 기술 스택
- Astro (정적 사이트), TypeScript, 순수 CSS (프레임워크 최소화)
- GitHub Actions로 빌드 후 GitHub Pages에 배포
- 패키지 관리: npm

## 명령
- `npm run dev`     : 로컬 미리보기 (http://localhost:4321)
- `npm run build`   : 프로덕션 빌드 (dist/)
- `npm run preview` : 빌드 결과 미리보기

## 디렉터리 규칙 (내용과 디자인 분리)
- `src/content/team/`        구성원 1명 = Markdown 1개 (frontmatter: name, degree, role, email, photo, joined, links, cv / 본문: 소개글)
  - `team/pi/`               PI (교수)
  - `team/members/`          Current Members (현 구성원)
  - `team/alumni/`           Alumni (졸업·퇴임 구성원) — 졸업 시 members/ → alumni/ 로 파일 이동
  - 구분은 하위 폴더로 결정되며, 홈페이지 Team 페이지에서 PI → Current Members → Alumni 순으로 표시
- `src/content/publications/`  논문 1편 = Markdown 1개 (title, authors, journal, year, date, volume, issue, pages, doi, url, image, highlight)
  - `_template.md`를 복사해서 작성 (이름이 `_`로 시작하는 파일은 홈페이지에 나오지 않음)
  - 번호는 오래된 논문부터 자동으로 매겨지고, 연도 필터 버튼도 자동 생성됨
- `src/content/news/`          소식 1건 = Markdown 1개 (date, title)
- `src/content/research/`      연구 주제 페이지
- `public/images/`             이미지 (용도별 하위 폴더)
  - `images/logo/`           연구실·학교 로고
  - `images/people/`         구성원 사진 (team의 `photo` 필드에서 참조)
  - `images/publications/`   논문 대표 그림·표지 (publications에서 참조)
  - `images/news/`           뉴스 사진 (news에서 참조)
  - `images/gallery/`        연구실 활동 사진 (Gallery 페이지에 자동 표시)
- `public/home/`              홈 첫 화면 오른쪽 슬라이드(영상 .mp4·사진 .jpg/.png/.webp). 파일 이름 순서로 화살표 넘김 (예: `01-chemspeed.mp4`)
  - 웹용으로 줄인 파일만 넣는다 (영상 10MB 안팎, 사진 1MB 이하 권장)
  - Markdown에서는 `/images/<폴더>/<파일명>` 형태로 적는다 (예: `photo: /images/people/jiheon-kim.jpg`)
  - 파일명은 영문 소문자·숫자·하이픈만 사용 (예: `2025-group-photo.jpg`)
- `src/layouts/`, `src/components/`, `src/styles/`  디자인 코드 — 내용 갱신 시 건드리지 않음

## 작업 규칙
- 디자인 코드(layouts/components/styles)를 바꾸기 전에는 무엇을 왜 바꾸는지 먼저 설명하고 승인을 받는다.
- 내용 갱신(구성원·논문·뉴스 추가)은 src/content/ 아래 파일 추가/수정만으로 끝나야 한다.
- 변경 후 `npm run build`가 오류 없이 통과하는지 반드시 확인한다.
- 외부 의존성(npm 패키지) 추가는 최소화하고, 추가 시 이유를 설명한다.
- 커밋 메시지는 영어로 간결하게 (예: "Add publication: Joule 2025").
- 사용자는 웹 개발 경험이 없다. 변경 사항은 비전공자도 이해할 수 있게 한 줄로 설명한다.
- 한국어로 대화한다.