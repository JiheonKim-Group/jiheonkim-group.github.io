import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 구성원: team/pi, team/members, team/alumni 하위 폴더로 구분한다.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    degree: z.string().optional(), // 예: Ph.D.
    role: z.string(),
    position: z.array(z.string()).optional(), // 이름 아래 직위 (줄마다 1개)
    email: z.string().optional(),
    office: z.string().optional(), // 교수실 주소
    lab: z.string().optional(), // 실험실 주소
    phone: z.string().optional(),
    photo: z.string().optional(), // 예: /images/people/jiheon-kim.jpg
    joined: z.coerce.date().optional(),
    links: z.array(z.object({ icon: z.enum(['scholar', 'linkedin', 'orcid']).optional(), label: z.string(), url: z.string() })).optional(), // 아이콘 링크
    cv: z
      .array(
        z.object({
          heading: z.string(),
          items: z.array(z.object({ period: z.coerce.string(), text: z.string(), advisor: z.string().optional() })), // period 는 2024 처럼 숫자만 적어도 됨
        }),
      )
      .optional(),
  }),
});

// 논문: 파일 1개 = 논문 1편. 이름이 _ 로 시작하는 파일(_template.md)은 무시한다.
const publications = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(), // 교신저자는 이름 뒤에 * (예: "Jiheon Kim*")
    journal: z.string(),
    year: z.number(),
    date: z.coerce.date().optional(), // 같은 해 안에서 순서를 정할 때 사용 (출판일)
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(), // 쪽수 또는 논문 번호 (예: "1393–1401", "e7864662")
    doi: z.string().optional(), // 예: 10.1038/s41563-025-00000-0
    url: z.string().optional(), // DOI가 없을 때 연결할 주소
    image: z.string().optional(), // 예: /images/publications/2026-nat-mater-kim.png
    highlight: z.string().optional(), // 선택: 서지정보 아래 강조 문구 (예: "Highly Cited Paper", "Cover Article")
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    image: z.string().optional(), // 예: /images/news/2025-award.jpg
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    imageTitle: z.string().optional(), // 선택: 그림 위에 붙는 제목
    wide: z.boolean().default(false), // true 면 그림을 글 아래에 전체 폭으로 (글자가 많은 그림)
    order: z.number().default(0),
  }),
});

export const collections = { team, publications, news, research };
