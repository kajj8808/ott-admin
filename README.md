# OTT Admin 사이트

이 프로젝트는 OTT 플랫폼의 관리자 사이트입니다. 이 사이트는 Next.js를 사용하여 개발되었습니다.

## 주요 기능

- 비디오 업로드 및 관리
- 자막 추가
- 시리즈 추가
- 마그넷 링크 추가
- Nyaa 링크 추가

## 파일 구조

- `app/(admin)/admin/insert_videos/form.tsx`: 비디오 업로드 폼
- `app/(admin)/admin/add_subtitle/page.tsx`: 자막 추가 페이지
- `app/(admin)/admin/insert_series/page.tsx`: 시리즈 추가 페이지
- `app/(admin)/admin/add_magnet/page.tsx`: 마그넷 링크 추가 페이지
- `app/(admin)/admin/add_nyaa/page.tsx`: Nyaa 링크 추가 페이지

## 설치 및 실행

1. 저장소를 클론합니다.

   ```bash
   git clone https://github.com/your-repo/ott-admin.git
   ```

2. 프로젝트 디렉토리로 이동합니다.

   ```bash
   cd ott-admin
   ```

3. 필요한 패키지를 설치합니다.

   ```bash
   npm install
   ```

4. 개발 서버를 시작합니다.

   ```bash
   npm run dev
   ```

5. 브라우저에서 `http://localhost:3000`을 열어 애플리케이션을 확인합니다.
