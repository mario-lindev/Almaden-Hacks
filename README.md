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

| Folder | Contents |
| --- | --- |
| [src](src/README.md) | Application source and shared content |
| [src/app](src/app/README.md) | Homepage, layout, metadata, global styles, and app icon |
| [src/components](src/components/README.md) | Navigation, sponsor cards, event actions, and artwork |
| [src/components/blackhole](src/components/blackhole/README.md) | Optional WebGPU renderer and shaders |
| [src/lib](src/lib/README.md) | Registration links and typed sponsor data |
| [public](public/README.md) | Static images and animation assets |
| [public/marks](public/marks/README.md) | Sponsor logos and source attribution |
| [scripts](scripts/README.md) | Offline artwork generation |
| [.claude](.claude/README.md) | Local development launch configuration |

## Updating content

- Edit sponsor categories, descriptions, logos, and pending status in
  [src/lib/sponsors.ts](src/lib/sponsors.ts).
- Add logo files to [public/marks](public/marks/) and record their sources in
  [SOURCES.md](public/marks/SOURCES.md). A file in public/marks is served at /marks/filename.
- Edit registration and Discord URLs in [src/lib/event.ts](src/lib/event.ts).
- Edit event and FAQ copy in [src/app/page.tsx](src/app/page.tsx).

## Deployment

The GitHub repository is mario-lindev/almaden-hacks; main contains the published
source. The Vercel project is almaden-hacks under mario-ghcommits and serves
almadenhacks.com and www.almadenhacks.com. Deploy the intended main commit to
the existing project, then verify the production build and domains in Vercel.

## Artwork

The homepage uses canvas-based ASCII scenes, mountain layers, and animated
horses. The optional black-hole scene remains available in the component
library but is not mounted on the homepage.
