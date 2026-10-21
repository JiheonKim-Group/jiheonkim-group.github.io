// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // 도메인을 amdl.kaist.ac.kr로 옮기면 이 주소만 바꾸면 된다.
  site: 'https://jiheonkim-group.github.io',
  // 예전 주소 /team 으로 들어오면 PI 페이지로 보낸다.
  redirects: {
    '/team': '/team/pi',
  },
});
