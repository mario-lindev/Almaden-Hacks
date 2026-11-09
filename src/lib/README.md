# Shared Content & Configuration

- event.ts: Registration and Discord links.
- sponsors.ts: Typed sponsor groups, descriptions, logo paths, and pending status.
- content.ts: Legacy club copy and ticker text, currently unused by the homepage.

Sponsor logos live in ../../public/marks; attribution is recorded in its SOURCES.md.
Keep these modules free of browser side effects so server components can import them.
