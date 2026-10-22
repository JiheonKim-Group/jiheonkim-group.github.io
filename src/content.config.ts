import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Team members, grouped by subfolder: team/pi, team/members, team/alumni.
const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    degree: z.string().optional(), // e.g. Ph.D.
    role: z.string(),
    position: z.array(z.string()).optional(), // titles shown under the name, one per line
    email: z.string().optional(),
    office: z.string().optional(), // office address
    lab: z.string().optional(), // lab address
    phone: z.string().optional(),
    photo: z.string().optional(), // e.g. /images/people/jiheon-kim.jpg
    joined: z.coerce.date().optional(),
    links: z.array(z.object({ icon: z.enum(['scholar', 'linkedin', 'orcid']).optional(), label: z.string(), url: z.string() })).optional(), // profile links
    cv: z
      .array(
        z.object({
          heading: z.string(),
          items: z.array(z.object({ period: z.coerce.string(), text: z.string(), advisor: z.string().optional() })), // period may be a bare year like 2024
        }),
      )
      .optional(),
  }),
});

// Publications, one file each. Files starting with _ (e.g. _template.md) are ignored.
const publications = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(), // corresponding authors marked with * (e.g. "Jiheon Kim*")
    journal: z.string(),
    year: z.number(),
    date: z.coerce.date().optional(), // publication date, used to order papers within a year
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(), // page range or article number (e.g. "1393–1401", "e7864662")
    doi: z.string().optional(), // e.g. 10.1038/s41563-025-00000-0
    url: z.string().optional(), // link used when there is no DOI
    image: z.string().optional(), // e.g. /images/publications/2026-nat-mater-kim.png
    highlight: z.string().optional(), // optional note under the citation (e.g. "Highly Cited Paper", "Cover Article")
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    image: z.string().optional(), // e.g. /images/news/2025-award.jpg
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    imageTitle: z.string().optional(), // optional heading shown above the figure
    wide: z.boolean().default(false), // true: figure spans the full width below the text
    order: z.number().default(0),
  }),
});

export const collections = { team, publications, news, research };
