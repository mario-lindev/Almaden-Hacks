# Almaden Hacks

The Almaden Hacks event website, built with Next.js 16, React 19, TypeScript,
and Tailwind CSS. Production: [almadenhacks.com](https://www.almadenhacks.com).

## Development

Use Node.js 20.9 or newer, as required by Next.js 16.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

## Folder guide

| Folder | Purpose |
| --- | --- |
| [`src/`](src/README.md) | Application source for the website. |
| [`src/app/`](src/app/README.md) | Page routes and site-wide presentation. |
| [`src/app/team/`](src/app/team/README.md) | Team page and roster presentation. |
| [`src/components/`](src/components/README.md) | Reusable interface components and interactive visuals. |
| [`src/lib/`](src/lib/README.md) | Shared site content and configuration. |
| [`public/`](public/README.md) | Static assets served by the website. |
| [`public/art/`](public/art/README.md) | Illustrations and supporting artwork. |
| [`public/marks/`](public/marks/README.md) | Organization logos and attribution. |
| [`.claude/`](.claude/README.md) | Local development launch settings. |
| [`.impeccable/`](.impeccable/README.md) | Design tooling configuration. |

## Updating content

- Edit sponsor categories, descriptions, logos, and pending status in
  [src/lib/sponsors.ts](src/lib/sponsors.ts).
- Add logo files to [public/marks](public/marks/) and record their sources in
  [SOURCES.md](public/marks/SOURCES.md). A file in public/marks is served at /marks/filename.
- Edit registration and Discord URLs in [src/lib/event.ts](src/lib/event.ts).
- Edit event and FAQ copy in [src/app/page.tsx](src/app/page.tsx).
- Edit the roster in [src/app/team/page.tsx](src/app/team/page.tsx).

## Deployment

The GitHub repository is mario-lindev/almaden-hacks; main contains the published
source. The Vercel project is almaden-hacks under mario-ghcommits and serves
almadenhacks.com and www.almadenhacks.com. Deploy the intended main commit to
the existing project, then verify the production build and domains in Vercel.

## Artwork

The homepage uses responsive Almaden Valley illustrations and interactive ASCII scenes in the experience panel.
