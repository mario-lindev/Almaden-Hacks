---
name: Almaden Hacks
description: Bold student energy rooted in Almaden Valley.
colors:
  paper: "#fafaf6"
  ink: "#19374b"
  blue: "#284e68"
  muted: "#42545e"
  line: "#dce3df"
  sage: "#4f7367"
  hero-sky: "#f0f4f1"
  blue-hover: "#29495e"
  light-button: "#e5ebe4"
  footer: "#233f43"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(74px, 10.5vw, 140px)"
    fontWeight: 750
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(38px, 4.8vw, 60px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  countdown:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "30px"
    lineHeight: 1.2
  accent:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.18em"
    fontWeight: 400
rounded:
  artwork: "12px"
  navigation: "16px"
  button: "28px"
spacing:
  small: "16px"
  medium: "24px"
  large: "36px"
  section: "108px 48px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "13px 26px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-light:
    backgroundColor: "{colors.light-button}"
    textColor: "#2d4362"
    rounded: "{rounded.button}"
    padding: "13px 26px"
  navigation:
    backgroundColor: "#fafaf6f5"
    rounded: "{rounded.navigation}"
    height: "64px"
    padding: "0 24px"
---

# Design System: Almaden Hacks

## Overview

**Creative North Star: "Student energy in the valley"**

A bold student event identity grounded in Almaden Valley. Stacked Inter headlines and a floating paper navigation establish a clear, welcoming hierarchy; layered valley hills and animated ASCII horses retain the site’s local character. Instrument Serif provides a warm closing accent.

**Key Characteristics:**
- Bold stacked event typography.
- Pale sky, paper surfaces, and blue-green landscape layers.
- Animated ASCII artwork with restrained sage accents.

## Colors

Cobalt is the primary action color; ink carries text and the schedule surface. Paper and pale sky keep the page airy. Muted text and light rules separate supporting information. Sage provides the closing accent. The footer deepens the landscape’s green-blue tones. Preserve the existing mountain gradients and horse-plane colors in their source components.

## Typography

Inter leads the display, section titles, body, and navigation. Geist Mono carries the event date and tabular countdown. Instrument Serif appears in the closing emphasis and selected editorial copy. Desktop display and headline roles use the frontmatter scale; at 650px the hero display becomes `clamp(50px, 13.2vw, 85px)`. Experience titles are 25px, timeline titles 30px.

## Layout

Sections use a centered 1240px container and the section spacing token. At 900px, section padding becomes 72px 32px and primary two-column layouts stack; experience columns remain three until 650px. At 650px, section padding becomes 64px 24px and experience cards stack. The hero is centered above a full-width landscape anchored to its bottom. Desktop hero minimum height is 900px; mobile is 850px. The fixed navigation floats 16px below the desktop viewport edge, becoming 12px on mobile.

## Elevation & Depth

Depth comes primarily from tonal landscape planes. Experience cards remain flat and unboxed. Primary buttons lift slightly on hover with a soft cobalt shadow; scrolled navigation gains a thin bottom shadow and background blur. Sponsor cards change border color rather than elevation.

## Shapes

Buttons are pill-shaped. Navigation is a softly rounded paper panel; artwork and sponsor containers use modest rounded corners. Fine rules define FAQ rows, sponsor tiers, and section boundaries.

## Components

- **Buttons:** Cobalt with white text; hover darkens, lifts 2px, and shifts the directional mark. The light variant serves dark sections. Keyboard focus uses a 2px cobalt outline offset 5px.
- **Navigation:** Compact Inter wordmark, understated links with animated underlines, and a cobalt registration pill. At 650px a Menu button opens a paper dropdown.
- **Experience cards:** Three open columns with rounded ASCII artwork above left-aligned titles and copy; no outer border or hover lift.
- **Sponsor cards:** Compact logo tiles with 16px padding, 96px minimum height, and 12px corners. Four columns on desktop, two below 900px; Gold remains two columns. Descriptions remain available to assistive technology and as hover titles. Preserve sponsor marks and featured black/white branding.
- **FAQ:** Native disclosure rows with fine dividers; the marker rotates when open and answer height transitions when supported.
- **Countdown:** Four tabular mono values with small captions. Its target is June 5, 2027 at 08:00 PDT; zero is clamped and the label changes at the event start.
- **Landscape:** Layered valley ridges and ASCII horses remain the signature visual. Respect reduced-motion preferences; global reveal content remains visible.

## Do's and Don'ts

### Do:
- Do preserve the valley hills, animated ASCII horses, and their existing colors.
- Do use bold Inter for the event title and section hierarchy.
- Do reserve Instrument Serif for editorial accents.
- Do retain visible keyboard focus and reduced-motion behavior.

### Don't:
- Don’t replace the local landscape with generic event artwork.
- Don’t apply the serif accent to the main event title.
- Don’t wrap experience copy in elevated cards; its artwork supplies the container.

Readability: secondary text uses deep slate; dark sections use pale supporting text. Heading scrambles update at most every 65ms and resolve within 280ms; headings remain readable until the effect starts. Reduced motion skips decoding.
